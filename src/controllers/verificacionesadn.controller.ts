import { Request, Response } from 'express';

//* Servicios
import BasicToolsService from '../services/basictoolsservice';
import DbService from '../services/dbservice';
import DnaService from '../services/dnaservice';
import ModelService from '../services/modelservice';

//* Interfaces y Constantes
import { IIndexable } from '../interfaces/indexable.interface';
import { IVerificacionAdn } from './../interfaces/verificacionadn.interface';
import { MODEL_NAME } from './../config/constants';

/**
 * 
 * @param req Objeto de tipo Request
 * @param res Objteto de tipo Response
 * @returns Un objeto de tipo IApiDataResponse. Contiene tres propiedades:
 * error: si es true indica que ocurrió un error. De lo contrario el valor es false.
 * data: Objeto con los datos de la respuesta.
 * message: mensaje de error o mensaje de satisfacción según sea la propiedad error.
 */
export const nuevaVerificacion = async (req: Request, res: Response) => {
    try {

        //* Creamos una instancia del servicio que se utilizará para guardar en la BD
        //* el resultado de la verificación.
        const dbService = new DbService(req.app.locals.context.db, MODEL_NAME.VERIFICACION_ADN);

        //* Creamos el modelo de datos a partir de req.body
        const verificacionAdn: IVerificacionAdn = ModelService.create(MODEL_NAME.VERIFICACION_ADN, req.body) as IVerificacionAdn;

        //* Verificamos la cadena de ADN
        const dnaService = new DnaService();
        verificacionAdn.mutacion = dnaService.hasMutation(verificacionAdn.dna);

        //* Guardamos en la BD el resultado. La BD contiene un índice
        //* que no permite guardar duplicados.
        await dbService.add({
            dnastr: verificacionAdn.dnastr,
            mutacion: verificacionAdn.mutacion
        });
        if (!verificacionAdn.mutacion) {
            throw new Error('La cadena recibida no tiene mutaciones');
        }
        return res.json({
            error: false,
            data: {
                result: verificacionAdn.mutacion
            },
            message: 'Se detectó mutación en el ADN'
        });
    } catch (error) {
        return res.status(403).send({
            error: true,
            data: {},
            message: BasicToolsService.getErrorMessage(error)
        });
    }
};

/**
 * 
 * @param req Objeto de tipo Request
 * @param res Obtejto de tipo Response
 * @returns Un objeto de tipo IApiDataResponse. Contiene tres propiedades:
 * error: si es true indica que ocurrió un error. De lo contrario el valor es false.
 * data: Objeto con los datos de la respuesta.
 * message: mensaje de error o mensaje de satisfacción según sea la propiedad error.
 */
export const getEstadisticas = async (req: Request, res: Response) => {
    try {

        //* filtro de búsqueda
        const pipeline: Array<IIndexable> = [
            { $group: {
                _id: '$mutacion',
                count: { $sum: 1 }
            }}
        ];

        //* Obtener las estadísticas de la BD
        const dbService = new DbService(req.app.locals.context.db, MODEL_NAME.VERIFICACION_ADN);
        const response = await dbService.aggregation(pipeline);

        //* Si se generó un error emitirlo
        if (response.error) {
            throw new Error(response.message);
        }

        //* Mapear los datos para la respuesta final
        const data = {
            count_mutations: 0,
            count_no_mutation: 0,
            ratio: 0
        };
        response.docs.forEach( (item: IIndexable) => {
            if (item._id === true) {
                data.count_mutations = item.count;
            } else {
                data.count_no_mutation = item.count;
            }
        });
        data.ratio = Number(
            (
                data.count_mutations / (data.count_mutations + data.count_no_mutation)
            )
            .toFixed(2)
        );
        //

        return res.json({
            error: false,
            data,
            message: 'Las estadísticas se obtuvieron correctamente'
        });

    } catch (error) {
        return res.status(403).send({
            error: true,
            data: {},
            message: BasicToolsService.getErrorMessage(error)
        });
    }
    
};
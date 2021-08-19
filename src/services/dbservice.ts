import { Db } from 'mongodb';

import ModelService from './modelservice';
import BasicToolsService from './basictoolsservice';

import { IApiDataResponse } from '../interfaces/apidataresponse.interface';
import { IApiDocsResponse } from '../interfaces/apidocsresponse.interface';
import { IIndexable } from './../interfaces/indexable.interface';
import { IModelOptions } from './../interfaces/modeloptions.interface';

/**
 * Permite ejecutar operaciones sobre la BD
 */
class DbService {
    private db: Db;
    private modelOptions: IModelOptions;

    constructor(db: Db, modelName: string) {
        this.db = db;

        //* Obtenemos las opciones del modelo de datos
        this.modelOptions = ModelService.getModelOptions(modelName);
    }

    /**
     * 
     * @param document Objeto con los datos del documento
     * @returns Un objeto de tipo IApiDataResponse. Contiene tres propiedades:
     * error: si es true indica que ocurrió un error. De lo contrario el valor es false.
     * data: Objeto con los datos de la respuesta.
     * message: mensaje de error o mensaje de satisfacción según sea la propiedad error.
     */
    async add(document: IIndexable): Promise<IApiDataResponse> {
        try {
            let documentSaved: IIndexable = {};
            const result = await this.db.collection(this.modelOptions.collection)
            .insertOne(document);
            if (result.insertedCount === 1) {
                documentSaved = result.ops[0];
            }
            return {
                error: result.insertedCount === 1 ? false : true,
                data: documentSaved,
                message: result.insertedCount === 1 ? 'Los datos se han guardado correctamente...' : 'Ocurrió un error al crear el documento'
            };
        } catch (error) {
            return {
                error: true,
                data: {},
                message: BasicToolsService.getErrorMessage(error)
            };
        }
    }

    /**
     * 
     * @param pipeline filtro de búqueda y condiciones que se debe procesar
     * @returns Un objeto de tipo IApiDocsResponse, Contiene las siguientes propiedades:
     * error: si es true indica que ocurrió un error. De lo contrario el valor es false.
     * docs: la lista de documentos.
     * totalDocs: total de documentos obtenidos por el query
     * order: el nombre del atributo por el cual están ordenados los datos.
     * limit: la cantidad de registros devuelta. Un valor de cero indica que no se limitó la cantidad de resultados a obtener.
     * page: El número de la página si aplica.
     * toExport: Si el valor es 1 indica que se solicitaron todos los datos de la consulta y no se tomaron en cuenta los parámetros de paginación
     * message: mensaje de error o mensaje de satisfacción según sea la propiedad error.
     */    
    async aggregation(pipeline: Array<IIndexable>): Promise<IApiDocsResponse> {
        //* Este método procesa registros de datos y retorna resultados calculados
        try {
            if (this.modelOptions.collection === '') {
                throw Error('No se encontró la colección de datos');
            }
            const result = await this.db.collection(this.modelOptions.collection)
            .aggregate(pipeline).toArray();
            return {
                error: false,
                docs: result,
                totalDocs: result.length,
                order: '',
                limit: 0,
                page: 1,
                toExport: 1,
                message: ''
            };
        } catch (error) {
            return {
                error: true,
                docs: [],
                totalDocs: 0,
                order: '',
                limit: 0,
                page: 1,
                toExport: 0,
                message: BasicToolsService.getErrorMessage(error)
            }; 
        }
    }
}

export default DbService;
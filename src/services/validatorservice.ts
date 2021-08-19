import ModelService from './modelservice';
import BasicToolsService from './basictoolsservice';

import { IModelOptions } from './../interfaces/modeloptions.interface';
import { IApiDataResponse } from './../interfaces/apidataresponse.interface';
import { IIndexable } from './../interfaces/indexable.interface';
import { MESSAGES } from './../config/constants';

/**
 * Ejecuta la validación sobre un modelo de Datos.
 */
class ValidatorService {
    private catalogue: string = '';
    private doc: IIndexable = {};

    constructor(url: string, doc: IIndexable) {
        this.catalogue = BasicToolsService.getRouteName(url);
        this.doc = { ...doc };
    }

    /**
     * 
     * @returns Un objeto de tipo IApiDataResponse. Contiene tres propiedades:
     * error: si es true indica que ocurrió un error. De lo contrario el valor es false.
     * data: Objeto con los datos de la respuesta.
     * message: mensaje de error o mensaje de satisfacción según sea la propiedad error.
     */
    execPreHook(): IApiDataResponse {
        try {
            const response: IApiDataResponse = {
                error: false,
                data: {},
                message: ''
            };
            const modelOptions: IModelOptions = ModelService.getModelOptionsByCatalogue(this.catalogue);
            if (modelOptions.preHook) {
                const message = modelOptions.preHook(this.doc);
                if (message !== MESSAGES.OK) {
                    response.error = true;
                    response.message = message;
                }
            }
            return response;
        } catch (error) {
            return {
                error: true,
                data: {},
                message: error.message
            };
        }
    }
}

export default ValidatorService;
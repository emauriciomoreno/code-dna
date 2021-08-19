
import DnaService from './dnaservice';

import { IIndexable } from './../interfaces/indexable.interface';
import { IModelOptions } from '../interfaces/modeloptions.interface';
import { IVerificacionAdn } from './../interfaces/verificacionadn.interface';

import { DOC_TYPE, COLLECTIONS, CATALOGUE_TYPE, MODEL_NAME, MESSAGES } from './../config/constants';

class ModelService {

    //* Almacena las opciones de los modelos de datos
    //* admitidos por la aplicación
    private static models: Array<IModelOptions> = [
        {
            name: MODEL_NAME.VERIFICACION_ADN,
            doctype: DOC_TYPE.VERIFICACION_ADN,
            slug: 'VERIFICACIONES-ADN',
            catalogue: CATALOGUE_TYPE.VERIFICACIONES_ADN,
            collection: COLLECTIONS.T_VERIFICACIONES_ADN,
            createModel: function(data: IIndexable) {
                const model: IVerificacionAdn = {
                    dna: data.dna,
                    dnastr: data.dna.join(''),
                    mutacion: false
                };
                if (data._id && data._id !== '') {
                    model._id = data._id;
                }
                return model;
            },
            preHook: function(data: IIndexable) {
                if (
                    !data.dna ||
                    !Array.isArray(data.dna) ||
                    data.dna.length === 0
                ) {
                    return MESSAGES.NO_DATOS;
                } else {
                    return DnaService.validateMatrix(data.dna);
                }
            }
        }
    ];

    /**
     * 
     * @param modelName Nombre del modelo de datos
     * @param data Objeto con los datos que se deben asignar
     * @returns modelo de datos
     */
    static create(modelName: string, data: IIndexable) {
        let model: IIndexable = {};
        const modelOptions = this.models.find( item => item.name === modelName);
        if (modelOptions && modelOptions.createModel) {
            model = modelOptions.createModel(data);
        }
        return model;
    }

    /**
     * 
     * @param modelName Nombre del modelo de datos
     * @returns un objeto de tipo IModelOptions con las opciones del modelo solicitado
     */
    static getModelOptions(modelName: string): IModelOptions {
        let modelOptions: IModelOptions = this.initModelOptions();
        const model = this.models.find( item => item.name === modelName);
        if (model) {
            modelOptions = { ...model };
        }

        return modelOptions;
    }

    /**
     * 
     * @param catalogue Nombre del catálogo de datos
     * @returns un objeto de tipo IModelOptions con las opciones del modelo solicitado
     */
    static getModelOptionsByCatalogue(catalogue: string): IModelOptions {
        let modelOptions: IModelOptions = this.initModelOptions();
        const model = this.models.find( item => item.catalogue === catalogue);
        if (model) {
            modelOptions = { ...model };
        }
        return modelOptions;
    }

    /**
     * 
     * @returns un objeto de tipo IModelOptions con valores por defecto
     */
    private static initModelOptions(): IModelOptions {
        const modelOptions: IModelOptions = {
            name: MODEL_NAME.UNKNOWN,
            doctype: DOC_TYPE.UNKNOWN,
            slug: '',
            catalogue: CATALOGUE_TYPE.UNKNOWN,
            collection: ''
        }; 
        return modelOptions;
    }
}

export default ModelService;
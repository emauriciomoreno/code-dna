import { IIndexable } from './indexable.interface';
import { CATALOGUE_TYPE, DOC_TYPE, MODEL_NAME } from './../config/constants';

//* Define las características de un Modelo de Datos
export interface IModelOptions {
    name: MODEL_NAME;
    doctype: DOC_TYPE;
    slug: string;
    catalogue: CATALOGUE_TYPE;
    collection: string;
    //* Función opcional que permite crear un modelo de datos a partir de un objeto genérico.
    createModel?: (data: IIndexable) => IIndexable;
    //* Funcional opcional que permite ejecutar una validación sobre el modelo de datos.
    preHook?: (data: IIndexable) => string;
}

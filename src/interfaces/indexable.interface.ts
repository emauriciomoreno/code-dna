//* Interfaz que permite generar objetos iterables.
//* Creada para evitar el uso de <any>
export interface IIndexable<T = any> {
    [ key: string ]: T;
}
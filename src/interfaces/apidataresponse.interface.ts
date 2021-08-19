//* Es utilizada para emitir la respuesta de un servicio
//* cuando NO se trata de listas de documentos.
export interface IApiDataResponse {
    error: boolean;
    data: any;
    message: string;
}

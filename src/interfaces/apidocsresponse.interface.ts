//* Es utilizada para emitir la respuesta de un servicio
//* cuando se trata de listas de documentos.
export interface IApiDocsResponse {
    error: boolean;
    docs: any [];
    totalDocs: number;
    order: string;
    limit: number;
    page: number;
    toExport: number;
    message: string;
}

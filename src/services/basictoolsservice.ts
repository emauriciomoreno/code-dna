class BasicToolsService {

    /**
     * 
     * @param err Objeto de Error
     * @returns mensaje de error en formato string
     */
    static getErrorMessage(err: any): string {
        let message = '';
        if (err.code) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'El elemento ya existe';
                    break;
                case 121:
                    message = 'El documento no cumple con la validación requerida';
                    break;
                default:
                    message = err.message;
                    break;
            }
        } else if (err.message){
            message = err.message;
        }
        return message;
    }

    /**
     * 
     * @param urlsource full path de la URL
     * @returns el path que corresponde a un catálogo acptado por la aplicación
     */
    static getRouteName(urlsource: string): string {
        let routeName = '';
        const pathList = urlsource.split('/');
        if (Array.isArray(pathList) && pathList.length >= 2) {
            routeName = pathList[2];
        }
        return routeName;
    }
}

export default BasicToolsService;
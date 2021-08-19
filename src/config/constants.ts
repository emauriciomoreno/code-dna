import environment from './environments';

if (process.env.NODE_ENV !== 'production') {
    const env = environment;
}

/**
 * Hace referencia al catálogo de mensajes posibles que
 * puede devolver el método de una clase, un servicio, etc.
 */
export enum MESSAGES {
    NO_DATOS = 'Debe proporcionar una entrada de datos',
    FORMATO_ENTRADA_INVALIDO = 'La secuencia de ADN debe ser un Array de cadenas de texto',
    MATRIZ_CUADRADA = 'La longitud de cada base debe ser igual al total de bases',
    CARACTERES_INVALIDOS = 'Solo se permiten los valores A, C, G, T en cada cadena',
    OK = 'ok'
}

/**
 * Cada registro en la BD es un documento.
 * En este catálogo se establecen todos los
 * tipos de documentos que puede manejar la
 * aplicación
 */
export enum DOC_TYPE {
    VERIFICACION_ADN = 'VERADN',
    UNKNOWN = ''
}

/**
 * Hacer referencia al nombre de la colección
 * en la BD de un tipo de documento.
 */
export enum COLLECTIONS {
    T_VERIFICACIONES_ADN = 't_verificacionesadn'
}

/**
 * Especifica un nombre para cada endpoint.
 * Este valor es utilizado para definir la ruta
 * en la que se encuentra un conjunto de servicios.
 */
export enum CATALOGUE_TYPE {
    VERIFICACIONES_ADN = 'mutation',
    UNKNOWN = ''
}

/**
 * Establece un nombre de Modelo de Datos
 * para cada tipo de documento.
 */
export enum MODEL_NAME {
    VERIFICACION_ADN = 'VerificacionAdn',
    UNKNOWN = ''
}



import dotenv from 'dotenv';

/**
 * Obtiene las variables de entorno establecidas
 * en el archivo .env y que son utilizadas cuando
 * se ejecuta la aplicación en modo development.
 */
const environment = dotenv.config({
    path: './src/.env'
});

if (process.env.NODE_ENV !== 'production') {
    if (environment.error) {
        throw environment.error;
    }
}

export default environment;
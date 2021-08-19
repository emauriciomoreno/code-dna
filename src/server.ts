import bodyParser from 'body-parser';
import chalk from 'chalk';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import express from 'express';
import { MongoError } from 'mongodb';
import morgan from 'morgan';

import environments from './config/environments';
import Database from './lib/database';

import { CATALOGUE_TYPE } from './config/constants';

//* Rutas
import verificacionesAdnRoutes from './routes/verificacionesadn.routes';
//

// Configuración de las variables de entorno (lectura)
if (process.env.NODE_ENV !== 'production') {
    const env = environments;
    console.log(env);
}

//* Función principal para ejecutar la aplicación
async function init() {
    const app = express();

    app.use(cors());
    if (process.env.NODE_ENV !== 'production') {
        app.use(morgan('dev'));
    } else {
        app.use(compression());
    }
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));

    //* Conexión a la BD y asignamos el objeto de conexión a la
    //* propiedad locals. Esto nos permitirá recibir en todos los
    //* servicios el objeto de conexión
    const database = new Database();
    const { client, db } = await database.init();
    app.locals.context = { db };

    // Rutas de la aplicación
    app.use(`/v1/${ CATALOGUE_TYPE.VERIFICACIONES_ADN }`, verificacionesAdnRoutes);

    /**
     * Middleware que se ejecuta cuando se intenta acceder a una
     * ruta inexistente
    */
    app.use(function (req, res, next) {
        res.status(404).send({
            error: true,
            data: {},
            message: 'El servicio requerido no existe'
        });
    });

    const httpServer = createServer(app);
    const PORT = process.env.PORT || 3011;
    httpServer.listen({ port: PORT }, () => {
        console.log('==================SERVER API ADNETS==================');
        console.log(`STATUS: ${ chalk.greenBright('ONLINE') }`);
        console.log(`URL: http://localhost:${PORT}`);
    });

    process.on('SIGINT', () => {
        client.close().then( () => {
            console.log('==========DATABASE==========');
            console.log(`STATUS: ${ chalk.yellowBright('DISCONNECTED') }`);
            process.exit(0);
        }).catch( (error: MongoError) => {
            console.log(`ERROR: ${ chalk.redBright(error.message)}`);
        });
    });
}

init();
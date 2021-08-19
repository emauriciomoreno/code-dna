import chalk from 'chalk';
import MongoClient from 'mongodb';

/**
 * Clase que permite establecer una conexión con el
 * servidor de Base de Datos.
 */
class Database {

    /**
     * 
     * @returns cliente de conexión y la conexión a la BD
     */
    async init() {
        const MONGO_DB = process.env.DATABASE || '';
        const client = await MongoClient.connect(MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db();

        if (client.isConnected()) {
            console.log('==========DATABASE==========');
            console.log(`STATUS: ${ chalk.greenBright('ONLINE') }`);
            console.log(`DATABASE: ${chalk.greenBright(db.databaseName) }`);
        }

        return {
            client,
            db
        };
    }
}

export default Database;
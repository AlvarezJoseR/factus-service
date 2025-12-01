import express from 'express';
import config from './config/variables.config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import DbConfig from './config/db.config.js';
import apiRoutes from './routes/index.routes.js';

dotenv.config();

const app = express();

app.started = async () => {

     await DbConfig.inicializar({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dateStrings: true,
        multipleStatements: true,
        namedPlaceholders: true
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(
        {origin: config.NODE_FRONTEND, credentials: true}
    ));
    
    // Rutas de la API
    app.use('/api', apiRoutes);
}


export default app;
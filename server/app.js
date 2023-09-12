import express from 'express';
import path from 'node:path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'dotenv/config';

import { posteoRouter } from './src/routes/posteo.routes.js';
import { startDB } from './src/config/database.js';
import { fileURLToPath } from 'node:url';

//se configura ejs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)

const app = express();

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet({
    contentSecurityPolicy: false
}))

//se configuraron las rutas a las vistas y a los archivos estáticos
app.use(express.static(path.join(__dirname, "src", "public")));

app.set('views', path.join(__dirname, "src", "views"));
app.set('view engine', 'ejs');

//se configuró el puerto como variable de entorno
const port = process.env.PORT || 4000

app.use('/', posteoRouter)

app.listen(port, () => {
    console.log(`server listening in http://localhost:${port}/posteos`)
    startDB()
})
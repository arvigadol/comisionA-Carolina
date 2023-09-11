import express from 'express';
import { posteoRouter } from './src/routes/posteo.routes.js';
import { startDB } from './src/config/database.js';
import path from 'node:path';
import cors from 'cors';
import { fileURLToPath } from 'node:url';

//se configura ejs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)

const app = express();

//middlewares
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "src", "public")));

app.set('views', path.join(__dirname, "src", "views"));
app.set('view engine', 'ejs');

const port = 3000;

app.use('/', posteoRouter)

/* app.get('/', (req, res) => {
    res.send("Todo listo")
}) */

app.listen(port, () => {
    console.log(`server listening in http://localhost:${port}/posteos`)
    startDB()
})
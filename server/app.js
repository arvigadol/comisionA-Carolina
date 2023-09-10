import express from 'express';
import { posteoRouter } from './src/routes/posteo.routes.js';
import { startDB } from './src/config/database.js';
import cors from 'cors';

const app = express();

//middlewares
app.use(express.json())
app.use(cors())

const port = 3000;

app.use('/', posteoRouter)

/* app.get('/', (req, res) => {
    res.send("Todo listo")
}) */

app.listen(port, () => {
    console.log(`server listening in http://localhost:${port}`)
    startDB()
})
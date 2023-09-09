import express from 'express';
import { posteoRouter } from './src/routes/posteo.routes.js';

const app = express();

const port = 3000;

app.use('/', posteoRouter)

app.listen(port, () => {
    console.log(`server listening in http://localhost:${port}`)
})
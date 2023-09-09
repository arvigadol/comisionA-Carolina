import express from 'express';

const app = express();

const port = 3000;

app.use('/',foroRouter)

app.listen(port, ()=>{
    console.log(`server listening in http://localhost:${port}`)
})
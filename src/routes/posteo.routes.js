import {Router} from "express";
import { ctrlGetPosteos,ctrlCreatePosteo,ctrlUpdatePosteo,ctrlDeletePosteo } from "../controllers/posteo.controllers.js";

const posteoRouter = Router();

//endpoint para traer todas las posteos
posteoRouter.get('/api/posteos', ctrlGetPosteos)

//endpoint para crear una posteo
posteoRouter.post('/api/posteos', ctrlCreatePosteo)

//endpoint para modificar una posteo
posteoRouter.put('api/:id', ctrlUpdatePosteo)

//endpoint para eliminar una posteo
posteoRouter.delete('api/:id', ctrlDeletePosteo)

export  { posteoRouter }

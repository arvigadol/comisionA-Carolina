import {Router} from "express";
import { ctrlGetPosteos,ctrlCreatePosteo,ctrlUpdatePosteo,ctrlDeletePosteo } from "../controllers/posteo.controllers.js";
import { createPosteoSchema, editPosteoSchema } from "../models/schemas/posteo.schema.js";
import { validator } from "../middlewares/validator.js"

const posteoRouter = Router();

//endpoint para traer todas las posteos
posteoRouter.get('/api/posteos', ctrlGetPosteos)

//endpoint para crear una posteo
posteoRouter.post('/api/posteos', createPosteoSchema, validator, ctrlCreatePosteo)

//endpoint para modificar una posteo
posteoRouter.put('/api/posteos/:id', editPosteoSchema, validator, ctrlUpdatePosteo)

//endpoint para eliminar una posteo
posteoRouter.delete('/api/posteos/:id', ctrlDeletePosteo)

export  { posteoRouter }

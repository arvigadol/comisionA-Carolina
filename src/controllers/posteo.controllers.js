import { PosteoModel } from "../models/Posteos.js"

PosteoModel

//controlador para traer todas las tareas
export const ctrlGetPosteos = async (req,res) => {
    try {
       const posteo = await PosteoModel.findAll();
       if(!posteo) return res.status(404)
       return res.status(200).json(posteo) 
    } catch (error) {
        console.error(error)
        return res.status(500).json() ({
            message: 'Error del servidor'
        })        
    }
}

//controlador para crear una tarea
export const ctrlCreatePosteo = async (req,res) => {
    try {
        const newPosteo = await PosteoModel.create(req.body)
        return res.status(201).json(newPosteo)
    } catch (error) {
        console.error(error)
        return res.status(500).json() ({
            message: 'Error del servidor'
        })      
    }
}

//controlador para modificar una tarea
export const ctrlUpdatePosteo = (req,res) => {

}

//controlador para eliminar una tarea
export const ctrlDeletePosteo = (req,res) => {

}



import { PosteoModel } from "../models/Posteos.js"

//controlador para mostrar la vista principal
export const ctrlViewPosteos = async (req, res) => {
    try {
        const posteos = await PosteoModel.findAll();
        return res.render('posteos.ejs', {posteos})
     } catch (error) {
         console.error(error)
         return res.status(500).json() ({
             message: 'Error del servidor'
         })        
     }
}

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
export const ctrlUpdatePosteo = async (req,res) => {
    const { id } = req.params
    try {
        const posteoModificado = await PosteoModel.findByPk(id)
        if(!posteoModificado){
            return res.status(404).json({
                message: 'Tarea no encontrada'
            })
        }
        await posteoModificado.update(req.body)

        return res.status(200).json(posteoModificado)        
    } catch (error) {
        console.error(error)
        return res.status(500).json() ({
            message: 'Error del servidor'
        })     
    }
}

//controlador para eliminar una tarea
export const ctrlDeletePosteo = async (req,res) => {
    const { id } = req.params
    console.log(id)
    try {
        const posteoDeleted = await PosteoModel.destroy({
            where: {
                id: id
            }
        })
        if(!posteoDeleted){
            return res.status(404).json({
                message: 'Tarea no encontrada'
            })
        }
        return res.status(200).json({
            message: 'Tarea eliminada'
        })        
    } catch (error) {
        console.error(error)
        return res.status(500).json() ({
            message: 'Error del servidor'
        })     
    }
}



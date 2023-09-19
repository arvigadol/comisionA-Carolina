import { body } from "express-validator";

export const createPosteoSchema = [
    body('title')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No puede estar vacío'),
    body('content')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No puede estar vacío'),
    body('url_image')
        .isURL().withMessage('Ingrese una URL válida')
        .notEmpty().withMessage('No puede estar vacío'),
]

export const editPosteoSchema = [
    body('title')
        .optional()
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No puede estar vacío'),
    body('content')
        .optional()
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No puede estar vacío'),
    body('url_image')
        .optional()
        .isURL().withMessage('Ingrese una URL válida')
        .notEmpty().withMessage('No puede estar vacío'),
]


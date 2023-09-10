import { body } from "express-validator";

export const createPosteoSchema = [
    body('title')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No puede estar vacío'),
    body('content')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No puede estar vacío'),
    body('url_image')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No puede estar vacío'),
]

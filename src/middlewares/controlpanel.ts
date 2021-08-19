import { Request, Response } from 'express';
import ValidatorService from '../services/validatorservice';

/**
 * 
 * @param req Objeto de tipo Request
 * @param res Objeto de tipo Response
 * @param next Devolución de llamada a la función middleware
 * @returns next o un error 403
 */
export const preValidateDocument = (req: Request, res: Response, next: any) => {
    try {
        const validatorService = new ValidatorService(req.originalUrl, req.body);

        //* Ejecuta la validación asignada al modelo de datos, si existe.
        const response = validatorService.execPreHook();
        if (response.error) {
            throw Error(response.message);
        }
        next();
    } catch (error) {
        return res.status(403).send({
            error: true,
            data: {},
            message: error.message
        });
    }
};

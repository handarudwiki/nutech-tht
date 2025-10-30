import { NextFunction, Request, Response } from "express";
import ServiceService from "../services/service.service";

export default class ServiceController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const services = await ServiceService.getAll();
            res.json(services);
        } catch (error) {
            next(error);
        }
    }
}

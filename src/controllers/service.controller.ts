import { NextFunction, Request, Response } from "express";
import ServiceService from "../services/service.service";
import successResponse from "../utils/success_response";

export default class ServiceController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const services = await ServiceService.getAll();
            successResponse(res,"Get All Services Success" ,services);
        } catch (error) {
            next(error);
        }
    }
}

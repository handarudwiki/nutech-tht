import { NextFunction, Request, Response } from "express";
import successResponse from "../utils/success_response";
import BannerService from "../services/banner.service";

export default class BannerController {
    static async getAll(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await BannerService.getAll();
            successResponse(res, "Banners fetched successfully", data);
        } catch (error) {
            next(error);
        }
    }
}
import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import successResponse from "../utils/success_response";

export default class UserController {
    static async register(req:Request, res:Response, next:NextFunction) {
        try {
            await UserService.register(req.body);
            successResponse(res, "User registered successfully", null);
        } catch (error) {
            next(error);
        }
    }

    static async login(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await UserService.login(req.body);
            successResponse(res, "User logged in successfully", data);
        } catch (error) {
            next(error);
        }
    }

    static async getProfile(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await UserService.getProfile(req.user!.id);
            successResponse(res, "User profile fetched successfully", data);
        } catch (error) {
            next(error);
        }
    }
}
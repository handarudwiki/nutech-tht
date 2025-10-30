import { NextFunction, Request, Response } from "express";
import successResponse from "../utils/success_response";
import TransactionService from "../services/transaction.service";

export default class TransactionController {
    static async getBalance(req:Request, res:Response, next:NextFunction) {
        try {
            const userId = req.user!.id;
            const balance = await TransactionService.getBalance(userId);
            successResponse(res,"Get Balance Success" ,balance);
        } catch (error) {
            next(error);
        }
    }

    static async topUp(req:Request, res:Response, next:NextFunction) {
        try {
            const userId = req.user!.id;
            const dto = req.body;
            const balance = await TransactionService.topUp(dto, userId);
            successResponse(res,"Top Up Success" ,balance);
        } catch (error) {
            next(error);
        }
    }

    static async payment(req:Request, res:Response, next:NextFunction) {
        try {
            const userId = req.user!.id;
            const dto = req.body;
            const result = await TransactionService.payment(userId, dto);
            successResponse(res,"Payment Success", result);
        } catch (error) {
            next(error);
        }
    }

    static async getAllTransaction(req:Request, res:Response, next:NextFunction) {
        try {
            const userId = req.user!.id;
            const dto = req.query;
            const transactions = await TransactionService.getAllTransaction(userId, dto as any);
            successResponse(res, "Get Transactions Success", transactions);
        } catch (error) {
            next(error);
        }
    }
}
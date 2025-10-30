import { NextFunction, Request, Response } from "express";
import BadRequestException from "../error/bad_request_exception";
import ConflictException from "../error/conflict_exception";
import UnauthorizedException from "../error/unauthorized_exception";
import NotFoundException from "../error/not_found_exception";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
     if (err instanceof BadRequestException){
         res.status(err.statusCode).json({
            message: err.message,
            details: err.details,
        });
    } else if (err instanceof ConflictException){
         res.status(err.statusCode).json({
            message: err.message,
        });
    }else if ( err instanceof UnauthorizedException){
         res.status(err.statusCode).json({
            message: err.message,
        });
    } else if (err instanceof NotFoundException) {
            res.status(err.statusCode).json({
                message: err.message,
            });
    }
    console.error(err);
     res.status(500).json({
        message: "Internal Server Error",
    });
}
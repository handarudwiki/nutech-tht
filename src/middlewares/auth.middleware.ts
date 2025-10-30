import {Request, Response, NextFunction} from "express";
import UnauthorizedException from "../error/unauthorized_exception";
import { verifyJWT } from "../utils/jwt";

declare global{
    namespace Express {
        interface Request {
            user?: {
                id: string;
            }
        }
    }
}

export const authMIddleware = (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers.authorization?.split(" ")[1];
   
   if(!token){
       throw new UnauthorizedException("No token provided");
   }

    const payload = verifyJWT(token);

    if(!payload){
        throw new UnauthorizedException("Invalid token");
    }

    req.user = {
        id: payload.id
    };

    next();
}
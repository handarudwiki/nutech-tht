
import jwt from "jsonwebtoken";
import UnauthorizedException from "../error/unauthorized_exception";
import { User } from "../model/user";

export function generateJWT(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);
}

export function verifyJWT(token: string): any {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        throw new UnauthorizedException("Invalid token");
    }
}
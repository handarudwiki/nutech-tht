import ConflictException from "../error/conflict_exception";
import UnauthorizedException from "../error/unauthorized_exception";
import UserRepository from "../repositories/user.repository";
import UserValidation, { LoginDTO, RegisterDTO } from "../validations/user";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/jwt";
import {v7 as uuid} from "uuid";
import  Validation  from "../validations/validation";
import { User, UserResponse } from "../model/user";

export default class UserService{
    static async register(dto:RegisterDTO){
        const validData = Validation.validate(UserValidation.REGISTER, dto);
        const user = await UserRepository.findByEmail(validData.email)

        if(user){
            throw new ConflictException("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(validData.password, 10);
        UserRepository.create({
            id: uuid(),
            email: validData.email,
            password: hashedPassword,
            first_name: validData.first_name,
            last_name: validData.last_name,
        });
    }

    static async login(dto:LoginDTO) :Promise<{}> {
        const validData = Validation.validate(UserValidation.LOGIN, dto);
        const user = await UserRepository.findByEmail(validData.email);
        if(!user){
            throw new UnauthorizedException("Invalid email or password");
        }

        const isValid = await bcrypt.compare(validData.password, user.password);
        if(!isValid){
            throw new UnauthorizedException("Invalid email or password");
        }

        return {
            token: generateJWT(user),
        };
    }

    static async getProfile(id: string): Promise<UserResponse | null> {
        return UserRepository.findById(id);
    }
}
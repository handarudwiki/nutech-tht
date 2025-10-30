import z from "zod";

export default class UserValidation{
    static readonly REGISTER = z.object({
        email: z.email(),
        password: z.string().min(6).max(100),
        first_name: z.string().min(2).max(50),
        last_name: z.string().min(2).max(50).optional(),
    })

    static readonly LOGIN = z.object({
        email: z.email(),
        password: z.string().min(6).max(100),
    })

    static readonly UPDATE = z.object({
        first_name: z.string().min(2).max(50).optional(),
        last_name: z.string().min(2).max(50).optional(),
    })
}

export type RegisterDTO = z.infer<typeof UserValidation.REGISTER>;
export type LoginDTO = z.infer<typeof UserValidation.LOGIN>;
export type UpdateDTO = z.infer<typeof UserValidation.UPDATE>;
import BadRequestException from "../error/bad_request_exception";
export default class Validation {
    static validate<T>(schema: any, data:T):T{
        const result = schema.safeParse(data);
        if (!result.success) {
            throw new BadRequestException("Invalid input",result.error.issues.map((error:any) => {
                return {
                    message : error.message,
                    path : error.path,
                }
               }));
        }
        return result.data;
    }
}
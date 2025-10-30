import { Response } from "express";


const successResponse = (res: Response, message: string, data: any) => {
    res.status(200).json({
        status: 0,
        message,
        data
    });
};

export default successResponse;
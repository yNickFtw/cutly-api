import { HttpException, Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class AppError {
    public handleError(error: { message: string, statusCode: number }): { message: string, statusCode: number } {
        return { message: error.message, statusCode: error.statusCode };
    }

    public handleControllerError(error: any, response: Response) {
        if(error.message && error.statusCode) {
            return response.status(error.statusCode).json({ message: error.message });
        }
        
        return response.status(500).json({ message: "Internal server error" });
    }
}


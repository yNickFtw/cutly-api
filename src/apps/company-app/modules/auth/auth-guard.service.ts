import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { CompanyAppAuthService } from "./company-app-auth.service";
import { AppError } from "src/shared/utils/app-error/app-error.service";
import { PUBLIC_KEY } from "src/shared/decorators/Public";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private reflector: Reflector, private authService: CompanyAppAuthService, private readonly appError: AppError) { }

    public canActivate(context: ExecutionContext): boolean {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
                context.getClass(),
                context.getHandler()
            ])

            if (isPublic) {
                return true
            }

            const request = context.switchToHttp().getRequest<Request>();

            const payload = this.decodeToken(request.headers["authorization"] as string)

            if (!payload) {
                throw this.appError.handleError({
                    message: "Sessão expirada",
                    statusCode: 401
                })
            }

            request['user'] = payload

            return true
        } catch (error) {
            throw this.appError.handleError({
                message: "Sessão expirada",
                statusCode: 401
            })
        }
    }

    private decodeToken(BearerToken: string): any {
        try {
            const tokenParts = BearerToken.split(' ');

            const token = tokenParts[1];

            return this.authService.decodeToken(token);
        } catch (error) {
            throw this.appError.handleError({
                message: "Sessão expirada",
                statusCode: 401
            })
        }
    }
}


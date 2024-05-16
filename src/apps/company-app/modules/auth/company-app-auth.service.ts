import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "src/shared/core/interfaces/company-app/modules/user/IUser";

@Injectable()
export class CompanyAppAuthService {
    private readonly jwtSecret: string = process.env.COMPANY_APP_JWT_SECRET;

    constructor(private jwtService: JwtService) {}

    public generateToken(user: IUser): string {
        return this.jwtService.sign(user, { secret: this.jwtSecret });
    }

    public decodeToken(token: string): any {
        return this.jwtService.verify(token, { secret: this.jwtSecret });
    }
}


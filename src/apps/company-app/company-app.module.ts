import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/shared/database/prisma.service";
import { CompanyAppAuthService } from "./modules/auth/company-app-auth.service";
import { AppError } from "src/shared/utils/app-error/app-error.service";
import { AuthGuardService } from "./modules/auth/auth-guard.service";
import { APP_GUARD } from "@nestjs/core";
import { CompanyModule } from './modules/company/company.module';

@Module({
    imports: [UserModule, JwtModule.register({}), CompanyModule],
    controllers: [],
    providers: [PrismaService, CompanyAppAuthService, AppError, { provide: APP_GUARD, useClass: AuthGuardService, }],
})
export class CompanyAppModule { }

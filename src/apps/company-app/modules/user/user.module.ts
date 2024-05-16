import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UserRepository } from './repository/user.repository';
import { AppError } from 'src/shared/utils/app-error/app-error.service';
import { CompanyAppAuthService } from '../auth/company-app-auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository, AppError, CompanyAppAuthService, JwtService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyRepository } from './repository/company.repository';
import { AppError } from 'src/shared/utils/app-error/app-error.service';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, PrismaService, AppError],
})
export class CompanyModule {}

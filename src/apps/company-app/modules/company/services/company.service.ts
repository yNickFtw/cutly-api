import { Injectable } from '@nestjs/common';
import { ICompany } from 'src/shared/core/interfaces/company-app/modules/company/ICompany';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AppError } from 'src/shared/utils/app-error/app-error.service';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class CompanyService {
    constructor(private readonly appError: AppError, private readonly companyRepository: CompanyRepository) { }

    public async create(name: string, slug: string, userId: string): Promise<ICompany> {
        if (!name) {
            throw this.appError.handleError({ message: 'Nome da empresa não informado', statusCode: 400 })
        }

        const company = await this.companyRepository.create({ name, slug, ownerId: userId });

        return company;
    }

    public async findAllThatUserIsCollaboratorAndIsOwner(userId: string): Promise<ICompany[]> {
        return this.companyRepository.findAllThatUserIsCollaboratorAndIsOwner(userId);
    }
}

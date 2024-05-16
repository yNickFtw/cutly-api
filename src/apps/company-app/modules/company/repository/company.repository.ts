import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ICompany } from "src/shared/core/interfaces/company-app/modules/company/ICompany";
import { ICompanyRepository } from "src/shared/core/interfaces/company-app/modules/company/company.repository.interface";
import { PrismaService } from "src/shared/database/prisma.service";

@Injectable()
export class CompanyRepository implements ICompanyRepository {
    constructor(private prisma: PrismaService) { }

    public async create(data: { name: string, slug: string, ownerId: string }): Promise<ICompany> {
        return this.prisma.company.create({
            data: {
                name: data.name,
                slug: data.slug,
                ownerId: data.ownerId
            }
        });
    }

    public async findById(id: string): Promise<ICompany> {
        return this.prisma.company.findUnique({ where: { id } });
    }

    public async findByName(name: string): Promise<ICompany> {
        return this.prisma.company.findFirst({ where: { name } });
    }

    public async findByOwnerId(ownerId: string): Promise<ICompany[]> {
        return this.prisma.company.findMany({ where: { ownerId } });
    }

    public async update(id: string, company: Prisma.CompanyUpdateInput): Promise<ICompany> {
        return this.prisma.company.update({ where: { id }, data: company });
    }

    public async findAllThatUserIsCollaboratorAndIsOwner(userId: string): Promise<ICompany[]> {
        const companiesThatUserIsOwner = await this.prisma.company.findMany({ where: { ownerId: userId } });
        const companiesThatUserIsCollaborator = await this.prisma.company.findMany({ where: { collaborator: { some: { userId } } } });

        return [...companiesThatUserIsOwner, ...companiesThatUserIsCollaborator];
    }
}


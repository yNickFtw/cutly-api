import { Prisma } from "@prisma/client";
import { ICompany } from "./ICompany";

export interface ICompanyRepository {
    create(data: { name: string, slug: string, ownerId: string }): Promise<ICompany>;
    findById(id: string): Promise<ICompany>;
    findByName(name: string): Promise<ICompany>;
    findByOwnerId(ownerId: string): Promise<ICompany[]>;
    update(id: string, company: Prisma.CompanyUpdateInput): Promise<ICompany>;
}
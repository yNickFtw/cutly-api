import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { IUser } from "src/shared/core/interfaces/company-app/modules/user/IUser";
import { IUserRepository } from "src/shared/core/interfaces/company-app/modules/user/user.repository.interface";
import { PrismaService } from "src/shared/database/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaService) {}

    public async create(user: Prisma.UserCreateInput): Promise<IUser> {
        return this.prisma.user.create({ data: user });
    }

    public async findByEmail(email: string): Promise<IUser> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    public async findById(id: string): Promise<IUser> {
        return this.prisma.user.findUnique({ where: { id } });
    }
}


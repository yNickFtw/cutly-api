import { Prisma } from "@prisma/client";
import { IUser } from "./IUser";

export interface IUserRepository {
    create(user: Prisma.UserCreateInput): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
}

export interface ICompany {
    id: string;
    name: string;
    email: string;
    password: string;
    logo?: string;
    description?: string;
    website?: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
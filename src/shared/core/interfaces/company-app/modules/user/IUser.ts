export interface IUser {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    password?: string;
    phone?: string;
    stripeCustomerId?: string;
    createdAt: Date;
    updatedAt: Date;
}

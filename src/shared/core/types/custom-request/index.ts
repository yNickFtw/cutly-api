import { IUser } from "../../interfaces/company-app/modules/user/IUser";

export interface AuthRequest extends Request {
    body: any;
    user: IUser
}


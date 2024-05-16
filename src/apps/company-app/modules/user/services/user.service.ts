import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUser } from 'src/shared/core/interfaces/company-app/modules/user/IUser';
import { AppError } from 'src/shared/utils/app-error/app-error.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, private readonly appError: AppError) {}

    public async create(name: string, email: string, password: string, confirmPassword: string): Promise<IUser> {
        if(!name || !email || !password || !confirmPassword) {
            throw this.appError.handleError({ message: 'Parece que você esqueceu de preencher algum campo', statusCode: 400 });
        }

        if(password !== confirmPassword) {
            throw this.appError.handleError({ message: 'As senhas não conferem', statusCode: 400 });
        }
        const userAlreadyExistsByEmail = await this.userRepository.findByEmail(email);
        
        if(userAlreadyExistsByEmail) {
            throw this.appError.handleError({ message: 'Usuário já existe', statusCode: 400 });
        }

        const salt = await bcrypt.genSalt(12);

        const hashPassword = await bcrypt.hash(password, salt);

        const { password: _, ...restUser } = await this.userRepository.create({ name, email, password: hashPassword });

        return restUser;
    }

    public async login(email: string, password: string): Promise<IUser> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw this.appError.handleError({ message: 'Usuário não encontrado', statusCode: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            throw this.appError.handleError({ message: 'Senha inválida', statusCode: 400 });
        }

        return user;
    }

    public async findById(id: string): Promise<IUser> {
        const user = await this.userRepository.findById(id);

        if(!user) {
            throw this.appError.handleError({ message: 'Sessão expirada, faça login para continuar', statusCode: 401 });
        }

        let { password: _, ...restUser } = user;

        return restUser;
    }
}

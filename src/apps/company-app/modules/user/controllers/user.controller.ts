import { Controller, Post, Req, Request as ExpressRequest, Res, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { AppError } from 'src/shared/utils/app-error/app-error.service';
import { CompanyAppAuthService } from '../../auth/company-app-auth.service';
import { AuthRequest } from 'src/shared/core/types/custom-request';
import { Public } from 'src/shared/decorators/Public';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly appError: AppError, private readonly companyAppAuthService: CompanyAppAuthService) {}

  @Public()
  @Post('create')
  public async create(@Req() request: Request, @Res() response: Response): Promise<Response> {
    try {
      const { name, email, password, confirmPassword } = request.body;

      const user = await this.userService.create(name, email, password, confirmPassword);

      const token = this.companyAppAuthService.generateToken(user);

      return response.status(201).json({ message: "Conta criada com sucesso", auth: { token }, user })
    } catch (error) {
      return this.appError.handleControllerError(error, response);
    }
  }

  @Public()
  @Post("login")
  public async login(@Req() request: Request, @Res() response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const user = await this.userService.login(email, password);

      const token = this.companyAppAuthService.generateToken(user);

      return response.status(200).json({ message: "Usuário logado com sucesso", auth: { token }, user });
    } catch (error) {
      return this.appError.handleControllerError(error, response);
    }
  }

  @Get('logged')
  public async profile(@ExpressRequest() request: AuthRequest, @Res() response: Response): Promise<Response> {
    try {      
      const user = await this.userService.findById(request.user.id);      

      return response.status(200).json({ message: "", user });
    } catch (error) {      
      return this.appError.handleControllerError(error, response);
    }
  }

}

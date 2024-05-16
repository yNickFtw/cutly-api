import { Controller, Get, Post, Res } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { Request as ExpressRequest } from '@nestjs/common';
import { AuthRequest } from 'src/shared/core/types/custom-request';
import { AppError } from 'src/shared/utils/app-error/app-error.service';
import { Response } from 'express';

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService, private readonly appError: AppError) { }

  @Post("create")
  public async create(@ExpressRequest() request: AuthRequest, @Res() response: Response) {
    try {
      const { name, slug } = request.body;

      const user = request.user;

      console.log(user);
      

      const company = await this.companyService.create(name, slug, user.id)

      return response.status(201).json({ message: "Empresa criada com sucesso", company });
    } catch (error) {
      return this.appError.handleControllerError(error, response);
    }
  }

  @Get("all")
  public async findAllThatUserIsCollaboratorAndIsOwner(@ExpressRequest() request: any, @Res() response: Response) {
    try {
      const user = request.user;

      const companies = await this.companyService.findAllThatUserIsCollaboratorAndIsOwner(user.id)

      return response.status(200).json(companies);
    } catch (error) {
      return this.appError.handleControllerError(error, response);
    }
  }
}

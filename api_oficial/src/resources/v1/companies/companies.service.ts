import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/@core/infra/database/prisma.service';
import { AppError } from 'src/@core/infra/errors/app.error';
import { Company } from 'src/@core/domain/entities/company.entity';
import { Users } from 'src/@core/domain/entities/users.entity';

@Injectable()
export class CompaniesService {

  logger: Logger = new Logger(`${CompaniesService.name}`);

  constructor(public readonly prisma: PrismaService) { }

  async one(id: number, payload: Users) {
    try {

      if (!id) throw new Error('Necessário informar o id');

      const company = await this.prisma.company.findUnique({ where: { id } });

      if (!company) throw new Error('Empresa não encontrada');

      if (!payload.super && company.usersId != payload.id) throw new Error('Você não tem permissão para fazer isso');

      return company;

    } catch (error: any) {
      this.logger.error(`one - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async all(payload: Users) {
    try {

      if (!!payload.super) {
        return await this.prisma.company.findMany();
      } else {
        return await this.prisma.company.findMany({ where: { usersId: payload.id } })
      }
    } catch (error: any) {
      this.logger.error(`one - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(dto: CreateCompanyDto, payload: Users) {
    try {

      const findedCompany = await this.prisma.company.findUnique({ where: { idEmpresaMult100: dto.idEmpresaMult100 } });

      if (!!findedCompany) throw new Error(`Já existe uma empresa com este id cadastrada`);

      return await this.prisma.company.create({ data: { name: dto.name, usersId: payload.id, idEmpresaMult100: dto.idEmpresaMult100 } });

    } catch (error: any) {
      this.logger.error(`create - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, dto: UpdateCompanyDto, payload: Users) {
    try {

      const company = await this.prisma.company.findUnique({ where: { id } });

      if (!!company) throw new Error('Empresa não encontrada');

      if (!payload.super && company.usersId != payload.id) throw new Error('Você não tem permissão para fazer isso');

      return await this.prisma.company.update({ where: { id }, data: { name: dto.name } });

    } catch (error: any) {
      this.logger.error(`update - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}

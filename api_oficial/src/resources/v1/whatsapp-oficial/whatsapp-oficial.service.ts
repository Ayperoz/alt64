import { Injectable, Logger } from '@nestjs/common';
import { CreateWhatsappOficialDto } from './dto/create-whatsapp-oficial.dto';
import { UpdateWhatsappOficialDto } from './dto/update-whatsapp-oficial.dto';
import { BaseService } from 'src/@core/base/base.service';
import { WhatsAppOficial } from 'src/@core/domain/entities/whatsappOficial.model';
import { RabbitMQService } from 'src/@core/infra/rabiitmq/RabbitMq.service';
import { Users } from 'src/@core/domain/entities/users.entity';
import { AppError } from 'src/@core/infra/errors/app.error';

@Injectable()
export class WhatsappOficialService extends BaseService<WhatsAppOficial> {

  logger: Logger = new Logger(`${WhatsappOficialService.name}`);

  constructor(private readonly rabbit: RabbitMQService) {
    super('whatsappOficial', WhatsappOficialService.name);
  }

  async oneWhatAppOficial(id: number, payload: Users) {
    try {

      const whats = await this.prisma.whatsappOficial.findUnique({ where: { id, deleted_at: null } });

      if (!whats) throw new Error('Configuração do whats não encontrada');

      const company = await this.prisma.company.findFirst({ where: { usersId: payload.id, deleted_at: null } });

      if (!company) throw new Error('Empresa não encontrada');

      if (!payload.super && whats.companyId != company.id) throw new Error('Você não pode fazer isso');

      return whats;

    } catch (error: any) {
      this.logger.error(`createWhatsAppOficial - ${error.message}`);
      throw new AppError(error.message);
    }
  }

  async allWhatsAppOficial(payload: Users) {
    try {

      if (!!payload.super) {
        return await this.prisma.whatsappOficial.findMany({ where: { deleted_at: null } });
      } else {

        const company = await this.prisma.company.findFirst({ where: { usersId: payload.id, deleted_at: null } });

        if (!company) throw new Error('Empresa não encontrada');

        return await this.prisma.whatsappOficial.findMany({ where: { companyId: company.id, deleted_at: null } });

      }

    } catch (error: any) {
      this.logger.error(`createWhatsAppOficial - ${error.message}`);
      throw new AppError(error.message);
    }
  }

  async createWhatsAppOficial(data: CreateWhatsappOficialDto, payload: Users): Promise<WhatsAppOficial> {
    try {

      const company = await this.prisma.company.findFirst({
        where: {
          usersId: payload.id,
          deleted_at: null
        }
      });

      if (!company) throw new Error('Empresa não encontrada');

      const exist = await this.prisma.whatsappOficial.findUnique({ where: { token_mult100: data.token_mult100 } });

      if (!!exist) throw new Error('Já existe esse token cadastrado');

      const whats: WhatsAppOficial = { ...data, companyId: company.id, token_mult100: data.token_mult100 };

      return await this.prisma.whatsappOficial.create({ data: whats });

    } catch (error: any) {
      this.logger.error(`createWhatsAppOficial - ${error.message}`);
      throw new AppError(error.message);
    }
  }

  async updateWhatsAppOficial(id: number, payload: Users, data: UpdateWhatsappOficialDto): Promise<WhatsAppOficial> {
    try {

      const whats = await this.prisma.whatsappOficial.findUnique({ where: { id, deleted_at: null } });

      if (!whats) throw new Error('Configuração do whats não encontrada');

      const company = await this.prisma.company.findFirst({ where: { usersId: payload.id, deleted_at: null } });

      if (!company) throw new Error('Empresa não encontrada');

      if (!payload.super && whats.companyId != company.id) throw new Error('Você não pode fazer isso');

      return await this.prisma.whatsappOficial.update({ where: { id }, data: data });

    } catch (error: any) {
      this.logger.error(`updateWhatsAppOficial - ${error.message}`);
      throw new AppError(error.message);
    }
  }

  async deleteWhatsAppOficial(id: number, payload: Users): Promise<WhatsAppOficial> {
    try {

      const whats = await this.prisma.whatsappOficial.findUnique({ where: { id, deleted_at: null } });

      if (!whats) throw new Error('Configuração do whats não encontrada');

      const company = await this.prisma.company.findFirst({ where: { usersId: payload.id, deleted_at: null } });

      if (!company) throw new Error('Empresa não encontrada');

      if (!payload.super && whats.companyId != company.id) throw new Error('Você não pode fazer isso');

      return await this.prisma.whatsappOficial.update({ where: { id }, data: { deleted_at: new Date() } });

    } catch (error: any) {
      this.logger.error(`deleteWhatsAppOficial - ${error.message}`);
      throw new AppError(error.message);
    }
  }

}

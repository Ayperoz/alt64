import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AppError } from 'src/@core/infra/errors/app.error';
import { Users } from 'src/@core/domain/entities/users.entity';
import { hashPasswordTransform } from 'src/@core/common/utils/crypto.util';
import { BaseService } from 'src/@core/base/base.service';

@Injectable()
export class UsersService extends BaseService<Users> {

  constructor() {
    super('users', UsersService.name)
  }

  async findByEmail(email: string) {
    try {

      if (!email) throw new Error('Necessário informar o e-mail');

      const user = await this.prisma.users.findUnique({ where: { email } });

      if (!user) throw new Error('Usuário não encontrado com este e-mail');

      delete user.password;
      delete user.salt;

      return user;

    } catch (error: any) {
      this.logger.error(`findByEmail - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {

      const users = await this.prisma.users.findMany();

      return users.reduce((acc, cur) => {

        delete cur.salt;
        delete cur.password;

        acc.push(cur);

        return acc;

      }, new Array<Users>())

    } catch (error: any) {
      this.logger.error(`findAll - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(user: CreateUserDto) {
    try {

      const salt = await hashPasswordTransform.salt();

      const password = await hashPasswordTransform.to(user.password, salt);

      const data: Users = {
        name: user.name,
        email: user.email,
        salt,
        password,
        super: true
      }

      const userSaved = await this.prisma.users.create({ data });

      delete userSaved.password;
      delete userSaved.salt;

      return userSaved;

    } catch (error: any) {
      this.logger.error(`create - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async one(id: number) {
    try {

      if (!id) throw new Error('Necessário informar o id');

      const user = await this.prisma.users.findUnique({ where: { id } });

      if (!user) throw new Error('Usuário não encontrado');

      delete user.salt;
      delete user.password;

      return user;

    } catch (error: any) {
      this.logger.error(`one - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {

      const user = await this.one(id);

      if (!user) throw new Error('Nenhum usuário encontrado');

      const userDeleted = await this.prisma.users.delete({ where: { id } });

      delete userDeleted.salt;
      delete userDeleted.password;

      return userDeleted;

    } catch (error: any) {
      this.logger.error(`delete - ${error.message}`);
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}

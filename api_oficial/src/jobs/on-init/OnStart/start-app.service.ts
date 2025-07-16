import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { defaultAdmin } from './seed';
import { PrismaService } from 'src/@core/infra/database/prisma.service';
import { UsersService } from 'src/resources/v1/users/users.service';
import { SocketService } from 'src/@core/infra/socket/socket.service';

@Injectable()
export class OnStartApp implements OnModuleInit {

  logger: Logger = new Logger(`OnStartApp`);

  constructor(private readonly userService: UsersService) { }

  async onModuleInit() {

    try {

      const users = await this.userService.findAll();

      if (users.length == 0) {

        await this.userService.create({
          name: defaultAdmin.name,
          password: defaultAdmin.password,
          email: defaultAdmin.email,
          super: true
        });

        this.logger.warn(`Usuário super criado, senha ${defaultAdmin.password}`);

      }

    } catch (error: any) {
      this.logger.error(`Falha ao criar o usuário principal - ${error.message}`);
    }

  }
}

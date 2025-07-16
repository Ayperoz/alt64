import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hashPasswordTransform } from 'src/@core/common/utils/crypto.util';
import { Users } from 'src/@core/domain/entities/users.entity';
import { AppError } from 'src/@core/infra/errors/app.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string) {
    const user: Users = await this.usersService.prisma.users.findUnique({ where: { email } })

    if (!user) throw new AppError('Usuário não encontrado', HttpStatus.BAD_REQUEST)

    const hashPassword = await hashPasswordTransform.to(pass, user.salt);

    if (hashPassword != user.password) {
      throw new Error('Usuário ou senha incorreta');
    }

    const userPayload = { ...user };

    delete userPayload.salt;
    delete userPayload.password;

    return {
      data: {
        access_token: await this.jwtService.signAsync(userPayload, {
          secret: process.env.JWT_SECRET,
        }),
      },
      user: userPayload
    };
  }
}

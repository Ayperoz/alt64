import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRequest } from 'src/@core/global-interfaces/iRequest.interface';
import { AppError } from 'src/@core/infra/errors/app.error';

@Controller('v1/users')
@ApiBearerAuth()
@ApiTags('Usuários')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'Listar Usuários' })
  @ApiResponse({ status: 400, description: 'Erro ao listar usuário' })
  @ApiResponse({ status: 200, description: 'Listagem de usuários', isArray: true })
  async all(@Request() req: IRequest) {

    const { user } = req;

    if (!user.super) throw new AppError('Apenas usuários super podem usar esta rota');

    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar Usuário' })
  @ApiResponse({ status: 400, description: 'Erro ao listar usuário' })
  @ApiResponse({ status: 200, description: 'Retorna as informações do usuário' })
  async one(@Request() req: IRequest, @Param('id') id: number) {

    const { user } = req;

    if (id != user.id) return await this.usersService.one(id);

    if (!user.super) throw new AppError('Apenas usuários super podem usar esta rota');

    return await this.usersService.one(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar Usuário' })
  @ApiResponse({ status: 400, description: 'Erro ao cadastrar o usuário' })
  @ApiResponse({ status: 200, description: 'Retorna o usuário criado' })
  async create(@Request() req: IRequest, @Body() data: CreateUserDto) {

    const { user } = req;

    if (!user.super) throw new AppError('Apenas usuários super podem usar esta rota');

    return await this.usersService.create(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar Usuário' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar o usuário' })
  @ApiResponse({ status: 200, description: 'Retorna o usuário deletado' })
  async delete(@Request() req: IRequest, @Param('id') id: number) {

    const { user } = req;

    if (!user.super) throw new AppError('Apenas usuários super podem usar esta rota');

    return await this.usersService.delete(id);
  }
}

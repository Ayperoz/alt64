import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IRequest } from 'src/@core/global-interfaces/iRequest.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('v1/companies')
@ApiBearerAuth()
@ApiTags('Empresas')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) { }

  @Get(':id')
  @ApiOperation({ summary: 'Listar Empresa' })
  @ApiResponse({ status: 400, description: 'Erro ao listar empresa' })
  @ApiResponse({ status: 200, description: 'Mostrar dados da empresa' })
  async one(@Param('id') id: number, @Request() req: IRequest) {

    const user = req.user;

    return await this.service.one(id, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Empresas' })
  @ApiResponse({ status: 400, description: 'Erro ao listar empresas' })
  @ApiResponse({ status: 200, description: 'Mostrar dados da empresas' })
  async all(@Request() req: IRequest) {

    const user = req.user;

    return await this.service.all(user);
  }

  @Post()
  @ApiOperation({ summary: 'Criar Empresa' })
  @ApiResponse({ status: 400, description: 'Erro ao criar empresa' })
  @ApiResponse({ status: 200, description: 'Criar empresa' })
  async create(@Body() body: CreateCompanyDto, @Request() req: IRequest) {

    const user = req.user;

    return await this.service.create(body, user);

  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Empresa' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar a empresa' })
  @ApiResponse({ status: 200, description: 'Atualizar a empresa' })
  async atualizar(@Param('id') id: number, @Body() body: UpdateCompanyDto, @Request() req: IRequest,) {
    const user = req.user;

    return await this.service.update(id, body, user);
  }
}

import { Controller, Get, Post, Body,  Param, Delete, Request, Put } from '@nestjs/common';
import { WhatsappOficialService } from './whatsapp-oficial.service';
import { CreateWhatsappOficialDto } from './dto/create-whatsapp-oficial.dto';
import { UpdateWhatsappOficialDto } from './dto/update-whatsapp-oficial.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRequest } from 'src/@core/global-interfaces/iRequest.interface';

@Controller('v1/whatsapp-oficial')
@ApiBearerAuth()
@ApiTags('Whatsapp Oficial')
export class WhatsappOficialController {
  constructor(private readonly whatsappOficialService: WhatsappOficialService) { }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um Whatsapp Oficial' })
  @ApiResponse({ status: 400, description: 'Erro ao retornar conexão com o Whatsapp Oficial' })
  @ApiResponse({ status: 200, description: 'Retorna o registro no Whatsapp Oficial' })
  getOne(@Request() req: IRequest, @Param('id') id: number) {

    const payload = req.user;

    return this.whatsappOficialService.oneWhatAppOficial(id, payload);
  }

  @Get('')
  @ApiOperation({ summary: 'Retorna registros Whatsapp Oficial' })
  @ApiResponse({ status: 400, description: 'Erro ao encontrar conexões com o Whatsapp Oficial' })
  @ApiResponse({ status: 200, description: 'Retorna os registros no Whatsapp Oficial' })
  getMore(@Body() data: CreateWhatsappOficialDto, @Request() req: IRequest) {

    const payload = req.user;

    return this.whatsappOficialService.allWhatsAppOficial(payload);
  }

  @Post()
  @ApiOperation({ summary: 'Criar Whatsapp Oficial' })
  @ApiResponse({ status: 400, description: 'Erro ao criar conexão com o Whatsapp Oficial' })
  @ApiResponse({ status: 200, description: 'Retorna o registro criado no Whatsapp Oficial' })
  create(@Body() data: CreateWhatsappOficialDto, @Request() req: IRequest) {

    const payload = req.user;

    return this.whatsappOficialService.createWhatsAppOficial(data, payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Whatsapp Oficial' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar conexão com o Whatsapp Oficial' })
  @ApiResponse({ status: 200, description: 'Retorna o registro atualizado no Whatsapp Oficial' })
  update(
    @Param('id') id: number,
    @Body() data: UpdateWhatsappOficialDto,
    @Request() req: IRequest
  ) {

    const payload = req.user;

    return this.whatsappOficialService.updateWhatsAppOficial(id, payload, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar Whatsapp Oficial' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar conexão com o Whatsapp Oficial' })
  @ApiResponse({ status: 200, description: 'Retorna o registro deletado no Whatsapp Oficial' })
  delete(@Param('id') id: number, @Request() req: IRequest) {

    const payload = req.user;

    return this.whatsappOficialService.deleteWhatsAppOficial(id, payload);
  }

  
}

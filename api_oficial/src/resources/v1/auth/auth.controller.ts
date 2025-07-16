import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './auth.decorator';
import { AppError } from 'src/@core/infra/errors/app.error';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('v1/auth')
@ApiTags('Login')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Faz a autenticação do usuário' })
  @ApiResponse({ status: 400, description: 'Retorna erro caso a autenticação falhe' })
  @ApiResponse({ status: 200, description: 'Retorna o token e informações do usuário' })
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      const { email, password } = createAuthDto;
      return await this.authService.signIn(email, password);
    } catch (error: any) {
      throw new AppError(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}

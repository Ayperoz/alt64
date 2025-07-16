import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {

    /**
     * e-mail do usuário
     * @type {string}
     */
    @ApiProperty({
        description: 'e-mail do usuário',
        default: 'api-router@email.com',
        example: 'api-router@email.com',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    /**
    * senha do usuário
    * @type {string}
    */
    @ApiProperty({
        description: 'senha do usuário',
        default: 'S3nh4d0Usu4r10',
        example: 'S3nh4d0Usu4r10',
    })
    @IsNotEmpty()
    @IsString()
    password: string;

}
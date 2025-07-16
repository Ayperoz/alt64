import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    /**
   * nome do usuário
   * @type {string}
   */
    @ApiProperty({
        description: 'nome do usuário',
        default: 'Admin',
        example: 'Admin',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    /**
    * e-mail do usuário
    * @type {string}
    */
    @ApiProperty({
        description: 'e-mail do usuário',
        default: 'admin@email.com',
        example: 'admin@email.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
    * senha do usuário
    * @type {string}
    */
    @ApiProperty({
        description: 'Senha criada pelo usuário',
        default: '1122@@33$$22',
        example: '1122@@33$$22',
    })
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'senha muito fraca',
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    /**
     * Usuário com privilegios a mais
     * @type {boolean}
     */
    @ApiProperty({
        description: 'Usuário com privilegios a mais',
        default: false,
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    super?: boolean;

}

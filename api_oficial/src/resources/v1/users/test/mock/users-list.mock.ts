import { Users } from 'src/@core/domain/entities/users.entity';
import { CreateUserDto } from '../../dto/create-user.dto';

export const usersMockList: Users[] = [
    {
        id: 1,
        email: 'teste1@teste.com.br',
        name: 'Teste 1',
        password: '123456789',
        salt: '987654321',
        super: true
    },
    {
        id: 2,
        email: 'teste2@teste.com.br',
        name: 'Teste 2',
        password: '123456789',
        salt: '987654321'
    },
    {
        id: 3,
        email: 'teste3@teste.com.br',
        name: 'Teste 3',
        password: '123456789',
        salt: '987654321'
    },
];

export const usersCreateDto: CreateUserDto = {
    email: 'teste1@teste.com.br',
    name: 'Teste 1',
    password: '123456789',
    super: false
}
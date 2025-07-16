import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { PrismaService } from 'src/@core/infra/database/prisma.service';
import { prismaMock } from 'src/@core/infra/database/prisma.mock';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {

    it('should throw an error if not received email', async () => {

      await expect(service.findByEmail(null)).rejects.toThrow('Necessário informar o e-mail');

    });

    it('should throw an error if not finded user by email', async () => {

      await expect(service.findByEmail('teste@teste.com.br')).rejects.toThrow('Usuário não encontrado com este e-mail');

    });



  });

  describe('one', () => {

    it('should throw an error if not received id', async () => {

      // jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(undefined);

      prismaMock.user.findUnique.mockResolvedValue(null);

      expect(prismaMock.user.findMany).toHaveBeenCalled();

      await expect(service.one(null)).rejects.toThrow('Necessário informar o id');

    });

    it('should throw an error if not finded user by email', async () => {

      await expect(service.findByEmail('teste@teste.com.br')).rejects.toThrow('Usuário não encontrado');

    })

  });
});

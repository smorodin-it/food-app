import { Test } from '@nestjs/testing';

import { PrismaService } from './prisma.service';

describe('AppService', () => {
  let service: PrismaService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = app.get<PrismaService>(PrismaService);
  });

  describe('getData', () => {
    it('should return "Welcome to food-api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to food-api!' });
    });
  });
});

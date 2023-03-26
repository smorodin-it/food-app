import { Test } from '@nestjs/testing';

import { PrismaService } from '@food-app/backend/orm';

describe('AppService', () => {
  let service: PrismaService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = app.get<PrismaService>(PrismaService);
  });

  describe('getData', () => {
    it('all true', () => {
      expect(true).toEqual(true);
    });
  });
});

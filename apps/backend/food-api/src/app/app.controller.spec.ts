import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { PrismaService } from '../../../../../libs/backend/orm/src/lib/prisma.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PrismaService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to food-api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to food-api!',
      });
    });
  });
});

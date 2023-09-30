import { Test } from '@nestjs/testing';
import { BackendAuthController } from './backend-auth.controller';
import { createMock } from '@golevelup/ts-jest';

describe('BackendAuthController', () => {
  let controller: BackendAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BackendAuthController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get(BackendAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

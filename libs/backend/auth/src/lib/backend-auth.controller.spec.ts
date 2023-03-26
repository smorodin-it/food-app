import { Test } from '@nestjs/testing';
import { BackendAuthController } from './backend-auth.controller';
import { BackendAuthService } from './backend-auth.service';

describe('BackendAuthController', () => {
  let controller: BackendAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendAuthService],
      controllers: [BackendAuthController],
    }).compile();

    controller = module.get(BackendAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

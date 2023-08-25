import { Test } from '@nestjs/testing';
import { BackendAuthService } from './backend-auth.service';
import { createMock } from '@golevelup/ts-jest';

describe('BackendAuthService', () => {
  let service: BackendAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendAuthService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get(BackendAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

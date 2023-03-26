import { Test } from '@nestjs/testing';
import { BackendAuthService } from './backend-auth.service';

describe('BackendAuthService', () => {
  let service: BackendAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendAuthService],
    }).compile();

    service = module.get(BackendAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

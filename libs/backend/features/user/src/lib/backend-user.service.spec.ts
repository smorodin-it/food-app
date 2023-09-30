import { Test } from '@nestjs/testing';
import { BackendUserService } from './backend-user.service';
import { createMock } from '@golevelup/ts-jest';

describe('BackendUserService', () => {
  let service: BackendUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendUserService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get(BackendUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

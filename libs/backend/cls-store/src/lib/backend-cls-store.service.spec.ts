import { Test } from '@nestjs/testing';
import { BackendClsStoreService } from './backend-cls-store.service';

describe('BackendClsStoreService', () => {
  let service: BackendClsStoreService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendClsStoreService],
    }).compile();

    service = module.get(BackendClsStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

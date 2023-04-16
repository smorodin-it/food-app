import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

// type CustomClsStoreType = Record<symbol, unknown>;

class CustomClsStore {
  [key: symbol]: unknown;

  user!: {
    id: string;
  };
}

@Injectable()
export class BackendClsStoreService extends ClsService<CustomClsStore> {}

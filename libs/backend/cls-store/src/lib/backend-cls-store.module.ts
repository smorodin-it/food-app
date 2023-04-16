import { Module, Global } from '@nestjs/common';
import { BackendClsStoreService } from './backend-cls-store.service';
import { ClsModule, ClsService } from 'nestjs-cls';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
  ],
  providers: [{ provide: BackendClsStoreService, useExisting: ClsService }],
  exports: [BackendClsStoreService],
})
export class BackendClsStoreModule {}

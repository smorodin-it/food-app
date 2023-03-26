import { Module } from '@nestjs/common';
import { BackendAuthController } from './backend-auth.controller';
import { BackendAuthService } from './backend-auth.service';

@Module({
  controllers: [BackendAuthController],
  providers: [BackendAuthService],
})
export class BackendAuthModule {}

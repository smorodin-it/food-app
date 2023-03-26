import { Module } from '@nestjs/common';
import { BackendAuthController } from './backend-auth.controller';
import { BackendAuthService } from './backend-auth.service';
import { BackendUserModule } from '@food-app/backend/user';

@Module({
  imports: [BackendUserModule],
  controllers: [BackendAuthController],
  providers: [BackendAuthService],
})
export class BackendAuthModule {}

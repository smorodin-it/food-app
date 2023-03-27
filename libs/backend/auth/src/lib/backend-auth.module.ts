import { Module } from '@nestjs/common';
import { BackendAuthController } from './backend-auth.controller';
import { BackendAuthService } from './backend-auth.service';
import { BackendUserModule } from '@food-app/backend/user';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './backend-local.strategy';

@Module({
  imports: [BackendUserModule, PassportModule],
  controllers: [BackendAuthController],
  providers: [BackendAuthService, LocalStrategy],
})
export class BackendAuthModule {}

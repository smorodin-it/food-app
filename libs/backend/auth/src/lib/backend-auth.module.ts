import { Module } from '@nestjs/common';
import { BackendAuthController } from './backend-auth.controller';
import { BackendAuthService } from './backend-auth.service';
import { BackendUserModule } from '@food-app/backend/user';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './backend-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './backend-auth.constants';
// import { APP_GUARD } from '@nestjs/core';
// import { BackendJwtAuthGuard } from './backend-jwt-auth.guard';

@Module({
  imports: [
    BackendUserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JwtConstants.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [BackendAuthController],
  providers: [
    BackendAuthService,
    LocalStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: BackendJwtAuthGuard,
    // },
  ],
})
export class BackendAuthModule {}

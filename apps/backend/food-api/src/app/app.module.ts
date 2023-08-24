import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendOrmModule } from '@food-app/backend/orm';
import { BackendUserModule } from '@food-app/backend/features/user';
import { BackendAuthModule } from '@food-app/backend/features/auth';
import { BackendIngredientModule } from '@food-app/backend/features/ingredient';
import { BackendClsStoreModule } from '@food-app/backend/cls-store';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    BackendOrmModule,
    BackendUserModule,
    BackendAuthModule,
    BackendClsStoreModule,
    BackendIngredientModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }, AppService],
})
export class AppModule {}

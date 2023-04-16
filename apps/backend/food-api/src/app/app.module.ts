import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendOrmModule } from '@food-app/backend/orm';
import { BackendUserModule } from '@food-app/backend/features/user';
import { BackendAuthModule } from '@food-app/backend/features/auth';
import { BackendIngredientModule } from '@food-app/backend/features/ingredient';

@Module({
  imports: [
    BackendOrmModule,
    BackendUserModule,
    BackendAuthModule,
    BackendIngredientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

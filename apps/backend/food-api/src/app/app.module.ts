import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendOrmModule } from '@food-app/backend/orm';
import { BackendUserModule } from '@food-app/backend/user';

@Module({
  imports: [BackendOrmModule, BackendUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendOrmModule } from '@food-app/backend/orm';

@Module({
  imports: [BackendOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

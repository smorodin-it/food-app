import { Module } from '@nestjs/common';
import { BackendUserController } from './backend-user.controller';
import { BackendUserService } from './backend-user.service';
import { BackendOrmModule } from '@food-app/backend/orm';

@Module({
  imports: [BackendOrmModule],
  controllers: [BackendUserController],
  providers: [BackendUserService],
  exports: [BackendUserService],
})
export class BackendUserModule {}

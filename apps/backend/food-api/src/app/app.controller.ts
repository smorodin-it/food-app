import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User as UserModel } from '@food-app/backend/orm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getDataById(): Promise<UserModel[]> {
    return this.appService.getAllUsers();
  }
}

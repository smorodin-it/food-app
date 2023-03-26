import { Controller, Get } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { User as UserModel } from '@food-app/backend/orm';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getDataById(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }
}

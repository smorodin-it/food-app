import { Injectable } from '@nestjs/common';
import { PrismaService } from '@food-app/backend/orm';
import { User as UserModel } from '@food-app/backend/orm';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }
}

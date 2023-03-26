import { Injectable } from '@nestjs/common';
import { PrismaService, User as UserModel } from '@food-app/backend/orm';
import { CreateUserDto } from './backend-user.dto';

@Injectable()
export class BackendUserService {
  constructor(private ps: PrismaService) {}

  async create(dto: CreateUserDto): Promise<void> {
    await this.ps.user.create({
      data: {
        email: dto.email,
        passwordHash: dto.passwordHash,
      },
    });
  }

  async retrieve(id: string): Promise<UserModel | null> {
    return this.ps.user.findUnique({
      where: {
        id,
      },
    });
  }

  async list(): Promise<UserModel[]> {
    return this.ps.user.findMany();
  }

  async setActive(id: string, status: boolean): Promise<void> {
    await this.ps.user.update({
      where: { id },
      data: {
        active: status,
      },
    });
  }

  async updateEmail(id: string, email: string): Promise<void> {
    await this.ps.user.update({
      where: { id },
      data: {
        email,
      },
    });
  }
}

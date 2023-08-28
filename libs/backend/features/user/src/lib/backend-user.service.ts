import { ConflictException, Injectable } from '@nestjs/common';
import {
  Prisma,
  PrismaService,
  User as UserModel,
} from '@food-app/backend/orm';
import { CreateUserDto } from './backend-user.dto';

@Injectable()
export class BackendUserService {
  constructor(private ps: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserModel | null> {
    let user: UserModel | null = null;

    try {
      user = await this.ps.user.create({
        data: {
          email: dto.email,
          passwordHash: dto.passwordHash,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          `User with email ${dto.email} already exist`
        );
      }
    }

    return user;
  }

  async retrieve(id: string): Promise<UserModel | null> {
    return this.ps.user.findUnique({
      where: {
        id,
      },
    });
  }

  async retrieveByEmail(email: string): Promise<UserModel | null> {
    return this.ps.user.findUnique({
      where: {
        email,
      },
    });
  }

  async retrieveByRefreshToken(
    refreshToken: string
  ): Promise<UserModel | null> {
    return this.ps.user.findUnique({
      where: {
        refreshToken,
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

  async updateRefreshToken(id: string, refreshToken: string): Promise<boolean> {
    const user = await this.ps.user.update({
      where: { id },
      data: {
        refreshToken,
      },
    });

    return !!user;
  }
}

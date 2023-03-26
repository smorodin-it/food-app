import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BackendUserService } from './backend-user.service';
import { User as UserModel } from '@food-app/backend/orm';
import { CreateUserDto } from './backend-user.dto';

@Controller('users')
export class BackendUserController {
  constructor(private us: BackendUserService) {}

  @Get()
  async list(): Promise<UserModel[]> {
    return this.us.list();
  }

  @Get('/:id')
  async retrieve(@Param('id') id: string): Promise<UserModel | null> {
    return this.us.retrieve(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<void> {
    return this.us.create(dto);
  }
}

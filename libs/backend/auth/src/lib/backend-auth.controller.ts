import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import {} from '@nestjs/platform-express';

import { BackendAuthService } from './backend-auth.service';
import { SignUpDto } from './backend-auth.dto';
import { LocalAuthGuard } from './backend-local-auth.guard';

@Controller('auth')
export class BackendAuthController {
  constructor(private as: BackendAuthService) {}

  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<void> {
    return this.as.createUser(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Req() req: any) {
    return req.user;
  }
}

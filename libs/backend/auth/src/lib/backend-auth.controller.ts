import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { BackendAuthService } from './backend-auth.service';
import { SignUpDto } from './backend-auth.dto';
import { LocalAuthGuard } from './backend-local-auth.guard';
import { Request } from 'express';
import { Public } from './backend-auth.constants';

@Controller('auth')
export class BackendAuthController {
  constructor(private as: BackendAuthService) {}

  @Public()
  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<void> {
    return this.as.createUser(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/sign-in')
  async signIn(@Req() req: Request) {
    return req.user;
  }
}

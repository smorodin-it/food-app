import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { BackendAuthService } from './backend-auth.service';
import {
  RefreshTokenDto,
  SignInDto,
  SignUpDto,
  ResponseTokens,
} from './backend-auth.dto';
import { Public } from './backend-auth.decorators';

@Controller('auth')
export class BackendAuthController {
  constructor(private as: BackendAuthService) {}

  @Public()
  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<ResponseTokens | null> {
    return this.as.createUser(dto);
  }

  @Public()
  @HttpCode(200)
  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto) {
    return this.as.validateUser(dto);
  }

  @Public()
  @HttpCode(200)
  @Post('/refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.as.refreshTokens(dto);
  }
}

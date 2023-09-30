import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';

import { BackendAuthService } from './backend-auth.service';
import {
  RefreshTokenDto,
  SignInDto,
  SignUpDto,
  ResponseTokens,
} from './backend-auth.dto';
import { Public } from './backend-auth.decorators';
import { Request, Response } from 'express';

import { AuthConstants } from '@food-app/backend/core';

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
  async signIn(
    @Res({ passthrough: true }) resp: Response,
    @Body() dto: SignInDto
  ): Promise<ResponseTokens | null> {
    const tokens = await this.as.validateUser(dto);

    if (tokens) {
      resp.cookie(AuthConstants.refreshTokenCookie, tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      });

      resp.setHeader(
        AuthConstants.responseAuthHeader,
        `Bearer ${tokens.accessToken}`
      );
    }

    return tokens;
  }

  @Public()
  @HttpCode(200)
  @Post('/refresh')
  async refresh(@Req() request: Request) {
    return this.as.refreshTokens({
      refreshToken: request.cookies[AuthConstants.refreshTokenCookie],
    });
  }
}

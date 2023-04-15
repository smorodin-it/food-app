import { Body, Controller, Post } from '@nestjs/common';

import { BackendAuthService } from './backend-auth.service';
import { SignInDto, SignUpDto, TokensDto } from './backend-auth.dto';
import { Public } from './backend-auth.decorators';

@Controller('auth')
export class BackendAuthController {
  constructor(private as: BackendAuthService) {}

  @Public()
  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<TokensDto | null> {
    return this.as.createUser(dto);
  }

  @Public()
  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto) {
    return this.as.validateUser(dto);
  }
}

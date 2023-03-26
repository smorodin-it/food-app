import { Body, Controller, Post } from '@nestjs/common';
import { BackendAuthService } from './backend-auth.service';
import { SignInDto, SignUpDto } from './backend-auth.dto';

@Controller('auth')
export class BackendAuthController {
  constructor(private as: BackendAuthService) {}

  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<void> {
    return this.as.createUser(dto);
  }

  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto): Promise<void> {
    return;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { BackendAuthService } from './backend-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private as: BackendAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.as.validateUser({ email, password });
    if (!tokens) {
      throw new UnauthorizedException();
    }
    return tokens;
  }
}

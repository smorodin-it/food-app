import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SignInDto } from './backend-auth.dto';
import { User as UserModel } from '@food-app/backend/orm';
import { BackendAuthService } from './backend-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private as: BackendAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string
  ): Promise<Omit<UserModel, 'passwordHash'>> {
    const user = await this.as.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

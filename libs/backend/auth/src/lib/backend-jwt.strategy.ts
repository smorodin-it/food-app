import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { BackendAuthService } from '@food-app/backend/auth';
import { SignInDto } from './backend-auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private as: BackendAuthService) {
    super();
  }

  // async verify(dto: SignInDto): Promise<any>;
}

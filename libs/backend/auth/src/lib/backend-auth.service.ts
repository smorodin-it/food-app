import { Injectable } from '@nestjs/common';
import { BackendUserService } from '@food-app/backend/user';
import {
  SignInDto,
  SignUpDto,
  ResponseTokens,
  RefreshTokenDto,
} from './backend-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User as UserModel } from '@food-app/backend/orm';
import { randomUUID } from 'crypto';

@Injectable()
export class BackendAuthService {
  constructor(private us: BackendUserService, private js: JwtService) {}

  async createUser(dto: SignUpDto): Promise<ResponseTokens | null> {
    const hash = await bcrypt.hash(dto.password, 10);
    if (hash && dto.password === dto.confirmPassword) {
      const user = await this.us.create({
        email: dto.email,
        passwordHash: hash,
      });
      return this._generateTokens(user);
    }

    return null;
  }

  async validateUser(dto: SignInDto): Promise<ResponseTokens | null> {
    const user = await this.us.retrieveByEmail(dto.email);

    if (user && (await bcrypt.compare(dto.password, user.passwordHash))) {
      return this._generateTokens(user);
    }

    return null;
  }

  async refreshTokens(dto: RefreshTokenDto): Promise<ResponseTokens | null> {
    const user = await this.us.retrieveByRefreshToken(dto.refreshToken);

    if (user) {
      return this._generateTokens(user);
    }

    return null;
  }

  private async _generateTokens(
    user: UserModel
  ): Promise<ResponseTokens | null> {
    const payload = { sub: user.id };
    const refreshToken = randomUUID();

    const update = await this.us.updateRefreshToken(user.id, refreshToken);

    return update
      ? {
          accessToken: await this.js.signAsync(payload),
          refreshToken,
        }
      : null;
  }
}

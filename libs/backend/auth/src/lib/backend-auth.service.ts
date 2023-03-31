import { Injectable } from '@nestjs/common';
import { BackendUserService } from '@food-app/backend/user';
import { SignInDto, SignUpDto } from './backend-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BackendAuthService {
  constructor(private us: BackendUserService, private js: JwtService) {}

  async createUser(dto: SignUpDto): Promise<void> {
    const hash = await bcrypt.hash(dto.password, 10);
    if (hash && dto.password === dto.confirmPassword) {
      await this.us.create({ email: dto.email, passwordHash: hash });
    }
  }

  async validateUser(
    dto: SignInDto
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const user = await this.us.retrieveByEmail(dto.email);

    if (user && (await bcrypt.compare(dto.password, user.passwordHash))) {
      const payload = { sub: user.id };
      return {
        accessToken: await this.js.signAsync(payload),
        refreshToken: await this.js.signAsync(payload),
      };
    }

    return null;
  }
}

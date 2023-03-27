import { Injectable } from '@nestjs/common';
import { BackendUserService } from '@food-app/backend/user';
import { SignInDto, SignUpDto } from './backend-auth.dto';
import * as bcrypt from 'bcrypt';
import { User as UserModel } from '@food-app/backend/orm';

@Injectable()
export class BackendAuthService {
  constructor(private us: BackendUserService) {}

  async createUser(dto: SignUpDto): Promise<void> {
    const hash = await bcrypt.hash(dto.password, 10);
    if (hash && dto.password === dto.confirmPassword) {
      await this.us.create({ email: dto.email, passwordHash: hash });
    }
  }

  async validateUser(
    dto: SignInDto
  ): Promise<Omit<UserModel, 'passwordHash'> | null> {
    const user = await this.us.retrieveByEmail(dto.email);

    if (user && (await bcrypt.compare(dto.password, user.passwordHash))) {
      // TODO: Return JWT tokens
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...rest } = user;
      return rest;
    }

    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { BackendUserService } from '@food-app/backend/user';
import { SignUpDto } from './backend-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BackendAuthService {
  constructor(private us: BackendUserService) {}

  async createUser(dto: SignUpDto): Promise<void> {
    const hash = await bcrypt.hash(dto.password, 10);
    console.log(hash);
    if (hash && dto.password === dto.confirmPassword) {
      await this.us.create({ email: dto.email, passwordHash: hash });
    }
  }
}

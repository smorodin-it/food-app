import { User as UserModel } from '@food-app/backend/orm';

export class CreateUserDto implements Partial<UserModel> {
  email = '';
  passwordHash = '';
}

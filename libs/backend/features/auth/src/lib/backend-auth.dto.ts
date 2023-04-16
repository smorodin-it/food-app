import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { IsEqualTo } from './backend-auth.decorators';

export class SignInDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class SignUpDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  @IsEqualTo<SignUpDto>('password')
  confirmPassword!: string;
}

export class RefreshTokenDto {
  @IsUUID('4')
  refreshToken!: string;
}

export class ResponseTokens {
  accessToken!: string;
  refreshToken!: string;
}

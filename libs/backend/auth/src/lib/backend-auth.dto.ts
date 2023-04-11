export class SignInDto {
  email!: string;
  password!: string;
}

export class SignUpDto {
  email!: string;
  password!: string;
  confirmPassword!: string;
}

export class TokensDto {
  accessToken!: string;
  refreshToken!: string;
}

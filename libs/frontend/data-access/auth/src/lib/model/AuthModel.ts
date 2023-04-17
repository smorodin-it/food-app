export interface TokensModel {
  accessToken: string;
  refreshToken: string;
}

export interface SignInModel {
  email: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface TokenPayloadModel {
  id: string;
  iat: number;
  exp: number;
}

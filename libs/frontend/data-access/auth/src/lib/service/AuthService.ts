import { AxiosResponse } from 'axios';
import {
  RefreshTokenModel,
  SignInModel,
  TokensModel,
} from '../model/AuthModel';
import { $api } from '@food-app/frontend/data-access/https';

export class AuthService {
  static signIn(
    submitObject: SignInModel
  ): Promise<AxiosResponse<TokensModel>> {
    return $api.post<TokensModel>('/auth/sign-in', submitObject);
  }

  static refreshTokens(
    submitObject: RefreshTokenModel
  ): Promise<AxiosResponse<TokensModel>> {
    return $api.post<TokensModel>('/auth/refresh', submitObject);
  }
}

import { makeAutoObservable } from 'mobx';
import { TokenPayloadModel, TokensModel } from '../model/AuthModel';
import {
  isHaveTokens,
  LocalStorageFields,
  removeFromLocalStorage,
  setToLocalStorage,
} from '@food-app/frontend/utils';

class Auth {
  isAuth = isHaveTokens();
  tokenPayload: TokenPayloadModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(status: boolean): void {
    this.isAuth = status;
  }

  processTokens(tokens: TokensModel | null): void {
    this.setTokenPayload(tokens?.accessToken ?? null);
    this.setTokensToLocalStorage(tokens);
  }

  clear(): void {
    this.setAuth(false);
    this.setTokenPayload(null);
    this.setTokensToLocalStorage(null);
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as TokenPayloadModel;
  }

  private setTokenPayload(token: string | null): void {
    if (token) {
      this.tokenPayload = this.parseJwt(token);
    } else {
      this.tokenPayload = null;
    }
  }

  private setTokensToLocalStorage(tokens: TokensModel | null): void {
    if (tokens) {
      setToLocalStorage(LocalStorageFields.ACCESS_TOKEN, tokens.accessToken);
      setToLocalStorage(LocalStorageFields.REFRESH_TOKEN, tokens.refreshToken);
    } else {
      removeFromLocalStorage(LocalStorageFields.ACCESS_TOKEN);
      removeFromLocalStorage(LocalStorageFields.REFRESH_TOKEN);
    }
  }
}

export const AuthStore = new Auth();

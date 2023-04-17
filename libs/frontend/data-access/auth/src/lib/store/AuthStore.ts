import { makeAutoObservable } from 'mobx';
import { TokenPayloadModel } from '../model/AuthModel';

class Auth {
  isAuth = false;
  tokenPayload: TokenPayloadModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(status: boolean): void {
    this.isAuth = status;
  }

  setTokenPayload(token: string | null): void {
    if (token) {
      this.tokenPayload = this.parseJwt(token);
    } else {
      this.tokenPayload = null;
    }
  }

  clear(): void {
    this.setAuth(false);
    this.setTokenPayload(null);
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
}

export const AuthStore = new Auth();

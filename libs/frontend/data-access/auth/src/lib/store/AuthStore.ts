import { makeAutoObservable } from 'mobx';
import { TokenPayloadModel } from '../model/AuthModel';

class Auth {
  accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth(): boolean {
    return !!this.accessToken;
  }

  get tokenPayload(): TokenPayloadModel | null {
    let result = null;

    if (this.accessToken) {
      result = this.parseJwt(this.accessToken);
    }

    return result;
  }

  setAccessToken(accessToken: string | null): void {
    this.accessToken = accessToken;
  }

  clear(): void {
    this.setAccessToken(null);
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

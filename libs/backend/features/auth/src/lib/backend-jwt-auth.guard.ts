import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, JwtConstants } from './backend-auth.constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { BackendClsStoreService } from '@food-app/backend/cls-store';

@Injectable()
export class BackendJwtAuthGuard implements CanActivate {
  constructor(
    private js: JwtService,
    private reflector: Reflector,
    private cls: BackendClsStoreService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.js.verifyAsync(token, {
        secret: JwtConstants.secret,
      });
      this.cls.set('user', { id: request['user'].sub });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private _extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}

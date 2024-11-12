import { IS_PUBLIC_KEY } from '@/decorators/public';
import { Role } from '@/modules/role/entities/role.entity';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate = (context: ExecutionContext) => {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  };

  handleRequest = (
    err: any,
    user: { id: string; role: Role },
    info: any,
    context: ExecutionContext,
  ): any => {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const request: Request = context.switchToHttp().getRequest();

    const targetApiPath = request.route.path;
    const targetMethod = request.method;

    if (
      !user.role.permissions.find(
        (permission) =>
          permission.method === targetMethod &&
          permission.apiPath === targetApiPath,
      )
    ) {
      throw new ForbiddenException();
    }
    return user;
  };
}

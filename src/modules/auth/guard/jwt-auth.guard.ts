import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { UserService } from 'src/shared/services/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService, private userService: UserService) {
    super();
  }
  getRequest(context: ExecutionContext) {
    console.log('get request');
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // const userData = await this.authService.findFirst({
      //   where: { id: { equals: payload.sub ?? '' } },
      //   include: { role: { include: { permissions: true } } },
      // });
      const user = await this.userService.getOneUser(payload.sub)
      // add user to req so that we can access it later from request
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
  // canActivate(context: ExecutionContext) {
  //   console.log('can active')
  //   const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   console.log('can activate', isPublic )
  //   if (isPublic) {
  //     return true;
  //   }
  //   return super.canActivate(context);
  // }
}

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
  export class AdminAuthGuard extends AuthGuard('admin') {
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
      console.log(req)
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) {
        throw new UnauthorizedException('Invalid Token');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
  
        const user = await this.userService.getOneUser({id: payload.sub})
        // add user to req so that we can access it later from request
        req.user = user;
        return true;
      } catch (err) {
        console.log(err);
        throw new UnauthorizedException('canActive Failed');
      }
    }
  
  }
  
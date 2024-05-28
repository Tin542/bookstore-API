import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { SignInDto } from 'src/dtos/auth/signin.dto';
import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Public } from './decorators/public.decorator';
import { SignInResponseDto } from 'src/dtos/auth/signin-response.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity, { nullable: false })
  async signup(@Args() args: SignUpDto) {
    const result = await this.authService.signup(args);
    return result;
  }
  @Public()
  @Mutation(() => SignInResponseDto, { nullable: false })
  async signin(@Args() args: SignInDto) {
    try {
      const result = await this.authService.signin(args);
      return result;
    } catch (error) {
      throw new Error(`faild to signin: ${error}`);
    }
  }
}

import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { SignInDto } from 'src/dtos/auth/signin.dto';
import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { SignInResponseDto } from 'src/dtos/auth/signin-response.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity, { nullable: false })
  async signup(@Args() args: SignUpDto) {
    const result = await this.authService.signup(args);
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => SignInResponseDto, { nullable: false })
  async login(@Args() args: SignInDto) {
    console.log('signin', args);
    const result = await this.authService.signin(args);
    return result;
  }

}

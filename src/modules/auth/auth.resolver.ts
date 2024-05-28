import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { SignInDto } from 'src/dtos/auth/signin.dto';
import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { SignInResponseDto } from 'src/dtos/auth/signin-response.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity, { nullable: false })
  async signup(@Args() args: SignUpDto) {
    const result = await this.authService.signup(args);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SignInResponseDto, { nullable: false })
  async signin(@Args() args: SignInDto) {
    const result = await this.authService.signin(args);
    return result;
  }

}

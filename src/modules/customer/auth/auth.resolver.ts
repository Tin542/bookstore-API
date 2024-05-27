import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { SignUpDto } from "src/dtos/auth/signup.dto";
import { UserEntity } from "src/entities/user.entity";
import { AuthService } from "src/shared/services/auth/auth.service";

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  
  @Mutation(() => UserEntity, { nullable: false })
  async registerUser(@Args() args: SignUpDto) {
    try {
      const result = await this.authService.signup(args);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to signup user',);
    }
  }
}
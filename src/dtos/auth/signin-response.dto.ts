
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class SignInResponseDto {
  @IsString()
  @Field(() => String)
  accessToken: string;
}

import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

@ArgsType()
export class SignUpDto {
  @IsString()
  @Field(() => String)
  fullName: string;

  @IsString()
  @Field(() => String)
  address: string;

  @IsEmail({}, {message: 'Email is invalid'})
  @Field(() => String)
  email: string;

  @Field(() => String)
  @IsString()
  phoneNumber: string;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @MinLength(6)
  password: string;

  @Field(() => String)
  @IsString()
  avatar?: string;
}

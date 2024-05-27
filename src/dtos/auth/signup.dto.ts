import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';

@ArgsType()
export class SignUpDto {
  @IsString()
  @Field(() => String, { nullable: true })
  fullName: string;

  @IsString()
  @Field(() => String, { nullable: true })
  address: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  @IsString()
  username: string;

  @Field(() => String, { nullable: true })
  @MinLength(6)
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  avatar?: string;
}

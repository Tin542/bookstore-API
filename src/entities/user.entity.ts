import { User } from '@prisma/client';
import { BookEntity } from './book.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@ObjectType()
export class UserEntity {
    @Field(() => String)
  id: User['id'];

  @Field(() => String)
  email: User['email'];

  @Field(() => String)
  useranme: User['useranme'];

  @Field(() => String)
  password: User['password'];

  @Field(() => Boolean)
  isActive: User['isActive'];

  @Field(() => String)
  phoneNumber: User['phoneNumber'];

  @Field(() => String)
  address: User['address'];

  @Field(() => String)
  avatar: User['avatar'];

  @Field(() => String, {nullable: true})
  refreshToken: User['refreshToken'];

  @Field(() => Date)
  createdAt: User['createdAt'];

  @Field(() => Date)
  updatedAt: User['updatedAt'];
}

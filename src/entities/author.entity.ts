import { Author } from '@prisma/client';
import { BookEntity } from './book.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorEntity implements Author {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

}

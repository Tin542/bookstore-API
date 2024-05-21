import { Author } from '@prisma/client';
import { BookEntity } from './book.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@ObjectType()
export class AuthorEntity implements Author {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return format(date, 'dd/MM/yyyy');
      }
    }
    return value;
  })
  @Field(() => Date)
  createdAt: Date;

  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return format(date, 'dd/MM/yyyy');
      }
    }
    return value;
  })
  @Field(() => Date)
  updatedAt: Date;

}

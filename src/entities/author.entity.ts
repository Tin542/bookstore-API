import { Author } from '@prisma/client';
import { BookEntity } from './book.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@ObjectType()
export class AuthorEntity {
  @Field(() => String)
  id: Author['id'];

  @Field(() => String)
  name: Author['name'];

  @Field(() => Boolean)
  isActive: Author['isActive'];

  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return format(date, 'dd/MM/yyyy');
      }
    }
    return value;
  })
  @Field(() => String)
  createdAt: Author['createdAt'];

  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return format(date, 'dd/MM/yyyy');
      }
    }
    return value;
  })
  @Field(() => String)
  updatedAt: Author['updatedAt'];

}

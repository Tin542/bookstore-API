import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Review } from '@prisma/client';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@ObjectType()
export class ReviewEntity {
  @Field(() => String)
  id: Review['id'];

  @Field(() => String)
  content: Review['content'];

  @Field(() => Int)
  rate: Review['rate'];

  @Field(() => String)
  userId: Review['userId'];

  @Field(() => String)
  bookId: Review['bookId'];

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
  createdAt: Review['createdAt'];

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
  updatedAt: Review['updatedAt'];
}

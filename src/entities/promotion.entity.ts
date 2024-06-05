import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Promotion } from '@prisma/client';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';
import * as moment from "moment"; 

import { BookEntity } from './book.entity';

@ObjectType()
export class PromotionEntity {
  @Field(() => String)
  id: Promotion['id'];

  @Field(() => String)
  description: Promotion['description'];

  @Field(() => Boolean)
  isActive: Promotion['isActive'];

  @Field(() => Int)
  discountPercents: Promotion['discountPercents'];

  @Field(() => [BookEntity])
  book: BookEntity[];

  @Field(() => String)
  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return moment(date).format("MM/DD/YYYY");
      }
    }
    return value;
  })
  startDate: Promotion['startDate'];

  @Field(() => String)
  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return moment(date).format("MM/DD/YYYY");
      }
    }
    return value;
  })
  expriedDate: Promotion['expriedDate'];

  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return moment(date).format("MM/DD/YYYY");
      }
    }
    return value;
  })
  @Field(() => String)
  createdAt: Promotion['createdAt'];

  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return moment(date).format("MM/DD/YYYY");
      }
    }
    return value;
  })
  @Field(() => String)
  updatedAt: Promotion['updatedAt'];
}

import { Field, Int, ArgsType } from '@nestjs/graphql';
import {
    IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

@ArgsType()
export class FilterReviewDto {
    @Field(() => [Int], { nullable: true })
    @IsArray()
    @IsOptional()
    rate?: number[];

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

import { InputType, Field, Int, ArgsType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class FilterBookDto {
  @Field(() => String,{ nullable: true })
  @IsString()
  title?: string;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  rate?: number[];

  @Field(() => [String],{ nullable: true })
  @IsArray()
  author?: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  category?: string[];

  @Field(() => Boolean, { nullable: true , defaultValue: true})
  @IsBoolean()
  isActive?: boolean

  @Field(() => Int, { nullable: true })
  @IsNumber()
  page?: number;

  @Field(() => Int,{ nullable: true })
  @IsNumber()
  limit?: number;
}

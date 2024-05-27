import { InputType, Field, Int, ArgsType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FilterBookDto {
  @Field(() => String,{ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  rate?: number[];

  @Field(() => [String],{ nullable: true })
  @IsArray()
  @IsOptional()
  author?: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  category?: string[];

  @Field(() => Boolean, { nullable: true , defaultValue: true})
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  page?: number;

  @Field(() => Int,{ nullable: true })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FilterBookDto {
  @Field({ nullable: true })
  title?: string;

  @Field(type => Int, { nullable: true })
  rate?: number;

  @Field(type => [String],{ nullable: true })
  author?: string[];

  @Field(type => [String], { nullable: true })
  category?: string[];

  @Field(type => Int, { nullable: true })
  page?: number;

  @Field(type => Int,{ nullable: true })
  limit?: number;
}

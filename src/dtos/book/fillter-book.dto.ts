import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FilterBookDto {
  @Field(type =>  String, { nullable: true })
  title?: string;

  @Field(type =>  Int, { nullable: true })
  rate?: number;

  @Field(type =>  [String], { nullable: true })
  category?: string[];

  @Field(type =>  [String], { nullable: true })
  author?: string[];

  @Field(type =>  Int, { nullable: true })
  page?: number;

  @Field(type =>  Int, { nullable: true })
  limit?: number;
}

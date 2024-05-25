import { InputType, Field, Int, ArgsType } from '@nestjs/graphql';

@InputType()
export class FilterBookDto {
  @Field(() => String,{ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  rate?: number;

  @Field(() => [String],{ nullable: true })
  author?: string[];

  @Field(() => [String], { nullable: true })
  category?: string[];

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int,{ nullable: true })
  limit?: number;
}

// @ArgsType()
// export class getBookArgs {
//   @Field(() => String,{ nullable: true })
//   title?: string;

//   @Field(() => Int, { nullable: true })
//   rate?: number;

//   @Field(() => [String],{ nullable: true })
//   author?: Array<string>;

//   @Field(() => [String], { nullable: true })
//   category?: Array<string>;

//   @Field(() => Int, { nullable: true })
//   page?: number;

//   @Field(() => Int,{ nullable: true })
//   limit?: number;
// }

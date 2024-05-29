import { InputType, Field, Int, ArgsType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class CreateCartDto {
  @Field(() => [String])
  @IsNotEmpty({message: "bookId is not empty"})
  @IsArray({message: 'bookId must be an array'})
  bookId: [string];

  @Field(() => String)
  @IsNotEmpty({message: "userId is not empty"})
  @IsString({message: 'userId must be a string'})
  userId: string;

  @Field(() => Number)
  @IsNotEmpty({message: "quantity is not empty"})
  @IsNumber({}, {message: 'quantity must be an integer'})
  quantity: number;

  @Field(() => Number)
  @IsNotEmpty({message: "price is not empty"})
  @IsNumber({}, {message: 'price must be number'})
  price: number;

}

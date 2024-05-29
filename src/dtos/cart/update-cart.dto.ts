import { Field, ArgsType, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ArgsType()
export class UpdateCartItemDto {
  @Field(() => String)
  @IsNotEmpty({message: "id is not empty"})
  id: string;

  @Field(() => Float)
  @IsNotEmpty({message: "quantity is not empty"})
  @IsNumber({}, {message: 'quantity must be an integer'})
  quantity: number;

}

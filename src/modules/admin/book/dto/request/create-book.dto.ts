import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString({message: 'Title must be string'})
  @IsNotEmpty({message: 'Title must not empty'})
  title: string;

  @IsString({message: 'Description must be string'})
  description: string;

  @IsNumber()
  @IsNotEmpty({message: 'Price must not empty'})
  price: number;

  @IsNumber()
  @IsNotEmpty({message: 'Rate must not empty'})
  rate: number;

  @IsNumber()
  @IsNotEmpty({message: 'Quantity must not empty'})
  quantity: number;

  @IsString()
  imageUrl: string;

  @IsString()
  @IsNotEmpty({message: 'category must not empty'})
  category: string;

  @IsNotEmpty({message: 'Author must not empty'})
  author: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}

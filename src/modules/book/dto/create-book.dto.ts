import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString({message: 'Title must be string'})
  @IsNotEmpty({message: 'Title must not empty'})
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsString({message: 'Description must be string'})
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({message: 'Price must not empty'})
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({message: 'Rate must not empty'})
  rate: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({message: 'Quantity must not empty'})
  quantity: number;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({message: 'category must not empty'})
  category: string;

  @ApiProperty({isArray: true, type: "array"})
  @IsNotEmpty({message: 'Author must not empty'})
  author: string[];

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  updatedAt: Date;
}

import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsNumber()
    @IsNotEmpty()
    rate: number;
  
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
  
    @IsString()
    @IsNotEmpty()
    category: string;
  
    @IsNotEmpty()
    author: string;
  
    @IsNotEmpty()
    updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class ResponseBookDto {

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  category: string;

  @ApiProperty({isArray: true, type: "array"})
  author: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

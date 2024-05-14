import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'Title of the book' })
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)  // Transform string to number
  @ApiProperty({ required: false, type: Number, description: 'Minimum price of the book' })
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)  // Transform string to number
  @ApiProperty({ required: false, type: Number, description: 'Maximum price of the book' })
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)  // Transform string to number
  @ApiProperty({ required: false, description: 'Rating of the book' })
  rate?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ required: false, isArray: true, type: String, description: 'list category id' })
  category?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ required: false, isArray: true, type: String, description: 'list author id' })
  author?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)  // Transform string to number
  @ApiProperty({ required: false, description: 'Current page', default: 1})
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)  // Transform string to number
  @ApiProperty({ required: false, description: 'Number of items per page', default: 5})
  limit?: number;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  @ApiProperty({ required: false, description: 'Sort order', enum: ['asc', 'desc']})
  sortByCreateDate?: Prisma.SortOrder;
}

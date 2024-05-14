import { ApiProperty } from '@nestjs/swagger';

export class FillterBookDto {
  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false, type: 'number' })
  minPrice: number;

  @ApiProperty({ required: false, type: 'number' })
  maxPrice: number;

  @ApiProperty({ required: false })
  rate: number;

  @ApiProperty({ isArray: true, type: 'array', required: false })
  category: string[];

  @ApiProperty({ isArray: true, type: 'array', required: false })
  author: string[];
}

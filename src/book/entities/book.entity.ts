import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { Transform } from 'class-transformer';

export class BookEntity {
  @ApiProperty()
  id: string;

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

  // @ApiProperty()
  // category: string;

  // @ApiProperty()
  // author: [AuthorEntity];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

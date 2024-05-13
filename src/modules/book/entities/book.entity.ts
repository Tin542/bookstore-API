import { ApiProperty } from '@nestjs/swagger';
import { AuthorEntity } from 'src/modules/author/entities/author.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

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

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  category: CategoryEntity;

  @ApiProperty()
  author: AuthorEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

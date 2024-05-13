import { ApiProperty } from '@nestjs/swagger';
import { AuthorEntity } from 'src/entities/author.entity';
import { CategoryEntity } from 'src/entities/category.entity';

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
  quantity: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  categoryId: string;

  // @ApiProperty()
  // category: CategoryEntity;

  // @ApiProperty({isArray: true, })
  // author: AuthorEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

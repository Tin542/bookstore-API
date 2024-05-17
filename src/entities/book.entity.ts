import { ApiProperty } from '@nestjs/swagger'
import { Book, Category } from '@prisma/client';
import { CategoryEntity } from './category.entity';
import { AuthorEntity } from './author.entity';

export class BookEntity implements Book {
  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial); // Copy properties from partial object to entity Instance
  }
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

  @ApiProperty({ required: false })
  isActive: boolean;

  @ApiProperty()
  categoryId: string;

  @ApiProperty({ required: false })
  authorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({required: false, type: CategoryEntity})
  category?: CategoryEntity;

  @ApiProperty({required: false, type: CategoryEntity})
  authors?: AuthorEntity
}

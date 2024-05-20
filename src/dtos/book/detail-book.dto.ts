import {} from 'class-transformer'
import { AuthorEntity } from "src/entities/author.entity";
import { Category } from "src/entities/category.entity";

export class DetailBookDto {
  id: string;
  title: string;
  description: string;
  price: number;
  rate: number;
  quantity: number;
  imageUrl: string;
  categoryId: string;
  category: Category;
  authors: AuthorEntity;
  createdAt: Date;
  updatedAt: Date;
}

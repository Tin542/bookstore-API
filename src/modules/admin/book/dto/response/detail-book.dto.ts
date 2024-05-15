import { BookAuthor } from "@prisma/client";
import {} from 'class-transformer'
import { AuthorEntity } from "src/entities/author.entity";
import { BookAuthorEntity } from "src/entities/book_author.entity";
import { CategoryEntity } from "src/entities/category.entity";

export class DetailBookDto {
  id: string;
  title: string;
  description: string;
  price: number;
  rate: number;
  quantity: number;
  imageUrl: string;
  categoryId: string;
  category: CategoryEntity;
  authors: BookAuthorEntity[];
  createdAt: Date;
  updatedAt: Date;
}

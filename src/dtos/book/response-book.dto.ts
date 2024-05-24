import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { BookEntity } from 'src/entities/book.entity';

@ObjectType()
export class ResponseBookDto {
    @Field(type =>  [BookEntity])
    data: [BookEntity];
    
    @Field(type =>  Number)
    pages: Number;

    @Field(type =>  Number)
    currentPage: Number;
}

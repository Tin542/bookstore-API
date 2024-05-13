import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/shared/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/shared/global/globalEnum';
import { AuthorEntity } from './entities/author.entity';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<ResponseData<AuthorEntity>> {
    const result = await this.authorService.create(createAuthorDto);
    return new ResponseData<AuthorEntity>( HttpMessage.SUCCESS, HttpStatus.SUCCESS, result);
  }

  @Get()
  async findAll(): Promise<ResponseData<AuthorEntity>> {
    try {
      const result = await this.authorService.findAll();
      return new ResponseData<AuthorEntity>( HttpMessage.SUCCESS, HttpStatus.SUCCESS, result);
    } catch (error) {
      
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}

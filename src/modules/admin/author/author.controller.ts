import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { Moment } from 'moment';
import { AuthorService } from '../../../shared/services/author/author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ResponseData } from 'src/shared/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/shared/global/globalEnum';
import { AuthorEntity } from '../../../entities/author.entity';
@Controller('admin/author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<ResponseData<AuthorEntity>> {
    try {
      const result = await this.authorService.create(createAuthorDto);
      return new ResponseData<AuthorEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<AuthorEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        error,
      );
    }
  }

  @Get()
  @Render('adminPage')
  async findAll(@Req() req: Request, @Res() res: Response) {
    const result = await this.authorService.findAll();
    return { data: result, module: 'author' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData<AuthorEntity>> {
    try {
      const result = await this.authorService.findOne(id);
      if (!result) {
        return new ResponseData<AuthorEntity>(
          HttpMessage.NOT_FOUND,
          HttpStatus.NOT_FOUND,
          result,
        );
      }
      return new ResponseData<AuthorEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<AuthorEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        null,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<ResponseData<AuthorEntity>> {
    try {
      const author = await this.authorService.findOne(id);
      if (!author) {
        return new ResponseData<AuthorEntity>(
          HttpMessage.NOT_FOUND,
          HttpStatus.NOT_FOUND,
          null,
        );
      }
      const result = await this.authorService.update(id, updateAuthorDto);
      return new ResponseData<AuthorEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<AuthorEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        null,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const author = await this.authorService.findOne(id);
      if (!author) {
        return new ResponseData<AuthorEntity>(
          HttpMessage.NOT_FOUND,
          HttpStatus.NOT_FOUND,
          null,
        );
      }
      const result = await this.authorService.remove(id);
      return new ResponseData<AuthorEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<AuthorEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        null,
      );
    }
  }
}

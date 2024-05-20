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
import { AuthorService } from '../../../shared/services/author/author.service';
import { CreateAuthorDto } from '../../../dtos/author/create-author.dto';
import { UpdateAuthorDto } from '../../../dtos/author/update-author.dto';
import { AuthorEntity } from '../../../entities/author.entity';
@Controller('admin/author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    try {
      
    } catch (error) {
      return { errMessage: error };
    }
  }

  @Get()
  @Render('adminPage')
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authorService.findAll();
      return { data: result, module: 'author' };
    } catch (error) {
      return { errMessage: error };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
   return 'find one'
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ){
    return 'update'
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return 'remove';
  }
}

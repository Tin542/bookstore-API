import {
  Controller,
  Get,
  Logger,
  Render,
  Req,
  Query,
  Post,
  Res,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PromotionService } from 'src/shared/services/promotion/promotion.service';
import { CreatePromotionDto } from 'src/dtos/promotion/create-promotion.dto';
import { BookService } from 'src/shared/services/book/book.service';
import {
  FilterPromotionDto,
  statusPromotion,
} from 'src/dtos/promotion/filter-promotion.dto';
import { AboutService } from 'src/shared/services/about/about.service';

@Controller('admin/about')
export class AboutController {
  private readonly logger = new Logger(AboutController.name);
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @Render('adminPage')
  async loadAboutPage(@Req() req: Request) {
    return {
      module: 'about',
      message: 'HELLO WORLD'
    };
  }

  @Post('submit')
  @Render('index')
  submitContent(@Body() body) {
    const content = body.content;
    // Bạn có thể lưu hoặc xử lý nội dung tại đây
    console.log(content);
    return { message: content };
  }
}

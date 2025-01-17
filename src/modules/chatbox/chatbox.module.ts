// src/chatbot/chatbot.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotService } from './service/chatbox.service';
import { ChatbotController } from './controller/chatbox.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AboutRepository } from 'src/shared/services/about/about.repository';
import { AboutService } from 'src/shared/services/about/about.service';
import { BookRepository } from 'src/shared/services/book/book.repository';
import { BookService } from 'src/shared/services/book/book.service';
import { ReviewsRepository } from 'src/shared/services/review/review.repository';
import { ReviewService } from 'src/shared/services/review/review.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [
    ChatbotService,
    AboutRepository,
    AboutService,
    BookRepository,
    BookService,
    ReviewsRepository,
    ReviewService
  ],
  controllers: [ChatbotController],
})
export class ChatbotModule {}

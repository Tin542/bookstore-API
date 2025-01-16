// src/chatbot/chatbot.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotService } from './service/chatbox.service';
import { ChatbotController } from './controller/chatbox.controller';

@Module({
  imports: [ConfigModule],
  providers: [ChatbotService],
  controllers: [ChatbotController],
})
export class ChatbotModule {}

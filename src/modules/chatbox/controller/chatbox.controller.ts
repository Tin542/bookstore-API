// src/chatbot/chatbot.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from '../service/chatbox.service';
import { AboutService } from 'src/shared/services/about/about.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService, private aboutService: AboutService) {}

  @Post('message')
  async sendMessage(@Body('message') message: string) {
    const response = await this.chatbotService.getChatResponse(message);
    return { response };
  }
}

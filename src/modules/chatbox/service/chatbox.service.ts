import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { AboutService } from 'src/shared/services/about/about.service';
import { BookService } from 'src/shared/services/book/book.service';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;

  constructor(private readonly bookService: BookService) {
    this.openai = new OpenAI({
      apiKey: process.env.CHATBOX_API_KEY,
      organization: process.env.CHATBOX_ORGANIZATION,
    });
    
  }

  async getChatResponse(message: string): Promise<string> {
    // 1. Trích xuất từ khóa từ câu hỏi
    const keywords = this.extractKeywords(message);
  
    // // 2. Tìm sách theo từ khóa trong cơ sở dữ liệu
    if (keywords.length > 0) {
      const books = await this.bookService.findBooksByKeywords(keywords);
  
      if (books.length > 0) {
        const bookList = books
          .map((book) => `- ${book.title} (${book.price} USD)`)
          .join('\n');
        return `Here are some books I found:\n${bookList}`;
      }
    }
  
    // 3. Nếu không tìm thấy trong cơ sở dữ liệu, gọi OpenAI để trả lời
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are smart assistants of this website: https://bookstore-tinnt.vercel.app/home`
        },
        { role: 'user', content: message },
      ],
    });
  
    return (
      response.choices[0]?.message?.content ||
      'Xin lỗi, tôi không thể trả lời câu hỏi này.'
    );
  }
  

  private extractKeywords(question: string): string[] {
    const stopWords = ['tôi', 'muốn', 'có', 'gợi ý', 'cho', 'về', 'sách', 'thể loại', 'tìm', 'một'];
    const words = question
      .toLowerCase()
      .replace(/[.,!?]/g, '') // Loại bỏ dấu câu
      .split(' ')
      .filter((word) => !stopWords.includes(word));
    return words;
  }
}

import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class ChatbotService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION_ID,
    });

    this.openai = new OpenAIApi(configuration);
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      return response.data.choices[0]?.message?.content || "No response available.";
    } catch (error) {
      if (error.response?.status === 401) {
        return "Unauthorized: Please check your API key.";
      }
      throw error;
    }
  }
}

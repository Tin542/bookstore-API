import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { BookService } from 'src/shared/services/book/book.service';
import { bookFunction } from '../functions';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;

  constructor(private readonly bookService: BookService) {
    this.openai = new OpenAI({
      apiKey: process.env.CHATBOX_API_KEY,
      organization: process.env.CHATBOX_ORGANIZATION,
    });
  }

  private async createAssistantIfNeeded() {
    try {
      // Check if the assistant already exists
      const existingAssistants = await this.openai.beta.assistants.list();
      const existingAssistant = existingAssistants.data.find(
        (assistant) => assistant.name === 'Bookstore Assistant',
      );

      if (existingAssistant) {
        console.log('Assistant already exists');
        return existingAssistant; // Return the existing assistant if found
      }

      // If not found, create a new assistant
      const assistant = await this.createAssistant();

      console.log('New assistant created');
      return assistant;
    } catch (error) {
      console.error('Error creating assistant:', error);
    }
  }

  private async createAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
    // Create assistant
    console.log('Creating new assitant...');
    const assistant = await this.openai.beta.assistants.create({
      name: 'Bookstore Assistant',
      instructions:
        'You are a ChatBot to be implemented on a website of our organization that handles customer support questions with given knowledge.',
      tools: [{ type: 'function', function: bookFunction }],
      model: 'gpt-3.5-turbo',
    });
    return assistant;
  }

  private async createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    console.log('Creating a new thread...');
    const thread = await this.openai.beta.threads.create();
    return thread;
  }

  private async addMessage(
    threadId: string,
    message: string,
  ): Promise<OpenAI.Beta.Threads.Messages.Message> {
    console.log('Adding a new message to thread');
    const response = await this.openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });
    return response;
  }

  private async runAssistant(
    threadId: string,
    assistantId: string,
  ): Promise<any> {
    console.log('Running assistant for thread');
    const response = await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    return response;
  }

  // private async handleRequiresAction(
  //   threadId: string,
  //   run: OpenAI.Beta.Threads.Runs.Run,
  // ): Promise<string> {
  //   // Check if there are tools that require outputs
  //   if (
  //     run.required_action &&
  //     run.required_action.submit_tool_outputs &&
  //     run.required_action.submit_tool_outputs.tool_calls
  //   ) {
  //     // Loop through each tool in the required action section
  //     const findAllbook = await this.bookService.findAllWithoutPagination('');
  //     const toolOutputs =
  //       run.required_action.submit_tool_outputs.tool_calls.map((tool) => {
  //         if (tool.function.name === 'FindAllBooks') {
  //           return {
  //             tool_call_id: tool.id,
  //             output: JSON.stringify(findAllbook),
  //           };
  //         }
  //       });

  //     // Submit all tool outputs at once after collecting them in a list
  //     if (toolOutputs.length > 0) {
  //       run = await this.openai.beta.threads.runs.submitToolOutputsAndPoll(
  //         threadId,
  //         run.id,
  //         { tool_outputs: toolOutputs },
  //       );
  //       console.log('Tool outputs submitted successfully.');
  //     } else {
  //       console.log('No tool outputs to submit.');
  //     }

  //     // // Check status after submitting tool outputs

  //     const runObject = await this.openai.beta.threads.runs.retrieve(
  //       threadId,
  //       run.id,
  //     );

  //     if(runObject.status == "completed") {
  //       const messagesList = await this.openai.beta.threads.messages.list(
  //         threadId,
  //         {
  //           order: 'desc',
  //         },
  //       );
  //       let message = '';
  //       if (messagesList.data[0].content[0].type === 'text') {
  //         message = messagesList.data[0].content[0].text.value;
  //       }
  //       return message;
  //     }

  //     // let response: string = '';
  //     // const pollingInterval = setInterval(async () => {
  //     //   const messages = await this.checkingStatus(threadId, run.id);
  //     //   if (messages) {
  //     //     response = messages;
  //     //     clearInterval(pollingInterval); // Stop polling once messages are retrieved
  //     //   }
  //     // }, 1000);

  //     // return new Promise((resolve) => {
  //     //   const waitForResponse = setInterval(() => {
  //     //     if (response.length > 0) {
  //     //       clearInterval(waitForResponse);
  //     //       resolve(response);
  //     //     }
  //     //   }, 100); // Check every 100ms if response is ready
  //     // });
  //   }
  // }

  private async checkingStatus(
    threadId: string,
    runId: string,
  ): Promise<string> {
    const runObject = await this.openai.beta.threads.runs.retrieve(
      threadId,
      runId,
    );

    const status = runObject.status;
    console.log('Current status: ' + status);

    if (status == 'completed') {
      const messagesList = await this.openai.beta.threads.messages.list(
        threadId,
        {
          order: 'desc',
        },
      );
      let message = '';
      if (messagesList.data[0].content[0].type === 'text') {
        message = messagesList.data[0].content[0].text.value;
      }
      return message;
    } 
    // else if (status == 'requires_action') {
    //   return await this.handleRequiresAction(threadId, runObject);
    // } 
    else {
      console.error('Run did not complete:', runObject);
    }
  }

  async getChatResponse(message: string): Promise<string> {
    const assistant = await this.createAssistantIfNeeded();
    const thread = await this.createThread();
    await this.addMessage(thread.id, message);
    const run = await this.runAssistant(thread.id, assistant.id);

    let response: string = '';
    const pollingInterval = setInterval(async () => {
      const messages = await this.checkingStatus(thread.id, run.id);
      if (messages) {
        response = messages;
        clearInterval(pollingInterval); // Stop polling once messages are retrieved
      }
    }, 1000);

    return new Promise((resolve) => {
      const waitForResponse = setInterval(() => {
        if (response.length > 0) {
          clearInterval(waitForResponse);
          resolve(response);
        }
      }, 100); // Check every 100ms if response is ready
    });
  }
}

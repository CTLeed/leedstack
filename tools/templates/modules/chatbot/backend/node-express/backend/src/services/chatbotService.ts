interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatbotService {
  private openaiApiKey: string | undefined;
  private anthropicApiKey: string | undefined;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  }

  async generateResponse(message: string, history: ChatMessage[]): Promise<string> {
    // Try LLM providers in order of preference
    if (this.anthropicApiKey) {
      return this.generateAnthropicResponse(message, history);
    }

    if (this.openaiApiKey) {
      return this.generateOpenAIResponse(message, history);
    }

    // Fallback to basic rule-based responses
    return this.generateBasicResponse(message);
  }

  private async generateOpenAIResponse(message: string, history: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful assistant for this web application. Be concise and friendly.' },
            ...history.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || this.generateBasicResponse(message);
    } catch (error) {
      console.error('OpenAI error:', error);
      return this.generateBasicResponse(message);
    }
  }

  private async generateAnthropicResponse(message: string, history: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.anthropicApiKey!,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 500,
          system: 'You are a helpful assistant for this web application. Be concise and friendly.',
          messages: [
            ...history.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.content[0]?.text || this.generateBasicResponse(message);
    } catch (error) {
      console.error('Anthropic error:', error);
      return this.generateBasicResponse(message);
    }
  }

  private generateBasicResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Greeting patterns
    if (/(hello|hi|hey|greetings)/i.test(lowerMessage)) {
      return "Hello! I'm here to help. You can ask me questions about this application or configure me with an AI API key for more advanced responses.";
    }

    // Help patterns
    if (/(help|what can you do|how do you work)/i.test(lowerMessage)) {
      return "I can answer questions and assist you with this application. Currently, I'm running in basic mode. To unlock AI-powered responses, add OPENAI_API_KEY or ANTHROPIC_API_KEY to your backend .env file.";
    }

    // Feature questions
    if (/(feature|what|how)/i.test(lowerMessage)) {
      return "This is a full-stack web application with authentication, database integration, and more. Feel free to explore the codebase or ask me specific questions!";
    }

    // API/Configuration questions
    if (/(api|configure|setup|install)/i.test(lowerMessage)) {
      return "To configure AI responses:\n\n1. Get an API key from OpenAI or Anthropic\n2. Add it to backend/.env:\n   OPENAI_API_KEY=sk-...\n   or\n   ANTHROPIC_API_KEY=sk-ant-...\n3. Restart the backend\n\nThen I'll be powered by AI!";
    }

    // Thanks/Goodbye
    if (/(thank|thanks|bye|goodbye)/i.test(lowerMessage)) {
      return "You're welcome! Let me know if you need anything else.";
    }

    // Default fallback
    return "I received your message! I'm currently in basic mode with limited responses. For more intelligent conversations, configure an AI API key (OpenAI or Anthropic) in your backend environment variables.";
  }
}

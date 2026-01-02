# Chatbot Module

The chatbot module adds an AI-powered chat assistant to your application that **works immediately out-of-the-box** with basic responses and **upgrades automatically** when you add an AI API key.

## ✨ Features

### 🚀 Works Immediately (No API Key Required)
- Rule-based responses for common questions
- Helpful fallback messages
- Beautiful chat UI with animations
- Mobile responsive design
- No configuration needed to get started

### 🤖 AI-Powered Upgrade (Optional)
- Add OpenAI or Anthropic API key to unlock AI responses
- Automatic provider detection and fallback
- Context-aware conversations with message history
- Supports multiple AI providers:
  - **Anthropic Claude** (claude-3-5-haiku-20241022) - Preferred
  - **OpenAI GPT** (gpt-4o-mini) - Fallback

### 🎨 Beautiful UI
- Fixed floating chat button (bottom-right corner)
- Smooth animations and transitions
- Typing indicators
- Message history with proper formatting
- Gradient purple/blue theme
- Mobile-optimized

## 📦 Installation

Add the chatbot module when generating your project:

```bash
npx create-stack my-app --frontend react --backend node-express --db postgres chatbot
```

That's it! The chatbot is ready to use immediately.

## 🔧 Configuration

### Basic Mode (No Setup)

The chatbot works immediately with rule-based responses:

```bash
npm run dev
# Open http://localhost:5173
# Click the chat button (💬) in bottom-right corner
# Chat away!
```

### AI-Powered Mode (Optional Setup)

To unlock AI responses, add an API key to your backend `.env`:

#### Option 1: Anthropic Claude (Recommended)

```bash
# backend/.env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx...
```

Get your API key at: https://console.anthropic.com/

#### Option 2: OpenAI GPT

```bash
# backend/.env
OPENAI_API_KEY=sk-proj-xxxxx...
```

Get your API key at: https://platform.openai.com/api-keys

#### Restart Backend

After adding the API key:

```bash
cd backend
npm run dev  # or uvicorn app.main:app --reload (Python)
```

The chatbot will automatically detect the API key and start using AI responses! 🎉

## 💬 Usage

### Frontend

The chatbot is automatically added to your app:

**React/Vue/Next.js:**
- Floating chat button in bottom-right corner
- Click to open/close chat window
- Type message and press Send
- Messages appear with smooth animations

### Backend Endpoints

**POST /api/chatbot**

Request:
```json
{
  "message": "Hello!",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

Response:
```json
{
  "message": "Hi! How can I help you today?"
}
```

## 🛠️ Technical Details

### Architecture

**Frontend (React):**
- `components/Chatbot.jsx` - Main chat component
- `components/Chatbot.css` - Styling and animations
- Uses `apiFetch()` helper for API calls

**Backend (Node/Express):**
- `routes/chatbot.ts` - API endpoint
- `services/chatbotService.ts` - AI integration + fallback logic

**Backend (Python/FastAPI):**
- `app/routes/chatbot.py` - API endpoint
- `app/services/chatbot_service.py` - AI integration + fallback logic

### AI Provider Priority

The backend tries AI providers in this order:

1. **Anthropic Claude** (if `ANTHROPIC_API_KEY` is set)
   - Model: `claude-3-5-haiku-20241022`
   - Fast, intelligent, cost-effective

2. **OpenAI GPT** (if `OPENAI_API_KEY` is set)
   - Model: `gpt-4o-mini`
   - Fast, affordable, widely available

3. **Basic Responses** (fallback, always available)
   - Rule-based pattern matching
   - Helpful default messages
   - Works without any API key

### Fallback Behavior

If an AI provider fails (API error, rate limit, etc.), the backend automatically falls back to basic responses. Your chatbot **never breaks**!

## 🎯 Basic Response Examples

Without an API key, the chatbot responds intelligently to:

**Greetings:**
- "Hello", "Hi", "Hey" → Friendly greeting

**Help:**
- "Help", "What can you do?" → Explains features and how to upgrade to AI

**Features:**
- "What features?", "How does this work?" → Describes the application

**Configuration:**
- "How do I configure AI?", "Setup API" → Step-by-step AI configuration guide

**Thanks/Goodbye:**
- "Thanks", "Bye" → Polite farewell

**Default:**
- Any other message → Explains basic mode and how to upgrade

## 🚀 Production Deployment

### Environment Variables

**Backend .env (Optional):**
```bash
# Choose one or both (Anthropic is preferred)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx...
OPENAI_API_KEY=sk-proj-xxxxx...

# CORS (if frontend is on different domain)
FRONTEND_URL=https://yourapp.com
```

### Security Considerations

✅ **API keys are server-side only** - Never exposed to frontend
✅ **CORS properly configured** - Only your frontend can call the API
✅ **Graceful degradation** - Falls back to basic mode if API fails
✅ **No sensitive data** - Chat history not stored by default

### Cost Estimates

**Anthropic Claude Haiku:**
- Input: $0.25 per million tokens
- Output: $1.25 per million tokens
- ~$0.0001 per conversation (very cheap!)

**OpenAI GPT-4o-mini:**
- Input: $0.15 per million tokens
- Output: $0.60 per million tokens
- ~$0.00006 per conversation (even cheaper!)

💡 **Tip:** Start with basic mode, upgrade to AI when you need it.

## 📚 Examples

### Example Conversation (Basic Mode)

```
User: Hello
Bot: Hello! I'm here to help. You can ask me questions about this
     application or configure me with an AI API key for more advanced
     responses.

User: How do I configure AI?
Bot: To configure AI responses:

     1. Get an API key from OpenAI or Anthropic
     2. Add it to backend/.env:
        OPENAI_API_KEY=sk-...
        or
        ANTHROPIC_API_KEY=sk-ant-...
     3. Restart the backend

     Then I'll be powered by AI!
```

### Example Conversation (AI Mode)

```
User: What's the best way to structure my React components?
Bot: Here are some best practices for React component structure:

     1. Keep components small and focused
     2. Use functional components with hooks
     3. Separate presentational from container components
     4. Co-locate styles and tests with components

     Would you like specific examples for your project?
```

## 🎨 Customization

### Change Chat Button Position

Edit `Chatbot.css`:

```css
.chatbot-toggle {
  bottom: 24px;  /* Change this */
  right: 24px;   /* Change this */
}
```

### Change Theme Colors

Edit the gradient in `Chatbot.css`:

```css
.chatbot-toggle {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change to your brand colors */
}
```

### Customize System Prompt

Edit the chatbot service (`chatbotService.ts` or `chatbot_service.py`):

```typescript
// Node/Express
{
  role: 'system',
  content: 'You are a helpful assistant for MY CUSTOM APP. Be friendly!'
}
```

```python
# Python/FastAPI
"system": "You are a helpful assistant for MY CUSTOM APP. Be friendly!"
```

### Add More Basic Responses

Edit `generateBasicResponse()` in the chatbot service:

```typescript
if (/(pricing|cost|price)/i.test(lowerMessage)) {
  return "Our pricing starts at $9/month. Visit /pricing for details!";
}
```

## 🐛 Troubleshooting

### Chatbot button not showing

1. Check that `<Chatbot />` is imported in `App.jsx`
2. Check browser console for errors
3. Verify `Chatbot.css` is imported

### "Not allowed by CORS" error

1. Make sure backend is running on `http://localhost:8080`
2. Check `FRONTEND_URL` in backend `.env` if using custom port
3. Verify CORS origins in `index.ts` or `main.py`

### AI responses not working

1. Check API key is set in backend `.env`
2. Restart backend after adding API key
3. Check backend console for API errors
4. Verify API key is valid (test at provider's website)

### Chatbot says "encountered an error"

1. Check backend console for error details
2. Verify API key format is correct
3. Check API provider status page
4. Falls back to basic mode if error persists

## 📊 Analytics (Optional)

Track chatbot usage by adding logging:

**Backend (Node/Express):**
```typescript
// routes/chatbot.ts
router.post('/', async (req, res) => {
  const { message } = req.body;
  console.log('[Chatbot] User message:', message);

  const response = await chatbotService.generateResponse(message, history);
  console.log('[Chatbot] Bot response:', response);

  res.json({ message: response });
});
```

**Backend (Python/FastAPI):**
```python
# app/routes/chatbot.py
@router.post("")
async def chat(request: ChatRequest):
    print(f"[Chatbot] User message: {request.message}")

    response = await chatbot_service.generate_response(
        request.message, request.history
    )
    print(f"[Chatbot] Bot response: {response}")

    return {"message": response}
```

## 🎁 What's Included

Every project with the chatbot module gets:

✅ Beautiful floating chat UI
✅ Instant basic responses (no setup)
✅ Optional AI upgrade (OpenAI or Anthropic)
✅ Automatic provider detection and fallback
✅ Mobile responsive design
✅ Smooth animations and typing indicators
✅ CORS-protected API endpoint
✅ Context-aware conversations
✅ Graceful error handling

## 🔗 Related

- [QOL_FEATURES.md](./QOL_FEATURES.md) - Quality-of-life features
- [CONNECTIVITY.md](./CONNECTIVITY.md) - Frontend-backend connectivity
- [README.md](./README.md) - Main documentation

## 💡 Pro Tips

1. **Start Simple:** Use basic mode during development, add AI later
2. **Test Both Modes:** Make sure fallback responses are helpful
3. **Monitor Costs:** Set API usage alerts at provider dashboard
4. **Customize Prompts:** Tailor AI behavior to your app's domain
5. **Rate Limiting:** Consider adding rate limits for production
6. **User Feedback:** Add thumbs up/down for message quality

---

**Questions?** The chatbot can help! Just ask: "How do I configure AI?" 😊

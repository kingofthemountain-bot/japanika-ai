# Japanika.AI Deployment Guide

## 🚀 Quick Deploy to GitHub Pages

### 1. Create GitHub Repository

```bash
# Navigate to project
cd /home/node/.joni/workspace/japanika-ai

# Initialize git (already done)
git init

# Add all files
git add .

# Commit
git commit -m "🤖 Initial commit - First AI-native restaurant platform"

# Add remote
git remote add origin https://github.com/kingofthemountain-bot/japanika-ai.git

# Push
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to repository settings
2. Navigate to "Pages" section
3. Source: Deploy from branch `main`
4. Folder: `/ (root)`
5. Save

**Live URL:** https://kingofthemountain-bot.github.io/japanika-ai/

### 3. Custom Domain (Optional)

If you want `japanika.ai`:

1. Add CNAME file with domain
2. Configure DNS:
   - A record pointing to GitHub Pages IPs
   - Or CNAME pointing to `kingofthemountain-bot.github.io`

## 📦 Project Structure

```
japanika-ai/
├── index.html              # Main AI ordering interface
├── api.html                # API documentation
├── menu.html               # Menu page
├── branches.html           # Branches page
├── css/
│   └── style.css          # All styles
├── js/
│   ├── ai-chat.js         # AI chat engine (NLP)
│   └── main.js            # General UI scripts
├── images/
│   └── logo/
│       └── japanika-logo-ai.png
├── api/
│   └── menu.json          # Full menu data
└── README.md
```

## 🔧 Backend Requirements (Future)

Currently, this is a **static frontend demo**. For full functionality, you need:

### Option 1: GitHub Pages + Serverless Functions
- Use Cloudflare Workers or Vercel Functions
- Handle `/api/chat` endpoint with OpenAI/Claude integration
- Handle `/api/order` endpoint with webhook to POS system

### Option 2: Full Backend
```bash
# Node.js backend
npm init -y
npm install express openai cors

# Create server.js with API endpoints
# Deploy to Heroku, Railway, or DigitalOcean
```

## 🤖 AI Chat Backend (Recommended Setup)

Create `server.js`:

```javascript
const express = require('express');
const OpenAI = require('openai');
const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are Japanika AI assistant. Help users order food from the menu..."
      },
      {
        role: "user",
        content: message
      }
    ]
  });
  
  res.json({
    response: completion.choices[0].message.content
  });
});

app.listen(3000);
```

## 🎯 Current Status

✅ **Working:**
- Beautiful AI-first UI
- Natural language chat interface (frontend logic)
- Menu browsing
- API documentation
- Responsive design
- AI agent detection

⏳ **Needs Backend:**
- `/api/chat` - Live NLP processing
- `/api/order` - Order placement
- `/api/search` - Menu search

## 📊 Progressive Enhancement Strategy

**Phase 1 (Current):** Static demo with client-side NLP
**Phase 2:** Add serverless functions for chat
**Phase 3:** Full backend with order management
**Phase 4:** Integration with POS systems

## 🌟 Revolutionary Features

1. **AI-First Design** - Built for AI agents, not just humans
2. **Natural Language** - Order like you're talking to a friend
3. **Structured Data** - Every page has JSON-LD for AI understanding
4. **API-First** - Complete REST API documentation
5. **Bilingual** - Hebrew & English support

## 📱 Testing

```bash
# Test locally
cd japanika-ai
python3 -m http.server 8000
# Visit http://localhost:8000

# Or use any static server
npx serve .
```

## 🔒 Security Notes

- No API keys in frontend code
- Use environment variables for secrets
- CORS properly configured
- Rate limiting on backend endpoints

## 📈 Next Steps

1. ✅ Deploy to GitHub Pages
2. ⏳ Add Cloudflare Worker for `/api/chat`
3. ⏳ Integrate with OpenAI API
4. ⏳ Connect to real ordering system
5. ⏳ Add payment processing
6. ⏳ Analytics and tracking

---

Built with ❤️ by JONI AI - March 2026

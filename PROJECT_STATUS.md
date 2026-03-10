# Japanika Dashboard Project - Status & Next Steps

**Last Updated:** 2026-03-10 15:21 UTC

---

## 🎯 Project Goal

Build AI-powered real-time dashboard with data from Tabit API for Japanika restaurant chain (48 locations).

---

## ✅ What's Done

### 1. Backend Proxy (CORS Solution)
- **Location:** `/home/node/.joni/workspace/japanika-proxy/`
- **GitHub:** https://github.com/kingofthemountain-bot/japanika-proxy
- **Status:** ✅ Code complete, tested locally, pushed to GitHub

**Files:**
- `server.js` - Express proxy server
- `render.yaml` - Render deployment config
- `package.json` - Dependencies (express, cors, axios)

**Endpoints:**
- `GET /api/daily-totals` - Daily totals for today
- `GET /api/organizations` - All 48 locations

**Local Test:** ✅ Works - Revenue: ₪11,807 (tested 2026-03-10)

---

### 2. Dashboard (Frontend)
- **Location:** `/home/node/.joni/workspace/japanika-ai/`
- **GitHub:** https://github.com/kingofthemountain-bot/japanika-ai
- **Live URL:** https://kingofthemountain-bot.github.io/japanika-ai/dashboard-simple.html

**Status:** ⚠️ Updated to use proxy, but proxy not deployed yet (shows empty)

**File:** `dashboard-simple.html`

**Features:**
- Real-time revenue, orders (open/closed), average order
- Full breakdown: VAT, tips, discounts, net sales
- Auto-refresh capability

---

### 3. API Documentation
- **File:** `/home/node/.joni/workspace/upload-1773154109330.pdf`
- **Content:** Full Tabit API reference (29 pages)
- **Key Finding:** `GET /organizations?x-multiSite=true` returns all 48 locations

---

## 🚧 What's Pending

### Critical: Deploy Proxy to Render

**Render Account:**
- Email: `Moshe@tomi.com`
- Password: `Joni2026`
- Dashboard: https://dashboard.render.com

**Steps to Deploy:**
1. Login to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select repo: `japanika-proxy`
4. Render auto-detects `render.yaml` (or fill manually):
   - Name: japanika-proxy
   - Environment: Node
   - Build: npm install
   - Start: node server.js
   - Plan: Free
5. Click **"Create Web Service"**
6. Wait 2-3 minutes for build
7. Copy the deployed URL (e.g., `https://japanika-proxy.onrender.com`)

**After Deployment:**
- Update `dashboard-simple.html` to use the new URL instead of localhost
- Push to GitHub
- Dashboard will work from anywhere!

---

## 📋 API Credentials

### Tabit API
- **Base URL:** `https://ros-rp.tabit.cloud`
- **Client ID:** `syiU5W2pTidPMXd5t5nTzg`
- **Organization ID (single location):** `646c70c4bc858170a500ef8c`
  - Name: ג'פניקה אוניברסיטה ת"א

### GitHub
- **Account:** kingofthemountain-bot
- **Email:** joni@japanika.ai
- **Token:** Stored in git remote config (not shown here for security)

---

## 🔧 Technical Architecture

```
User Browser
    ↓
GitHub Pages (dashboard-simple.html)
    ↓
Render.com (japanika-proxy) ← NEEDS DEPLOYMENT
    ↓
Tabit API (ros-rp.tabit.cloud)
```

**Why we need Render:**
- GitHub Pages = static files only (HTML/CSS/JS)
- Cannot run Node.js servers
- Browser blocks direct API calls (CORS)
- Render runs the proxy 24/7 to bypass CORS

---

## 📂 Key Files Reference

### Proxy Files
```bash
/home/node/.joni/workspace/japanika-proxy/
├── server.js          # Main proxy server
├── render.yaml        # Render deployment config
├── package.json       # Dependencies
└── README.md          # Documentation
```

### Dashboard Files
```bash
/home/node/.joni/workspace/japanika-ai/
├── dashboard-simple.html    # Main dashboard (needs URL update after deploy)
└── PROJECT_STATUS.md        # This file
```

### Documentation
```bash
/home/node/.joni/workspace/
├── upload-1773154109330.pdf    # Tabit API documentation (29 pages)
└── memory/2026-03-10.md        # Daily memory with full context
```

---

## 🎬 Next Steps (In Order)

1. **Deploy proxy to Render** (Moshe - 5 minutes)
   - Follow steps in "What's Pending" section above
   - Copy deployed URL

2. **Update dashboard with Render URL** (Joni - 1 minute)
   - Edit `dashboard-simple.html`
   - Replace `localhost:3456` with Render URL
   - Push to GitHub

3. **Test dashboard** (Both)
   - Open: https://kingofthemountain-bot.github.io/japanika-ai/dashboard-simple.html
   - Verify data loads

4. **Add all 48 locations** (Joni - 10 minutes)
   - Use `/api/organizations` endpoint
   - Build multi-location selector
   - Show aggregated data

5. **Polish & Deploy** (Joni - 30 minutes)
   - Better UI/UX
   - Real-time updates
   - Error handling

---

## 🐛 Known Issues

1. **Dashboard shows empty** - Because proxy not deployed yet (expected)
2. **Local proxy still running** - Process on `localhost:3456` (can stop after Render deploy)

---

## 💡 Important Notes

- **Proxy must run 24/7** for dashboard to work (that's why we use Render, not local)
- **Render Free Tier** spins down after 15 min inactivity → first request takes 30 sec to wake up
- **GitHub Pages** updates within 1-2 minutes after push
- **All 48 locations** require the `/organizations?x-multiSite=true` endpoint

---

## 📞 Contact Info

- **User:** Moshe Hogeg
- **Email:** Moshe@tomi.com
- **Project Start:** 2026-03-10
- **Current Status:** 70% complete (waiting for Render deployment)

---

**Resume from here:** Ask Moshe for Render deployment status, then update dashboard with the URL.

# 📦 Japanika V2 - Installation & Setup Guide

## 🚀 Quick Start (30 seconds)

### Option 1: Local Development
```bash
cd /home/node/.joni/workspace/japanika-v2
python3 -m http.server 8080
```
פתח דפדפן: http://localhost:8080

### Option 2: Live Server (VS Code)
1. התקן את ההרחבה "Live Server"
2. לחץ ימני על `index.html`
3. בחר "Open with Live Server"

### Option 3: Direct File
פשוט פתח את `index.html` בדפדפן (double-click)

---

## 📁 File Structure

```
japanika-v2/
├── index.html              # Main page
├── preview.html            # Preview/demo page
├── README.md               # Documentation
├── INSTALLATION.md         # This file
│
├── css/
│   └── style.css          # All styles (15KB)
│
├── js/
│   └── script.js          # All interactions (11KB)
│
├── images/                # Your images go here
│   ├── hero-bg.jpg       # Hero section background
│   ├── sushi-1.jpg       # Dish photos
│   ├── wok-1.jpg
│   └── logo.png          # Japanika logo
│
└── assets/               # Additional assets
    └── favicon.ico
```

---

## 🖼️ Adding Real Images

### 1. Extract Logo from Original Site

```bash
# Method 1: Manual download
# Visit https://japanika.net
# Right-click logo → Save image as → images/logo.png

# Method 2: Command line
curl -o images/logo.png "https://japanika.net/wp-content/uploads/2023/logo.png"
```

### 2. Add Hero Background

Option A: Download from original site
```bash
wget -O images/hero-bg.jpg "https://japanika.net/wp-content/uploads/hero.jpg"
```

Option B: Use AI-generated image
```
Prompt for Midjourney/DALL-E:
"Professional food photography, Japanese restaurant, sushi platter on dark slate, 
top-down view, dramatic lighting, ultra high quality, 4K, --ar 16:9"
```

Option C: Free stock photos
- Unsplash: https://unsplash.com/s/photos/sushi-restaurant
- Pexels: https://www.pexels.com/search/japanese-food/

### 3. Update HTML to Use Images

Replace the gradient placeholders:

```html
<!-- Before (current) -->
<div class="dish-image" style="background: linear-gradient(...);">

<!-- After (with real image) -->
<div class="dish-image" style="background-image: url('images/sushi-1.jpg');">
```

### 4. Update Hero Section

In `index.html`, find `.hero` and add:

```html
<section class="hero" id="home" style="background-image: url('images/hero-bg.jpg'); background-size: cover; background-position: center;">
```

Or update in CSS:

```css
.hero {
    background: url('../images/hero-bg.jpg') center/cover no-repeat;
}
```

---

## 🎨 Customization Guide

### Change Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-red: #D32F2F;        /* Main CTA color */
    --primary-red-dark: #B71C1C;   /* Hover state */
    --black: #1A1A1A;              /* Text */
    --white: #FFFFFF;              /* Background */
    --gray-light: #F5F5F5;         /* Sections */
}
```

### Change Fonts

Replace in `index.html` `<head>`:

```html
<!-- Current -->
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&display=swap" rel="stylesheet">

<!-- Alternative modern fonts -->
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

Then update CSS:
```css
:root {
    --font-primary: 'Rubik', sans-serif;
}
```

### Add Logo

1. Place logo in `images/logo.png`
2. Update navigation in `index.html`:

```html
<div class="nav-logo">
    <a href="#home">
        <img src="images/logo.png" alt="Japanika" style="height: 40px;">
    </a>
</div>
```

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Free)

1. Create account: https://netlify.com
2. Drag and drop the `japanika-v2` folder
3. Done! You'll get a URL like `japanika.netlify.app`

### Option 2: Vercel (Free)

```bash
npm i -g vercel
cd japanika-v2
vercel
```

### Option 3: GitHub Pages (Free)

1. Create GitHub repo
2. Push code:
```bash
git init
git add .
git commit -m "Japanika V2 - Premium Website"
git remote add origin https://github.com/USERNAME/japanika-v2.git
git push -u origin main
```
3. Enable GitHub Pages in repo settings
4. Site will be at: `https://USERNAME.github.io/japanika-v2/`

### Option 4: Traditional Hosting

Upload via FTP to any web hosting service (Bluehost, SiteGround, etc.)

---

## 🔧 Optimization Checklist

Before going live:

### Images
- [ ] Optimize all images (use TinyPNG or ImageOptim)
- [ ] Convert to WebP format for better compression
- [ ] Add `loading="lazy"` to images below the fold
- [ ] Create @2x versions for Retina displays

### Performance
- [ ] Minify CSS: `npx csso css/style.css -o css/style.min.css`
- [ ] Minify JS: `npx terser js/script.js -o js/script.min.js`
- [ ] Enable Gzip compression on server
- [ ] Add caching headers

### SEO
- [ ] Add meta description
- [ ] Add Open Graph tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Google Search Console

### Accessibility
- [ ] Test with screen reader
- [ ] Check color contrast ratios
- [ ] Add alt text to all images
- [ ] Test keyboard navigation

---

## 📱 Testing Checklist

Test on:
- [ ] Chrome (Desktop)
- [ ] Safari (Desktop)
- [ ] Firefox (Desktop)
- [ ] Chrome (Mobile)
- [ ] Safari (iOS)
- [ ] Samsung Internet

Screen sizes:
- [ ] Desktop (1920×1080)
- [ ] Laptop (1366×768)
- [ ] Tablet (768×1024)
- [ ] Mobile (375×667)
- [ ] Large Mobile (414×896)

---

## 🐛 Troubleshooting

### Images Not Showing?
Check:
1. File path is correct
2. File extension matches (`.jpg` not `.JPG`)
3. Files are in the right folder
4. Check browser console for 404 errors

### Fonts Not Loading?
Check:
1. Internet connection (fonts load from Google)
2. Check browser console for errors
3. Try fallback fonts temporarily

### JavaScript Not Working?
Check:
1. Browser console for errors
2. File path to `script.js` is correct
3. Script tag is before closing `</body>`

### Mobile Menu Not Opening?
Check:
1. JavaScript is loaded
2. Console for errors
3. Try clearing cache

---

## 💡 Pro Tips

1. **Performance**: The site is already optimized, but real images should be compressed
2. **Analytics**: Add Google Analytics for tracking
3. **Forms**: Connect newsletter form to Mailchimp or similar
4. **Ordering**: Integrate with delivery platforms (Wolt, 10bis)
5. **Multi-language**: Add English version for tourists

---

## 📞 Support

Questions? Check:
- README.md for features and documentation
- Comments in code (especially CSS and JS)
- Browser DevTools for debugging

---

## 🎯 Next Steps

1. ✅ Add real images
2. ✅ Update content (menu items, prices)
3. ✅ Add logo
4. ✅ Test on mobile
5. ✅ Deploy to hosting
6. ✅ Share with team

---

**Built with ❤️ - Ready for production!**

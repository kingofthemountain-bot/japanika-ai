/**
 * Japanika.AI Main JavaScript
 * Handles UI interactions and navigation
 */

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});

// Detect AI Agent User-Agent
function detectAIAgent() {
    const userAgent = navigator.userAgent.toLowerCase();
    const aiAgents = [
        'bot', 'crawler', 'spider', 'agent',
        'gpt', 'claude', 'bard', 'chatgpt'
    ];
    
    for (const agent of aiAgents) {
        if (userAgent.includes(agent)) {
            return true;
        }
    }
    return false;
}

if (detectAIAgent()) {
    const notice = document.getElementById('ai-agent-notice');
    if (notice) {
        notice.style.display = 'block';
    }
    console.log('AI Agent detected. Welcome! API: /api/chat');
}

// Add structured data for better AI understanding
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Japanika.AI",
    "description": "First AI-native restaurant ordering platform",
    "servesCuisine": ["Japanese", "Asian Fusion", "Sushi"],
    "hasMenu": window.location.origin + "/api/menu.json",
    "acceptsReservations": false,
    "priceRange": "₪₪",
    "potentialAction": {
        "@type": "OrderAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": window.location.origin + "/api/order",
            "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
                "AI Agent Platform"
            ]
        }
    }
};

// Log for AI agents
console.log('🤖 Japanika.AI - AI-Native Restaurant Platform');
console.log('📚 API Documentation:', window.location.origin + '/api.html');
console.log('🍱 Menu JSON:', window.location.origin + '/api/menu.json');
console.log('💬 Chat Endpoint:', window.location.origin + '/api/chat');
console.log('📦 Structured Data:', structuredData);

/**
 * Japanika.AI Chat Engine
 * Natural Language Processing for food ordering
 * Designed for both AI agents and humans
 */

class JapanikaAI {
    constructor() {
        this.menuData = null;
        this.currentOrder = [];
        this.conversationHistory = [];
        this.loadMenu();
    }

    async loadMenu() {
        try {
            const response = await fetch('/api/menu.json');
            this.menuData = await response.json();
            console.log('Menu loaded:', this.menuData);
        } catch (error) {
            console.error('Failed to load menu:', error);
            // Fallback to embedded menu data
            this.menuData = this.getEmbeddedMenu();
        }
    }

    /**
     * Main NLP processor - understands natural language food requests
     */
    async processMessage(userMessage) {
        this.conversationHistory.push({ role: 'user', message: userMessage });

        // Intent detection
        const intent = this.detectIntent(userMessage);
        
        let response;
        switch(intent) {
            case 'order':
                response = await this.processOrder(userMessage);
                break;
            case 'menu_query':
                response = this.answerMenuQuestion(userMessage);
                break;
            case 'price_query':
                response = this.answerPriceQuestion(userMessage);
                break;
            case 'dietary':
                response = this.filterByDiet(userMessage);
                break;
            case 'branch':
                response = this.answerBranchQuestion(userMessage);
                break;
            case 'greeting':
                response = this.getGreeting();
                break;
            default:
                response = this.handleUnknown(userMessage);
        }

        this.conversationHistory.push({ role: 'bot', message: response });
        return response;
    }

    /**
     * Intent detection using keyword matching and patterns
     */
    detectIntent(message) {
        const msg = message.toLowerCase();

        // Order intent
        if (msg.match(/רוצה|אני רוצה|תן לי|להזמין|אזמין|הזמנה|I want|order|give me/i)) {
            return 'order';
        }

        // Menu query
        if (msg.match(/מה יש|תפריט|מנות|menu|what do you have|show me/i)) {
            return 'menu_query';
        }

        // Price query
        if (msg.match(/כמה עולה|מחיר|price|cost|how much/i)) {
            return 'price_query';
        }

        // Dietary restrictions
        if (msg.match(/טבעוני|צמחוני|vegan|vegetarian|gluten|ללא גלוטן|כשר/i)) {
            return 'dietary';
        }

        // Branch/location
        if (msg.match(/סניף|איפה|מיקום|כתובת|branch|location|where/i)) {
            return 'branch';
        }

        // Greeting
        if (msg.match(/^(שלום|היי|הי|hello|hi|hey)/i)) {
            return 'greeting';
        }

        return 'unknown';
    }

    /**
     * Process food order from natural language
     */
    async processOrder(message) {
        const items = this.extractFoodItems(message);
        
        if (items.length === 0) {
            return {
                text: "לא הצלחתי לזהות מנות בבקשה. אפשר לנסות שוב? לדוגמה: 'אני רוצה 2 רולי סלמון ומרק מיסו'",
                suggestions: this.getPopularItems()
            };
        }

        // Add items to order
        items.forEach(item => this.currentOrder.push(item));

        const orderSummary = this.formatOrderSummary();
        const total = this.calculateTotal();

        return {
            text: `הוספתי להזמנה שלך:\n${orderSummary}\n\nסה"כ: ₪${total}\n\nרוצה להוסיף עוד משהו?`,
            order: this.currentOrder,
            total: total,
            items: items
        };
    }

    /**
     * Extract food items from natural language
     * Examples: "2 salmon rolls", "miso soup", "family combo"
     */
    extractFoodItems(message) {
        const items = [];
        const msg = message.toLowerCase();

        // Common patterns
        const patterns = [
            // Hebrew patterns
            { regex: /(\d+)?\s*(רול|רולי|רולים)?\s*(סלמון|טונה|דניס)/gi, type: 'roll' },
            { regex: /(מרק|soup)\s*(מיסו|טום יאם|בטטה)/gi, type: 'soup' },
            { regex: /(קומבו|קומבינציה|combination)\s*(משפחתי|פמילי|family|זוגי|couple)/gi, type: 'combo' },
            { regex: /(סושי|sushi)/gi, type: 'sushi' },
            { regex: /(ניגירי|nigiri)\s*(סלמון|טונה|דניס|salmon|tuna)/gi, type: 'nigiri' },
            
            // English patterns
            { regex: /(\d+)?\s*(salmon|tuna|sea bass)\s*(roll|nigiri|sashimi)/gi, type: 'sushi' },
            { regex: /(miso|tom yum)\s*soup/gi, type: 'soup' },
        ];

        patterns.forEach(pattern => {
            const matches = msg.matchAll(pattern.regex);
            for (const match of matches) {
                const quantity = match[1] ? parseInt(match[1]) : 1;
                items.push({
                    text: match[0],
                    quantity: quantity,
                    type: pattern.type,
                    matched: true
                });
            }
        });

        // Search in actual menu
        if (this.menuData) {
            const menuItems = this.searchMenuItems(message);
            items.push(...menuItems);
        }

        return items;
    }

    /**
     * Search menu for matching items
     */
    searchMenuItems(query) {
        const results = [];
        const q = query.toLowerCase();

        if (!this.menuData || !this.menuData.categories) return results;

        this.menuData.categories.forEach(category => {
            category.dishes.forEach(dish => {
                const nameHe = (dish.name || '').toLowerCase();
                const nameEn = (dish.nameEn || '').toLowerCase();
                
                if (nameHe.includes(q) || nameEn.includes(q) || q.includes(nameHe) || q.includes(nameEn)) {
                    results.push({
                        name: dish.name,
                        nameEn: dish.nameEn,
                        price: dish.price,
                        quantity: 1,
                        category: category.name
                    });
                }
            });
        });

        return results;
    }

    /**
     * Answer questions about the menu
     */
    answerMenuQuestion(message) {
        if (!this.menuData) {
            return {
                text: "התפריט בטעינה... נסה שוב בעוד רגע"
            };
        }

        const categories = this.menuData.categories.map(cat => `• ${cat.name} (${cat.nameEn})`).join('\n');
        
        return {
            text: `📋 התפריט שלנו כולל:\n\n${categories}\n\nמה מעניין אותך?`,
            categories: this.menuData.categories
        };
    }

    /**
     * Answer price questions
     */
    answerPriceQuestion(message) {
        const item = this.extractFoodItems(message);
        
        if (item.length > 0 && item[0].price) {
            return {
                text: `${item[0].name} עולה ₪${item[0].price}`,
                price: item[0].price
            };
        }

        return {
            text: "המחירים נעים בין ₪21 (אדממה) ל-₪189 (קומבינציה משפחתית). על איזו מנה בדיוק רצית לשאול?",
            priceRange: { min: 21, max: 189 }
        };
    }

    /**
     * Filter menu by dietary restrictions
     */
    filterByDiet(message) {
        if (!this.menuData) return { text: "התפריט בטעינה..." };

        const isVegan = message.match(/טבעוני|vegan/i);
        const isGlutenFree = message.match(/ללא גלוטן|gluten.free/i);

        const filtered = [];
        this.menuData.categories.forEach(category => {
            category.dishes.forEach(dish => {
                if (isVegan && dish.tags && dish.tags.includes('vegan')) {
                    filtered.push(`• ${dish.name} - ₪${dish.price}`);
                }
                if (isGlutenFree && dish.tags && dish.tags.includes('gluten-free')) {
                    filtered.push(`• ${dish.name} - ₪${dish.price}`);
                }
            });
        });

        if (filtered.length === 0) {
            return {
                text: "לא מצאתי מנות מתאימות. אפשר לנסות עם אדממה (טבעוני וללא גלוטן)!"
            };
        }

        const dietType = isVegan ? 'טבעוניות' : 'ללא גלוטן';
        return {
            text: `🌱 מנות ${dietType}:\n\n${filtered.join('\n')}`,
            items: filtered
        };
    }

    /**
     * Answer branch/location questions
     */
    answerBranchQuestion(message) {
        return {
            text: "📍 יש לנו 43 סניפים ברחבי הארץ!\n\nסניפים פופולריים:\n• תל אביב - דיזנגוף\n• ירושלים - ממילא\n• חיפה - המושבה הגרמנית\n\nלכל הסניפים: <a href='branches.html'>לחץ כאן</a>",
            branchCount: 43,
            topBranches: ["תל אביב - דיזנגוף", "ירושלים - ממילא", "חיפה - המושבה הגרמנית"]
        };
    }

    /**
     * Greeting response
     */
    getGreeting() {
        const greetings = [
            "שלום! 👋 מה נשמע? במה אוכל לעזור?",
            "היי! 🍣 מה תרצה להזמין היום?",
            "ברוך הבא לג'פניקה AI! איך אפשר לעזור?"
        ];
        return {
            text: greetings[Math.floor(Math.random() * greetings.length)]
        };
    }

    /**
     * Handle unknown intent
     */
    handleUnknown(message) {
        return {
            text: "לא הבנתי בדיוק... אפשר לנסות:\n• 'אני רוצה סושי'\n• 'מה יש בתפריט?'\n• 'איפה הסניף הקרוב?'\n• 'כמה עולה מרק מיסו?'",
            suggestions: [
                "אני רוצה סושי",
                "מה יש בתפריט?",
                "איפה הסניף הקרוב?"
            ]
        };
    }

    /**
     * Get popular items for suggestions
     */
    getPopularItems() {
        return [
            "קומבינציה פמילי",
            "סלמון ניגירי",
            "מרק מיסו",
            "רול סלמון"
        ];
    }

    /**
     * Format order summary
     */
    formatOrderSummary() {
        return this.currentOrder.map((item, index) => 
            `${index + 1}. ${item.name || item.text} x${item.quantity} - ₪${(item.price || 0) * item.quantity}`
        ).join('\n');
    }

    /**
     * Calculate order total
     */
    calculateTotal() {
        return this.currentOrder.reduce((sum, item) => 
            sum + ((item.price || 0) * item.quantity), 0
        );
    }

    /**
     * Clear current order
     */
    clearOrder() {
        this.currentOrder = [];
    }

    /**
     * Get embedded menu data (fallback)
     */
    getEmbeddedMenu() {
        return {
            restaurant: "Japanika",
            categories: [
                {
                    name: "מנות פתיחה",
                    nameEn: "Appetizers",
                    dishes: [
                        { name: "אדממה", nameEn: "Edamame", price: 21, tags: ["vegan", "gluten-free"] },
                        { name: "גיוזה עוף", nameEn: "Chicken Gyoza", price: 35 },
                        { name: "ספרינג רול ירקות", nameEn: "Vegetable Spring Roll", price: 35 }
                    ]
                },
                {
                    name: "מרקים",
                    nameEn: "Soups",
                    dishes: [
                        { name: "מרק מיסו", nameEn: "Miso Soup", price: 21 },
                        { name: "טום יאם תאילנדי עוף", nameEn: "Tom Yum Thai Chicken", price: 46 }
                    ]
                },
                {
                    name: "סושי",
                    nameEn: "Sushi",
                    dishes: [
                        { name: "ניגירי סלמון", nameEn: "Salmon Nigiri", price: 24 },
                        { name: "ניגירי טונה אדומה", nameEn: "Red Tuna Nigiri", price: 27 },
                        { name: "סשימי סלמון", nameEn: "Salmon Sashimi", price: 39 }
                    ]
                }
            ]
        };
    }
}

// Initialize AI
const japanikaAI = new JapanikaAI();

/**
 * UI Functions
 */
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process with AI
    setTimeout(async () => {
        const response = await japanikaAI.processMessage(message);
        hideTypingIndicator();
        addMessageToChat('bot', response.text || response);
        
        // Update order summary if needed
        if (response.order) {
            updateOrderSummary(response.order, response.total);
        }
    }, 1000);
}

function quickMessage(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

function addMessageToChat(type, content) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message fade-in`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = type === 'user' ? '👤' : '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.className = 'message bot-message typing';
    indicator.innerHTML = '<div class="message-avatar">🤖</div><div class="typing-dots"><span></span><span></span><span></span></div>';
    document.getElementById('chatMessages').appendChild(indicator);
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function updateOrderSummary(order, total) {
    const summaryDiv = document.getElementById('orderSummary');
    const itemsDiv = document.getElementById('orderItems');
    const totalSpan = document.getElementById('orderTotal');
    
    if (order.length === 0) {
        summaryDiv.style.display = 'none';
        return;
    }
    
    summaryDiv.style.display = 'block';
    itemsDiv.innerHTML = order.map((item, i) => 
        `<div class="order-item">
            <span>${item.name || item.text}</span>
            <span>x${item.quantity}</span>
            <span>₪${(item.price || 0) * item.quantity}</span>
        </div>`
    ).join('');
    
    totalSpan.textContent = `₪${total}`;
}

function completeOrder() {
    const order = japanikaAI.currentOrder;
    if (order.length === 0) {
        alert('העגלה ריקה!');
        return;
    }
    
    addMessageToChat('bot', `✅ ההזמנה שלך התקבלה!\n\nמספר הזמנה: AI-${Math.floor(Math.random() * 10000)}\nסטטוס: בטיפול\n\nתודה שהזמנת דרך Japanika.AI! 🍣`);
    
    clearOrder();
}

function clearOrder() {
    japanikaAI.clearOrder();
    document.getElementById('orderSummary').style.display = 'none';
    addMessageToChat('bot', 'ההזמנה נוקתה. מה תרצה להזמין?');
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});

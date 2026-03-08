// Menu data loading and rendering
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🍱 Loading Japanika menu...');
    try {
        const response = await fetch('data/menu-full.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const menuData = await response.json();
        console.log(`✅ Menu loaded: ${menuData.categories?.length || 0} categories`);
        renderMenu(menuData);
    } catch (error) {
        console.error('❌ Error loading menu:', error);
        document.getElementById('menu-container').innerHTML = '<p class="error">שגיאה בטעינת התפריט. אנא נסו שוב מאוחר יותר.</p>';
    }
});

// Enhanced image name mapping
function normalizeText(text) {
    return text.replace(/'/g, '\'').replace(/"/g, '').replace(/\s+/g, '-').toLowerCase();
}

function getImagePath(dishName, categoryId) {
    // Comprehensive image mapping
    const imageMap = {
        // Appetizers
        'קריספי רייס ספייסי סלמון': 'קריספי-רייס-ספייסי-סלמון_1211.png',
        'אדממה': 'אדממה_26.png',
        'אומאמי': 'אומאמי_1121-min.png',
        'וונטון': 'וונטון_1113.png',
        'משולשי סלמון ומוצרלה': 'משולשי-סלמון-ומוצרלה_בסיום.png',
        'נאמס עוף': 'נאמס-עוף-בסיום.png',
        'ספרינג רול ירקות': 'ספרינג-רול-ירקות_513.png',
        'גיוזה עוף 5 יח\'': 'גיוזה-עוף-5_3009-1.png',
        'גיוזה בטטה 5 יח\'': 'גיוזה-בטטה-5_3013.png',
        'כנפיים קטן': 'כנפיים-קטן-S-_3418-min.png',
        'כנפיים גדול': 'כנפיים-גדול-L_33419-min.png',
        'קריספי בטטה': 'קריספי-בטטה_3702.png',
        
        // Soups
        'טום יאם תאילנדי ירקות': 'מרק-טום-יאם-ירקות1.png',
        'טום יאם תאילנדי עוף': 'טום-יאם_3408_3409.png',
        'מרק מיסו': 'מיסו_511.png',
        'מרק בטטה וג\'ינג\'ר': 'בטטה-גינגר_3411.png',
        
        // Salads
        'סלט תפוחים קריספי': 'סלט-תפוחים-קריספי_1811.png',
        'ספייסי צ\'יקן סלט': 'ספייסי-צ\'יקן-סלט_1912.png',
        'סלט וואקמה': 'סלט-וואקמה_15.png',
        'סלט שורשים': 'סלט-שורשים_1710.png',
        
        // Bao
        'באן בורגר – 2 יח\'': 'באן-בורגר-עיקרית.png',
        'באן בקר מפורק – 2 יח\'': 'באן-בקר-מפורק_.png',
        'באן שניצל עוף – 2 יח\'': 'באן-שניצל_.png',
        'באן טופו – 2 יח\'': 'באן-טופו_.png',
        
        // Sushi
        'מאקי ירק': 'מאקי-ירק-IO.jpg',
        'מאקי דג': 'מאקי-דג-6-יח-אינסייד-אאוט.png',
        'פוטומאקי 4 יח\'': 'פוטומאקי-4-יח-IO.jpg',
        'ניגירי סלמון': 'ניגירי-סלמון_2513.png',
        'ניגירי טונה אדומה': 'ניגירי-טונה.png',
        'ניגירי דניס': 'ניגירי-דניס.png',
        
        // Special Sushi
        'קריספי האמצ\'י ויוזו': 'קריספי-האמצ\'י-ויוזו_3114.png',
        'האמצ\'י כמהין': 'האמצ\'י-כמהין_3220.png',
        'ג\'פנקו': 'ג_פנקו1.png',
        'בלאק טוביקו רול': 'בלאק-טוביקו-רול_3213.png',
        'סלמון טוגרשי': 'סלמון-טוגרשי_2712.png',
        'ווייט רויאל': 'ווייט-רויאל_3218.png',
        'רוק אנד רול': 'רוק-אנד-רול_2511.png',
        'טייגר רול': 'טייגר-רול_-min.png',
        'וולקנו רול': 'וולקנו-רול-min.png',
        'פיני רול': 'פיני-רול_בסיום.png',
        'מנטה רול': 'מנטה-רול_3628-min.png',
        'וול סטריט': 'וול-סטריט_3602-min.png',
        'סלמון צ\'יז רול': 'סלמון-צ\'יז-רול_3012.png',
        'ספיישל ג\'פניקה': 'ספיישל-ג\'פניקה_בסיום.png',
        
        // Combinations
        'קומבינציה צמחונית': 'צמחונית_1431-min.png',
        'קומבינציה טבעונית': 'טבעונית_3699-min.png',
        'קומבינציית טוקיו': 'טוקיו_1430-min.png',
        'קומבינציית קאטאנא': 'קאטאנה.png',
        'קומבינציית מיקס': 'מיקס_1433-min.png',
        'קומבינציית סלמון': 'סלמון-קומבו_2814.png',
        
        // Wok
        'אלפרדו אסייאתי ירקות': 'אלפרדו-אסייתי-ירקות_3513.png',
        'אלפרדו אסייאתי טופו': 'אלפרדו-אסייתי-טופו.png',
        'אלפרדו אסייאתי עוף': 'אלפרדו-אסייתי-עוף_3514.png',
        'אלפרדו אסייאתי בקר': 'אלפרדו-אסייתי-בקר.png',
        'אלפרדו אסייאתי סלמון': 'אלפרדו-אסייתי-סלמון_3517.png',
        'פרש נודלס ירקות': 'פרש-נודלס-ירקות-min.png',
        'פרש נודלס עוף': 'פרש-נודלס-עוף_3533.png',
        'פרש נודלס בקר': 'פרש-נודלס-בקר_3535.png',
        'ספיישל פרש נודלס': 'ספיישל-פרש-נודלס-min.png',
        'צ\'אנג מאי ירקות': 'צ\'אנג-מאי-ירקות_3540.png',
        'צ\'אנג מאי עוף': 'צ\'אנג-מאי-עוף_3541.png',
        'פאד תאי ירקות': 'פאד-תאי_4211.png',
        'פאד תאי עוף': 'פאד-תאי_4211.png',
        'פאד תאי בקר': 'פאד-תאי_4211.png',
        'פאד תאי סלמון': 'פאד-תאי-סלמון.png',
        'מקאו ירקות': 'מקאו-ירקות_3545-min.png',
        'מקאו עוף': 'מקאו-עוף_3547-min.png',
        'מקאו סלמון': 'מקאו-סלמון_3549-min.png',
        
        // Rice & Grill
        'קארי מסמאן טופו': 'קארי-מסמאן_3614.png',
        'קארי מסמאן עוף': 'קארי-מסמאן_3614.png',
        'קארי מסמאן דניס': 'קארי-מסמאן_3614.png',
        'חמוץ מתוק': 'חמוץ-מתוק_3100.png',
        'פאד קפאו בקר': 'פאד-קפאו-בקר_בסיום.png',
        'דג בקשיו': 'דג-בקשיו_3121.png',
        'עוף בקשיו': 'עוף-בקשיו_3120.png',
        'טופו סאמוי': 'טופו-סאמוי_3118.png',
        'צ\'יקן סאמוי': 'צ\'יקן-סאמוי_3119.png',
        'ביף סאמוי': 'ביף-סאמוי_בסיום.png',
        'פילה סלמון גריל': 'פילה-סלמון-גריל_4814.png',
        'חזה עוף בגריל': 'חזה-עוף-בגריל_1412.png',
        'טוריקצ\'ו': 'טורקיאצו_1489.png',
        
        // Kids
        'באן בורגר קידס': 'באן-בורגר-קידס.png',
        'קריספי צ\'יקן קידס': 'קריספי-ציקן-קידס_3703-scaled.jpg',
        'אצבעות עוף': 'אצבעות-עוף-א.ילדים_1437-scaled.jpg',
        'פרש נודלס קידס טופו': 'פרש-קידס-טופו.png',
        'פרש נודלס קידס עוף': 'פרש-קידס.jpg',
        
        // Desserts
        'קטיפה אדומה': 'קטיפה-אדומה.png',
        'הבית של פיסטוק': 'הבית-של-פיסטוק.png',
        'פרלינה נוצ\'לטו': 'פרלינה-נוצ\'לטו.png',
        'בלונדיז': 'בלונדיז.png',
        'עוגת גבינה באסקית': 'עוגת-גבינה-באסקית.png',
        'קוקיז קינדר ענק': 'קוקיז-קינדר.png',
        'כדור רושה': 'כדור-רושה.png',
        'סוויט לייק צ\'וקלט': 'סוויט-לייק.jpg',
        'קראק פאי': 'קראק-פאי.png',
        'ברולה': 'ברולה.png',
        
        // Party Trays
        'מגש מסיבה גדול': 'מגש-עסקי-גדול_5214.png',
        'מגש מסיבה קטן': 'מגש1.png'
    };

    // Try exact match first
    if (imageMap[dishName]) {
        return `images/dishes/${imageMap[dishName]}`;
    }

    // Try partial match by first word
    const firstWord = dishName.split(' ')[0];
    for (const [key, value] of Object.entries(imageMap)) {
        if (key.startsWith(firstWord) || dishName.startsWith(key.split(' ')[0])) {
            return `images/dishes/${value}`;
        }
    }

    // Default: use gradient placeholder
    const gradients = {
        'appetizers': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'soups': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'salads': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'bao': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'sushi-custom': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'special-sushi': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'combinations': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'wok': 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
        'rice-grill': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'kids': 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
        'desserts': 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        'party-trays': 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)'
    };

    return gradients[categoryId] || gradients['appetizers'];
}

function createDishCard(dish, categoryId) {
    const imagePath = getImagePath(dish.name, categoryId);
    const isGradient = imagePath.includes('linear-gradient');
    
    const tagsHtml = dish.tags ? dish.tags.map(tag => {
        const tagLabels = {
            'vegan': '🌱 טבעוני',
            'vegetarian': '🥗 צמחוני',
            'gluten-free': 'ללא גלוטן'
        };
        return `<span class="dish-tag">${tagLabels[tag] || tag}</span>`;
    }).join('') : '';

    const priceDisplay = dish.price ? `₪${dish.price}` : '';
    const description = dish.description || dish.nameEn || '';
    
    // Add version parameter to bust old cache (use static version)
    const cacheBuster = `?v=2`;
    const imagePathWithCache = isGradient ? imagePath : `${imagePath}${cacheBuster}`;

    return `
        <div class="dish-card fade-in-scroll">
            <div class="dish-image-wrapper">
                ${isGradient ? 
                    `<div class="dish-image dish-placeholder" style="background: ${imagePath};">
                        <div class="placeholder-icon">🍱</div>
                    </div>` :
                    `<img src="${imagePathWithCache}" alt="${dish.name}" class="dish-image" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'dish-image dish-placeholder\\' style=\\'background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c23866 100%);\\\'><div class=\\'placeholder-icon\\'>🍱</div></div>';">`
                }
            </div>
            <div class="dish-info">
                <h3 class="dish-name">${dish.name}</h3>
                ${description ? `<p class="dish-description">${description}</p>` : ''}
                ${tagsHtml ? `<div class="dish-tags">${tagsHtml}</div>` : ''}
                <div class="dish-footer">
                    ${priceDisplay ? `<span class="dish-price">${priceDisplay}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderMenu(menuData) {
    const container = document.getElementById('menu-container');
    
    let html = '';
    let totalDishes = 0;
    
    menuData.categories.forEach(category => {
        totalDishes += category.dishes.length;
        html += `
            <div class="menu-category" id="${category.id}">
                <div class="category-header fade-in-scroll">
                    <h2 class="category-title">${category.name}</h2>
                    <p class="category-subtitle">${category.nameEn}</p>
                </div>
                <div class="dishes-grid">
                    ${category.dishes.map(dish => createDishCard(dish, category.id)).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    console.log(`📋 Rendered ${totalDishes} dishes across ${menuData.categories.length} categories`);
    
    // Track image loading
    const images = container.querySelectorAll('img.dish-image');
    console.log(`🖼️  Found ${images.length} dish images to load`);
    
    let loadedCount = 0;
    let errorCount = 0;
    images.forEach((img, index) => {
        img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount % 10 === 0 || loadedCount === images.length) {
                console.log(`✅ Loaded ${loadedCount}/${images.length} images`);
            }
        });
        img.addEventListener('error', (e) => {
            errorCount++;
            console.warn(`❌ Failed to load image ${errorCount}: ${img.src}`);
        });
    });

    // Reinitialize scroll animations
    observeElements();
}

// Smooth scroll for category navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.category-pill').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const menuNavHeight = document.querySelector('.menu-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - menuNavHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Highlight active category in navigation
function updateActiveCategory() {
    const categories = document.querySelectorAll('.menu-category');
    const pills = document.querySelectorAll('.category-pill');
    const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
    const menuNavHeight = document.querySelector('.menu-nav')?.offsetHeight || 60;
    const offset = navHeight + menuNavHeight + 100;

    let activeCategoryId = null;

    categories.forEach(category => {
        const rect = category.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
            activeCategoryId = category.id;
        }
    });

    pills.forEach(pill => {
        if (pill.getAttribute('href') === `#${activeCategoryId}`) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveCategory);

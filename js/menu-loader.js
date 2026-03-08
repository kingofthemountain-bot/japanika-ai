// Menu Loader - Dynamically loads real Japanika menu
document.addEventListener('DOMContentLoaded', function() {
  loadMenu();
  loadAboutSection();
});

function loadMenu() {
  const dishesGrid = document.querySelector('.dishes-grid');
  if (!dishesGrid) return;

  // Clear existing placeholder dishes
  dishesGrid.innerHTML = '';

  // Get featured dishes from different categories
  const featuredDishes = [];
  
  // Add signature Japanko
  const japanko = japanikaMenu.categories
    .find(c => c.id === 'special-sushi')
    ?.dishes.find(d => d.id === 'japanko');
  if (japanko) featuredDishes.push(japanko);

  // Add Tom Yum soup
  const tomYum = japanikaMenu.categories
    .find(c => c.id === 'soups')
    ?.dishes.find(d => d.id === 'tom-yum-chicken');
  if (tomYum) featuredDishes.push(tomYum);

  // Add Pad Thai
  const padThai = japanikaMenu.categories
    .find(c => c.id === 'wok')
    ?.dishes.find(d => d.id === 'pad-thai-salmon');
  if (padThai) featuredDishes.push(padThai);

  // Add Wings
  const wings = japanikaMenu.categories
    .find(c => c.id === 'appetizers')
    ?.dishes.find(d => d.id === 'wings-large');
  if (wings) featuredDishes.push(wings);

  // Add Edamame
  const edamame = japanikaMenu.categories
    .find(c => c.id === 'appetizers')
    ?.dishes.find(d => d.id === 'edamame');
  if (edamame) featuredDishes.push(edamame);

  // Add Party Platter
  const partyPlatter = japanikaMenu.categories
    .find(c => c.id === 'party-trays')
    ?.dishes.find(d => d.id === 'party-platter');
  if (partyPlatter) featuredDishes.push(partyPlatter);

  // Render featured dishes
  featuredDishes.forEach(dish => {
    const dishCard = createDishCard(dish);
    dishesGrid.appendChild(dishCard);
  });
}

function createDishCard(dish) {
  const card = document.createElement('div');
  card.className = 'dish-card fade-in-scroll';
  
  const imageUrl = dish.image || getPlaceholderImage(dish.tags);
  const imageStyle = dish.image 
    ? `background-image: url('${imageUrl}'); background-size: cover; background-position: center;`
    : `background: ${getGradientForTags(dish.tags)};`;
  
  const tags = dish.tags.map(tag => {
    const tagLabels = {
      'vegan': '🌱 טבעוני',
      'vegetarian': '🥬 צמחוני',
      'spicy': '🌶️ חריף',
      'gluten-free': 'ללא גלוטן',
      'popular': '⭐ פופולרי',
      'signature': '👑 מנת הבית',
      'hot': '🔥 חם',
      'kids': '👶 לילדים',
      'party': '🎉 למסיבות'
    };
    return `<span class="dish-tag">${tagLabels[tag] || tag}</span>`;
  }).join('');

  card.innerHTML = `
    <div class="dish-image-wrapper">
      <div class="dish-image" style="${imageStyle}">
        ${!dish.image ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: 80%; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white;">${getEmojiForCategory(dish)}</div>` : ''}
      </div>
      <div class="dish-overlay">
        <button class="btn-view">לפרטים</button>
      </div>
    </div>
    <div class="dish-info">
      <div class="dish-tags">${tags}</div>
      <h3 class="dish-name">${dish.name}</h3>
      <p class="dish-name-en">${dish.nameEn || ''}</p>
      <p class="dish-description">${dish.description}</p>
      <div class="dish-footer">
        <span class="dish-price">₪${dish.price}</span>
        <button class="btn-add" onclick="addToCart('${dish.id}')">הוסף להזמנה</button>
      </div>
    </div>
  `;
  
  return card;
}

function getPlaceholderImage(tags) {
  // Return null to use gradient instead
  return null;
}

function getGradientForTags(tags) {
  if (tags.includes('vegan')) return 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
  if (tags.includes('spicy')) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
  if (tags.includes('signature')) return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
  if (tags.includes('kids')) return 'linear-gradient(135deg, #FF6B9D 0%, #C06C84 100%)';
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

function getEmojiForCategory(dish) {
  if (dish.name.includes('סושי') || dish.name.includes('רול')) return '🍣';
  if (dish.name.includes('מרק')) return '🍲';
  if (dish.name.includes('סלט')) return '🥗';
  if (dish.name.includes('ווק') || dish.name.includes('נודלס')) return '🍜';
  if (dish.name.includes('קינוח')) return '🍰';
  if (dish.name.includes('גיוזה')) return '🥟';
  if (dish.name.includes('באן')) return '🍔';
  return '🍱';
}

function loadAboutSection() {
  const aboutSection = document.querySelector('#about .container');
  if (!aboutSection) return;

  const stats = japanikaMenu.stats;
  
  // Try to find stats container
  const statsContainer = aboutSection.querySelector('.about-stats');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat-item">
        <div class="stat-number">${stats.branches}</div>
        <div class="stat-label">סניפים ברחבי הארץ</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.rollsPerMonth}</div>
        <div class="stat-label">רולים בחודש</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.dailyDiners}</div>
        <div class="stat-label">סועדים ביום</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${new Date().getFullYear() - stats.since}+</div>
        <div class="stat-label">שנות ניסיון</div>
      </div>
    `;
  }
}

function addToCart(dishId) {
  // TODO: Implement cart functionality
  alert(`המנה נוספה להזמנה! (${dishId})`);
}

// Search functionality
function searchDishes(query) {
  const results = [];
  query = query.toLowerCase();
  
  japanikaMenu.categories.forEach(category => {
    category.dishes.forEach(dish => {
      if (dish.name.toLowerCase().includes(query) || 
          dish.nameEn.toLowerCase().includes(query) ||
          dish.description.toLowerCase().includes(query)) {
        results.push({...dish, category: category.name});
      }
    });
  });
  
  return results;
}

// Filter by tags
function filterByTag(tag) {
  const results = [];
  
  japanikaMenu.categories.forEach(category => {
    category.dishes.forEach(dish => {
      if (dish.tags.includes(tag)) {
        results.push({...dish, category: category.name});
      }
    });
  });
  
  return results;
}

// Get all available tags
function getAllTags() {
  const tags = new Set();
  
  japanikaMenu.categories.forEach(category => {
    category.dishes.forEach(dish => {
      dish.tags.forEach(tag => tags.add(tag));
    });
  });
  
  return Array.from(tags);
}

// Export functions
window.japanikaMenuLoader = {
  searchDishes,
  filterByTag,
  getAllTags,
  addToCart
};

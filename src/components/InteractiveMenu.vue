<script setup>
import { ref, computed } from 'vue'

const categories = ref([
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' }
])

const menuItems = ref([
  {
    id: 1,
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella',
    price: 14,
    category: 'starters',
    image: '/images/menu/arancini.jpg',
    tags: ['vegetarian', 'popular']
  },
  {
    id: 2,
    name: 'Tuna Tartare',
    description: 'Fresh tuna with avocado, citrus, and crispy wonton',
    price: 16,
    category: 'starters',
    image: '/images/menu/tuna-tartare.jpg',
    tags: ['seafood', 'raw']
  },
  {
    id: 3,
    name: 'Beef Wellington',
    description: 'Tenderloin wrapped in mushroom duxelles and puff pastry',
    price: 38,
    category: 'mains',
    image: '/images/menu/beef-wellington.jpg',
    tags: ['signature', 'meat']
  },
  {
    id: 4,
    name: 'Lobster Risotto',
    description: 'Creamy Arborio rice with fresh lobster and saffron',
    price: 42,
    category: 'mains',
    image: '/images/menu/lobster-risotto.jpg',
    tags: ['seafood', 'popular']
  },
  {
    id: 5,
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: 12,
    category: 'desserts',
    image: '/images/menu/chocolate-souffle.jpg',
    tags: ['vegetarian', 'hot']
  },
  {
    id: 6,
    name: 'Signature Cocktail',
    description: 'House-infused gin with elderflower and citrus',
    price: 14,
    category: 'drinks',
    image: '/images/menu/signature-cocktail.jpg',
    tags: ['alcoholic', 'signature']
  }
])

const activeCategory = ref('starters')
const searchQuery = ref('')
const activeFilters = ref([])

const filteredItems = computed(() => {
  return menuItems.value.filter(item => {
    // Filter by category
    if (activeCategory.value !== 'all' && item.category !== activeCategory.value) {
      return false
    }
    
    // Filter by search query
    if (searchQuery.value && !item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    
    // Filter by tags
    if (activeFilters.value.length > 0 && !activeFilters.value.some(tag => item.tags.includes(tag))) {
      return false
    }
    
    return true
  })
})

const availableTags = computed(() => {
  const tags = new Set()
  menuItems.value.forEach(item => {
    item.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

function toggleFilter(tag) {
  if (activeFilters.value.includes(tag)) {
    activeFilters.value = activeFilters.value.filter(t => t !== tag)
  } else {
    activeFilters.value.push(tag)
  }
}

function clearFilters() {
  activeFilters.value = []
  searchQuery.value = ''
}
</script>

<template>
  <section id="menu" class="menu-section">
    <div class="menu-container">
      <h2 class="section-title" data-aos="fade-up">Our Menu</h2>
      
      <div class="menu-controls" data-aos="fade-up">
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search our menu..." 
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
        
        <div class="filter-tags">
          <button 
            v-for="tag in availableTags" 
            :key="tag"
            @click="toggleFilter(tag)"
            :class="['filter-tag', { active: activeFilters.includes(tag) }]"
          >
            {{ tag }}
          </button>
          
          <button v-if="activeFilters.length > 0" @click="clearFilters" class="clear-filters">
            Clear filters
          </button>
        </div>
      </div>
      
      <div class="category-tabs" data-aos="fade-up">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="activeCategory = category.id"
          :class="['category-tab', { active: activeCategory === category.id }]"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="menu-items" data-aos="fade-up">
        <div v-if="filteredItems.length === 0" class="no-results">
          <p>No menu items match your search. Try adjusting your filters.</p>
          <button @click="clearFilters" class="reset-button">Reset Filters</button>
        </div>
        
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="menu-item"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="menu-item-image">
            <img :src="item.image" :alt="item.name">
            <div class="menu-item-tags">
              <span v-for="tag in item.tags" :key="tag" class="menu-tag">{{ tag }}</span>
            </div>
          </div>
          
          <div class="menu-item-content">
            <div class="menu-item-header">
              <h3>{{ item.name }}</h3>
              <span class="menu-item-price">${{ item.price }}</span>
            </div>
            <p class="menu-item-description">{{ item.description }}</p>
            <button class="order-button">Add to Order</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-section {
  padding: 5rem 2rem;
  background-color: #fff;
}

.menu-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-color);
}

.menu-controls {
  margin-bottom: 2rem;
}

.search-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
  outline: none;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-tag {
  background: #f5f5f5;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tag:hover {
  background: #e0e0e0;
}

.filter-tag.active {
  background: var(--primary-color);
  color: white;
}

.clear-filters {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}

.clear-filters:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

.category-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.category-tab {
  background: none;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.category-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.category-tab:hover::after {
  width: 30%;
}

.category-tab.active {
  color: var(--primary-color);
  font-weight: 600;
}

.category-tab.active::after {
  width: 70%;
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.menu-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.menu-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.menu-item-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.menu-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.menu-item:hover .menu-item-image img {
  transform: scale(1.1);
}

.menu-item-tags {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.menu-tag {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  backdrop-filter: blur(5px);
}

.menu-item-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.menu-item-header h3 {
  font-size: 1.3rem;
  margin: 0;
  color: var(--text-color);
}

.menu-item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.menu-item-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  flex: 1;
}

.order-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.3s ease, transform 0.3s ease;
}

.order-button:hover {
  background: var(--secondary-color);
  transform: translateY(-3px);
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 12px;
}

.reset-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;
}

.reset-button:hover {
  background: var(--secondary-color);
}

@media (max-width: 768px) {
  .menu-items {
    grid-template-columns: 1fr;
  }
  
  .category-tabs {
    gap: 0.5rem;
  }
  
  .category-tab {
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
}
</style>

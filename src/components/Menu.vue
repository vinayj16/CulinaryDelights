<script setup>
import { ref, computed } from 'vue'
import { useMotion } from '@vueuse/motion'

const menuItems = ref([
  {
    id: 1,
    name: 'Signature Pasta',
    description: 'Fresh homemade pasta with rich tomato sauce and herbs',
    price: 18.99,
    category: 'main',
    image: '/images/pasta.jpg'
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 24.99,
    category: 'main',
    image: '/images/salmon.jpg'
  },
  {
    id: 3,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 8.99,
    category: 'dessert',
    image: '/images/tiramisu.jpg'
  }
])

const selectedCategory = ref('all')

const filteredItems = computed(() => {
  if (selectedCategory.value === 'all') return menuItems.value
  return menuItems.value.filter(item => item.category === selectedCategory.value)
})

const menuRef = ref(null)
const { isVisible } = useMotion(menuRef, {
  initial: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
})
</script>

<template>
  <section id="menu" class="menu-section" ref="menuRef">
    <h2 class="section-title" data-aos="fade-up">Our Menu</h2>
    
    <div class="category-filters" data-aos="fade-up" data-aos-delay="100">
      <button 
        :class="['category-btn', selectedCategory === 'all' ? 'active' : '']"
        @click="selectedCategory = 'all'"
      >
        All
      </button>
      <button 
        :class="['category-btn', selectedCategory === 'main' ? 'active' : '']"
        @click="selectedCategory = 'main'"
      >
        Main Course
      </button>
      <button 
        :class="['category-btn', selectedCategory === 'dessert' ? 'active' : '']"
        @click="selectedCategory = 'dessert'"
      >
        Desserts
      </button>
    </div>

    <div class="menu-grid" data-aos="fade-up" data-aos-delay="200">
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        class="menu-item"
        data-aos="fade-up"
      >
        <div class="menu-item-image">
          <img :src="item.image" :alt="item.name">
        </div>
        <div class="menu-item-content">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <span class="price">${{ item.price.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-section {
  padding: 4rem 2rem;
  background: var(--background-color);
}

.section-title {
  text-align: center;
  color: var(--text-color);
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.category-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--text-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover,
.category-btn.active {
  background: var(--primary-color);
  color: white;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.menu-item {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
}

.menu-item-image {
  height: 200px;
  overflow: hidden;
}

.menu-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.menu-item:hover .menu-item-image img {
  transform: scale(1.1);
}

.menu-item-content {
  padding: 1.5rem;
}

.menu-item-content h3 {
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.menu-item-content p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.price {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }

  .category-filters {
    flex-wrap: wrap;
  }
}
</style>
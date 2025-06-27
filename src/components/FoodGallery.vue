<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const dishes = ref([
  {
    id: 1,
    name: 'Truffle Risotto',
    image: '/images/dish1.jpg',
    description: 'Creamy Arborio rice with black truffle and parmesan',
    price: '$24'
  },
  {
    id: 2,
    name: 'Seared Scallops',
    image: '/images/dish2.jpg',
    description: 'Fresh scallops with cauliflower purée and crispy pancetta',
    price: '$28'
  },
  {
    id: 3,
    name: 'Wagyu Steak',
    image: '/images/dish3.jpg',
    description: 'Premium Wagyu beef with roasted vegetables and red wine jus',
    price: '$42'
  },
  {
    id: 4,
    name: 'Chocolate Soufflé',
    image: '/images/dish4.jpg',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: '$16'
  }
])

const activeIndex = ref(0)
const galleryRef = ref(null)

function nextDish() {
  activeIndex.value = (activeIndex.value + 1) % dishes.value.length
  animateDish()
}

function prevDish() {
  activeIndex.value = (activeIndex.value - 1 + dishes.value.length) % dishes.value.length
  animateDish()
}

function animateDish() {
  const dish = document.querySelector('.active-dish')
  gsap.fromTo(dish, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  )
}

onMounted(() => {
  // Auto-rotate dishes every 5 seconds
  const interval = setInterval(nextDish, 5000)
  
  // Clean up on component unmount
  return () => clearInterval(interval)
})
</script>

<template>
  <section id="gallery" class="gallery-section section">
    <h2 class="section-title" data-aos="fade-up">Our Signature Dishes</h2>
    <div class="container">
      <div ref="galleryRef" class="gallery-container" data-aos="fade-up">
        <button class="gallery-nav btn btn-outline prev" @click="prevDish">
          <span class="material-icons">chevron_left</span>
        </button>
        <div class="gallery-content">
          <div class="dish-image">
            <img :src="dishes[activeIndex].image" :alt="dishes[activeIndex].name" class="active-dish" />
          </div>
          <div class="dish-info">
            <h3>{{ dishes[activeIndex].name }}</h3>
            <p class="dish-description">{{ dishes[activeIndex].description }}</p>
            <span class="dish-price">{{ dishes[activeIndex].price }}</span>
            <button class="order-button btn btn-primary">Order Now</button>
          </div>
        </div>
        <button class="gallery-nav btn btn-outline next" @click="nextDish">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
      <div class="gallery-indicators">
        <button 
          v-for="(dish, index) in dishes" 
          :key="dish.id"
          :class="['indicator', 'btn', 'btn-outline', { active: index === activeIndex }]"
          @click="activeIndex = index; animateDish()"
          :aria-label="`Show ${dish.name}`"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  padding: 5rem 2rem;
  background-color: #fff;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-color);
}

.gallery-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.gallery-nav {
  background: var(--primary-color);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.gallery-nav:hover {
  transform: scale(1.1);
  background: var(--secondary-color);
}

.gallery-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
  width: 100%;
  max-width: 800px;
}

@media (min-width: 768px) {
  .gallery-content {
    flex-direction: row;
  }
}

.dish-image {
  flex: 1;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.dish-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dish-image img:hover {
  transform: scale(1.05);
}

.dish-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.dish-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.dish-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #666;
}

.dish-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.order-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.3s ease, transform 0.3s ease;
}

.order-button:hover {
  background: var(--secondary-color);
  transform: translateY(-3px);
}

.gallery-indicators {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
  margin: 0 6px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.indicator.active {
  background: var(--primary-color);
  transform: scale(1.2);
}

.indicator:hover {
  background: var(--secondary-color);
}

.material-icons {
  font-size: 24px;
}

.btn:focus-visible, .gallery-nav:focus-visible, .order-button:focus-visible, .indicator:focus-visible {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}
</style>
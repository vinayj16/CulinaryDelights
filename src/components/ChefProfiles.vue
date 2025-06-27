<script setup>
import { ref } from 'vue'

const chefs = ref([
  {
    id: 1,
    name: 'Alex Martinez',
    title: 'Executive Chef',
    bio: 'With over 15 years of experience in Michelin-starred restaurants across Europe, Chef Alex brings a unique fusion of traditional and modern techniques to our kitchen.',
    image: '/images/chefs/chef1.jpg',
    specialties: ['French Cuisine', 'Molecular Gastronomy']
  },
  {
    id: 2,
    name: 'Sophia Chen',
    title: 'Pastry Chef',
    bio: 'A graduate of Le Cordon Bleu Paris, Chef Sophia creates desserts that are as visually stunning as they are delicious, drawing inspiration from her travels across Asia and Europe.',
    image: '/images/chefs/chef2.jpg',
    specialties: ['French Pastry', 'Chocolate Work']
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    title: 'Sous Chef',
    bio: 'Chef Marcus specializes in sustainable seafood and farm-to-table cooking. His innovative approach to local ingredients has earned him recognition in culinary competitions nationwide.',
    image: '/images/chefs/chef3.jpg',
    specialties: ['Seafood', 'Farm-to-Table']
  }
])

const activeChef = ref(0)

function nextChef() {
  activeChef.value = (activeChef.value + 1) % chefs.value.length
}

function prevChef() {
  activeChef.value = (activeChef.value - 1 + chefs.value.length) % chefs.value.length
}
</script>

<template>
  <section id="chefs" class="chefs-section">
    <div class="chefs-container">
      <h2 class="section-title" data-aos="fade-up">Meet Our Chefs</h2>
      
      <div class="chef-carousel" data-aos="fade-up">
        <button class="carousel-nav prev" @click="prevChef">
          <span class="material-icons">chevron_left</span>
        </button>
        
        <div class="chef-card">
          <div class="chef-image">
            <img :src="chefs[activeChef].image" :alt="chefs[activeChef].name">
          </div>
          
          <div class="chef-info">
            <h3>{{ chefs[activeChef].name }}</h3>
            <h4>{{ chefs[activeChef].title }}</h4>
            
            <p class="chef-bio">{{ chefs[activeChef].bio }}</p>
            
            <div class="chef-specialties">
              <h5>Specialties:</h5>
              <div class="specialty-tags">
                <span v-for="specialty in chefs[activeChef].specialties" :key="specialty" class="specialty-tag">
                  {{ specialty }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button class="carousel-nav next" @click="nextChef">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
      
      <div class="chef-indicators">
        <button 
          v-for="(chef, index) in chefs" 
          :key="chef.id"
          :class="['indicator', { active: index === activeChef }]"
          @click="activeChef = index"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chefs-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8f4e9 0%, #fff 100%);
}

.chefs-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-color);
}

.chef-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.carousel-nav {
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

.carousel-nav:hover {
  transform: scale(1.1);
  background: var(--secondary-color);
}

.chef-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  transition: transform 0.5s ease;
}

@media (min-width: 768px) {
  .chef-card {
    flex-direction: row;
  }
}

.chef-image {
  flex: 1;
  overflow: hidden;
}

.chef-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.chef-card:hover .chef-image img {
  transform: scale(1.05);
}

.chef-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.chef-info h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.chef-info h4 {
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.chef-bio {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--text-color);
}

.chef-specialties h5 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: var(--text-color);
}

.specialty-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.specialty-tag {
  background: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.chef-indicators {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
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
</style>
<script setup>
import { ref } from 'vue'

const experiences = ref([
  {
    id: 1,
    title: 'Cooking Masterclass',
    description: 'Learn the secrets of fine dining from our expert chefs. Master essential culinary techniques and create signature dishes.',
    duration: '3 hours',
    price: 149,
    image: '/images/experiences/cooking-class.jpg',
    capacity: '8 participants',
    includes: ['Hands-on cooking session', 'Recipe booklet', 'Wine pairing', 'Certificate of completion']
  },
  {
    id: 2,
    title: 'Wine Tasting Journey',
    description: 'Embark on a guided tour through premium wine selections, paired with artisanal cheeses and insights from our sommelier.',
    duration: '2 hours',
    price: 89,
    image: '/images/experiences/wine-tasting.jpg',
    capacity: '12 participants',
    includes: ['Premium wine selection', 'Cheese pairing', 'Tasting notes', 'Expert guidance']
  },
  {
    id: 3,
    title: "Chef's Table Experience",
    description: 'An intimate dining experience featuring a multi-course tasting menu prepared right before your eyes by our executive chef.',
    duration: '4 hours',
    price: 199,
    image: '/images/experiences/chefs-table.jpg',
    capacity: '6 participants',
    includes: ['Multi-course menu', 'Wine pairing', 'Interactive presentation', 'Recipe cards']
  }
])

const activeExperience = ref(0)

function nextExperience() {
  activeExperience.value = (activeExperience.value + 1) % experiences.value.length
}

function prevExperience() {
  activeExperience.value = (activeExperience.value - 1 + experiences.value.length) % experiences.value.length
}
</script>

<template>
  <section id="experiences" class="experiences-section">
    <div class="experiences-container">
      <h2 class="section-title" data-aos="fade-up">Culinary Experiences</h2>
      
      <div class="experience-carousel" data-aos="fade-up">
        <button class="carousel-nav prev" @click="prevExperience">
          <span class="material-icons">chevron_left</span>
        </button>
        
        <div class="experience-card">
          <div class="experience-image">
            <img :src="experiences[activeExperience].image" :alt="experiences[activeExperience].title">
          </div>
          
          <div class="experience-info">
            <h3>{{ experiences[activeExperience].title }}</h3>
            <p class="experience-description">{{ experiences[activeExperience].description }}</p>
            
            <div class="experience-details">
              <div class="detail-item">
                <span class="material-icons">schedule</span>
                <span>{{ experiences[activeExperience].duration }}</span>
              </div>
              <div class="detail-item">
                <span class="material-icons">group</span>
                <span>{{ experiences[activeExperience].capacity }}</span>
              </div>
              <div class="detail-item">
                <span class="material-icons">euro</span>
                <span>${{ experiences[activeExperience].price }}</span>
              </div>
            </div>
            
            <div class="experience-includes">
              <h4>What's Included:</h4>
              <ul>
                <li v-for="item in experiences[activeExperience].includes" :key="item">
                  <span class="material-icons">check</span>
                  {{ item }}
                </li>
              </ul>
            </div>
            
            <button class="book-button">Book Experience</button>
          </div>
        </div>
        
        <button class="carousel-nav next" @click="nextExperience">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
      
      <div class="experience-indicators">
        <button 
          v-for="(experience, index) in experiences" 
          :key="experience.id"
          :class="['indicator', { active: index === activeExperience }]"
          @click="activeExperience = index"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experiences-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.experiences-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-color);
}

.experience-carousel {
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

.experience-card {
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
  .experience-card {
    flex-direction: row;
  }
}

.experience-image {
  flex: 1;
  overflow: hidden;
}

.experience-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.experience-card:hover .experience-image img {
  transform: scale(1.05);
}

.experience-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.experience-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.experience-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--text-color);
}

.experience-details {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary-color);
}

.detail-item .material-icons {
  font-size: 1.2rem;
}

.experience-includes {
  margin-bottom: 1.5rem;
}

.experience-includes h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.experience-includes ul {
  list-style: none;
  padding: 0;
}

.experience-includes li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.experience-includes .material-icons {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.book-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.book-button:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.experience-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--primary-color);
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .experience-card {
    margin: 0 1rem;
  }

  .experience-image {
    height: 200px;
  }

  .experience-details {
    flex-wrap: wrap;
  }
}
</style>
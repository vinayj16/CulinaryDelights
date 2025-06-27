<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

// Testimonials data
const testimonials = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Critic',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'The culinary experience at CulinaryDelights is nothing short of extraordinary. The attention to detail in every dish, the impeccable service, and the ambiance create a dining experience that is truly unforgettable.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Regular Customer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'I\'ve been coming here for years and the quality has never wavered. The seasonal menu always offers something new and exciting, while maintaining the classics that I\'ve come to love. Truly a gem in the city.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Food Blogger',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    text: 'The fusion of traditional techniques with modern creativity results in dishes that are both familiar and surprising. The chef\'s tasting menu is a journey through flavors that I highly recommend to anyone seeking a memorable dining experience.'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Wine Enthusiast',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 5,
    text: 'Not only is the food exceptional, but the wine pairing suggestions from their sommelier elevated our meal to another level. The staff\'s knowledge and passion for what they serve is evident in every interaction.'
  }
])

// Current testimonial index
const currentIndex = ref(0)
// Auto-play interval
let autoplayInterval = null
// Animation timeline
let tl = null

// Navigate to a specific testimonial
const goToTestimonial = (index) => {
  // Clear any existing animations
  if (tl) tl.kill()
  
  // Create new timeline
  tl = gsap.timeline()
  
  // Animate out current testimonial
  tl.to('.testimonial-content', {
    opacity: 0,
    y: 20,
    duration: 0.3,
    onComplete: () => {
      // Update index
      currentIndex.value = index
    }
  })
  
  // Animate in new testimonial
  tl.to('.testimonial-content', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    delay: 0.1
  })
}

// Navigate to next testimonial
const nextTestimonial = () => {
  const newIndex = (currentIndex.value + 1) % testimonials.value.length
  goToTestimonial(newIndex)
}

// Navigate to previous testimonial
const prevTestimonial = () => {
  const newIndex = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
  goToTestimonial(newIndex)
}

// Start autoplay
const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextTestimonial()
  }, 5000)
}

// Stop autoplay
const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

// Initialize component
onMounted(() => {
  startAutoplay()
  
  // Initial animation
  gsap.from('.testimonials-section', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  })
})

// Clean up on component unmount
onBeforeUnmount(() => {
  stopAutoplay()
  if (tl) tl.kill()
})
</script>

<template>
  <section id="testimonials" class="testimonials-section section">
    <div class="container">
      <h2 class="section-title" data-aos="fade-up">What Our Guests Say</h2>
      
      <div class="testimonials-container" data-aos="fade-up" data-aos-delay="200">
        <button class="nav-btn prev-btn" @click="prevTestimonial" aria-label="Previous testimonial">
          <i class="material-icons">chevron_left</i>
        </button>
        
        <div class="testimonial-wrapper">
          <div class="testimonial-content">
            <div class="testimonial-image">
              <img :src="testimonials[currentIndex].image" :alt="testimonials[currentIndex].name">
            </div>
            
            <div class="testimonial-text">
              <div class="rating">
                <i class="material-icons star" v-for="i in 5" :key="i" :class="{ 'filled': i <= testimonials[currentIndex].rating }">
                  {{ i <= testimonials[currentIndex].rating ? 'star' : 'star_border' }}
                </i>
              </div>
              
              <p class="quote">"{{ testimonials[currentIndex].text }}"</p>
              
              <div class="author">
                <h4>{{ testimonials[currentIndex].name }}</h4>
                <p>{{ testimonials[currentIndex].role }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <button class="nav-btn next-btn" @click="nextTestimonial" aria-label="Next testimonial">
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
      
      <div class="testimonial-dots">
        <button 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          class="dot"
          :class="{ 'active': index === currentIndex }"
          @click="goToTestimonial(index)"
          :aria-label="`Go to testimonial ${index + 1}`"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: 100px 0;
  background: var(--light-bg);
  transition: var(--theme-transition);
}

:global(.dark-theme) .testimonials-section {
  background: var(--dark-bg);
}

.testimonials-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.testimonial-wrapper {
  flex: 1;
  overflow: hidden;
  padding: 2rem;
  border-radius: 20px;
  background: var(--glass-bg);
  box-shadow: var(--shadow);
  transition: var(--theme-transition);
}

:global(.dark-theme) .testimonial-wrapper {
  background: rgba(40, 40, 40, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.testimonial-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.testimonial-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--accent-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.testimonial-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-text {
  text-align: center;
}

.rating {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.star {
  color: #ccc;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.star.filled {
  color: #FFD700;
}

.quote {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-style: italic;
  transition: var(--theme-transition);
  font-weight: 500;
}

.author h4 {
  font-size: 1.3rem;
  color: var(--accent-color);
  margin-bottom: 0.3rem;
}

.author p {
  font-size: 1rem;
  color: var(--text-color-secondary);
  transition: var(--theme-transition);
  font-weight: 400;
}

.nav-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.prev-btn {
  left: -25px;
}

.next-btn {
  right: -25px;
}

.nav-btn:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: var(--accent-color);
  transform: scale(1.2);
}

.dot:hover {
  background: var(--accent-color);
  opacity: 0.8;
}

@media (min-width: 768px) {
  .testimonial-content {
    flex-direction: row;
    text-align: left;
  }
  
  .testimonial-text {
    text-align: left;
  }
  
  .rating {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .testimonials-container {
    padding: 0 2rem;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
  }
  
  .prev-btn {
    left: -10px;
  }
  
  .next-btn {
    right: -10px;
  }
  
  .testimonial-wrapper {
    padding: 1.5rem;
  }
  
  .quote {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .testimonial-image {
    width: 80px;
    height: 80px;
  }
  
  .nav-btn {
    width: 35px;
    height: 35px;
  }
  
  .star {
    font-size: 1.2rem;
  }
}
</style>

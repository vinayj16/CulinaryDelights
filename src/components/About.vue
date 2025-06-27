<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = ref([
  { number: 15, text: 'Years of Excellence' },
  { number: 50, text: 'Professional Chefs' },
  { number: 1000, text: 'Satisfied Customers' },
  { number: 100, text: 'Signature Dishes' }
])

onMounted(() => {
  // Parallax effect for images
  gsap.to('.parallax-img', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-section',
      scrub: true
    }
  })

  // Animate stats when in view
  stats.value.forEach((stat, index) => {
    gsap.to(`#stat-${index} .number`, {
      innerHTML: stat.number,
      duration: 2,
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top center'
      }
    })
  })
})
</script>

<template>
  <section id="about" class="about-section">
    <div class="about-content">
      <div class="text-content" data-aos="fade-right">
        <h2 class="section-title">Our Story</h2>
        <p class="description">
          Welcome to CulinaryDelights, where passion meets innovation in the art of fine dining.
          For over 15 years, we've been crafting unforgettable culinary experiences that blend
          traditional techniques with modern creativity.
        </p>
        <p class="description">
          Our team of world-class chefs brings together flavors from across the globe,
          creating dishes that not only satisfy your palate but also tell a story through
          every carefully curated ingredient.
        </p>
      </div>

      <div class="image-grid" data-aos="fade-left">
        <div class="image-item">
          <img src="/images/restaurant1.jpg" alt="Restaurant" @error="event => event.target.src='https://via.placeholder.com/800x400?text=Restaurant+Image'" />
          <div class="image-caption">Truffle Infused Risotto</div>
        </div>
        <div class="image-item">
          <img src="/images/dishes/signature-dish-2.jpg" alt="Signature Dish 2">
          <div class="image-caption">Seared Scallops</div>
        </div>
        <div class="image-item">
          <img src="/images/dishes/signature-dish-3.jpg" alt="Signature Dish 3">
          <div class="image-caption">Chocolate Soufflé</div>
        </div>
        <div class="image-item">
          <img src="/images/dishes/signature-dish-4.jpg" alt="Signature Dish 4">
          <div class="image-caption">Herb Crusted Lamb</div>
        </div>
      </div>
    </div>

    <div class="stats-section" data-aos="fade-up">
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          :id="`stat-${index}`"
          class="stat-card"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
        >
          <span class="number">0</span>
          <span class="text">{{ stat.text }}</span>
        </div>
      </div>
    </div>

    <div class="values-section">
      <h3 class="values-title" data-aos="fade-up">Our Values</h3>
      <div class="values-grid">
        <div class="value-card" data-aos="fade-up" data-aos-delay="100">
          <h4>Quality</h4>
          <p>We source only the finest ingredients to ensure exceptional taste in every dish.</p>
        </div>
        <div class="value-card" data-aos="fade-up" data-aos-delay="200">
          <h4>Innovation</h4>
          <p>Constantly pushing boundaries to create unique culinary experiences.</p>
        </div>
        <div class="value-card" data-aos="fade-up" data-aos-delay="300">
          <h4>Sustainability</h4>
          <p>Committed to eco-friendly practices and supporting local producers.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 100px 5%;
  background: var(--light-bg);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(26, 26, 26, 0.8);
  margin-bottom: 1.5rem;
}

.image-gallery {
  position: relative;
  height: 500px;
}

.parallax-img {
  position: absolute;
  width: 300px;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.img1 {
  top: 0;
  left: 0;
  background-image: url('/images/restaurant1.jpg');
  z-index: 3;
}

.img2 {
  top: 50px;
  left: 100px;
  background-image: url('/images/restaurant2.jpg');
  z-index: 2;
}

.img3 {
  top: 100px;
  left: 200px;
  background-image: url('/images/restaurant3.jpg');
  z-index: 1;
}

.stats-section {
  padding: 4rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.stat-card .number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-color);
  display: block;
  margin-bottom: 0.5rem;
}

.stat-card .text {
  font-size: 1.2rem;
  color: var(--text-color);
}

.values-section {
  padding: 4rem 0;
}

.values-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.value-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-card h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.value-card p {
  color: rgba(26, 26, 26, 0.8);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .image-gallery {
    height: 300px;
  }

  .parallax-img {
    width: 200px;
    height: 250px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.1rem;
  }

  .stat-card .number {
    font-size: 2.5rem;
  }

  .values-title {
    font-size: 2rem;
  }
}
</style>
<script setup>
import { ref } from 'vue'

const specialOffers = ref([
  {
    title: 'Weekend Brunch',
    description: 'Enjoy our special weekend brunch menu with complimentary mimosas',
    time: 'Sat-Sun 10AM-2PM'
  },
  {
    title: 'Happy Hour',
    description: 'Half-price appetizers and signature cocktails',
    time: 'Mon-Fri 4PM-7PM'
  },
  {
    title: 'Chef\'s Table',
    description: 'Exclusive 7-course tasting menu with wine pairing',
    time: 'Every Thursday'
  }
])
</script>

<template>
  <section class="welcome-section">
    <div class="welcome-content">
      <h1 class="main-title" data-aos="fade-up">
        Welcome to <span>CulinaryDelights</span>
      </h1>
      <p class="subtitle" data-aos="fade-up" data-aos-delay="200">
        Where every meal tells a story
      </p>
      <div class="cta-buttons" data-aos="fade-up" data-aos-delay="400">
        <a href="#menu" class="cta-button primary">Explore Menu</a>
        <a href="#reservation" class="cta-button secondary">Book a Table</a>
      </div>
    </div>

    <div class="special-offers" data-aos="fade-up" data-aos-delay="600">
      <h2>Special Offers</h2>
      <div class="offers-grid">
        <div
          v-for="(offer, index) in specialOffers"
          :key="index"
          class="offer-card"
          :data-aos="`fade-${index % 2 === 0 ? 'right' : 'left'}`"
          :data-aos-delay="200 * (index + 1)"
        >
          <h3>{{ offer.title }}</h3>
          <p>{{ offer.description }}</p>
          <span class="time">{{ offer.time }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 5%;
  background: linear-gradient(135deg, rgba(230, 177, 126, 0.1), rgba(212, 148, 106, 0.1));
  text-align: center;
}

.welcome-content {
  max-width: 800px;
  margin-bottom: 4rem;
}

.main-title {
  font-size: 4.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.main-title span {
  color: var(--accent-color);
  display: block;
  font-size: 5rem;
}

.subtitle {
  font-size: 1.8rem;
  color: rgba(26, 26, 26, 0.8);
  margin-bottom: 3rem;
}

.cta-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.cta-button {
  padding: 1.2rem 2.5rem;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button.primary {
  background: var(--accent-color);
  color: white;
  box-shadow: 0 4px 15px rgba(230, 177, 126, 0.3);
}

.cta-button.secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--accent-color);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(230, 177, 126, 0.4);
}

.special-offers {
  width: 100%;
  max-width: 1200px;
  margin-top: 4rem;
}

.special-offers h2 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 3rem;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.offer-card {
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.offer-card:hover {
  transform: translateY(-5px);
}

.offer-card h3 {
  font-size: 1.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.offer-card p {
  color: rgba(26, 26, 26, 0.8);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.offer-card .time {
  display: block;
  font-weight: 600;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 3rem;
  }

  .main-title span {
    font-size: 3.5rem;
  }

  .subtitle {
    font-size: 1.4rem;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .cta-button {
    width: 100%;
  }

  .special-offers h2 {
    font-size: 2rem;
  }
}
</style>
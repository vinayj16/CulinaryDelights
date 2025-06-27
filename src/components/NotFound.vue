<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { gsap } from 'gsap'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  // Animate the 404 text
  gsap.from('.error-code', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'bounce.out'
  })

  // Animate the message text
  gsap.from('.error-message', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.5
  })

  // Animate the button
  gsap.from('.home-button', {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    delay: 1,
    ease: 'back.out(1.7)'
  })
})
</script>

<template>
  <div class="not-found-container">
    <div class="content">
      <h1 class="error-code">404</h1>
      <div class="error-message">
        <h2>Oops! Page Not Found</h2>
        <p>The culinary experience you're looking for seems to have wandered off our menu.</p>
      </div>
      <button @click="goHome" class="home-button">
        Return to Homepage
      </button>
    </div>
    <div class="decoration">
      <div class="plate"></div>
      <div class="utensils">
        <div class="fork"></div>
        <div class="knife"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.content {
  text-align: center;
  z-index: 1;
}

.error-code {
  font-size: 8rem;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
  margin: 2rem 0;
}

.error-message h2 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.error-message p {
  font-size: 1.2rem;
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}

.home-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.decoration {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  opacity: 0.1;
}

.plate {
  position: absolute;
  bottom: 70px;
  right: 70px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 8px solid var(--text-color);
}

.utensils {
  position: absolute;
  bottom: 100px;
  right: 100px;
  transform: rotate(-45deg);
}

.fork, .knife {
  position: absolute;
  background: var(--text-color);
}

.fork {
  width: 4px;
  height: 120px;
  left: -20px;
}

.fork::before {
  content: '';
  position: absolute;
  top: 0;
  left: -8px;
  width: 20px;
  height: 40px;
  border-left: 4px solid var(--text-color);
  border-right: 4px solid var(--text-color);
}

.knife {
  width: 4px;
  height: 120px;
  right: -20px;
}

.knife::before {
  content: '';
  position: absolute;
  top: 0;
  right: -4px;
  width: 12px;
  height: 80px;
  background: var(--text-color);
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-message h2 {
    font-size: 2rem;
  }

  .error-message p {
    font-size: 1rem;
  }

  .decoration {
    transform: scale(0.7);
  }
}
</style>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { heroImages as importedHeroImages, preloadImages } from '../assets/images'

const heroImages = ref(importedHeroImages)

// Preload images for better performance
preloadImages(importedHeroImages)

// Particle animation settings
const particles = ref([])
const particleCount = 20

// Restaurant features
const features = ref([
  {
    icon: 'local_dining',
    title: 'Fine Dining',
    description: 'Gourmet cuisine prepared by our award-winning chefs'
  },
  {
    icon: 'wine_bar',
    title: 'Premium Wine',
    description: 'Curated selection of fine wines from around the world'
  },
  {
    icon: 'event',
    title: 'Special Events',
    description: 'Host your special occasions with us'
  },
  {
    icon: 'local_fire_department',
    title: 'Chef Specials',
    description: 'Daily specials crafted by our master chefs'
  }
])

const currentImage = ref(0)
const isAnimating = ref(false)

function nextImage() {
  if (isAnimating.value) return

  isAnimating.value = true
  currentImage.value = (currentImage.value + 1) % heroImages.value.length

  const heroElement = document.querySelector('.hero-background')

  gsap.to(heroElement, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(heroElement, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating.value = false
        }
      })
    }
  })
}

function smoothScroll(target) {
  event.preventDefault()
  const element = document.querySelector(target)
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

// Initialize particles
function initParticles() {
  const container = document.querySelector('.hero-particles')
  if (!container) return

  // Clear existing particles
  container.innerHTML = ''

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'

    // Random position
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    // Random size
    const size = Math.random() * 3 + 1
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Random animation duration
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`

    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 2}s`

    // Random direction
    const xDir = Math.random() > 0.5 ? 1 : -1
    const yDir = Math.random() > 0.5 ? 1 : -1
    const xMove = Math.random() * 100 * xDir
    const yMove = Math.random() * 100 * yDir

    particle.style.setProperty('--x', `${xMove}px`)
    particle.style.setProperty('--y', `${yMove}px`)

    container.appendChild(particle)
  }
}

// Handle mouse movement for 3D effect
function handleMouseMove(e) {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window

  // Calculate mouse position relative to center
  const mouseX = (clientX / innerWidth) * 2 - 1
  const mouseY = (clientY / innerHeight) * 2 - 1

  // Update 3D transforms
  document.querySelector('.hero-background').style.transform =
    `scale(1.1) rotateX(${mouseY * -10}deg) rotateY(${mouseX * 10}deg)`

  document.querySelector('.hero-3d-title').style.transform =
    `translateZ(50px) rotateX(${mouseY * 5}deg) rotateY(${mouseX * 5}deg)`
}

// Handle touch events for mobile
function handleTouchMove(e) {
  if (e.touches.length > 0) {
    const touch = e.touches[0]
    handleMouseMove(touch)
  }
}

onMounted(() => {
  // Wait for DOM to be fully rendered
  nextTick(() => {
    // Initialize particles
    initParticles()

    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove)

    // Add touch move event listener for mobile
    window.addEventListener('touchmove', handleTouchMove)

    // Create a timeline for better animation control
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' }
    })

    // Animate hero background
    tl.from('.hero-background', {
      scale: 1.5,
      opacity: 0,
      duration: 1.5
    })

    // Animate hero elements with stagger effect
    tl.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.8')

    tl.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.6')

    tl.from('.hero-buttons .btn', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2
    }, '-=0.4')

    tl.from('.feature-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    }, '-=0.2')

    tl.from('.hero-scroll', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')

    // Add parallax effect to hero background
    const heroBackground = document.querySelector('.hero-background')
    const handleScroll = () => {
      if (!heroBackground) return
      const scrollPosition = window.pageYOffset
      const transform = `scale(1.2) rotateX(10deg) translate3d(0, ${scrollPosition * 0.15}px, 0)`
      heroBackground.style.transform = transform
    }

    window.addEventListener('scroll', handleScroll)

    // Auto-rotate hero images with fade effect
    const interval = setInterval(() => {
      if (!isAnimating.value) {
        nextImage()
      }
    }, 7000)

    // Clean up on component unmount
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  })
})
</script>

<template>
  <section id="home" class="hero" data-aos="fade-up">
    <div
      class="hero-background"
      :style="{
        backgroundImage: `url(${heroImages[currentImage].src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <div class="hero-image-overlay"></div>
    </div>

    <div class="hero-overlay"></div>

    <div class="hero-content" data-aos="fade-up">
      <div class="hero-3d-title" data-aos="fade-up">
        <h1 class="hero-title">Culinary Excellence</h1>
        <p class="hero-subtitle">Experience the art of fine dining with our award-winning chefs</p>
      </div>

      <div class="hero-buttons" data-aos="fade-up" data-aos-delay="200">
        <a href="#menu" class="btn btn-primary" @click="smoothScroll('#menu')">
          <span class="btn-icon">📖</span>
          View Menu
        </a>
        <a href="#reservation" class="btn btn-secondary" @click="smoothScroll('#reservation')">
          <span class="btn-icon">🍽️</span>
          Book a Table
        </a>
      </div>

      <div class="hero-features" data-aos="fade-up" data-aos-delay="400">
        <div class="feature-item">
          <div class="feature-icon">
            <i class="material-icons">local_dining</i>
          </div>
          <h3>Fine Dining</h3>
          <p>Gourmet cuisine prepared by our award-winning chefs</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <i class="material-icons">wine_bar</i>
          </div>
          <h3>Premium Wine</h3>
          <p>Curated selection of fine wines from around the world</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <i class="material-icons">event</i>
          </div>
          <h3>Special Events</h3>
          <p>Host your special occasions with us</p>
        </div>
      </div>
    </div>

    <div class="hero-scroll" data-aos="fade-up">
      <a href="#about" @click="smoothScroll('#about')">
        <span class="material-icons">expand_more</span>
      </a>
    </div>

    <div class="hero-particles"></div>
  </section>
</template>

<style scoped>
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1200px;
  background-color: #000;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  transform: scale(1.2) rotateX(10deg);
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  will-change: transform, opacity;
  filter: brightness(0.85) saturate(1.2);
}

.hero-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 1;
  backdrop-filter: blur(2px);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  width: 90%;
  padding: 2rem;
  transform-style: preserve-3d;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-3d-title {
  transform: translateZ(50px);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-bottom: 2rem;
  perspective: 1000px;
}

.hero-3d-title:hover {
  transform: translateZ(80px) rotateX(5deg);
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, var(--accent-color), #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 3rem;
  letter-spacing: 0.5px;
  font-weight: 500;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 2rem 0;
}

.hero-buttons .btn {
  position: relative;
  padding: 1.2rem 3rem;
  border-radius: 30px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.hero-buttons .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--accent-color), #4ecdc4);
  z-index: -1;
  transform: translateZ(-10px);
  transition: transform 0.3s ease;
  border-radius: 30px;
}

.hero-buttons .btn:hover::before {
  transform: translateZ(-5px);
}

.hero-buttons .btn-primary {
  background: var(--accent-color);
  border: 2px solid transparent;
  color: white;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.hero-buttons .btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.hero-buttons .btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 0 1rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  transform: translateZ(0);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-item:hover {
  transform: translateZ(30px) scale(1.05);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--accent-color);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-item:hover .feature-icon {
  background: var(--accent-color);
  color: white;
  transform: rotateY(180deg);
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
}

.feature-item h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.feature-item p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
}

.hero-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: bounce 2s infinite;
  z-index: 10;
}

.hero-scroll a {
  color: white;
  font-size: 2.5rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  display: block;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.hero-scroll a:hover {
  transform: translateY(-5px) rotateX(10deg);
  color: var(--accent-color);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Particle animation */
.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--accent-color);
  border-radius: 50%;
  animation: particle 3s infinite;
  animation-timing-function: ease-in-out;
  box-shadow: 0 0 10px 2px rgba(255, 107, 107, 0.3);
}

@keyframes particle {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    transform: translate(var(--x), var(--y)) scale(0);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }

  .hero-subtitle {
    font-size: 1.6rem;
  }

  .hero-buttons {
    gap: 1.5rem;
  }

  .hero-buttons .btn {
    padding: 1rem 2.5rem;
  }

  .hero-features {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.4rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-buttons .btn {
    width: 100%;
    padding: 1rem 2rem;
  }

  .hero-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-item {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    gap: 0.8rem;
  }

  .hero-buttons .btn {
    padding: 0.8rem 1.5rem;
  }
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }

  .hero-subtitle {
    font-size: 1.6rem;
  }

  .hero-content {
    width: 95%;
    padding: 1.5rem;
  }

  .hero-buttons {
    gap: 1.5rem;
  }

  .hero-buttons .btn {
    padding: 1rem 2.5rem;
  }

  .hero-features {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
    letter-spacing: -0.5px;
  }

  .hero-subtitle {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
    margin: 1.5rem auto;
  }

  .hero-buttons .btn {
    width: 100%;
    padding: 1rem 2rem;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  .feature-item {
    padding: 1.5rem;
  }

  .hero-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-content {
    padding: 1rem;
  }

  .hero-3d-title {
    margin-bottom: 1rem;
  }

  .feature-item h3 {
    font-size: 1.2rem;
  }

  .feature-item p {
    font-size: 0.9rem;
  }

  .hero-scroll {
    bottom: 20px;
  }

  .hero-scroll a {
    font-size: 2rem;
  }

  .hero-buttons .btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-15px) translateX(-50%);
  }
  60% {
    transform: translateY(-7px) translateX(-50%);
  }
}
</style>

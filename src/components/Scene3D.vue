<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

const canvasRef = ref(null);
let isAnimating = true;

onMounted(() => {
  initScene();

  // Responsive handling
  window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  isAnimating = false;
});

function initScene() {
  // Since Three.js models might not load properly, we'll create a visual alternative
  const canvas = canvasRef.value;
  if (!canvas) return;

  // Create a simple animated background
  canvas.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)';
  canvas.style.backgroundSize = '400% 400%';

  // Animate the background
  gsap.to(canvas, {
    backgroundPosition: '100% 100%',
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'none'
  });

  // Add floating elements animation
  addFloatingElements();
}

function addFloatingElements() {
  const container = document.querySelector('.scene-canvas');
  if (!container) return;

  // Create floating food icons
  const foodIcons = ['🍽️', '🥘', '🍷', '🧑‍🍳', '⭐'];

  foodIcons.forEach((icon, index) => {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = icon;
    element.style.position = 'absolute';
    element.style.fontSize = '2rem';
    element.style.left = `${Math.random() * 80 + 10}%`;
    element.style.top = `${Math.random() * 80 + 10}%`;
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';

    container.appendChild(element);

    // Animate floating
    gsap.to(element, {
      y: -20,
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: index * 0.5
    });

    gsap.to(element, {
      rotation: 360,
      duration: 10 + Math.random() * 10,
      repeat: -1,
      ease: 'none'
    });
  });
}

function onWindowResize() {
  // Handle responsive behavior
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '400px';
  }
}
</script>

<template>
  <section id="experience" class="scene-container">
    <div class="scene-content">
      <h2 data-aos="fade-up">Immersive Dining Experience</h2>
      <p data-aos="fade-up" data-aos-delay="200">
        Explore our signature dishes and restaurant atmosphere. Experience the artistry of our culinary creations.
      </p>
    </div>

    <div class="experience-wrapper">
      <div ref="canvasRef" class="scene-canvas" data-aos="zoom-in">
        <div class="scene-overlay">
          <div class="scene-instruction">
            <span class="icon">✨</span>
            <span>Interactive Experience</span>
          </div>
        </div>
      </div>

      <!-- Image gallery on the right side -->
      <div class="image-showcase" data-aos="fade-left">
        <h3>Our Signature Dishes</h3>
        <div class="image-grid">
          <div class="image-item">
            <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Signature Dish 1">
            <div class="image-caption">Truffle Infused Risotto</div>
          </div>
          <div class="image-item">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Signature Dish 2">
            <div class="image-caption">Seared Scallops</div>
          </div>
          <div class="image-item">
            <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Signature Dish 3">
            <div class="image-caption">Chocolate Soufflé</div>
          </div>
          <div class="image-item">
            <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Signature Dish 4">
            <div class="image-caption">Herb Crusted Lamb</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scene-container {
  padding: 100px 2rem;
  position: relative;
  overflow: hidden;
  background: var(--light-bg);
  transition: var(--theme-transition);
}

:global(.dark-theme) .scene-container {
  background: var(--dark-bg);
}

.scene-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.scene-content h2 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.scene-content p {
  font-size: 1.2rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.experience-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.scene-canvas {
  flex: 1;
  min-width: 0;
  height: 400px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.05);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
  animation: gradientShift 10s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

:global(.dark-theme) .scene-canvas {
  background: rgba(255, 255, 255, 0.05);
}

.scene-overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.scene-instruction {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.scene-instruction .icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.image-showcase {
  flex: 1;
  padding: 1.5rem;
  background: var(--glass-bg);
  border-radius: 15px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-theme) .image-showcase {
  background: rgba(40, 40, 40, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.image-showcase h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  text-align: center;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.image-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: translateY(-5px);
}

.image-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.image-item:hover img {
  transform: scale(1.1);
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 992px) {
  .experience-wrapper {
    flex-direction: column;
  }

  .image-showcase {
    width: 100%;
  }

  .scene-canvas {
    width: 100%;
    margin-bottom: 2rem;
  }
}

@media (max-width: 576px) {
  .image-grid {
    grid-template-columns: 1fr;
  }

  .image-item img {
    height: 180px;
  }

  .scene-content h2 {
    font-size: 2.2rem;
  }
}
</style>
 <script setup>
<script setup>
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Fine Dining Experience',
    title: 'Elegant Dining Room'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Signature Dish',
    title: 'Chef\'s Special'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    alt: 'Wine Selection',
    title: 'Premium Wines'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Outdoor Seating',
    title: 'Garden Terrace'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Private Events',
    title: 'Event Space'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    alt: 'Dessert Selection',
    title: 'Sweet Delights'
  }
]

const selectedImage = ref(null)

const openLightbox = (image) => {
  selectedImage.value = image
}

const closeLightbox = () => {
  selectedImage.value = null
}
</script>

<template>
  <section id="gallery" class="gallery">
    <h2>Our Gallery</h2>
    <div class="gallery-grid">
      <div v-for="image in galleryImages"
           :key="image.id"
           class="gallery-item"
           @click="openLightbox(image)"
           data-aos="fade-up">
        <img :src="image.src" :alt="image.alt" loading="lazy">
        <div class="overlay">
          <h3>{{ image.title }}</h3>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="selectedImage" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <img :src="selectedImage.src" :alt="selectedImage.alt">
        <h3>{{ selectedImage.title }}</h3>
        <button class="close-button" @click="closeLightbox">&times;</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  padding: 5rem 2rem;
  background-color: #ffffff;
}

h2 {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  height: 250px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay h3 {
  margin: 0;
  font-size: 1.2rem;
}

/* Lightbox styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-content h3 {
  color: white;
  text-align: center;
  margin-top: 1rem;
}

.close-button {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .gallery {
    padding: 3rem 1rem;
  }

  h2 {
    font-size: 2rem;
  }

  .gallery-item {
    height: 200px;
  }
}
</style>
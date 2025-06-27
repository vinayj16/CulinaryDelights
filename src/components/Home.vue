<script setup>
import Hero from './Hero.vue'
import InteractiveMenu from './InteractiveMenu.vue'
import Scene3D from './Scene3D.vue'
import FoodGallery from './FoodGallery.vue'
import ChefProfiles from './ChefProfiles.vue'
import Testimonials from './Testimonials.vue'
import Reservation from './Reservation.vue'
import BlogPreview from './BlogPreview.vue'
</script>

<template>
  <div class="home">
    <Hero id="home" />
    <Scene3D />
    <FoodGallery id="gallery" />
    <InteractiveMenu id="menu" />
    <ChefProfiles id="about" />
    <Testimonials />
    <Reservation id="reservation" />
    <BlogPreview />
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}
</style>
<template>
  <section class="blog-preview">
    <div v-for="post in blogPosts" :key="post.id" class="post" @click="goToBlog(post.id)">
      <img :src="post.image" :alt="post.title" />
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
      <p><strong>Author:</strong> {{ post.author }}</p>
      <p><strong>Date:</strong> {{ post.date }}</p>
      <p><strong>Category:</strong> {{ post.category }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const blogPosts = ref([
  {
    id: 1,
    title: 'The Art of Fine Dining',
    excerpt: 'Discover the subtle nuances that transform a meal into an unforgettable experience.',
    image: './images/theartofdining.jpg',
    date: 'June 15, 2023',
    author: 'Chef Michael',
    category: 'Culinary Arts'
  },
  {
    id: 2,
    title: 'Seasonal Ingredients: Summer Edition',
    excerpt: 'Explore the vibrant flavors of summer with our guide to seasonal ingredients and recipes.',
    image: './images/Seasonalingredients.jpg',
    date: 'July 3, 2023',
    author: 'Emma Wilson',
    category: 'Ingredients'
  },
  {
    id: 3,
    title: 'Wine Pairing Fundamentals',
    excerpt: 'Learn the essential principles of pairing wines with different dishes to elevate your dining experience.',
    image: './images/Winepairingfundamentals.jpg',
    date: 'May 22, 2023',
    author: 'Sommelier David',
    category: 'Beverages'
  }
])

const goToBlog = (id) => {
  router.push({ name: 'Blog', params: { id } })
}
</script>

<style scoped>
.blog-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.post {
  cursor: pointer;
  max-width: 300px;
  text-align: center;
}

img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
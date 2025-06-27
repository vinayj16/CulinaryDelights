<template>
  <section class="blog">
    <h1>{{ blogPost.title }}</h1>
    <img :src="blogPost.image" :alt="blogPost.title" />
    <p>{{ blogPost.content }}</p>
    <p><strong>Author:</strong> {{ blogPost.author }}</p>
    <p><strong>Date:</strong> {{ blogPost.date }}</p>
    <p><strong>Category:</strong> {{ blogPost.category }}</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const blogPost = ref({})

const fetchBlogPost = (id) => {
  // Simulate fetching blog post data
  const posts = [
    {
      id: 1,
      title: 'The Art of Fine Dining',
      content: 'Full content of The Art of Fine Dining...',
      image: 'https://via.placeholder.com/600x400/FF5F6D/FFFFFF?text=Fine+Dining',
      date: 'June 15, 2023',
      author: 'Chef Michael',
      category: 'Culinary Arts'
    },
    {
      id: 2,
      title: 'Seasonal Ingredients: Summer Edition',
      content: 'Full content of Seasonal Ingredients: Summer Edition...',
      image: 'https://via.placeholder.com/600x400/FFC371/FFFFFF?text=Seasonal+Ingredients',
      date: 'July 3, 2023',
      author: 'Emma Wilson',
      category: 'Ingredients'
    },
    {
      id: 3,
      title: 'Wine Pairing Fundamentals',
      content: 'Full content of Wine Pairing Fundamentals...',
      image: 'https://via.placeholder.com/600x400/6A82FB/FFFFFF?text=Wine+Pairing',
      date: 'May 22, 2023',
      author: 'Sommelier David',
      category: 'Beverages'
    }
  ]
  blogPost.value = posts.find(post => post.id === parseInt(id))
}

onMounted(() => {
  const { id } = route.params
  fetchBlogPost(id)
})
</script>

<style scoped>
.blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>
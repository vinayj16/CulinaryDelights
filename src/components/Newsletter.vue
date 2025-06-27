<script setup>
import { ref } from 'vue'

const email = ref('')
const subscriptionStatus = ref('')

const handleSubmit = () => {
  if (email.value && validateEmail(email.value)) {
    subscriptionStatus.value = 'Thank you for subscribing!'
    email.value = ''
    setTimeout(() => {
      subscriptionStatus.value = ''
    }, 3000)
  } else {
    subscriptionStatus.value = 'Please enter a valid email address.'
  }
}

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
</script>

<template>
  <section class="newsletter" data-aos="fade-up">
    <div class="newsletter-content">
      <h2>Stay Updated</h2>
      <p>Subscribe to our newsletter for exclusive offers and updates</p>
      
      <form @submit.prevent="handleSubmit" class="newsletter-form">
        <div class="input-group">
          <input 
            type="email" 
            v-model="email" 
            placeholder="Enter your email address"
            required
            aria-label="Email address"
          >
          <button type="submit">Subscribe</button>
        </div>
        <p class="status-message" :class="{ success: subscriptionStatus.includes('Thank you') }">
          {{ subscriptionStatus }}
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  background-color: #1a1a1a;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #e6b17e;
}

p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #ffffff;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
}

input {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  padding: 1rem 2rem;
  background-color: #e6b17e;
  color: #1a1a1a;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d4935f;
}

.status-message {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ff6b6b;
}

.status-message.success {
  color: #4caf50;
}

@media (max-width: 768px) {
  .newsletter {
    padding: 3rem 1rem;
  }

  h2 {
    font-size: 2rem;
  }

  .input-group {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>
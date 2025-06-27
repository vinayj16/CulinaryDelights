<script setup>
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  reservationDate: '',
  guests: 1
})

const formStatus = ref({
  submitted: false,
  error: null
})

const businessHours = ref([
  { day: 'Monday - Thursday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Friday - Saturday', hours: '11:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '12:00 PM - 9:00 PM' }
])

const socialLinks = ref([
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com/culinarydelights' },
  { name: 'Instagram', icon: '📸', url: 'https://instagram.com/culinarydelights' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/culinarydelights' }
])

const contactInfo = ref({
  address: '123 Gourmet Avenue, Foodie District',
  phone: '+1 (555) 123-4567',
  email: 'reservations@culinarydelights.com'
})

const isFormValid = () => {
  return formData.value.name && 
         formData.value.email && 
         formData.value.message && 
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
}

const isLoading = ref(false)

const handleSubmit = async () => {
  if (!isFormValid()) {
    formStatus.value.error = 'Please fill in all required fields correctly.'
    return
  }
  isLoading.value = true
  formStatus.value.error = null
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    })
    const data = await response.json()
    isLoading.value = false
    if (data.success) {
      formStatus.value.submitted = true
      formStatus.value.error = null
      formData.value = {
        name: '',
        email: '',
        phone: '',
        message: '',
        reservationDate: '',
        guests: 1
      }
    } else {
      formStatus.value.error = data.message || 'An error occurred. Please try again.'
    }
  } catch (error) {
    isLoading.value = false
    formStatus.value.error = 'An error occurred. Please try again.'
  }
}

const contactRef = ref(null)
const { isVisible } = useMotion(contactRef, {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
})
</script>

<template>
  <section id="contact" class="contact-section" ref="contactRef">
    <div class="contact-container">
      <h2 class="section-title" data-aos="fade-up">Contact Us</h2>

      <div class="contact-grid">
        <!-- Contact Form -->
        <div class="contact-form" data-aos="fade-up" data-aos-delay="100">
          <h3>Make a Reservation</h3>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name *</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                required
                placeholder="Your Name"
              >
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required
                placeholder="your@email.com"
              >
            </div>

            <div class="form-group">
              <label for="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formData.phone"
                placeholder="(555) 123-4567"
              >
            </div>

            <div class="form-group">
              <label for="reservation-date">Preferred Date</label>
              <input 
                type="datetime-local" 
                id="reservation-date" 
                v-model="formData.reservationDate"
              >
            </div>

            <div class="form-group">
              <label for="guests">Number of Guests</label>
              <input 
                type="number" 
                id="guests" 
                v-model="formData.guests"
                min="1"
                max="20"
              >
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                required
                placeholder="Your message or special requests"
                rows="4"
              ></textarea>
            </div>

            <div v-if="formStatus.error" class="error-message">
              {{ formStatus.error }}
            </div>

            <div v-if="formStatus.submitted" class="success-message">
              Thank you for your message! We'll get back to you soon.
            </div>

            <button 
              type="submit" 
              class="submit-button"
              :disabled="!isFormValid()"
            >
              Send Message
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="contact-info" data-aos="fade-up" data-aos-delay="200">
          <div class="info-section">
            <h3>Visit Us</h3>
            <p>{{ contactInfo.address }}</p>
            
            <!-- Embedded Map -->
            <div class="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.5678!2d-73.9876!3d40.7485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcyNy4wIk4gNzPCsDU5JzE1LjQiVw!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="250"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div class="info-section">
            <h3>Business Hours</h3>
            <ul class="hours-list">
              <li v-for="(schedule, index) in businessHours" :key="index">
                <span class="day">{{ schedule.day }}</span>
                <span class="hours">{{ schedule.hours }}</span>
              </li>
            </ul>
          </div>

          <div class="info-section">
            <h3>Get in Touch</h3>
            <p>
              <strong>Phone:</strong> {{ contactInfo.phone }}<br>
              <strong>Email:</strong> {{ contactInfo.email }}
            </p>
          </div>

          <div class="social-links">
            <h3>Follow Us</h3>
            <div class="social-icons">
              <a 
                v-for="link in socialLinks" 
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
              >
                <span class="icon">{{ link.icon }}</span>
                <span class="name">{{ link.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 5rem 2rem;
  background-color: var(--background-color);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}

.submit-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;
}

.submit-button:hover {
  background: var(--secondary-color);
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: #ffe6e6;
}

.success-message {
  color: #28a745;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: #e6ffe6;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-section h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.map-container {
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.hours-list {
  list-style: none;
  padding: 0;
}

.hours-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.social-links {
  margin-top: auto;
}

.social-icons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 25px;
  text-decoration: none;
  color: var(--text-color);
  transition: background-color 0.3s ease;
}

.social-icon:hover {
  background: var(--primary-color);
  color: white;
}

.icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .contact-grid {
    gap: 2rem;
  }

  .contact-form,
  .info-section {
    padding: 1.5rem;
  }
}
</style>
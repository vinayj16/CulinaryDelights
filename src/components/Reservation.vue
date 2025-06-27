<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { gsap } from 'gsap'

// Form state
const formState = reactive({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  specialRequests: '',
  occasion: '',
  seatingPreference: 'no-preference'
})

// Form validation state
const formErrors = reactive({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: ''
})

// Form touched state (for validation)
const touched = reactive({
  name: false,
  email: false,
  phone: false,
  date: false,
  time: false
})

// Available times based on date selection
const availableTimes = ref([
  '11:30', '12:00', '12:30', '13:00', '13:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
])

// Special occasions
const occasions = ref([
  'Birthday', 'Anniversary', 'Business Meeting', 'Date Night', 'Other'
])

// Seating preferences
const seatingPreferences = ref([
  { value: 'no-preference', label: 'No Preference' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor (Weather Permitting)' },
  { value: 'bar', label: 'Bar Seating' },
  { value: 'private', label: 'Private Room (Groups of 6+)' }
])

// Form state
const isSubmitting = ref(false)
const isSuccess = ref(false)
const formError = ref('')
const showConfetti = ref(false)

// Get today's date in YYYY-MM-DD format for min date attribute
const today = new Date().toISOString().split('T')[0]

// Calculate max date (6 months from today)
const maxDate = (() => {
  const date = new Date()
  date.setMonth(date.getMonth() + 6)
  return date.toISOString().split('T')[0]
})()

// Validate email format
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Validate phone format
const validatePhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return re.test(String(phone))
}

// Validate form fields
const validateField = (field) => {
  touched[field] = true

  switch (field) {
    case 'name':
      formErrors.name = formState.name.length < 3 ? 'Name must be at least 3 characters' : ''
      break
    case 'email':
      formErrors.email = !formState.email ? 'Email is required' :
                         !validateEmail(formState.email) ? 'Please enter a valid email' : ''
      break
    case 'phone':
      formErrors.phone = !formState.phone ? 'Phone number is required' :
                         !validatePhone(formState.phone) ? 'Please enter a valid phone number' : ''
      break
    case 'date':
      formErrors.date = !formState.date ? 'Date is required' : ''
      break
    case 'time':
      formErrors.time = !formState.time ? 'Time is required' : ''
      break
  }
}

// Check if form is valid
const isFormValid = computed(() => {
  return !formErrors.name &&
         !formErrors.email &&
         !formErrors.phone &&
         !formErrors.date &&
         !formErrors.time &&
         formState.name &&
         formState.email &&
         formState.phone &&
         formState.date &&
         formState.time
})

// Submit reservation
function submitReservation() {
  // Validate all fields
  ['name', 'email', 'phone', 'date', 'time'].forEach(field => {
    validateField(field)
  })

  // If form is not valid, return
  if (!isFormValid.value) {
    // Scroll to first error
    const firstError = document.querySelector('.error-text')
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }

  isSubmitting.value = true
  formError.value = ''

  // Real API call
  fetch('/api/reservation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formState)
  })
    .then(async (res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      if (data.success) {
        isSubmitting.value = false
        isSuccess.value = true
        showConfetti.value = true
        setTimeout(() => {
          showConfetti.value = false
        }, 3000)
        setTimeout(() => {
          isSuccess.value = false
          Object.keys(formState).forEach(key => {
            if (key === 'guests') {
              formState[key] = 2
            } else if (key === 'seatingPreference') {
              formState[key] = 'no-preference'
            } else {
              formState[key] = ''
            }
          })
          Object.keys(touched).forEach(key => {
            touched[key] = false
          })
        }, 5000)
      } else {
        throw new Error(data.message || 'Reservation failed')
      }
    })
    .catch((err) => {
      isSubmitting.value = false
      formError.value = err.message || 'Unable to complete your reservation. Please try again or call us directly.'
    })
}

// Increment guests
function incrementGuests() {
  if (formState.guests < 20) {
    formState.guests++
  }
}

// Decrement guests
function decrementGuests() {
  if (formState.guests > 1) {
    formState.guests--
  }
}

// Create confetti effect
function createConfetti() {
  const confettiContainer = document.querySelector('.confetti-container')
  if (!confettiContainer) return

  confettiContainer.innerHTML = ''

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'

    // Random position
    confetti.style.left = `${Math.random() * 100}%`
    confetti.style.top = `${Math.random() * 100}%`

    // Random size
    const size = Math.random() * 10 + 5
    confetti.style.width = `${size}px`
    confetti.style.height = `${size}px`

    // Random color
    const colors = ['#ff6b6b', '#4ecdc4', '#ffbe76', '#7bed9f', '#54a0ff']
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

    // Random rotation
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`

    // Random animation duration
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`

    // Random animation delay
    confetti.style.animationDelay = `${Math.random() * 0.5}s`

    confettiContainer.appendChild(confetti)
  }
}

// Watch for confetti state changes
watch(() => showConfetti.value, (newValue) => {
  if (newValue) {
    createConfetti()
  }
})

// Initialize component
onMounted(() => {
  // Animate form on mount
  gsap.from('.reservation-form', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })

  gsap.from('.reservation-info', {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
})
</script>

<template>
  <section id="reservation" class="reservation-section">
    <div class="reservation-container">
      <div class="reservation-info" data-aos="fade-right">
        <!-- Ensure the image container is properly displayed -->
        <div class="reservation-image-container">


          <!-- Use a placeholder if the actual image doesn't exist -->
          <img 
            src="/images/table-reservation.jpg" 
            alt="Elegant table setting" 
            class="reservation-image"
            @error="$event.target.src='https://via.placeholder.com/800x400/FF5F6D/FFFFFF?text=Elegant+Table+Setting'"
          >
        </div>
        
        <h2 class="section-title">Reserve Your Table</h2>
        <p class="section-subtitle">Experience our culinary delights by booking your table in advance. We look forward to serving you.</p>

        <div class="contact-info">
          <div class="contact-item">
            <i class="material-icons contact-icon">phone</i>
            <span>+1 (555) 123-4567</span>
          </div>
          <div class="contact-item">
            <i class="material-icons contact-icon">email</i>
            <span>reservations@restaurant.com</span>
          </div>
          <div class="contact-item">
            <i class="material-icons contact-icon">location_on</i>
            <span>123 Gourmet Street, Foodville</span>
          </div>
        </div>

        <div class="hours-info">
          <h3>Opening Hours</h3>
          <div class="hours-grid">
            <div>Monday - Thursday</div>
            <div>11:30 AM - 10:00 PM</div>
            <div>Friday - Saturday</div>
            <div>11:30 AM - 11:00 PM</div>
            <div>Sunday</div>
            <div>11:30 AM - 9:00 PM</div>
          </div>
        </div>
      </div>

      <div class="reservation-form-container" data-aos="fade-left">
        <form @submit.prevent="submitReservation" class="reservation-form" :class="{ 'submitting': isSubmitting }">
          <div v-if="isSuccess" class="success-message">
            <div class="confetti-container" v-if="showConfetti"></div>
            <div class="success-icon">
              <i class="material-icons">check</i>
            </div>
            <h3>Reservation Confirmed!</h3>
            <p>We've sent a confirmation to your email.</p>
            <div class="reservation-details">
              <p><strong>Date:</strong> {{ formState.date }}</p>
              <p><strong>Time:</strong> {{ formState.time }}</p>
              <p><strong>Guests:</strong> {{ formState.guests }}</p>
            </div>
          </div>

          <template v-else>
            <div class="form-header">
              <h3>Book a Table</h3>
              <p>Fill out the form below to reserve your table</p>
            </div>

            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="formState.name"
                @blur="validateField('name')"
                placeholder="John Doe"
                :class="{ 'error': touched.name && formErrors.name }"
              >
              <span v-if="touched.name && formErrors.name" class="error-text">{{ formErrors.name }}</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="formState.email"
                  @blur="validateField('email')"
                  placeholder="your@email.com"
                  :class="{ 'error': touched.email && formErrors.email }"
                >
                <span v-if="touched.email && formErrors.email" class="error-text">{{ formErrors.email }}</span>
              </div>

              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formState.phone"
                  @blur="validateField('phone')"
                  placeholder="(555) 123-4567"
                  :class="{ 'error': touched.phone && formErrors.phone }"
                >
                <span v-if="touched.phone && formErrors.phone" class="error-text">{{ formErrors.phone }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="date">Date</label>
                <input
                  type="date"
                  id="date"
                  v-model="formState.date"
                  @blur="validateField('date')"
                  :min="today"
                  :max="maxDate"
                  :class="{ 'error': touched.date && formErrors.date }"
                >
                <span v-if="touched.date && formErrors.date" class="error-text">{{ formErrors.date }}</span>
              </div>

              <div class="form-group">
                <label for="time">Time</label>
                <select
                  id="time"
                  v-model="formState.time"
                  @blur="validateField('time')"
                  :class="{ 'error': touched.time && formErrors.time }"
                >
                  <option value="" disabled>Select time</option>
                  <option v-for="time in availableTimes" :key="time" :value="time">
                    {{ time }}
                  </option>
                </select>
                <span v-if="touched.time && formErrors.time" class="error-text">{{ formErrors.time }}</span>
              </div>
            </div>

            <div class="form-group">
              <label>Number of Guests</label>
              <div class="guests-selector">
                <button type="button" @click="decrementGuests" class="guest-btn">
                  <i class="material-icons">remove</i>
                </button>
                <span class="guest-count">{{ formState.guests }}</span>
                <button type="button" @click="incrementGuests" class="guest-btn">
                  <i class="material-icons">add</i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="occasion">Special Occasion</label>
              <select id="occasion" v-model="formState.occasion">
                <option value="" disabled selected>Select if applicable</option>
                <option v-for="occasion in occasions" :key="occasion" :value="occasion">
                  {{ occasion }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Seating Preference</label>
              <div class="seating-options">
                <div
                  v-for="option in seatingPreferences"
                  :key="option.value"
                  class="seating-option"
                  :class="{ 'active': formState.seatingPreference === option.value }"
                  @click="formState.seatingPreference = option.value"
                >
                  <i class="material-icons" v-if="option.value === 'indoor'">chair</i>
                  <i class="material-icons" v-else-if="option.value === 'outdoor'">deck</i>
                  <i class="material-icons" v-else-if="option.value === 'bar'">local_bar</i>
                  <i class="material-icons" v-else-if="option.value === 'private'">meeting_room</i>
                  <i class="material-icons" v-else>check_box_outline_blank</i>
                  <span>{{ option.label }}</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                v-model="formState.specialRequests"
                placeholder="Any dietary restrictions or special requests?"
                rows="3"
              ></textarea>
            </div>

            <div v-if="formError" class="error-message">
              {{ formError }}
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting || !isFormValid">
              <span v-if="isSubmitting">
                <span class="spinner"></span>
                Processing...
              </span>
              <span v-else>
                <i class="material-icons">event_available</i>
                Reserve Now
              </span>
            </button>
          </template>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reservation-section {
  padding: 100px 2rem;
  background: var(--light-bg);
  transition: var(--theme-transition);
  position: relative;
}

:global(.dark-theme) .reservation-section {
  background: var(--dark-bg);
}

.section-title {
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  position: relative;
  display: inline-block;
  transition: var(--theme-transition);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.section-title:hover::after {
  width: 100%;
}

.section-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.reservation-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

@media (min-width: 992px) {
  .reservation-container {
    flex-direction: row;
    align-items: flex-start;
  }
}

.reservation-info {
  flex: 1;
  padding: 2rem;
  background: var(--glass-bg);
  border-radius: 15px;
  box-shadow: var(--shadow);
  transition: var(--theme-transition);
}

:global(.dark-theme) .reservation-info {
  background: rgba(40, 40, 40, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Improved image container styling */
.reservation-image-container {
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
  height: 250px; /* Fixed height for consistency */
  position: relative; /* For positioning fallback text */
}

.reservation-image-container:hover {
  transform: scale(1.02);
}

.reservation-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover; /* This ensures the image covers the container properly */
}

.contact-info {
  margin-bottom: 2.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.contact-icon {
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-right: 1rem;
  transition: transform 0.3s ease;
}

.contact-item:hover .contact-icon {
  transform: scale(1.2);
}

.hours-info h3 {
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  color: var(--accent-color);
  transition: var(--theme-transition);
}

.hours-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-theme) .hours-grid {
  background: rgba(0, 0, 0, 0.2);
}

.reservation-form-container {
  flex: 1;
  position: relative;
}

.reservation-form {
  background: var(--glass-bg);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-theme) .reservation-form {
  background: rgba(40, 40, 40, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.reservation-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-header h3 {
  font-size: 2rem;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
  transition: var(--theme-transition);
}

.form-header p {
  color: var(--text-color);
  transition: var(--theme-transition);
}

.form-group {
  margin-bottom: 1.8rem;
  position: relative;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.8rem;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
  transition: var(--theme-transition);
}

input, select, textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-color);
}

:global(.dark-theme) input,
:global(.dark-theme) select,
:global(.dark-theme) textarea {
  background: rgba(30, 30, 30, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
  color: white;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
  outline: none;
}

input.error, select.error {
  border-color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.05);
}

.error-text {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  display: block;
}

.guests-selector {
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  transition: var(--theme-transition);
}

:global(.dark-theme) .guests-selector {
  background: rgba(30, 30, 30, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.guest-btn {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-color);
}

:global(.dark-theme) .guest-btn {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.guest-btn:hover {
  background: var(--accent-color);
  color: white;
}

.guest-count {
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.8rem 0;
  font-weight: 600;
  color: var(--text-color);
  transition: var(--theme-transition);
}

:global(.dark-theme) .guest-count {
  color: white;
}

.seating-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.seating-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

:global(.dark-theme) .seating-option {
  background: rgba(30, 30, 30, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.seating-option.active {
  border-color: var(--accent-color);
  background: rgba(255, 107, 107, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

:global(.dark-theme) .seating-option.active {
  background: rgba(255, 107, 107, 0.2);
}

.seating-option i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.seating-option.active i {
  color: var(--accent-color);
}

.seating-option span {
  font-size: 0.9rem;
  text-align: center;
  color: var(--text-color);
  transition: var(--theme-transition);
}

:global(.dark-theme) .seating-option span {
  color: white;
}

.submit-btn {
  width: 100%;
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 15px rgba(255, 107, 107, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #ccc;
  box-shadow: none;
}

.spinner {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-message {
  text-align: center;
  padding: 2rem 0;
  position: relative;
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: var(--accent-color);
  border-radius: 2px;
  animation: confetti-fall 3s linear forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100%) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(1000%) rotate(720deg);
    opacity: 0;
  }
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--accent-color);
  color: white;
  font-size: 2.5rem;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
  z-index: 2;
  position: relative;
}

.success-message h3 {
  font-size: 2rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.success-message p {
  color: var(--text-color);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  transition: var(--theme-transition);
}

.reservation-details {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
}

:global(.dark-theme) .reservation-details {
  background: rgba(0, 0, 0, 0.2);
}

.reservation-details p {
  margin-bottom: 0.5rem;
}

.reservation-details strong {
  color: var(--accent-color);
}

.error-message {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #e74c3c;
  transition: var(--theme-transition);
}

:global(.dark-theme) .error-message {
  background: rgba(231, 76, 60, 0.2);
}

@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.submitting {
  position: relative;
}

.submitting::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, var(--accent-color), #4ecdc4);
  animation: loading 2s infinite linear;
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Enhanced responsive styles */
@media (max-width: 992px) {
  .reservation-container {
    flex-direction: column;
  }
  
  .reservation-info,
  .reservation-form-container {
    width: 100%;
  }
  
  .reservation-image-container {
    height: 300px; /* Taller on medium screens */
  }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }

  .seating-options {
    grid-template-columns: 1fr 1fr;
  }

  .reservation-form {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .success-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
  
  .reservation-section {
    padding: 80px 1.5rem;
  }
}

@media (max-width: 480px) {
  .seating-options {
    grid-template-columns: 1fr;
  }

  .reservation-section {
    padding: 60px 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .form-header h3 {
    font-size: 1.6rem;
  }
  
  .reservation-image-container {
    height: 200px; /* Shorter on small screens */
  }
  
  .reservation-info,
  .reservation-form {
    padding: 1.5rem;
  }
}
</style>
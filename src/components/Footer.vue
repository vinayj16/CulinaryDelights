<script setup>
import { ref } from 'vue'

// Current year for copyright
const currentYear = new Date().getFullYear()

// Newsletter form
const email = ref('')
const isSubscribed = ref(false)
const subscribeError = ref('')

// Subscribe to newsletter
function subscribeNewsletter() {
  if (!email.value) {
    subscribeError.value = 'Please enter your email'
    return
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    subscribeError.value = 'Please enter a valid email'
    return
  }
  
  // Simulate API call
  setTimeout(() => {
    isSubscribed.value = true
    subscribeError.value = ''
    email.value = ''
    
    // Reset after 5 seconds
    setTimeout(() => {
      isSubscribed.value = false
    }, 5000)
  }, 1000)
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-info">
          <div class="footer-logo">
            <img src="/images/restaurant1.jpg" alt="Restaurant Logo" class="logo-image" @error="event => event.target.src='https://via.placeholder.com/120x40?text=Logo'">
            <h3>Gourmet Haven</h3>
          </div>
          <p class="footer-description">
            Experience culinary excellence in a warm and inviting atmosphere. Our passion for food and dedication to service ensures an unforgettable dining experience.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <i class="material-icons">facebook</i>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <i class="material-icons">photo_camera</i>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <i class="material-icons">twitter</i>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <i class="material-icons">smart_display</i>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-links-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#reservation">Reservations</a></li>
              <li><a href="#online-order">Order Online</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h4>Contact Info</h4>
            <ul class="contact-info">
              <li>
                <i class="material-icons">location_on</i>
                <span>123 Gourmet Street, Foodville</span>
              </li>
              <li>
                <i class="material-icons">phone</i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <i class="material-icons">email</i>
                <span>info@restaurant.com</span>
              </li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h4>Hours</h4>
            <ul>
              <li>Mon-Thu: 11:30 AM - 10:00 PM</li>
              <li>Fri-Sat: 11:30 AM - 11:00 PM</li>
              <li>Sun: 11:30 AM - 9:00 PM</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <p>Stay updated with our latest menu items and special events</p>
        
        <div v-if="isSubscribed" class="subscribe-success">
          <span class="success-icon">✓</span>
          <p>Thank you for subscribing!</p>
        </div>
        
        <form v-else @submit.prevent="subscribeNewsletter" class="subscribe-form">
          <div class="input-wrapper">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Your email address" 
              :class="{ 'error': subscribeError }"
              required
            >
            <span v-if="subscribeError" class="error-message">{{ subscribeError }}</span>
          </div>
          <button type="submit">Subscribe</button>
        </form>
      </div>
      
      <div class="social-links">
        <a href="#" class="social-link">
          <span class="material-icons">facebook</span>
        </a>
        <a href="#" class="social-link">
          <span class="material-icons">alternate_email</span>
        </a>
        <a href="#" class="social-link">
          <span class="material-icons">photo_camera</span>
        </a>
        <a href="#" class="social-link">
          <span class="material-icons">smart_display</span>
        </a>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Restaurant. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: linear-gradient(to right, #1a1a1a, #2d3436);
  color: #fff;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .footer-top {
    flex-direction: row;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.footer-logo .logo-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}

.footer-logo h3 {
  font-size: 1.8rem;
  color: var(--accent-color);
  margin: 0;
}

.footer-logo p {
  color: #aaa;
  line-height: 1.6;
}

.footer-links {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-column {
  flex: 1;
  min-width: 150px;
}

.footer-links-column h4 {
  font-size: 1.2rem;
  color: var(--accent-color);
  margin-bottom: 1.2rem;
  position: relative;
}

.footer-links-column h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--accent-color);
}

.footer-links-column ul {
  list-style: none;
  padding: 0;
}

.footer-links-column li {
  margin-bottom: 0.8rem;
}

.footer-links-column a {
  color: #ddd;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-links-column a:hover {
  color: var(--accent-color);
  transform: translateX(5px);
}

.contact-info li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.contact-info i {
  color: var(--accent-color);
}

.newsletter {
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.newsletter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
  z-index: -1;
}

.newsletter h3 {
  font-size: 1.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.newsletter p {
  color: #aaa;
  margin-bottom: 1.5rem;
}

.subscribe-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 576px) {
  .subscribe-form {
    flex-direction: row;
  }
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.subscribe-form input {
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;
}

.subscribe-form input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
}

.subscribe-form input.error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}

.error-message {
  position: absolute;
  bottom: -20px;
  left: 0;
  color: #e74c3c;
  font-size: 0.8rem;
}

.subscribe-form input::placeholder {
  color: #aaa;
}

.subscribe-form button {
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
}

.subscribe-form button:hover {
  background: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(255, 107, 107, 0.4);
}

.subscribe-success {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(46, 204, 113, 0.2);
  border-radius: 6px;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #2ecc71;
  color: white;
  border-radius: 50%;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-bottom p {
  color: #aaa;
}

.footer-legal {
  display: flex;
  gap: 1.5rem;
}

.footer-legal a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: var(--accent-color);
  text-decoration: underline;
}
</style>
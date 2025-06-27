<script setup>
import { ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'

// Form state
const formState = reactive({
  name: '',
  email: '',
  phone: '',
  birthdate: '',
  agreeToTerms: false
})

// Form errors
const formErrors = reactive({
  name: '',
  email: '',
  phone: '',
  birthdate: '',
  agreeToTerms: ''
})

// Form submission state
const isSubmitting = ref(false)
const isSuccess = ref(false)
const formError = ref('')

// FAQ state
const faqs = ref([
  {
    question: 'How do I earn points?',
    answer: 'You earn 1 point for every $1 spent at our restaurant. Points can be earned on dine-in, takeout, and delivery orders placed directly through us.',
    isOpen: false
  },
  {
    question: 'When do my points expire?',
    answer: 'Points expire 12 months after they are earned if not redeemed. As long as your account remains active with at least one purchase every 6 months, your points will remain valid.',
    isOpen: false
  },
  {
    question: 'How do I redeem my points?',
    answer: 'You can redeem your points for rewards directly through our mobile app or by providing your phone number or email to your server when dining in. Available rewards will be displayed based on your point balance.',
    isOpen: false
  },
  {
    question: 'Can I transfer my points to someone else?',
    answer: 'Points are non-transferable and can only be redeemed by the account holder. However, you can use your points to pay for anyone\'s meal when you\'re present.',
    isOpen: false
  },
  {
    question: 'Do I earn points on tax and tip?',
    answer: 'Points are earned on the subtotal of your purchase before tax and tip. Any discounts or promotions will be applied before point calculation.',
    isOpen: false
  }
])

// Toggle FAQ
function toggleFaq(index) {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

// Validate email format
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Validate phone format
function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return re.test(String(phone))
}

// Validate form
function validateForm() {
  let isValid = true
  
  // Reset errors
  Object.keys(formErrors).forEach(key => {
    formErrors[key] = ''
  })
  
  // Validate name
  if (!formState.name) {
    formErrors.name = 'Name is required'
    isValid = false
  } else if (formState.name.length < 3) {
    formErrors.name = 'Name must be at least 3 characters'
    isValid = false
  }
  
  // Validate email
  if (!formState.email) {
    formErrors.email = 'Email is required'
    isValid = false
  } else if (!validateEmail(formState.email)) {
    formErrors.email = 'Please enter a valid email'
    isValid = false
  }
  
  // Validate phone
  if (!formState.phone) {
    formErrors.phone = 'Phone number is required'
    isValid = false
  } else if (!validatePhone(formState.phone)) {
    formErrors.phone = 'Please enter a valid phone number'
    isValid = false
  }
  
  // Validate birthdate
  if (!formState.birthdate) {
    formErrors.birthdate = 'Birth date is required'
    isValid = false
  }
  
  // Validate terms agreement
  if (!formState.agreeToTerms) {
    formErrors.agreeToTerms = 'You must agree to the terms and conditions'
    isValid = false
  }
  
  return isValid
}

// Submit form
function submitForm() {
  // Validate form
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  formError.value = ''
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    
    // Success scenario (90% success rate for demo)
    if (Math.random() > 0.1) {
      isSuccess.value = true
    } else {
      // Error scenario
      formError.value = 'Unable to complete your registration. Please try again or contact customer support.'
    }
  }, 1500)
}

// Initialize component
onMounted(() => {
  // Animate elements on mount
  gsap.from('.loyalty-intro', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  
  gsap.from('.tier', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.3
  })
  
  gsap.from('.step', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.5
  })
})
</script>

<template>
  <section id="loyalty" class="loyalty-section">
    <div class="loyalty-container">
      <div class="loyalty-header">
        <h2 class="section-title">Loyalty Program</h2>
        <p class="section-subtitle">Join our rewards program and earn points with every visit</p>
      </div>
      
      <div class="loyalty-intro">
        <div class="intro-text">
          <h3>Earn Rewards With Every Bite</h3>
          <p>Our loyalty program is designed to thank our most valued customers. Earn points with every purchase and redeem them for exclusive rewards, special offers, and memorable dining experiences.</p>
          
          <ul class="benefits-list">
            <li>
              <i class="material-icons">star</i>
              <span>Earn 1 point for every $1 spent</span>
            </li>
            <li>
              <i class="material-icons">card_giftcard</i>
              <span>Redeem points for free items and discounts</span>
            </li>
            <li>
              <i class="material-icons">cake</i>
              <span>Special birthday reward every year</span>
            </li>
            <li>
              <i class="material-icons">notifications</i>
              <span>Early access to special events and promotions</span>
            </li>
          </ul>
        </div>
        
        <div class="intro-image">
          <img src="/images/menu/signature-cocktail.jpg" alt="Loyalty Program" class="loyalty-image">
        </div>
      </div>
      
      <div class="loyalty-tiers">
        <h3>Membership Tiers</h3>
        
        <div class="tiers-container">
          <div class="tier bronze">
            <div class="tier-header">
              <div class="tier-icon">
                <i class="material-icons">workspace_premium</i>
              </div>
              <h4>Bronze</h4>
              <div class="tier-points">0-500 Points</div>
            </div>
            
            <ul class="tier-benefits">
              <li>Earn 1 point per $1 spent</li>
              <li>Free dessert on your birthday</li>
              <li>Monthly exclusive offers</li>
              <li>10% off catering orders</li>
            </ul>
          </div>
          
          <div class="tier silver">
            <div class="tier-header">
              <div class="tier-icon">
                <i class="material-icons">workspace_premium</i>
              </div>
              <h4>Silver</h4>
              <div class="tier-points">501-1500 Points</div>
            </div>
            
            <ul class="tier-benefits">
              <li>All Bronze benefits</li>
              <li>1.25 points per $1 spent</li>
              <li>Free appetizer on your birthday</li>
              <li>Priority seating when available</li>
              <li>15% off catering orders</li>
            </ul>
          </div>
          
          <div class="tier gold">
            <div class="tier-header">
              <div class="tier-icon">
                <i class="material-icons">workspace_premium</i>
              </div>
              <h4>Gold</h4>
              <div class="tier-points">1501+ Points</div>
            </div>
            
            <ul class="tier-benefits">
              <li>All Silver benefits</li>
              <li>1.5 points per $1 spent</li>
              <li>Free entrée on your birthday</li>
              <li>Dedicated concierge service</li>
              <li>20% off catering orders</li>
              <li>Exclusive chef's table invitations</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="loyalty-how-it-works">
        <h3>How It Works</h3>
        
        <div class="steps-container">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Sign Up</h4>
              <p>Join our loyalty program by filling out the form below or signing up in-restaurant.</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Earn Points</h4>
              <p>Earn points every time you dine with us or place an order for takeout or delivery.</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Track Progress</h4>
              <p>Monitor your points balance and tier status through our mobile app or website.</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Redeem Rewards</h4>
              <p>Use your points to redeem exclusive rewards, discounts, and special experiences.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="loyalty-faq">
        <h3>Frequently Asked Questions</h3>
        
        <div class="faq-container">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="faq-item"
            :class="{ 'open': faq.isOpen }"
          >
            <div class="faq-question" @click="toggleFaq(index)">
              <h4>{{ faq.question }}</h4>
              <i class="material-icons">{{ faq.isOpen ? 'remove' : 'add' }}</i>
            </div>
            <div class="faq-answer" v-show="faq.isOpen">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="loyalty-signup">
        <h3>Join Our Loyalty Program</h3>
        
        <div v-if="isSuccess" class="signup-success">
          <div class="success-icon">
            <i class="material-icons">check</i>
          </div>
          <h4>Welcome to Our Loyalty Program!</h4>
          <p>Thank you for joining, <strong>{{ formState.name }}</strong>! Your registration has been successfully completed.</p>
          <p>We've sent a confirmation email to <strong>{{ formState.email }}</strong> with your membership details and instructions on how to download our mobile app.</p>
          
          <div class="next-steps">
            <h5>Next Steps:</h5>
            <ul>
              <li>Check your email for your membership confirmation</li>
              <li>Download our mobile app to track your points and rewards</li>
              <li>Start earning points with your very next purchase</li>
              <li>Look out for special promotions and offers in your email</li>
            </ul>
          </div>
        </div>
        
        <form v-else @submit.prevent="submitForm" class="signup-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="formState.name"
              :class="{ 'error': formErrors.name }"
              placeholder="Your full name"
            >
            <span v-if="formErrors.name" class="error-text">{{ formErrors.name }}</span>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formState.email"
                :class="{ 'error': formErrors.email }"
                placeholder="Your email address"
              >
              <span v-if="formErrors.email" class="error-text">{{ formErrors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formState.phone"
                :class="{ 'error': formErrors.phone }"
                placeholder="Your phone number"
              >
              <span v-if="formErrors.phone" class="error-text">{{ formErrors.phone }}</span>
              <span class="form-help">We'll use this to look up your account when you dine with us</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="birthdate">Birth Date</label>
            <input 
              type="date" 
              id="birthdate" 
              v-model="formState.birthdate"
              :class="{ 'error': formErrors.birthdate }"
            >
            <span v-if="formErrors.birthdate" class="error-text">{{ formErrors.birthdate }}</span>
            <span class="form-help">We'll send you a special reward on your birthday</span>
          </div>
          
          <div class="checkbox-group">
            <div class="checkbox-container">
              <input 
                type="checkbox" 
                id="agreeToTerms" 
                v-model="formState.agreeToTerms"
              >
              <label for="agreeToTerms">
                I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            <span v-if="formErrors.agreeToTerms" class="error-text">{{ formErrors.agreeToTerms }}</span>
          </div>
          
          <div v-if="formError" class="error-message">
            {{ formError }}
          </div>
          
          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <span class="spinner"></span>
              Processing...
            </span>
            <span v-else>
              <i class="material-icons">card_membership</i>
              Join Now
            </span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loyalty-section {
  padding: 100px 2rem;
  background: var(--light-bg);
  transition: var(--theme-transition);
}

:global(.dark-theme) .loyalty-section {
  background: var(--dark-bg);
}

.loyalty-container {
  max-width: 1200px;
  margin: 0 auto;
}

.loyalty-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.section-title:hover::after {
  width: 120px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.loyalty-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
}

.intro-text h3 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.benefits-list {
  list-style: none;
  padding: 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.benefits-list li i {
  color: var(--accent-color);
  margin-right: 1rem;
  font-size: 1.5rem;
}

.intro-image {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.intro-image:hover {
  transform: translateY(-10px);
}

.loyalty-image {
  width: 100%;
  height: auto;
  display: block;
}

.loyalty-tiers,
.loyalty-how-it-works,
.loyalty-faq,
.loyalty-signup {
  margin-bottom: 5rem;
}

.loyalty-tiers h3,
.loyalty-how-it-works h3,
.loyalty-faq h3,
.loyalty-signup h3 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: var(--accent-color);
  text-align: center;
}

.tiers-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.tier {
  background: var(--glass-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-theme) .tier {
  background: rgba(40, 40, 40, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.tier:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.tier-header {
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

:global(.dark-theme) .tier-header {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.tier-icon {
  width: 60px;
  height: 60px;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 2rem;
}

.bronze .tier-icon {
  background: linear-gradient(135deg, #cd7f32, #e6c19c);
}

.silver .tier-icon {
  background: linear-gradient(135deg, #c0c0c0, #e6e6e6);
}

.gold .tier-icon {
  background: linear-gradient(135deg, #ffd700, #ffecb3);
}

.tier-header h4 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.tier-points {
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
  transition: var(--theme-transition);
}

.tier-benefits {
  padding: 2rem;
  list-style: none;
}

.tier-benefits li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.tier-benefits li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent-color);
  font-size: 1.2rem;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.step-content h4 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.step-content p {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-color);
  opacity: 0.8;
  transition: var(--theme-transition);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--glass-bg);
  border-radius: 10px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-theme) .faq-item {
  background: rgba(40, 40, 40, 0.8);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.faq-item.open {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.faq-question {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question h4 {
  font-size: 1.1rem;
  margin: 0;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.faq-question i {
  color: var(--accent-color);
  transition: transform 0.3s ease;
}

.faq-item.open .faq-question i {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: var(--text-color);
  opacity: 0.9;
  line-height: 1.6;
  transition: var(--theme-transition);
}

.signup-form {
  background: var(--glass-bg);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: var(--shadow);
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
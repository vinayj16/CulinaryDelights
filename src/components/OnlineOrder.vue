<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// Menu categories
const categories = ref([
  { id: 'all', name: 'All Items' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'main-courses', name: 'Main Courses' },
  { id: 'pasta', name: 'Pasta & Risotto' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' }
]);

// Selected category
const selectedCategory = ref('all');

// Menu items
const menuItems = ref([
  {
    id: 1,
    name: 'Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and basil.',
    price: 8.99,
    category: 'appetizers',
    image: '/images/menu/bruschetta.jpg',
    popular: true,
    dietary: ['vegetarian']
  },
  {
    id: 2,
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze and olive oil.',
    price: 10.99,
    category: 'appetizers',
    image: '/images/menu/caprese.jpg',
    popular: false,
    dietary: ['vegetarian', 'gluten-free']
  },
  {
    id: 3,
    name: 'Filet Mignon',
    description: '8oz center-cut filet with red wine reduction, served with roasted potatoes and seasonal vegetables.',
    price: 32.99,
    category: 'main-courses',
    image: '/images/menu/filet-mignon.jpg',
    popular: true,
    dietary: ['gluten-free']
  },
  {
    id: 4,
    name: 'Spaghetti Carbonara',
    description: 'Classic carbonara with pancetta, egg, hard cheese, and black pepper.',
    price: 16.99,
    category: 'pasta',
    image: '/images/menu/carbonara.jpg',
    popular: true,
    dietary: []
  },
  {
    id: 5,
    name: 'Risotto ai Funghi',
    description: 'Creamy risotto with wild mushrooms, truffle oil, and parmesan cheese.',
    price: 18.99,
    category: 'pasta',
    image: '/images/menu/risotto.jpg',
    popular: false,
    dietary: ['vegetarian', 'gluten-free']
  },
  {
    id: 6,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon-dill sauce, served with asparagus and wild rice.',
    price: 24.99,
    category: 'seafood',
    image: '/images/menu/salmon.jpg',
    popular: true,
    dietary: ['gluten-free', 'seafood']
  },
  {
    id: 7,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.',
    price: 8.99,
    category: 'desserts',
    image: '/images/menu/tiramisu.jpg',
    popular: true,
    dietary: ['vegetarian']
  },
  {
    id: 8,
    name: 'Panna Cotta',
    description: 'Silky vanilla custard topped with berry compote.',
    price: 7.99,
    category: 'desserts',
    image: '/images/menu/panna-cotta.jpg',
    popular: false,
    dietary: ['vegetarian', 'gluten-free']
  },
  {
    id: 9,
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella, served with spaghetti.',
    price: 19.99,
    category: 'main-courses',
    image: '/images/menu/chicken-parm.jpg',
    popular: false,
    dietary: []
  },
  {
    id: 10,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust.',
    price: 14.99,
    category: 'main-courses',
    image: '/images/menu/pizza.jpg',
    popular: true,
    dietary: ['vegetarian']
  },
  {
    id: 11,
    name: 'Calamari Fritti',
    description: 'Crispy fried calamari served with marinara sauce and lemon wedges.',
    price: 12.99,
    category: 'appetizers',
    image: '/images/menu/calamari.jpg',
    popular: false,
    dietary: ['seafood']
  },
  {
    id: 12,
    name: 'Red Wine',
    description: 'Glass of house red wine - Cabernet Sauvignon.',
    price: 8.99,
    image: '/images/menu/red-wine.jpg',
    category: 'drinks',
    popular: false,
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 13,
    name: 'Signature Cocktails',
    description: 'Handcrafted cocktails made with premium spirits and fresh ingredients',
    price: 12.99,
    image: '/images/menu/cocktail.jpg',
    category: 'drinks',
    popular: true,
    dietary: ['vegan', 'gluten-free']
  }
]);

// Shopping cart
const cart = ref([]);

// Order form
const orderForm = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  orderType: 'delivery',
  paymentMethod: 'card',
  notes: ''
});

// Form errors
const formErrors = reactive({
  name: '',
  phone: '',
  email: '',
  address: ''
});

// Order state
const isSubmitting = ref(false);
const isSuccess = ref(false);
const formError = ref('');
const isLoading = ref(true);

// Simulate loading state for menu items
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;

    // Animate menu items appearance
    gsap.from('.menu-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, 1500);
});

// Filter menu items by category
const filteredMenuItems = computed(() => {
  if (selectedCategory.value === 'all') {
    return menuItems.value;
  }
  return menuItems.value.filter(item => item.category === selectedCategory.value);
});

// Calculate cart total
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Calculate tax (assuming 8.5%)
const tax = computed(() => {
  return cartTotal.value * 0.085;
});

// Calculate delivery fee (if applicable)
const deliveryFee = computed(() => {
  return orderForm.orderType === 'delivery' ? 3.99 : 0;
});

// Calculate order total
const orderTotal = computed(() => {
  return cartTotal.value + tax.value + deliveryFee.value;
});

// Check if cart is empty
const isCartEmpty = computed(() => {
  return cart.value.length === 0;
});

// Check if form is valid
const isFormValid = computed(() => {
  // Basic validation - all required fields must be filled
  return orderForm.name &&
         orderForm.phone &&
         orderForm.email &&
         (orderForm.orderType !== 'delivery' || orderForm.address) &&
         !formErrors.name &&
         !formErrors.phone &&
         !formErrors.email &&
         !formErrors.address;
});

// Select category
function selectCategory(categoryId) {
  selectedCategory.value = categoryId;
}

// Add item to cart
function addToCart(item, event) {
  // Create a temporary element for animation
  const button = event.currentTarget;
  const buttonRect = button.getBoundingClientRect();
  const cartRect = document.querySelector('.cart-container').getBoundingClientRect();

  const tempElement = document.createElement('div');
  tempElement.className = 'flying-item';
  tempElement.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
  document.body.appendChild(tempElement);

  // Position the element at the button
  tempElement.style.top = `${buttonRect.top}px`;
  tempElement.style.left = `${buttonRect.left}px`;
  tempElement.style.width = `${buttonRect.width}px`;
  tempElement.style.height = `${buttonRect.height}px`;

  // Animate to cart
  gsap.to(tempElement, {
    top: cartRect.top + cartRect.height / 2,
    left: cartRect.left + cartRect.width / 2,
    width: 30,
    height: 30,
    opacity: 0.7,
    duration: 0.8,
    ease: 'power3.inOut',
    onComplete: () => {
      // Remove the temporary element
      document.body.removeChild(tempElement);

      // Add item to cart
      const existingItem = cart.value.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.value.push({
          ...item,
          quantity: 1
        });
      }

      // Animate cart
      gsap.to('.cart-container', {
        scale: 1.05,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
        yoyo: true,
        repeat: 1
      });
    }
  });
}

// Increase item quantity
function increaseQuantity(item) {
  item.quantity++;
}

// Decrease item quantity
function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(item);
  }
}

// Remove item from cart
function removeFromCart(item) {
  const index = cart.value.findIndex(cartItem => cartItem.id === item.id);
  if (index !== -1) {
    cart.value.splice(index, 1);
  }
}

// Validate email format
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Validate phone format
function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone));
}

// Validate form field
function validateField(field) {
  switch (field) {
    case 'name':
      formErrors.name = !orderForm.name ? 'Name is required' :
                        orderForm.name.length < 3 ? 'Name must be at least 3 characters' : '';
      break;
    case 'email':
      formErrors.email = !orderForm.email ? 'Email is required' :
                         !validateEmail(orderForm.email) ? 'Please enter a valid email' : '';
      break;
    case 'phone':
      formErrors.phone = !orderForm.phone ? 'Phone number is required' :
                          !validatePhone(orderForm.phone) ? 'Please enter a valid phone number' : '';
      break;
    case 'address':
      formErrors.address = orderForm.orderType === 'delivery' && !orderForm.address ?
                          'Address is required for delivery' : '';
      break;
  }
}

// Submit order
function submitOrder() {
  // Validate all fields
  validateField('name');
  validateField('email');
  validateField('phone');
  validateField('address');

  // Check if form is valid
  if (!isFormValid.value || isCartEmpty.value) {
    // Highlight invalid fields with animation
    gsap.to('.form-group input.error, .form-group textarea.error', {
      x: [-5, 5, -5, 5, 0],
      duration: 0.5,
      ease: 'power1.inOut'
    });

    // Scroll to first error
    const firstError = document.querySelector('.form-group input.error, .form-group textarea.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return;
  }

  isSubmitting.value = true;
  formError.value = '';

  // Real API call
  fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...orderForm,
      cart: cart.value
    })
  })
    .then(async (res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      if (data.success) {
        // Animate cart items before showing success
        gsap.to('.cart-item', {
          opacity: 0,
          y: -20,
          stagger: 0.1,
          duration: 0.5,
          onComplete: () => {
            isSubmitting.value = false;
            isSuccess.value = true;
            setTimeout(() => {
              document.querySelector('.order-success').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }, 100);
          }
        });
      } else {
        throw new Error(data.message || 'Order failed');
      }
    })
    .catch((err) => {
      isSubmitting.value = false;
      formError.value = err.message || 'Unable to process your order. Please try again or call us directly.';
      gsap.from('.error-message', {
        y: -10,
        opacity: 0,
        duration: 0.5
      });
    });
}

// Format price
function formatPrice(price) {
  return price.toFixed(2);
}
</script>

<template>
  <section id="order" class="order-section">
    <div class="order-container">
      <div class="order-header">
        <h2 class="section-title">Online Ordering</h2>
        <p class="section-subtitle">Order your favorite dishes for pickup or delivery</p>
      </div>

      <div v-if="isSuccess" class="order-success">
        <div class="success-icon">
          <i class="material-icons">check</i>
        </div>
        <h3>Order Confirmed!</h3>
        <p>Thank you for your order, <strong>{{ orderForm.name }}</strong>!</p>
        <p>We've sent a confirmation to <strong>{{ orderForm.email }}</strong> with your order details.</p>

        <div class="order-details">
          <p><strong>Order Type:</strong> {{ orderForm.orderType === 'delivery' ? 'Delivery' : 'Pickup' }}</p>
          <p><strong>Estimated Time:</strong> {{ orderForm.orderType === 'delivery' ? '45-60 minutes' : '20-30 minutes' }}</p>
          <p><strong>Order Total:</strong> ${{ formatPrice(orderTotal) }}</p>
        </div>

        <p class="thank-you">We appreciate your business!</p>
      </div>

      <div v-else class="order-content">
        <div class="menu-section">
          <div class="menu-categories">
            <button
              v-for="category in categories"
              :key="category.id"
              class="category-btn"
              :class="{ 'active': selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>

          <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading menu items...</p>
          </div>

          <div v-else class="menu-grid">
            <div
              v-for="item in filteredMenuItems"
              :key="item.id"
              class="menu-item"
            >
              <div class="item-image">
                <img :src="item.image" :alt="item.name">
                <div v-if="item.popular" class="popular-badge">Popular</div>
              </div>

              <div class="item-content">
                <h3>{{ item.name }}</h3>
                <p class="item-description">{{ item.description }}</p>

                <div v-if="item.dietary && item.dietary.length" class="dietary-tags">
                  <span
                    v-for="tag in item.dietary"
                    :key="tag"
                    class="dietary-tag"
                    :class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="item-footer">
                  <div class="item-price">${{ formatPrice(item.price) }}</div>
                  <button class="add-to-cart-btn" @click="addToCart(item, $event)">
                    <i class="material-icons">add_shopping_cart</i>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-section">
          <div class="cart-container">
            <div class="cart-header">
              <h3>Your Order</h3>
            </div>
            <div v-if="isCartEmpty" class="empty-cart">
              <i class="material-icons">shopping_cart</i>
              <p>Your cart is empty</p>
              <p class="empty-cart-message">Add items from the menu to get started</p>
            </div>
            <div v-else class="cart-items">
              <div v-for="item in cart" :key="item.id" class="cart-item">
                <div class="cart-item-details">
                  <h4>{{ item.name }}</h4>
                  <div class="cart-item-price">${{ formatPrice(item.price) }}</div>
                </div>
                <div class="cart-item-quantity">
                  <button class="quantity-btn" @click="decreaseQuantity(item)">
                    <i class="material-icons">remove</i>
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button class="quantity-btn" @click="increaseQuantity(item)">
                    <i class="material-icons">add</i>
                  </button>
                </div>
              </div>
            </div>
            <div class="cart-summary">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>${{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="summary-row">
                <span>Tax</span>
                <span>${{ formatPrice(tax) }}</span>
              </div>
              <div class="summary-row" v-if="orderForm.orderType === 'delivery'">
                <span>Delivery Fee</span>
                <span>${{ formatPrice(deliveryFee) }}</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span>${{ formatPrice(orderTotal) }}</span>
              </div>
            </div>

            <div class="checkout-form">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  v-model="orderForm.name"
                  @blur="validateField('name')"
                  placeholder="Your full name"
                  :class="{ 'error': formErrors.name }"
                >
                <span v-if="formErrors.name" class="error-text">{{ formErrors.name }}</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="orderForm.email"
                    @blur="validateField('email')"
                    placeholder="Your email address"
                    :class="{ 'error': formErrors.email }"
                  >
                  <span v-if="formErrors.email" class="error-text">{{ formErrors.email }}</span>
                </div>

                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="orderForm.phone"
                    @blur="validateField('phone')"
                    placeholder="Your phone number"
                    :class="{ 'error': formErrors.phone }"
                  >
                  <span v-if="formErrors.phone" class="error-text">{{ formErrors.phone }}</span>
                </div>
              </div>

              <div class="form-group">
                <label>Order Type</label>
                <div class="order-type-options">
                  <div
                    class="order-type-option"
                    :class="{ 'active': orderForm.orderType === 'delivery' }"
                    @click="orderForm.orderType = 'delivery'; validateField('address')"
                  >
                    <i class="material-icons">delivery_dining</i>
                    <span>Delivery</span>
                  </div>
                  <div
                    class="order-type-option"
                    :class="{ 'active': orderForm.orderType === 'pickup' }"
                    @click="orderForm.orderType = 'pickup'; validateField('address')"
                  >
                    <i class="material-icons">store</i>
                    <span>Pickup</span>
                  </div>
                </div>
              </div>

              <div class="form-group" v-if="orderForm.orderType === 'delivery'">
                <label for="address">Delivery Address</label>
                <input
                  type="text"
                  id="address"
                  v-model="orderForm.address"
                  @blur="validateField('address')"
                  placeholder="Your delivery address"
                  :class="{ 'error': formErrors.address }"
                >
                <span v-if="formErrors.address" class="error-text">{{ formErrors.address }}</span>
              </div>

              <div class="form-group">
                <label>Payment Method</label>
                <div class="payment-options">
                  <div
                    class="payment-option"
                    :class="{ 'active': orderForm.paymentMethod === 'credit-card' }"
                    @click="orderForm.paymentMethod = 'credit-card'"
                  >
                    <i class="material-icons">credit_card</i>
                    <span>Credit Card</span>
                  </div>

                  <div
                    class="payment-option"
                    :class="{ 'active': orderForm.paymentMethod === 'cash' }"
                    @click="orderForm.paymentMethod = 'cash'"
                  >
                    <i class="material-icons">payments</i>
                    <span>Cash</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="specialInstructions">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  v-model="orderForm.specialInstructions"
                  placeholder="Any special instructions or dietary requirements?"
                  rows="3"
                ></textarea>
              </div>

              <div v-if="formError" class="error-message">
                {{ formError }}
              </div>

              <button
                class="checkout-btn"
                @click="submitOrder"
                :disabled="isSubmitting || isCartEmpty"
              >
                <span v-if="isSubmitting">
                  <span class="spinner"></span>
                  Processing...
                </span>
                <span v-else>
                  <i class="material-icons">shopping_cart_checkout</i>
                  Place Order
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.order-section {
  padding: 100px 2rem;
  background: var(--light-bg);
  transition: var(--theme-transition);
}

.order-container {
  max-width: 1200px;
  margin: 0 auto;
}

.order-header {
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

.order-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.menu-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-btn {
  padding: 0.8rem 1.5rem;
  background: var(--glass-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-color);
  font-weight: 500;
  box-shadow: var(--shadow);
}

.category-btn.active {
  background: var(--accent-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.category-btn:hover:not(.active) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.menu-item {
  background: var(--glass-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
  opacity: 0;
  z-index: -1;
  transition: opacity 0.5s ease;
  border-radius: 15px;
}

.menu-item:hover {
  transform: translateY(-15px) scale(1.03);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.menu-item:hover::before {
  opacity: 1;
}

.item-image {
  height: 180px;
  position: relative;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.menu-item:hover .item-image img {
  transform: scale(1.1);
}

.popular-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--accent-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(255, 107, 107, 0.3);
}

.item-content {
  padding: 1.5rem;
}

.item-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.item-description {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: var(--text-color);
  opacity: 0.8;
  transition: var(--theme-transition);
  height: 4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.dietary-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dietary-tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: capitalize;
}

.vegetarian {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.vegan {
  background: rgba(139, 195, 74, 0.2);
  color: #8bc34a;
}

.gluten-free {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.seafood {
  background: rgba(3, 169, 244, 0.2);
  color: #03a9f4;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.item-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-color);
}

.add-to-cart-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 3px 10px rgba(255, 107, 107, 0.2);
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
}

.add-to-cart-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
}

.add-to-cart-btn:hover::before {
  left: 100%;
}

.add-to-cart-btn i {
  font-size: 1.2rem;
}

.cart-container {
  background: var(--glass-bg);
  border-radius: 15px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 100px;
}

.cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.cart-header h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.empty-cart {
  padding: 3rem 1.5rem;
  text-align: center;
}

.empty-cart i {
  font-size: 3rem;
  color: var(--text-color);
  opacity: 0.3;
  margin-bottom: 1rem;
  transition: var(--theme-transition);
}

.empty-cart p {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  transition: var(--theme-transition);
}

.empty-cart-message {
  font-size: 0.9rem !important;
  opacity: 0.7;
}

.cart-items {
  padding: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-details h4 {
  font-size: 1rem;
  margin-bottom: 0.3rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.cart-item-price {
  font-weight: 600;
  color: var(--accent-color);
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background: var(--accent-color);
  color: white;
}

.quantity-btn i {
  font-size: 1rem;
}

.cart-summary {
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

.checkout-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
  transition: var(--theme-transition);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-color);
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
  outline: none;
}

.order-type-options,
.payment-options {
  display: flex;
  gap: 1rem;
}

.order-type-option,
.payment-option {
  flex: 1;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

.order-type-option.active,
.payment-option.active {
  border-color: var(--accent-color);
  background: rgba(255, 107, 107, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.order-type-option i,
.payment-option i {
  font-size: 2rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.order-type-option.active i,
.payment-option.active i {
  color: var(--accent-color);
}

.order-type-option span,
.payment-option span {
  font-size: 0.9rem;
  color: var(--text-color);
  transition: var(--theme-transition);
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

.checkout-btn {
  width: 100%;
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1.2rem;
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
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.checkout-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 107, 107, 1));
  z-index: -1;
  transition: transform 0.6s ease;
  transform: scaleX(0);
  transform-origin: right;
}

.checkout-btn:hover:not(:disabled)::before {
  transform: scaleX(1);
  transform-origin: left;
}

.checkout-btn:hover:not(:disabled) {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.5);
  letter-spacing: 0.5px;
}

.checkout-btn:disabled {
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

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(255, 107, 107, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 107, 107, 0.2);
  border-radius: 50%;
  border-top-color: var(--accent-color);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-container p {
  color: var(--text-color);
  font-size: 1.1rem;
  opacity: 0.8;
}

.flying-item {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.flying-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.order-success {
  text-align: center;
  padding: 3rem;
  background: var(--glass-bg);
  border-radius: 15px;
  box-shadow: var(--shadow);
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: successAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  position: relative;
  overflow: hidden;
}

.order-success::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
  z-index: -1;
}

@keyframes successAppear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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
  font-size: 2rem;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
  animation: pulse 2s infinite;
}
</style>
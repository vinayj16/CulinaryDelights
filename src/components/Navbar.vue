<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const route = useRoute();

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;

  // Prevent scrolling when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Close menu on navigation
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

// Handle scroll events
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Determine if link is active based on route and hash
const isActive = (path, hash = '') => {
  return route.path === path && route.hash === hash;
};

// Smooth scroll to section
const scrollToSection = (sectionId) => {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  closeMenu();
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="navbar" :class="{ 'menu-open': isMenuOpen, 'scrolled': isScrolled }" role="navigation" aria-label="Main navigation">
    <div class="nav-brand">
      <router-link to="/" class="logo" @click="closeMenu" aria-label="Go to home section">
        <img src="/images/restaurant1.jpg" alt="Restaurant Logo" class="logo-image" @error="event => event.target.src='https://via.placeholder.com/120x40?text=Logo'" />
        <span class="logo-text">Culinary<span>Delights</span></span>
      </router-link>
    </div>

    <button class="menu-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen" aria-label="Toggle menu" aria-controls="primary-navigation">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <div class="nav-menu" :class="{ 'active': isMenuOpen }" id="primary-navigation">
      <router-link
        to="/#home"
        class="nav-link"
        :class="{ active: isActive('/', '#home') }"
        @click.native="scrollToSection('#home')"
        role="link"
        tabindex="0"
      >
        <i class="material-icons nav-icon" aria-hidden="true">home</i>
        <span>Home</span>
      </router-link>
      <router-link
        to="/#menu"
        class="nav-link"
        :class="{ active: isActive('/', '#menu') }"
        @click.native="scrollToSection('#menu')"
        role="link"
        tabindex="0"
      >
        <i class="material-icons nav-icon" aria-hidden="true">restaurant_menu</i>
        <span>Menu</span>
      </router-link>
      <router-link
        to="/#about"
        class="nav-link"
        :class="{ active: isActive('/', '#about') }"
        @click.native="scrollToSection('#about')"
        role="link"
        tabindex="0"
      >
        <i class="material-icons nav-icon" aria-hidden="true">info</i>
        <span>About</span>
      </router-link>
      <router-link
        to="/#gallery"
        class="nav-link"
        :class="{ active: isActive('/', '#gallery') }"
        @click.native="scrollToSection('#gallery')"
        role="link"
        tabindex="0"
      >
        <i class="material-icons nav-icon" aria-hidden="true">photo_library</i>
        <span>Gallery</span>
      </router-link>
      <router-link
        to="/#reservation"
        class="nav-link reservation"
        :class="{ active: isActive('/', '#reservation') }"
        @click.native="scrollToSection('#reservation')"
        role="link"
        tabindex="0"
      >
        <i class="material-icons nav-icon" aria-hidden="true">event_available</i>
        <span>Reserve Table</span>
      </router-link>
      <router-link
        to="/livechat"
        class="nav-link"
        role="link"
        tabindex="0"
        @click.native="closeMenu"
      >
        <i class="material-icons nav-icon" aria-hidden="true">chat</i>
        <span>Live Chat</span>
      </router-link>
      <router-link
        to="/loyaltyprogram"
        class="nav-link"
        role="link"
        tabindex="0"
        @click.native="closeMenu"
      >
        <i class="material-icons nav-icon" aria-hidden="true">card_giftcard</i>
        <span>Loyalty Program</span>
      </router-link>
      <router-link
        to="/onlineorder"
        class="nav-link"
        role="link"
        tabindex="0"
        @click.native="closeMenu"
      >
        <i class="material-icons nav-icon" aria-hidden="true">shopping_cart</i>
        <span>Online Order</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.2rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  will-change: transform, background-color;
}

/* Scrolled state */
.navbar.scrolled {
  padding: 0.8rem 5%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
}

/* Dark mode styles */
:global(.dark-theme) .navbar {
  background: rgba(26, 26, 26, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

:global(.dark-theme) .navbar.scrolled {
  background: rgba(26, 26, 26, 0.95);
}

.nav-brand .logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
  transition: all 0.3s ease;
}

.navbar.scrolled .logo-image {
  width: 35px;
  height: 35px;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.nav-brand .logo span {
  color: var(--accent-color);
  position: relative;
  display: inline-block;
}

/* Logo animation */
.nav-brand .logo span::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-brand .logo:hover .logo-image {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
}

.nav-brand .logo:hover span::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  cursor: pointer;
}

.nav-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon {
  transform: translateY(-2px);
}

.nav-link:hover,
.nav-link:focus {
  color: var(--accent-color);
  outline: none;
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after,
.nav-link:focus::after {
  width: 100%;
}

.nav-link.active {
  color: var(--accent-color);
  font-weight: 600;
}

.nav-link.reservation {
  background: var(--accent-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
}

.nav-link.reservation::after {
  display: none;
}

.nav-link.reservation:hover,
.nav-link.reservation:focus {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 15px rgba(255, 107, 107, 0.4);
  outline: none;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.bar {
  width: 100%;
  height: 3px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
  border-radius: 3px;
}

:global(.dark-theme) .bar {
  background-color: white;
}

/* Mobile menu styles */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.3s ease;
    z-index: 999;
  }

  :global(.dark-theme) .nav-menu {
    background: rgba(26, 26, 26, 0.95);
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-link {
    font-size: 1.2rem;
    padding: 1rem;
  }

  .menu-toggle.active .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 1rem 3%;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .logo-image {
    width: 35px;
    height: 35px;
  }
}
</style>
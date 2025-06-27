<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })
})
</script>

<template>
  <div class="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style>
/* Add Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
/* Add Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-gradient: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  --secondary-gradient: linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #54A0FF);
  --accent-color: #FF6B6B;
  --text-color: #2D3436;
  --text-color-secondary: #636E72;
  --heading-color: #2D3436;
  --light-bg: #FFFFFF;
  --dark-bg: #2D3436;
  --glass-bg: rgba(255, 255, 255, 0.98);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  --font-weight-normal: 500;
  --font-weight-bold: 600;

  /* Enhanced transitions for smoother theme switching */
  --theme-transition: background-color 0.3s ease-in-out,
                      color 0.3s ease-in-out,
                      border-color 0.3s ease-in-out,
                      box-shadow 0.3s ease-in-out;
}

/* Dark theme variables */
.dark-theme {
  --text-color: #F5F6FA;
  --text-color-secondary: #DFE6E9;
  --heading-color: #FFFFFF;
  --accent-color: #FF7675;
  --primary-gradient: linear-gradient(45deg, #FF7675, #74B9FF);
  --secondary-gradient: linear-gradient(135deg, #FF7675, #74B9FF, #A8E6CF, #81ECEC);
  --light-bg: #2D3436;
  --dark-bg: #1E272E;
  --glass-bg: rgba(45, 52, 54, 0.98);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  --primary-gradient: linear-gradient(45deg, #ff8f8f, #6ee8e0);
  --secondary-gradient: linear-gradient(135deg, #ff8f8f, #6ee8e0, #65c7e1, #74b0ff);
  --accent-color: #ff8f8f;
  --text-color: #f0f0f0;
  --text-color-secondary: #d0d0d0;
  --heading-color: #ffffff;
  --light-bg: #1a1a1a;
  --dark-bg: #121212;
  --glass-bg: rgba(18, 18, 18, 0.95);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  --theme-transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: linear-gradient(135deg, var(--light-bg), #f5f5f5);
  color: var(--text-color);
  line-height: 1.6;
  transition: var(--theme-transition);
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.3px;
}

.dark-theme body {
  background: linear-gradient(135deg, var(--dark-bg), #232526);
}

.app {
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
}

/* Global Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--heading-color);
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  transition: var(--theme-transition);
}

.section-title::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: var(--primary-gradient);
  margin: 20px auto 0;
  border-radius: 2px;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--secondary-gradient);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.btn:hover::before {
  transform: scaleX(1);
}

.btn-primary {
  color: white;
  background: transparent;
  border: 2px solid #ff6b6b;
}

.btn-secondary {
  color: #ff6b6b;
  background: transparent;
  border: 2px solid #ff6b6b;
}


</style>

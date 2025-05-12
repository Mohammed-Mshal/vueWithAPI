<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="logo">Projects</router-link>
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span class="hamburger"></span>
        </button>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isMobileMenuOpen }">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/posts" class="navbar-item">Posts</router-link>
        <router-link to="/photos" class="navbar-item">Photos</router-link>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue'

  const isMobileMenuOpen = ref( false)
  const toggleMobileMenu=() =>{
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
</script>

<style scoped>
.navbar {
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
}

.navbar-item {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-item:hover {
  color: #42b983;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background: #2c3e50;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #2c3e50;
  transition: all 0.3s ease-in-out;
}

.hamburger::before {
  transform: translateY(-8px);
}

.hamburger::after {
  transform: translateY(8px);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .navbar-brand {
    width: 100%;
    justify-content: space-between;
  }
  .navbar-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .navbar-menu.is-active {
    display: flex;
  }
}
</style>

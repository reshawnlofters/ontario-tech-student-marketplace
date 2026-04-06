<script setup>
import AppNavbar from './components/general/AppNavbar.vue'
import AppFooter from './components/general/AppFooter.vue'
</script>

<template>
  <div class="app-shell">
    <AppNavbar />

    <main class="main-content">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>

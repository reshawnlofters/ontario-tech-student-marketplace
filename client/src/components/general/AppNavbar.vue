<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <section class="navbar-brand-section">
      <RouterLink to="/">
        <img src="../../../public/images/ontario-tech-university-logo.png" />
      </RouterLink>
    </section>

    <section class="navbar-menu-section">
      <RouterLink to="/" class="navbar-menu-item">Home</RouterLink>
      <RouterLink to="/wishlist" class="navbar-menu-item">Wishlist</RouterLink>
      <RouterLink to="/list-item" class="navbar-menu-item">List Item</RouterLink>
      <RouterLink to="/cart" class="navbar-menu-item">Cart</RouterLink>
      <RouterLink to="/orders" class="navbar-menu-item">Orders</RouterLink>
    </section>
  </nav>
</template>

<style scoped>
.navbar {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ontario-tech-dark-blue);
  padding: 0 2.5rem;
}

.navbar-brand-section img {
  height: 80px;
}

.navbar-menu-section {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.navbar-menu-item {
  font-size: 16px;
  color: white;
}

.navbar-menu-item:hover {
  color: var(--ontario-tech-orange);
}
</style>

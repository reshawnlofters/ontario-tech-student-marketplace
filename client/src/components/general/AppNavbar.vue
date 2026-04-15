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
      <RouterLink to="/cart" class="navbar-menu-item">Checkout</RouterLink>
      <RouterLink to="/orders" class="navbar-menu-item">Orders</RouterLink>
    </section>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  padding: 0 2.5rem;
  background-color: var(--otu-dark-blue);
}

.navbar-brand-section img {
  height: 80px;
}

.navbar-menu-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
}

.navbar-menu-item {
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  color: white;
}

.navbar-menu-item:hover {
  color: var(--otu-orange);
}

@media screen and (width <= 700px) {
  .navbar {
    display: grid;
    align-items: center;
    justify-content: center;
    height: auto;
    text-align: center;
  }

  .navbar-menu-section {
    padding-bottom: 1.5rem;
  }
}

@media screen and (width <= 500px) {
  .navbar-menu-section {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
  }
}
</style>

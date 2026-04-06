<template>
  <footer class="footer has-background-light">
    <section class="footer-brand-section">
      <img
        src="../../../public/images/ontario-tech-university-logo.png"
        alt="ontario tech university logo"
      />
    </section>
    <section class="footer-description-section">
      <p>
        <span>Ontario Tech Student Marketplace</span><br />
        Buy and sell used student items at a fraction of the cost.
      </p>
    </section>
  </footer>
</template>

<style scoped>
.footer {
  height: 150px;
  display: flex;
  justify-content: space-between;
  background-color: #5b6770 !important;
  color: white;
  padding: 0 2.5rem;
}

.footer-brand-section,
.footer-description-section {
  display: flex;
  align-items: center;
}

.footer-brand-section img {
  height: 80px;
}

.footer-description-section p span {
  font-weight: bold;
}
</style>

<template>
  <footer class="footer has-background-light">
    <section class="footer-brand-section">
      <img
        src="../../../public/images/ontario-tech-university-logo.png"
        alt="Ontario Tech University logo"
      />
    </section>
    <section class="footer-description-section">
      <p>
        <span>Ontario Tech Student Marketplace</span><br />
        Shop unique items and great deals from Ontario Tech students.
      </p>
    </section>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  height: 150px;
  padding: 0 2.5rem;
  color: white;
  background-color: #5b6770 !important;
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

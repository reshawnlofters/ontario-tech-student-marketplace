<template>
  <div class="payment-details-container box">
    <h2 class="section-title title">Payment Details</h2>
    <div class="section-label-container">
      <p><span class="section-label">Cardholder</span>: Ontario Tech Student</p>
      <p><span class="section-label">Card</span>: Mastercard ending in 1234</p>
      <p><span class="section-label">Billing Address</span>: 2000 Simcoe St N, Oshawa</p>
      <p><span class="section-label">Delivery Method</span>: Campus Pickup</p>
    </div>
  </div>
</template>

<style scoped>
.payment-details-container {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  color: black;
  background-color: var(--otu-light-grey);
  border-radius: 0.75rem;
}

.section-label-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>

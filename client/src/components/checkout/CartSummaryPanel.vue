<script setup>
defineProps({
  subtotal: {
    type: Number,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isSubmitting: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['checkout'])
</script>

<template>
  <div class="cart-summary-container box">
    <h2 class="section-title title">Cart Summary</h2>
    <div class="section-label-container">
      <p><span class="section-label">Subtotal</span>: ${{ subtotal.toFixed(2) }}</p>
      <p><span class="section-label">Discount</span>: -${{ discountAmount.toFixed(2) }}</p>
      <p><span class="section-label">Total</span>: ${{ total.toFixed(2) }}</p>
    </div>
    <button
      class="place-order-button button is-link is-fullwidth"
      :disabled="isSubmitting"
      @click="$emit('checkout')"
    >
      {{ isSubmitting ? 'Placing Order...' : 'Place Order' }}
    </button>
  </div>
</template>

<style scoped>
.cart-summary-container {
  background-color: var(--otu-light-grey);
  font-size: 18px;
  color: black;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-label-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.place-order-button {
  background-color: var(--otu-orange);
  padding: 10px 0;
  font-weight: bold;
}
</style>

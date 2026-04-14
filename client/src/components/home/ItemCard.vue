<script setup>
import ButtonArrowIcon from '../general/ButtonArrowIcon.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <div class="card item-card">
    <div class="card-image">
      <figure class="image is-4by5">
        <img :src="item.image" :alt="item.title" />
      </figure>
    </div>

    <div class="card-content">
      <p class="item-title">{{ item.title }}</p>
      <p class="item-price">${{ item.price.toFixed(2) }}</p>

      <div class="section-label-container">
        <p><span class="section-label">Category</span>: {{ item.category }}</p>
        <p><span class="section-label">Condition</span>: {{ item.condition }}</p>
        <p><span class="section-label">Seller</span>: {{ item.sellerName }}</p>
        <p>{{ item.description }}</p>
      </div>

      <div class="button-container buttons">
        <button class="add-to-cart-button button" @click="$emit('add-to-cart', item)">
          Add to Cart
        </button>

        <button class="add-to-wishlist-button button">
          Save Item
          <ButtonArrowIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: transparent;
}

.card-image img {
  object-fit: cover;
}

.item-card {
  color: black;
}

.card-content {
  font-size: 1.125rem;
  background-color: var(--otu-light-grey) !important;
}

.item-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--otu-blue);
}

.item-price {
  margin-bottom: 0.75rem;
}

.section-label-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.button-container {
  justify-content: space-between;
}

.add-to-cart-button,
.add-to-wishlist-button {
  width: 40%;
  padding: 0.75rem 1.125rem;
}

.add-to-cart-button {
  background-color: var(--otu-light-blue);
  border: 1px solid var(--otu-light-blue);
}

.add-to-wishlist-button {
  color: var(--otu-blue);
  background-color: white;
  border: 1px solid var(--otu-blue);
}
</style>

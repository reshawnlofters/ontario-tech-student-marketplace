<script setup>
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
        <img :src="item.imageUrl" :alt="item.title" />
      </figure>
    </div>

    <div class="card-content">
      <p class="item-title">{{ item.title }}</p>
      <p class="item-price mb-4">${{ item.price.toFixed(2) }}</p>

      <div class="item-label-container content">
        <p><span class="item-label">Category</span>: {{ item.category }}</p>
        <p><span class="item-label">Condition</span>: {{ item.condition }}</p>
        <p><span class="item-label">Seller</span>: {{ item.sellerName }}</p>
        <p>{{ item.description }}</p>
      </div>

      <div class="button-container buttons mt-3">
        <button class="add-to-cart-button button is-medium" @click="$emit('add-to-cart', item)">
          Add to Cart
        </button>

        <button class="add-to-wishlist-button button is-medium">Save Item</button>
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
  height: 392px;
  font-size: 18px;
  background-color: var(--ontario-tech-light-grey) !important;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--ontario-tech-blue);
}

.item-label-container {
  height: 190px;
}

.item-label {
  font-weight: bold;
}

.button-container {
  justify-content: space-between;
}

.add-to-cart-button,
.add-to-wishlist-button {
  font-weight: bold;
  border-radius: 6px;
  padding: 12px 18px;
}

.add-to-cart-button {
  background-color: var(--ontario-tech-light-blue);
  border: 1px solid var(--ontario-tech-light-blue);
}

.add-to-wishlist-button {
  background-color: white;
  color: var(--ontario-tech-blue);
  border: 1px solid var(--ontario-tech-blue);
}
</style>

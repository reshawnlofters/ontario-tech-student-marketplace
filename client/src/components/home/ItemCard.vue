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

        <button class="add-to-wishlist-button button">Save Item</button>
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
  font-size: 18px;
  background-color: var(--otu-light-grey) !important;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--otu-blue);
}

.item-price {
  margin-bottom: 12px;
}

.section-label-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.button-container {
  justify-content: space-between;
}

.add-to-cart-button,
.add-to-wishlist-button {
  height: 44px;
  width: 40%;
  font-weight: bold;
  padding: 10px 18px;
}

.add-to-cart-button {
  background-color: var(--otu-light-blue);
  border: 1px solid var(--otu-light-blue);
}

.add-to-wishlist-button {
  background-color: white;
  color: var(--otu-blue);
  border: 1px solid var(--otu-blue);
}
</style>

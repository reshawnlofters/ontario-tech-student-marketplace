<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  isWishlisted: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['add-to-cart', 'add-to-wishlist'])
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

        <button
          class="add-to-wishlist-button button"
          :class="{ 'is-saved': isWishlisted }"
          :disabled="isWishlisted"
          @click="$emit('add-to-wishlist', item)"
        >
          <template v-if="isWishlisted">Saved</template>
          <template v-else> Save Item </template>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: transparent;
}

.item-card {
  border-radius: 0.75rem !important;
}

.card-image img {
  object-fit: cover;
}

.card-content {
  font-size: 1.125rem;
  color: black;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(255 255 255 / 100%)),
    linear-gradient(135deg, rgb(4 42 75 / 8%), rgb(231 93 42 / 10%));
}

.item-title,
.item-price {
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  font-size: 1.125rem;
  font-weight: bold;
}

.item-title {
  color: var(--otu-blue);
}

.item-price {
  margin-bottom: 0.75rem;
  color: var(--otu-orange);
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

.add-to-wishlist-button.is-saved {
  color: white;
  background-color: var(--otu-blue);
  border-color: var(--otu-blue);
  opacity: 0.85;
}

.add-to-wishlist-button:disabled {
  cursor: not-allowed;
}
</style>

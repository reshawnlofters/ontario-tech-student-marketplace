<script setup>
defineProps({
  wishlistItem: {
    type: Object,
    required: true,
  },
  isMovingToCart: {
    type: Boolean,
    default: false,
  },
  isRemoving: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['move-to-cart', 'remove'])
</script>

<template>
  <article class="wishlist-card box">
    <div class="wishlist-card-media">
      <img class="wishlist-image" :src="wishlistItem.item.image" :alt="wishlistItem.item.title" />
    </div>

    <div class="wishlist-card-content">
      <div class="wishlist-card-header">
        <div>
          <h2 class="wishlist-item-title">{{ wishlistItem.item.title }}</h2>
          <p class="wishlist-item-price">${{ wishlistItem.item.price.toFixed(2) }}</p>
        </div>

        <p class="wishlist-item-added-date has-text-grey">Saved {{ wishlistItem.addedDate }}</p>
      </div>

      <div class="wishlist-item-tags-container">
        <span class="wishlist-item-tag">{{ wishlistItem.item.category }}</span>
        <span class="wishlist-item-tag">{{ wishlistItem.item.condition }}</span>
        <span class="wishlist-item-tag">{{ wishlistItem.item.campusTag }}</span>
      </div>

      <p class="wishlist-item-description">{{ wishlistItem.item.description }}</p>

      <div class="wishlist-item-details">
        <p><span class="section-label">Seller</span>: {{ wishlistItem.item.sellerName }}</p>
        <p><span class="section-label">Listed</span>: {{ wishlistItem.item.createdDate }}</p>
        <p><span class="section-label">Stock</span>: {{ wishlistItem.item.stock }}</p>
      </div>

      <div class="wishlist-buttons-container">
        <button
          class="move-wishlist-item-to-cart-button button"
          :disabled="isMovingToCart"
          @click="$emit('move-to-cart', wishlistItem)"
        >
          {{ isMovingToCart ? 'Moving...' : 'Move to Cart' }}
        </button>

        <button
          class="remove-wishlist-item-button button is-danger is-light"
          :disabled="isRemoving"
          @click="$emit('remove', wishlistItem.id)"
        >
          {{ isRemoving ? 'Removing...' : 'Remove' }}
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.wishlist-card {
  display: grid;
  grid-template-columns: minmax(180px, 240px) 1fr;
  gap: 2rem;
  padding: 2rem;
  color: black;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(255 255 255 / 100%)),
    linear-gradient(135deg, rgb(4 42 75 / 8%), rgb(231 93 42 / 10%));
  border: 1px solid rgb(0 60 113 / 10%);
  border-radius: 0.75rem;
}

.wishlist-card-media {
  display: flex;
}

.wishlist-image {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  border-radius: 0.75rem;
}

.wishlist-card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wishlist-card-header {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.wishlist-item-title {
  margin: 0;
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--otu-blue);
}

.wishlist-item-price {
  margin-bottom: 0.35rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--otu-orange);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.wishlist-item-added-date {
  margin: 0;
  text-align: right;
}

.wishlist-item-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.wishlist-item-tag {
  padding: 0.45rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--otu-blue);
  background-color: rgb(0 119 202 / 8%);
  border: 1px solid rgb(0 119 202 / 18%);
  border-radius: 0.75rem;
}

.wishlist-item-description {
  margin: 0;
  line-height: 1.6;
}

.wishlist-item-details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(0 60 113 / 12%);
}

.wishlist-item-details p {
  margin: 0;
}

.wishlist-buttons-container {
  display: flex;
  gap: 0.85rem;
  margin-top: auto;
}

.move-wishlist-item-to-cart-button,
.remove-wishlist-item-button {
  min-width: 150px;
  padding: 0.75rem 1.125rem;
}

.move-wishlist-item-to-cart-button {
  color: white;
  background-color: var(--otu-light-blue);
  border: 1px solid var(--otu-light-blue);
}

.remove-wishlist-item-button {
  border: 1px solid #800019;
  transition: 0.3s !important;
}

.remove-wishlist-item-button:hover {
  filter: none;
}

.move-wishlist-item-to-cart-button:disabled,
.remove-wishlist-item-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

@media screen and (width <= 1023px) {
  .wishlist-card {
    grid-template-columns: 1fr;
  }

  .wishlist-card-header {
    flex-direction: column;
  }

  .wishlist-item-added-date {
    text-align: left;
  }

  .wishlist-item-details {
    grid-template-columns: 1fr;
  }
}

@media screen and (width <= 640px) {
  .wishlist-buttons-container {
    flex-direction: column;
  }

  .move-wishlist-item-to-cart-button,
  .remove-wishlist-item-button {
    width: 100%;
  }
}
</style>

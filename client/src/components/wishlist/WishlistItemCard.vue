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
      <img
        class="wishlist-image"
        :src="wishlistItem.item.image"
        :alt="wishlistItem.item.title"
      />
    </div>

    <div class="wishlist-card-content">
      <div class="wishlist-card-header">
        <div>
          <p class="wishlist-price">${{ wishlistItem.item.price.toFixed(2) }}</p>
          <h2 class="wishlist-title">{{ wishlistItem.item.title }}</h2>
        </div>

        <p class="wishlist-meta">Saved {{ wishlistItem.addedDate }}</p>
      </div>

      <div class="wishlist-tags">
        <span class="wishlist-tag">{{ wishlistItem.item.category }}</span>
        <span class="wishlist-tag">{{ wishlistItem.item.condition }}</span>
        <span class="wishlist-tag">{{ wishlistItem.item.campusTag }}</span>
      </div>

      <p class="wishlist-description">{{ wishlistItem.item.description }}</p>

      <div class="wishlist-details">
        <p><span class="section-label">Seller</span>: {{ wishlistItem.item.sellerName }}</p>
        <p><span class="section-label">Listed</span>: {{ wishlistItem.item.createdDate }}</p>
        <p><span class="section-label">Stock</span>: {{ wishlistItem.item.stock }}</p>
      </div>

      <div class="wishlist-actions">
        <button
          class="move-to-cart-button button"
          :disabled="isMovingToCart"
          @click="$emit('move-to-cart', wishlistItem)"
        >
          {{ isMovingToCart ? 'Moving...' : 'Move to Cart' }}
        </button>

        <button
          class="remove-button button"
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
  gap: 1.5rem;
  padding: 1.5rem;
  color: black;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(255 255 255 / 100%)),
    linear-gradient(135deg, rgb(4 42 75 / 8%), rgb(231 93 42 / 10%));
  border: 1px solid rgb(0 60 113 / 10%);
  border-radius: 1rem;
  box-shadow: 0 18px 40px rgb(4 42 75 / 8%);
}

.wishlist-card-media {
  display: flex;
}

.wishlist-image {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  border-radius: 0.85rem;
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

.wishlist-price {
  margin-bottom: 0.35rem;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--otu-orange);
  text-transform: uppercase;
}

.wishlist-title {
  margin: 0;
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--otu-blue);
}

.wishlist-meta {
  margin: 0;
  color: rgb(4 42 75 / 70%);
  text-align: right;
}

.wishlist-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.wishlist-tag {
  padding: 0.45rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--otu-blue);
  background-color: rgb(0 119 202 / 8%);
  border: 1px solid rgb(0 119 202 / 18%);
  border-radius: 999px;
}

.wishlist-description {
  margin: 0;
  line-height: 1.6;
}

.wishlist-details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(0 60 113 / 12%);
}

.wishlist-details p {
  margin: 0;
}

.wishlist-actions {
  display: flex;
  gap: 0.85rem;
  margin-top: auto;
}

.move-to-cart-button,
.remove-button {
  min-width: 150px;
  padding: 0.75rem 1.125rem;
}

.move-to-cart-button {
  color: white;
  background-color: var(--otu-light-blue);
  border: 1px solid var(--otu-light-blue);
}

.remove-button {
  color: var(--otu-blue);
  background-color: white;
  border: 1px solid rgb(0 60 113 / 22%);
}

.move-to-cart-button:disabled,
.remove-button:disabled {
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

  .wishlist-meta {
    text-align: left;
  }

  .wishlist-details {
    grid-template-columns: 1fr;
  }
}

@media screen and (width <= 640px) {
  .wishlist-actions {
    flex-direction: column;
  }

  .move-to-cart-button,
  .remove-button {
    width: 100%;
  }
}
</style>

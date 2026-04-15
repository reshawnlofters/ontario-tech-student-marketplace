<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { addItemToCart } from '../services/cartService'
import { getWishlist, removeWishlistItem } from '../services/wishlistService'
import WishlistItemCard from '../components/wishlist/WishlistItemCard.vue'
import flashMessage from '../utils/flashMessage'

const wishlistItems = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const successMessage = ref('')
const busyWishlistItemId = ref('')
const removingWishlistItemId = ref('')

async function loadWishlist() {
  try {
    isLoading.value = true
    errorMessage.value = ''
    wishlistItems.value = await getWishlist()
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load wishlist.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadWishlist()
})

const wishlistCount = computed(() => wishlistItems.value.length)

async function handleMoveToCart(wishlistItem) {
  successMessage.value = ''
  errorMessage.value = ''
  busyWishlistItemId.value = wishlistItem.id

  try {
    await addItemToCart(wishlistItem.item.id, 1)
    await removeWishlistItem(wishlistItem.id)
    await loadWishlist()
    flashMessage(successMessage, `${wishlistItem.item.title} was moved to your cart.`)
  } catch (error) {
    flashMessage(errorMessage, error.message || 'Failed to move wishlist item to your cart.')
  } finally {
    busyWishlistItemId.value = ''
  }
}

async function handleRemoveWishlistItem(wishlistItemId) {
  successMessage.value = ''
  errorMessage.value = ''
  removingWishlistItemId.value = wishlistItemId

  try {
    await removeWishlistItem(wishlistItemId)
    await loadWishlist()
    flashMessage(successMessage, 'Item removed from your wishlist.')
  } catch (error) {
    flashMessage(errorMessage, error.message || 'Failed to remove wishlist item.')
  } finally {
    removingWishlistItemId.value = ''
  }
}
</script>

<template>
  <section class="section wishlist-page">
    <div class="container">
      <div class="wishlist-hero box">
        <div>
          <p class="wishlist-eyebrow">Saved for later</p>
          <h1 class="page-title title is-2">Wishlist</h1>
          <p class="wishlist-subtitle">
            Keep track of interesting listings and move them to checkout when you are ready.
          </p>
        </div>

        <div class="wishlist-summary">
          <p class="wishlist-summary-label">Saved Items</p>
          <p class="wishlist-summary-count">{{ wishlistCount }}</p>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="successMessage" class="notification is-success is-light">
          {{ successMessage }}
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="errorMessage" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>
      </Transition>

      <div v-if="isLoading" class="notification is-info is-light">Loading wishlist...</div>

      <div v-else-if="wishlistItems.length === 0" class="wishlist-empty-state box">
        <p class="wishlist-empty-title">Your wishlist is empty.</p>
        <p class="wishlist-empty-copy">
          Browse the marketplace and save any item you want to revisit later.
        </p>
        <RouterLink to="/" class="browse-link button">Browse Listings</RouterLink>
      </div>

      <div v-else class="wishlist-grid">
        <WishlistItemCard
          v-for="wishlistItem in wishlistItems"
          :key="wishlistItem.id"
          :wishlist-item="wishlistItem"
          :is-moving-to-cart="busyWishlistItemId === wishlistItem.id"
          :is-removing="removingWishlistItemId === wishlistItem.id"
          @move-to-cart="handleMoveToCart"
          @remove="handleRemoveWishlistItem"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.wishlist-page {
  background:
    radial-gradient(circle at top left, rgb(0 119 202 / 10%), transparent 24rem),
    linear-gradient(180deg, #fff, #f7fafc 42%, #fff);
}

.wishlist-hero {
  display: flex;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 2rem;
  background:
    linear-gradient(135deg, rgb(4 42 75 / 98%), rgb(0 60 113 / 92%)),
    linear-gradient(135deg, rgb(231 93 42 / 28%), transparent 55%);
  border-radius: 1.25rem;
  box-shadow: 0 24px 48px rgb(4 42 75 / 16%);
}

.wishlist-eyebrow,
.wishlist-subtitle,
.wishlist-summary-label,
.wishlist-summary-count {
  margin: 0;
  color: white;
}

.wishlist-eyebrow {
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgb(255 255 255 / 72%);
  text-transform: uppercase;
}

.wishlist-subtitle {
  max-width: 48rem;
  line-height: 1.7;
  color: rgb(255 255 255 / 86%);
}

.wishlist-hero :deep(.page-title) {
  color: white !important;
}

.wishlist-summary {
  min-width: 180px;
  padding: 1.4rem;
  text-align: center;
  background-color: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.wishlist-summary-label {
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
  color: rgb(255 255 255 / 72%);
}

.wishlist-summary-count {
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
}

.wishlist-grid {
  display: grid;
  gap: 1.5rem;
}

.wishlist-empty-state {
  padding: 3rem;
  text-align: center;
  background-color: var(--otu-light-grey);
  border-radius: 1rem;
}

.wishlist-empty-title {
  margin-bottom: 0.75rem;
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--otu-blue);
}

.wishlist-empty-copy {
  max-width: 35rem;
  margin: 0 auto 1.5rem;
  line-height: 1.7;
}

.browse-link.button {
  color: white;
  background-color: var(--otu-orange);
  border: 1px solid var(--otu-orange);
}

@media screen and (width <= 768px) {
  .wishlist-hero {
    flex-direction: column;
    align-items: start;
  }

  .wishlist-summary {
    width: 100%;
  }

  .wishlist-empty-state {
    padding: 2rem 1.25rem;
  }
}
</style>

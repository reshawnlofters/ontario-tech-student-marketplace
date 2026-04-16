<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { addItemToCart } from '../services/cartService'
import { getWishlist, removeWishlistItem } from '../services/wishlistService'
import WishlistItemCard from '../components/wishlist/WishlistItemCard.vue'
import ButtonArrowIcon from '@/components/general/ButtonArrowIcon.vue'
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
          <p class="wishlist-hero-eyebrow">Saved for later</p>
          <h1 class="page-title title is-2">Wishlist</h1>
          <p class="wishlist-hero-subtitle">
            Keep track of your favourite listings and move them to your cart when your ready.
          </p>
        </div>

        <div class="wishlist-hero-summary-container">
          <p class="wishlist-hero-summary-label">Saved Items</p>
          <p class="wishlist-hero-summary-count">{{ wishlistCount }}</p>
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

      <div v-else-if="wishlistItems.length === 0" class="wishlist-empty-state-container box">
        <p class="wishlist-empty-state-title">Your wishlist is empty.</p>
        <p class="wishlist-empty-state-message has-text-grey">
          Browse the marketplace and save any items you want to revisit later.
        </p>
        <RouterLink to="/">
          <button class="browse-listings-button button">
            Browse Listings
            <ButtonArrowIcon />
          </button>
        </RouterLink>
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
.wishlist-hero {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  min-height: 12.5rem;
  padding: 2rem;
  margin-bottom: 3rem;
  background:
    linear-gradient(135deg, rgb(4 42 75 / 98%), rgb(0 60 113 / 92%)),
    linear-gradient(135deg, rgb(231 93 42 / 28%), transparent 55%);
  border-radius: 0.75rem;
  box-shadow: 0 24px 48px rgb(4 42 75 / 16%);
}

.wishlist-hero-eyebrow,
.wishlist-hero-subtitle,
.wishlist-hero-summary-label,
.wishlist-hero-summary-count {
  margin: 0;
  color: white;
}

.wishlist-hero-eyebrow {
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgb(255 255 255 / 72%);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.wishlist-hero-subtitle {
  max-width: 48rem;
  line-height: 1.7;
  color: rgb(255 255 255 / 86%);
}

.wishlist-hero .page-title {
  color: white !important;
}

.wishlist-hero-summary-container {
  min-width: 180px;
  padding: 1.4rem;
  text-align: center;
  background-color: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.wishlist-hero-summary-label {
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
  color: rgb(255 255 255 / 72%);
}

.wishlist-hero-summary-count {
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
}

.wishlist-grid {
  display: grid;
  gap: 1.5rem;
}

@media screen and (width <= 768px) {
  .wishlist-hero {
    flex-direction: column;
    align-items: start;
  }

  .wishlist-hero-summary-container {
    width: 100%;
  }

  .wishlist-empty-state-container {
    padding: 2rem 1.25rem;
  }
}
</style>

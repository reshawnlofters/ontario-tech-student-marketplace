<script setup>
import { computed, onMounted, ref } from 'vue'
import { getItems } from '../services/itemsService'
import { addItemToCart } from '../services/cartService'
import { addItemToWishlist, getWishlist } from '../services/wishlistService'
import HeroBanner from '../components/home/HeroBanner.vue'
import ItemSearchBar from '../components/home/ItemSearchBar.vue'
import ItemFilter from '../components/home/ItemFilter.vue'
import ItemGrid from '../components/home/ItemGrid.vue'
import flashMessage from '../utils/flashMessage'

const items = ref([])
const isLoadingFlag = ref(true)
const errorMessage = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const successMessage = ref('')
const cartErrorMessage = ref('')
const wishlistSuccessMessage = ref('')
const wishlistErrorMessage = ref('')
const wishlistItemIds = ref([])

onMounted(async () => {
  try {
    const [marketplaceItems, wishlistItems] = await Promise.all([getItems(), getWishlist()])
    items.value = marketplaceItems
    wishlistItemIds.value = wishlistItems.map((wishlistItem) => wishlistItem.item.id)
  } catch (error) {
    errorMessage.value = 'Unable to load items.'
  } finally {
    isLoadingFlag.value = false
  }
})

const categories = computed(() => {
  return [...new Set(items.value.map((item) => item.category))].sort()
})

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const searchItemMatch =
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const itemCategoryMatch =
      selectedCategory.value === '' || item.category === selectedCategory.value

    return searchItemMatch && itemCategoryMatch
  })
})

function isWishlisted(itemId) {
  return wishlistItemIds.value.includes(itemId)
}

async function handleAddItemToCart(item) {
  successMessage.value = ''
  cartErrorMessage.value = ''

  try {
    await addItemToCart(item.id, 1)
    flashMessage(successMessage, `${item.title} was added to your cart.`)
  } catch (error) {
    const message = error.message || 'Failed to add item to the cart.'
    flashMessage(cartErrorMessage, message)
  }
}

async function handleAddItemToWishlist(item) {
  wishlistSuccessMessage.value = ''
  wishlistErrorMessage.value = ''

  if (isWishlisted(item.id)) {
    return
  }

  try {
    await addItemToWishlist(item.id)
    wishlistItemIds.value = [...wishlistItemIds.value, item.id]
    flashMessage(wishlistSuccessMessage, `${item.title} was saved to your wishlist.`)
  } catch (error) {
    const message = error.message || 'Failed to save item to your wishlist.'
    flashMessage(wishlistErrorMessage, message)
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <HeroBanner />

      <div class="search-filter-container box mb-5">
        <div class="columns">
          <div class="column is-8">
            <ItemSearchBar v-model="searchQuery" />
          </div>

          <div class="column is-4">
            <ItemFilter
              :selected-category="selectedCategory"
              :categories="categories"
              @update:selectedCategory="selectedCategory = $event"
            />
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="successMessage" class="notification is-success is-light">
          {{ successMessage }}
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="cartErrorMessage" class="notification is-danger is-light">
          {{ cartErrorMessage }}
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="wishlistSuccessMessage" class="notification is-success is-light">
          {{ wishlistSuccessMessage }}
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="wishlistErrorMessage" class="notification is-danger is-light">
          {{ wishlistErrorMessage }}
        </div>
      </Transition>

      <div v-if="isLoadingFlag" class="notification is-info is-light">Loading items...</div>

      <div v-else-if="errorMessage" class="notification is-danger is-light">
        {{ errorMessage }}
      </div>

      <div v-else>
        <section id="marketplace-listings" class="mt-6">
          <div class="level mb-4">
            <div class="level-left">
              <div>
                <h2 class="page-title title is-3">Current Listings</h2>
                <p class="has-text-grey is-size-6">Showing {{ filteredItems.length }} item(s)</p>
              </div>
            </div>
          </div>

          <div v-if="filteredItems.length === 0" class="notification is-warning is-light">
            No items match your search or filter.
          </div>

          <ItemGrid
            v-else
            :items="filteredItems"
            :wishlist-item-ids="wishlistItemIds"
            @add-to-cart="handleAddItemToCart"
            @add-to-wishlist="handleAddItemToWishlist"
          />
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.search-filter-container {
  background-color: var(--otu-light-grey);
  border-radius: 0.75rem;
}
</style>

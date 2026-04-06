<script setup>
import { computed, onMounted, ref } from 'vue'
import { getItems } from '../services/itemsService'
import HeroBanner from '../components/home/HeroBanner.vue'
import ItemGrid from '../components/home/ItemGrid.vue'
import ItemSearchBar from '../components/home/ItemSearchBar.vue'
import ItemFilter from '../components/home/ItemFilter.vue'

const items = ref([])
const isLoadingFlag = ref(true)
const errorMessage = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const successMessage = ref('')
const cartErrorMessage = ref('')

onMounted(async () => {
  try {
    items.value = await getItems()
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

      <div v-if="successMessage" class="notification is-success is-light">
        {{ successMessage }}
      </div>

      <div v-if="cartErrorMessage" class="notification is-danger is-light">
        {{ cartErrorMessage }}
      </div>

      <div v-if="isLoadingFlag" class="notification is-info is-light">Loading items...</div>

      <div v-else-if="errorMessage" class="notification is-danger is-light">
        {{ errorMessage }}
      </div>

      <div v-else>
        <section id="marketplace-listings" class="mt-6">
          <div class="level mb-4">
            <div class="level-left">
              <div>
                <h2 class="section-title title is-3 mb-3">Current Listings</h2>
                <p class="has-text-grey is-size-6">Showing {{ filteredItems.length }} item(s)</p>
              </div>
            </div>
          </div>

          <div v-if="filteredItems.length === 0" class="notification is-warning is-light">
            No items match your current search or filter.
          </div>

          <ItemGrid v-else :items="filteredItems" />
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.search-filter-container {
  background-color: var(--ontario-tech-light-grey);
}
</style>

<script setup>
defineProps({
  selectedCategory: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

defineEmits(['update:selectedCategory'])
</script>

<template>
  <div class="field">
    <label class="section-title label">Filter by Category</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select
          class="filter-container"
          :value="selectedCategory"
          @change="$emit('update:selectedCategory', $event.target.value)"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 17px !important;
}

.filter-container {
  background-color: white;
  color: black;
  border: 1px solid var(--otu-input-border);
}
</style>

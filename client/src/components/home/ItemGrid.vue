<script setup>
import ItemCard from '../home/ItemCard.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

defineEmits(['add-to-cart'])
</script>

<template>
  <div class="columns is-multiline">
    <div
      v-for="item in items"
      :key="item.id"
      class="custom-grid-item column is-12-mobile is-6-tablet is-3-desktop"
    >
      <ItemCard :item="item" @add-to-cart="$emit('add-to-cart', $event)" />
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 1435px) {
  .column.custom-grid-item.is-3-desktop {
    flex: none;
    width: 33.3333%;
  }
}

@media screen and (max-width: 1220px) {
  .column.custom-grid-item.is-3-desktop {
    flex: none;
    width: 50%;
  }
}

@media screen and (max-width: 770px) {
  .column.custom-grid-item.is-3-desktop {
    flex: none;
    width: 100%;
  }
}
</style>

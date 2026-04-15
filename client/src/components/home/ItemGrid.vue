<script setup>
import ItemCard from '../home/ItemCard.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  wishlistItemIds: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['add-to-cart', 'add-to-wishlist'])
</script>

<template>
  <div class="columns is-multiline">
    <div
      v-for="item in items"
      :key="item.id"
      class="grid-item column is-12-mobile is-6-tablet is-3-desktop"
    >
      <ItemCard
        :item="item"
        :is-wishlisted="wishlistItemIds.includes(item.id)"
        @add-to-cart="$emit('add-to-cart', $event)"
        @add-to-wishlist="$emit('add-to-wishlist', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
@media screen and (width <= 1435px) {
  .column.grid-item.is-3-desktop {
    flex: none;
    width: 33.3333%;
  }
}

@media screen and (width <= 1220px) {
  .column.grid-item.is-3-desktop {
    flex: none;
    width: 50%;
  }
}

@media screen and (width <= 770px) {
  .column.grid-item.is-3-desktop {
    flex: none;
    width: 100%;
  }
}
</style>

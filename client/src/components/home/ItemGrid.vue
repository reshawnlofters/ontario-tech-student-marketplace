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
    <div v-for="item in items" :key="item.id" class="column is-12-mobile is-6-tablet is-4-desktop">
      <ItemCard :item="item" @add-to-cart="$emit('add-to-cart', $event)" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <label class="section-title label">Search Items</label>
    <div class="control">
      <input
        class="search-bar-container input"
        type="text"
        placeholder="Search Ontario Tech Student Marketplace"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 17px !important;
}

.search-bar-container {
  color: black;
  background-color: white;
  border: 1px solid var(--otu-input-border);
}

::placeholder {
  color: gray;
}
</style>

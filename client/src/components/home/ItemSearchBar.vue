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
    <label class="label">Search Items</label>
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
.label {
  color: var(--ontario-tech-blue);
}

.search-bar-container {
  background-color: white;
  color: black;
  border: 1px solid rgb(211, 211.5, 212.5);
}

::placeholder {
  color: gray;
}
</style>

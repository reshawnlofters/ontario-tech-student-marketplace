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
  <div class="promo-code-box-container field">
    <label class="section-title label">Promo Code</label>
    <div class="control">
      <input
        class="promo-code-box-input-container input"
        type="text"
        placeholder="Enter promo code"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p class="help">Promotion: OTSM10 - 10% Off</p>
  </div>
</template>

<style scoped>
.promo-code-box-container {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: var(--otu-light-grey);
  border-radius: 0.75rem;
}

.promo-code-box-input-container {
  margin-bottom: 9px;
  color: black;
  background-color: white;
  border: 1px solid var(--otu-input-border);
}

::placeholder {
  color: gray;
}
</style>

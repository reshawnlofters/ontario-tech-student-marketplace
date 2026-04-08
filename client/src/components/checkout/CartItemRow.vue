<script setup>
defineProps({
  cartItem: {
    type: Object,
    required: true,
  },
})

defineEmits(['update-quantity', 'remove-item'])
</script>

<template>
  <div class="cart-item-container box">
    <div class="columns is-vcentered">
      <div class="column is-2">
        <figure class="cart-item-image image">
          <img :src="cartItem.item.image" :alt="cartItem.item.title" />
        </figure>
      </div>

      <div class="column is-5">
        <h2 class="cart-item-title">{{ cartItem.item.title }}</h2>
        <p><span class="section-label">Category</span>: {{ cartItem.item.category }}</p>
        <p><span class="section-label">Condition</span>: {{ cartItem.item.condition }}</p>
        <p><span class="section-label">Seller</span>: {{ cartItem.item.sellerName }}</p>
      </div>

      <div class="column is-2">
        <label class="cart-item-quantity-label label">Quantity</label>
        <div class="select is-fullwidth">
          <select
            class="cart-item-quantity-input-container"
            :value="cartItem.quantity"
            @change="$emit('update-quantity', cartItem.id, Number($event.target.value))"
          >
            <option v-for="value in 1" :key="value" :value="value">
              {{ value }}
            </option>
          </select>
        </div>
      </div>

      <div class="column is-3">
        <p class="mb-2">
          <span class="section-label">Total</span>: ${{ cartItem.lineTotal.toFixed(2) }}
        </p>
        <button
          class="remove-cart-item-button button is-danger is-light"
          @click="$emit('remove-item', cartItem.id)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item-container {
  display: flex;
  justify-content: center;
  height: 200px;
  font-size: 18px;
  background-color: var(--otu-light-grey);
  color: black !important;
  padding: 2rem;
}

.cart-item-image img {
  border-radius: 6px;
}

.cart-item-title,
.cart-item-quantity-label {
  font-size: 18px;
  color: var(--otu-blue);
}

.cart-item-title {
  font-weight: bold;
}

.cart-item-quantity-input-container {
  background-color: white;
  color: black;
  border: 1px solid var(--otu-input-border);
}

.remove-cart-item-button {
  height: 44px;
  width: 100%;
  border: 1px solid #800019;
}

.remove-cart-item-button:hover {
  filter: none;
}
</style>

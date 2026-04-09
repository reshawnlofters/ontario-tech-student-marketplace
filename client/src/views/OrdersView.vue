<script setup>
import { onMounted, ref } from 'vue'
import { getOrders } from '../services/ordersService'

const orders = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    orders.value = await getOrders()
  } catch (error) {
    errorMessage.value = 'Unable to load orders.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="section">
    <div class="orders-container container">
      <h1 class="page-title title">Orders</h1>
      <p class="subtitle has-text-grey is-size-6">View your previously placed orders.</p>

      <div v-if="isLoading" class="notification is-info is-light">Loading orders...</div>

      <div v-else-if="errorMessage" class="notification is-danger is-light">
        {{ errorMessage }}
      </div>

      <div v-else-if="orders.length === 0" class="notification is-warning is-light">
        No orders have been placed yet.
      </div>

      <div v-else>
        <div v-for="order in orders" :key="order.id" class="order-container box mb-5">
          <h2 class="order-title title"><span>Order ID</span>: {{ order.id }}</h2>

          <div class="section-label-container content mb-4">
            <p>
              <span class="section-label">Date</span>:
              {{ new Date(order.createdAt).toLocaleString() }}
            </p>
            <p><span class="section-label">Payment Method</span>: {{ order.paymentMethod }}</p>
            <p><span class="section-label">Delivery Method</span>: {{ order.deliveryMethod }}</p>
            <p><span class="section-label">Subtotal</span>: ${{ order.subtotal.toFixed(2) }}</p>
            <p>
              <span class="section-label">Discount</span>: -${{ order.discountAmount.toFixed(2) }}
            </p>
            <p><span class="section-label">Total</span>: ${{ order.total.toFixed(2) }}</p>
          </div>

          <div class="order-item-table-container">
            <table class="order-item-table table is-fullwidth">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.items" :key="item.itemId">
                  <td><img class="order-item-image" :src="item.image" alt="Order Item Image" /></td>
                  <td>{{ item.title }}</td>
                  <td>${{ item.price.toFixed(2) }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>${{ item.total.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.order-container {
  font-size: 1.125rem;
  background-color: var(--otu-light-grey);
  color: black;
  padding: 2rem;
}

.order-title {
  font-size: 1.125rem;
  font-weight: normal;
  color: var(--otu-blue);
}

.order-title span {
  font-weight: bold;
}

.section-label-container {
  display: grid;
  grid-template-columns: auto auto auto;
}

.order-item-table {
  background-color: white;
  border-radius: 0.75rem;
}

.order-item-table th,
td {
  border-bottom-color: #d9d9d962;
  border-bottom-width: 1px;
  padding: 15px 25px;
}

.order-item-table th {
  color: var(--otu-blue);
}

.order-item-table td {
  padding-bottom: 8px;
  color: black;
}

.order-item-image {
  height: 100px;
  width: 100px;
  border-radius: 0.375rem;
  object-fit: cover;
}
</style>

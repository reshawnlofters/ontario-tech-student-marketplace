<script setup>
import { onMounted, ref } from 'vue'
import { getOrders, cancelOrder } from '../services/ordersService'
import flashMessage from '../utils/flashMessage'
import OrderCategoriesModal from '../components/orders/OrderCategoriesModal.vue'

const orders = ref([])
const isLoading = ref(true)
const successMessage = ref('')
const errorMessage = ref('')
const selectedOrder = ref(null)
const isOrderCategoriesModalOpen = ref(false)

async function loadOrders() {
  try {
    isLoading.value = true
    errorMessage.value = ''
    orders.value = await getOrders()
  } catch (error) {
    errorMessage.value = 'Unable to load orders.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadOrders()
})

async function handleCancelOrder(orderId) {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await cancelOrder(orderId)
    flashMessage(successMessage, 'Order cancelled successfully.')
    await loadOrders()
  } catch (error) {
    const message = error.message || 'Failed to cancel order.'
    flashMessage(errorMessage, message)
  }
}

function openOrderCategoriesModal(orderId) {
  const order = orders.value.find((order) => order.id === orderId)

  if (!order) {
    flashMessage(errorMessage, 'Unable to open order category chart.')
    return
  }

  selectedOrder.value = order
  isOrderCategoriesModalOpen.value = true
}

function closeOrderCategoriesModal() {
  isOrderCategoriesModalOpen.value = false
  selectedOrder.value = null
}
</script>

<template>
  <section class="section">
    <div class="orders-container container">
      <h1 class="page-title title">Orders</h1>
      <p class="subtitle has-text-grey is-size-6">View your previously placed orders.</p>

      <Transition name="fade">
        <div v-if="successMessage" class="notification is-success is-light">
          {{ successMessage }}
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="errorMessage" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>
      </Transition>

      <div v-if="isLoading" class="notification is-info is-light">Loading orders...</div>

      <div v-else-if="errorMessage" class="notification is-danger is-light">
        {{ errorMessage }}
      </div>

      <div v-else-if="orders.length === 0" class="notification is-warning is-light">
        You haven't placed any orders yet. Visit the
        <RouterLink to="/">homepage</RouterLink> to browse listings.
      </div>

      <div v-else>
        <div v-for="order in orders" :key="order.id" class="order-container box mb-5">
          <div class="order-title-buttons-container">
            <h2 class="order-title title"><span>Order ID</span>: {{ order.id }}</h2>
            <div class="order-categories-cancel-order-button-container">
              <button
                class="cancel-order-button button is-danger is-light"
                @click="handleCancelOrder(order.id)"
              >
                Cancel Order
              </button>
              <button
                class="order-categories-button button"
                @click="openOrderCategoriesModal(order.id)"
              >
                View Categories
              </button>
            </div>
          </div>

          <div class="section-label-container content mb-4">
            <p><span class="section-label">Date</span>: {{ order.createdDate }}</p>
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
                  <td><img class="order-item-image" :src="item.image" :alt="item.title" /></td>
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

      <OrderCategoriesModal
        v-if="isOrderCategoriesModalOpen && selectedOrder"
        :order="selectedOrder"
        @close="closeOrderCategoriesModal"
      />
    </div>
  </section>
</template>

<style scoped>
.order-container {
  padding: 2rem;
  font-size: 1.125rem;
  color: black;
  background-color: var(--otu-light-grey);
}

.order-title-buttons-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.order-categories-button {
  background-color: var(--otu-orange);
  border: 1px solid var(--otu-orange);
  transition: 0.3s !important;
}

.cancel-order-button {
  margin-right: 1rem;
  border: 1px solid #800019;
  transition: 0.3s !important;
}

.cancel-order-button:hover {
  filter: none;
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
  padding: 1.25rem 1.875rem;
  border-bottom-color: #d9d9d962;
  border-bottom-width: 1px;
}

.order-item-table th {
  color: var(--otu-blue);
}

.order-item-table td {
  padding-bottom: 0.9rem;
  color: black;
}

.order-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.375rem;
}
</style>

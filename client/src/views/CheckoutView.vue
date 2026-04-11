<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCart, removeCartItem, updateCartItemQuantity } from '../services/cartService'
import { createOrder } from '../services/ordersService'
import CartItemRow from '../components/checkout/CartItemRow.vue'
import CartSummaryPanel from '../components/checkout/CartSummaryPanel.vue'
import PaymentDetailsPanel from '../components/checkout/PaymentDetailsPanel.vue'
import PromoCodeBox from '../components/checkout/PromoCodeBox.vue'
import flashMessage from '../utils/flashMessage'

const router = useRouter()

const cartItems = ref([])
const isLoading = ref(true)
const successMessage = ref('')
const errorMessage = ref('')
const isSubmittingOrder = ref(false)
const promoCode = ref('')

async function loadCart() {
  try {
    isLoading.value = true
    errorMessage.value = ''
    cartItems.value = await getCart()
  } catch (error) {
    errorMessage.value = 'Unable to load cart.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadCart()
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, cartItem) => sum + cartItem.total, 0)
})

const discountPercent = computed(() => {
  const code = promoCode.value.trim().toUpperCase()
  if (code === 'OTSM10') return 10
  return 0
})

const discountAmount = computed(() => {
  return subtotal.value * (discountPercent.value / 100)
})

const total = computed(() => {
  return subtotal.value - discountAmount.value
})

async function handleUpdateCartItemQuantity(cartItemId, quantity) {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await updateCartItemQuantity(cartItemId, quantity)
    flashMessage(successMessage, 'Cart item updated successfully.')
    await loadCart()
  } catch (error) {
    const message = error.message || 'Failed to update cart item.'
    flashMessage(errorMessage, message)
  }
}

async function handleRemoveCartItem(cartItemId) {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await removeCartItem(cartItemId)
    flashMessage(successMessage, 'Item was removed from your cart.')
    await loadCart()
  } catch (error) {
    const message = error.message || 'Failed to remove cart item.'
    flashMessage(errorMessage, message)
  }
}

async function handleCheckout() {
  successMessage.value = ''
  errorMessage.value = ''
  isSubmittingOrder.value = true

  try {
    await createOrder({
      discountCode: promoCode.value.trim().toUpperCase(),
      paymentMethod: 'Mastercard ending in 1234',
      deliveryMethod: 'Campus Pickup',
    })

    successMessage.value = 'Order placed successfully. Redirecting...'

    setTimeout(() => {
      router.push('/orders')
    }, 1200)
  } catch (error) {
    errorMessage.value = error.message || 'Failed to place order.'
  } finally {
    isSubmittingOrder.value = false
  }
}
</script>

<template>
  <section class="section">
    <div class="checkout-container container">
      <h1 class="page-title title">Checkout</h1>
      <p class="subtitle has-text-grey is-size-6">Review your cart and place an order.</p>

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

      <div v-if="isLoading" class="notification is-info is-light">Loading cart...</div>

      <div v-else-if="cartItems.length === 0" class="notification is-warning is-light">
        Your cart is empty. Visit the
        <RouterLink to="/">homepage</RouterLink> to browse listings.
      </div>

      <div v-else class="columns is-align-start">
        <div class="column is-8">
          <CartItemRow
            v-for="cartItem in cartItems"
            :key="cartItem.id"
            :cart-item="cartItem"
            @update-quantity="handleUpdateCartItemQuantity"
            @remove-item="handleRemoveCartItem"
          />
        </div>

        <div class="column is-4">
          <PromoCodeBox v-model="promoCode" />
          <PaymentDetailsPanel />
          <CartSummaryPanel
            :subtotal="subtotal"
            :discount-amount="discountAmount"
            :total="total"
            :is-submitting="isSubmittingOrder"
            @checkout="handleCheckout"
          />
        </div>
      </div>
    </div>
  </section>
</template>

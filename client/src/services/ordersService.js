import BASE_URL from './api'

export async function getOrders() {
  const response = await fetch(`${BASE_URL}/orders`)

  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }

  return await response.json()
}

export async function createOrder(orderData) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to place order')
  }

  return await response.json()
}

export async function cancelOrder(orderId) {
  const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to cancel order')
  }

  return await response.json()
}

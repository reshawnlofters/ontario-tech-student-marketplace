import BASE_URL from './api'

export async function getCart() {
  const response = await fetch(`${BASE_URL}/cart`)

  if (!response.ok) {
    throw new Error('Failed to fetch cart')
  }

  return await response.json()
}

export async function addItemToCart(itemId, quantity = 1) {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
      quantity,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to add item to cart')
  }

  return await response.json()
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update cart item')
  }

  return await response.json()
}

export async function removeCartItem(cartItemId) {
  const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to remove cart item')
  }

  return await response.json()
}

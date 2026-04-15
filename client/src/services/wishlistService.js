import BASE_URL from './api'

export async function getWishlist() {
  const response = await fetch(`${BASE_URL}/wishlist`)

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist')
  }

  return await response.json()
}

export async function addItemToWishlist(itemId) {
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemId }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to add item to wishlist')
  }

  return await response.json()
}

export async function removeWishlistItem(wishlistItemId) {
  const response = await fetch(`${BASE_URL}/wishlist/${wishlistItemId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to remove wishlist item')
  }

  return await response.json()
}

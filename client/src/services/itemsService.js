import BASE_URL from './api'

export async function getItems() {
  const response = await fetch(`${BASE_URL}/items`)

  if (!response.ok) {
    throw new Error('Failed to fetch items')
  }

  return await response.json()
}

export async function createItem(itemData) {
  const response = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create item')
  }

  return await response.json()
}

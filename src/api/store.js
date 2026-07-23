const API = 'https://fakestoreapi.com'

export async function fetchUserCarts(userId) {
  const response = await fetch(`${API}/carts/user/${userId}`)
  if (!response.ok) throw new Error('Failed to fetch carts')
  return response.json()
}

export async function fetchProduct(productId) {
  const response = await fetch(`${API}/products/${productId}`)
  if (!response.ok) throw new Error(`Failed to fetch product ${productId}`)
  return response.json()
}

export async function fetchProducts() {
  const response = await fetch(`${API}/products`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export function toProduct(apiProduct) {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: apiProduct.price,
    image: apiProduct.image,
    category: apiProduct.category,
  }
}

export async function loadUserCart(userId) {
  const carts = await fetchUserCarts(userId)
  if (carts.length === 0) return []

  const cart = carts[0]
  const details = await Promise.all(
    cart.products.map(({ productId }) => fetchProduct(productId))
  )

  return cart.products.map(({ productId, quantity }) => {
    const product = details.find((item) => item.id === productId)
    return { ...toProduct(product), quantity }
  })
}

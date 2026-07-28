const API = 'https://fakestoreapi.com'

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

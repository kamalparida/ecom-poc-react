import type { ApiProduct, CatalogProduct } from '../types'

const API = 'https://fakestoreapi.com'

export async function fetchProduct(productId: string | number): Promise<ApiProduct> {
  const response = await fetch(`${API}/products/${productId}`)
  if (!response.ok) throw new Error(`Failed to fetch product ${productId}`)
  return response.json() as Promise<ApiProduct>
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  const response = await fetch(`${API}/products`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json() as Promise<ApiProduct[]>
}

export function toProduct(apiProduct: ApiProduct): CatalogProduct {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: apiProduct.price,
    image: apiProduct.image,
    category: apiProduct.category,
  }
}

export type ProductRating = {
  rate: number
  count: number
}

export type ApiProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

export type CatalogProduct = {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export type CartItem = CatalogProduct & {
  quantity: number
}

export type AuthUser = {
  firstName: string
  lastName: string
  email: string
}

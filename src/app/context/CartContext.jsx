import { createContext, useContext, useEffect, useState } from 'react'
import { loadUserCart } from '../../api/store'

const USER_ID = 1
const SHIPPING = 4.99
const TAX_RATE = 0.08

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserCart(USER_ID)
      .then(setItems)
      .catch((error) => console.error('Failed to load cart:', error))
      .finally(() => setLoading(false))
  }, [])

  function addItem(product, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...current, { ...product, quantity }]
    })
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    setItems((current) => {
      if (quantity < 1) {
        return current.filter((item) => item.id !== id)
      }
      return current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    })
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const tax = subtotal * TAX_RATE
  const total = subtotal + SHIPPING + tax

  const value = {
    items,
    loading,
    itemCount,
    subtotal,
    shipping: SHIPPING,
    tax,
    total,
    addItem,
    removeItem,
    updateQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook — any component can call useCart() to read/update the cart
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

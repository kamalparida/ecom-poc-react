import { create } from 'zustand'

const SHIPPING = 4.99
const TAX_RATE = 0.08

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        }
      }
      return { items: [...state.items, { ...product, quantity }] }
    })
  },

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  clearCart: () => set({ items: [] }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity < 1
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),

  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  tax: () => get().subtotal() * TAX_RATE,
  shipping: () => SHIPPING,
  total: () => get().subtotal() + SHIPPING + get().tax(),
}))

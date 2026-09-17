import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import Spinner from '../components/Spinner/Spinner'
import CartLineItem from '../components/CartLineItem/CartLineItem'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import './Cart.scss'

export default function Cart() {
  const items = useCartStore((s) => s.items)
  const loading = useCartStore((s) => s.loading)
  const itemCount = useCartStore((s) => s.itemCount())
  const clearCart = useCartStore((s) => s.clearCart)
  const [checkedOut, setCheckedOut] = useState(false)

  const handleCheckout = () => {
    clearCart()
    setCheckedOut(true)
  }

  if (loading) return <Spinner />

  if (checkedOut) {
    return (
      <div className="app-wrapper">
        <div className="cart-page__success">
          <div className="cart-page__success-icon">✓</div>
          <h1>Order placed!</h1>
          <p>Thanks for your purchase. Your order is being processed and will be delivered in 3–5 business days.</p>
          <Link to="/" className="cart-page__success-btn">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <div className="cart-page">
        <header className="cart-page__header">
          <h1>Your cart</h1>
          {itemCount > 0 && <p>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>}
        </header>

        {items.length === 0 ? (
          <div className="cart-page__empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="cart-page__layout">
            <section className="cart-page__items">
              {items.map((item) => (
                <CartLineItem key={item.id} item={item} />
              ))}
            </section>
            <OrderSummary onCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </div>
  )
}

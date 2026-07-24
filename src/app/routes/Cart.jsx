import { useCart } from '../context/CartContext'
import CartLineItem from '../components/CartLineItem'
import OrderSummary from '../components/OrderSummary'
import './Cart.scss'

export default function Cart() {
  const { items, loading, itemCount } = useCart()

  if (loading) {
    return <p className="cart-page__status">Loading your cart...</p>
  }

  return (
    <div className="cart-page">
      <header className="cart-page__header">
        <h1>Your cart</h1>
        <p>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
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
          <OrderSummary />
        </div>
      )}
    </div>
  )
}

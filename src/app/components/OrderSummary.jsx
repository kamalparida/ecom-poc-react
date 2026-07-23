import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import './OrderSummary.css'

export default function OrderSummary() {
  const { subtotal, shipping, tax, total } = useCart()

  return (
    <aside className="order-summary">
      <h2 className="order-summary__title">Order summary</h2>

      <dl className="order-summary__rows">
        <div className="order-summary__row">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="order-summary__row">
          <dt>Shipping</dt>
          <dd>{formatPrice(shipping)}</dd>
        </div>
        <div className="order-summary__row">
          <dt>Tax</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>
        <div className="order-summary__row order-summary__row--total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      <button type="button" className="order-summary__checkout">
        Checkout
      </button>
      <Link to="/" className="order-summary__home">
        Return to Home
      </Link>
    </aside>
  )
}

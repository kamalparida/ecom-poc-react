import { useCartStore } from '../../store/cartStore'
import { formatPrice } from '../../utils/format'
import type { CartItem } from '../../../types'
import './CartLineItem.css'

type CartLineItemProps = {
  item: CartItem
}

export default function CartLineItem({ item }: CartLineItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const lineTotal = item.price * item.quantity

  return (
    <article className="cart-line">
      <img src={item.image} alt={item.name} className="cart-line__image" />

      <div className="cart-line__info">
        <h3 className="cart-line__name">{item.name}</h3>
        <p className="cart-line__category">{item.category}</p>
        <p className="cart-line__unit-price">{formatPrice(item.price)} each</p>
      </div>

      <div className="cart-line__quantity">
        <button
          type="button"
          className="cart-line__qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label="Decrease quantity"
        />
        <span className="cart-line__qty">{item.quantity}</span>
        <button
          type="button"
          className="cart-line__qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Increase quantity"
        />
      </div>

      <p className="cart-line__total">{formatPrice(lineTotal)}</p>

      <button
        type="button"
        className="cart-line__remove"
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name}`}
      />
    </article>
  )
}

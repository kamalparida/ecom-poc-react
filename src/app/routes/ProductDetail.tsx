import { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toProduct } from '../../api/store'
import QuantitySelector from '../components/QuantitySelector/QuantitySelector'
import StarRating from '../components/StarRating/StarRating'
import { useCartStore } from '../store/cartStore'
import { useProduct } from '../hooks/useProduct'
import Spinner from '../components/Spinner/Spinner'
import { formatCategory, formatPrice, titleCase } from '../utils/format'
import './ProductDetail.scss'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading, error } = useProduct(id)
  const addItem = useCartStore((s) => s.addItem)
  const [quantity, setQuantity] = useState(1)

  const compareAtPrice = useMemo(() => {
    if (!product) return null
    return product.price * 1.3
  }, [product])

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addItem(toProduct(product), quantity)
  }, [addItem, product, quantity])

  const handleBuyNow = useCallback(() => {
    if (!product) return
    const items = useCartStore.getState().items
    const alreadyInCart = items.some((i) => i.id === product.id)
    if (!alreadyInCart) addItem(toProduct(product), quantity)
    navigate('/cart')
  }, [addItem, navigate, product, quantity])

  if (loading) return <Spinner />

  if (error || !product) return <p>{error ?? 'Product not found'}</p>

  return (
    <div className="app-wrapper">
    <section className="product-detail">
      <nav className="product-detail__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{titleCase(product.category)}</span>
        <span>/</span>
        <span className="is-current">{product.title}</span>
      </nav>

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <div className="product-detail__hero">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail__thumbs">
            {[0, 1, 2].map((index) => (
              <div key={index} className="product-detail__thumb">
                <img src={product.image} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <p className="product-detail__category">
            {formatCategory(product.category)}
          </p>
          <h1 className="product-detail__title">{product.title}</h1>

          <StarRating
            rating={product.rating.rate}
            count={product.rating.count}
          />

          <div className="product-detail__pricing">
            <span className="product-detail__price">
              {formatPrice(product.price)}
            </span>
            {compareAtPrice && (
              <span className="product-detail__compare">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>

          <div className="product-detail__description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-detail__quantity">
            <span className="product-detail__quantity-label">Quantity</span>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              ariaLabel="Product quantity"
            />
          </div>

          <p className="product-detail__stock">
            <span className="product-detail__stock-dot" aria-hidden="true" />
            In stock — ready to ship
          </p>

          <div className="product-detail__actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddToCart}
            >
              <CartGlyph />
              Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          <div className="product-detail__trust">
            <p>
              <TruckGlyph />
              Free delivery in 3–5 days
            </p>
            <p>
              <ReturnGlyph />
              30-day easy returns
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

function CartGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6 5 3H2" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  )
}

function TruckGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  )
}

function ReturnGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  )
}

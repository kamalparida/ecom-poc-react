import { Link } from 'react-router-dom'
import './ProductCard.scss'
import StarRating from '../StarRating/StarRating'

type ProductCardProps = {
  id: number
  productName: string
  productImage: string
  productPrice: number
  rating?: number
}

export default function ProductCard({
  id,
  productName,
  productImage,
  productPrice,
  rating,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="product-card">
      <img src={productImage} alt={productName} />
      <p className="product-name">{productName}</p>
      <StarRating rating={rating} />
      <p className="product-price">${productPrice.toFixed(2)}</p>
    </Link>
  )
}

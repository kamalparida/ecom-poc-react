import "./ProductCard.scss";
import StarRating from "../StarRating/StarRating";

export default function ProductCard({
  productName,
  productImage,
  productPrice,
  rating,
}) {
  return (
    <article className="product-card">
      <img src={productImage} alt={productName} />
      <p className="product-name">{productName}</p>
      <StarRating rating={rating} />
      <p className="product-price">${productPrice.toFixed(2)}</p>
    </article>
  );
}

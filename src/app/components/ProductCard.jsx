import "./Product.scss";

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
      {rating != null && (
        <p className="product-rating">{rating.toFixed(1)}</p>
      )}
      <p className="product-price">${productPrice.toFixed(2)}</p>
    </article>
  );
}

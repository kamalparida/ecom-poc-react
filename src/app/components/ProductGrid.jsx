import ProductCard from "./ProductCard";
import "./Product.scss";

export default function ProductGrid({ products = [], selectedCategory = "all" }) {
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="product-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.title}
            productImage={product.image}
            productPrice={product.price}
            rating={product.rating?.rate}
          />
        ))
      ) : (
        <p className="product-status">No products found.</p>
      )}
    </div>
  );
}

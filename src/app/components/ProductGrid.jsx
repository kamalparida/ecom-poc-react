import ProductCard from "./ProductCard";
import "./Product.scss";

export default function ProductGrid({
  products = [],
  selectedCategory = "all",
  searchText = "",
}) {
  const query = searchText.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      !query || product.title.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

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

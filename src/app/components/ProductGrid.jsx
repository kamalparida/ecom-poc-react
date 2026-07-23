import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Product.scss";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
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

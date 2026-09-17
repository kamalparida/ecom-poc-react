import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";
import "./ProductGrid.scss";

const ITEMS_PER_PAGE = 8;

export default function ProductGrid({
  products = [],
  selectedCategory = "all",
  searchText = "",
  loading = false,
}) {
  if (loading) return <Spinner />
  const query = searchText.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      !query || product.title.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <ProductGridContent
      key={`${selectedCategory}-${searchText}`}
      products={filteredProducts}
    />
  );
}

function ProductGridContent({ products }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(Math.ceil(products.length / ITEMS_PER_PAGE), 1);
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="product-list">
      <div className="product-grid">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
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
      <Pagination
        currentPage={activePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
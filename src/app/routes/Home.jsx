import { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown/CategoryDropdown";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Search from "../components/Search/Search";
import "./Home.scss";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");

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

  const categories = [...new Set(products.map((product) => product.category))].sort();

  return (
    <div className="home">
      <div className="home__filters">
        <Search searchText={searchText} setSearchText={setSearchText} />
        <CategoryDropdown
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <ProductGrid
        products={products}
        selectedCategory={selectedCategory}
        searchText={searchText}
      />
    </div>
  );
}

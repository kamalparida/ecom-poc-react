import { useEffect, useState } from 'react'
import CategoryDropdown from '../components/CategoryDropdown/CategoryDropdown'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import Search from '../components/Search/Search'
import { fetchProducts } from '../../api/store'
import type { ApiProduct } from '../../types'
import './Home.scss'

export default function Home() {
  const [products, setProducts] = useState<ApiProduct[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    void loadProducts()
  }, [])

  const categories = [...new Set(products.map((product) => product.category))].sort()

  return (
    <div className="app-wrapper">
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
          loading={loading}
        />
      </div>
    </div>
  )
}

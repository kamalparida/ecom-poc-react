import { Routes, Route } from 'react-router-dom'
import Navbar from './app/components/Navbar'
import Footer from './app/components/Footer'
import Home from './app/routes/Home'
import Products from './app/routes/Products'
import Cart from './app/routes/Cart'
import ProductDetail from './app/routes/ProductDetail'
import About from './app/routes/About'
import { CartProvider } from './app/context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

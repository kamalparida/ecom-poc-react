import { Routes, Route } from 'react-router-dom'
import Navbar from './app/components/Navbar'
import Home from './app/routes/Home'
import Products from './app/routes/Products'
import Cart from './app/routes/Cart'
import About from './app/routes/About'
import { CartProvider } from './app/context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </CartProvider>
  )
}

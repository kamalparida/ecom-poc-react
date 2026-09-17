import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'
import './Navbar.scss'

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navbar__nav-link is-active' : 'navbar__nav-link'

export default function Navbar() {
  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)
  const itemCount = useCartStore((s) => s.itemCount())
  const clearCart = useCartStore((s) => s.clearCart)
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    clearCart()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          Cartly
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
        </nav>

        <div className="navbar__actions">
          {user ? (
            <>
              <span className="navbar__username">Hi, {user.firstName || user.username}</span>
              <button className="navbar__signout" onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__register">Login</Link>
              <Link to="/register" className="navbar__register">Register</Link>
            </>
          )}
          <Link to="/cart" className="navbar__cart" aria-label="Open cart">
            <CartIcon />
            {itemCount > 0 && (
              <span className="navbar__cart-badge">{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6 5 3H2" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  )
}

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Toast.scss'

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="toast" role="status">
      <span>{message}</span>
      <Link to="/cart" className="toast__link" onClick={onClose}>Go to Cart</Link>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss">✕</button>
    </div>
  )
}

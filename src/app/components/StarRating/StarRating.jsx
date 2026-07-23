import './StarRating.css'

export default function StarRating({ rating, count, showValue = true }) {
  const clamped = Math.max(0, Math.min(5, rating))
  const fullStars = Math.floor(clamped)
  const hasHalf = clamped - fullStars >= 0.4

  return (
    <div className="star-rating" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <div className="star-rating__stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < fullStars || (index === fullStars && hasHalf)
          return (
            <span key={index} className={filled ? 'star is-filled' : 'star'}>
              ★
            </span>
          )
        })}
      </div>
      {showValue && (
        <span className="star-rating__meta">
          {rating.toFixed(1)}
          {typeof count === 'number' && (
            <>
              {' · '}
              {count} reviews
            </>
          )}
        </span>
      )}
      {!showValue && typeof count === 'number' && (
        <span className="star-rating__meta">{count} reviews</span>
      )}
    </div>
  )
}

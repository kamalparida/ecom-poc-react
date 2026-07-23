import "./StarRating.scss";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z";

function Star({ type }) {
  if (type === "half") {
    return (
      <span className="star star--half" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" className="star__empty">
          <path d={STAR_PATH} />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" className="star__full">
          <path d={STAR_PATH} />
        </svg>
      </span>
    );
  }

  return (
    <span className={`star star--${type}`} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d={STAR_PATH} />
      </svg>
    </span>
  );
}

function getStarType(index, rating) {
  const starValue = rating - index;
  if (starValue >= 1) return "full";
  if (starValue >= 0.5) return "half";
  return "empty";
}

export default function StarRating({ rating, maxStars = 5 }) {
  if (rating == null) return null;

  const normalizedRating = Math.min(Math.max(rating, 0), maxStars);

  return (
    <div
      className="star-rating"
      aria-label={`Rating: ${normalizedRating.toFixed(1)} out of ${maxStars}`}
    >
      <div className="star-rating__stars">
        {Array.from({ length: maxStars }, (_, index) => (
          <Star key={index} type={getStarType(index, normalizedRating)} />
        ))}
      </div>
      <span className="star-rating__value">{normalizedRating.toFixed(1)}</span>
    </div>
  );
}

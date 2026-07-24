import './QuantitySelector.css'

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  ariaLabel = 'Quantity',
}) {
  return (
    <div className="qty" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="qty__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

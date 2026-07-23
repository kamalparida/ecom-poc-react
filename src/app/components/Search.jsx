import './Search.scss'

export default function Search({ searchText, setSearchText }) {
  return (
    <div className="search-container">
      <span className="search-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </span>
      <input
        type="search"
        placeholder="Search products"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        aria-label="Search products"
      />
    </div>
  )
}

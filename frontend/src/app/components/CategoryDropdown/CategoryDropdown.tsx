import type { ChangeEvent } from 'react'
import './CategoryDropdown.scss'

function formatCategoryLabel(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

type CategoryDropdownProps = {
  categories?: string[]
  value: string
  onChange: (value: string) => void
}

export default function CategoryDropdown({
  categories = [],
  value,
  onChange,
}: CategoryDropdownProps) {
  return (
    <div className="category-dropdown">
      <select
        id="category-filter"
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {formatCategoryLabel(category)}
          </option>
        ))}
      </select>
      <span className="category-dropdown__icon" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  )
}

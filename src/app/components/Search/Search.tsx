import type { ChangeEvent } from 'react'
import { useState } from 'react'
import './Search.scss'

type SearchProps = {
  searchText?: string
  setSearchText?: (value: string) => void
}

export default function Search({ searchText, setSearchText }: SearchProps) {
  const [internalText, setInternalText] = useState('')
  const isControlled = searchText !== undefined && setSearchText !== undefined
  const value = isControlled ? searchText : internalText

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      setSearchText(e.target.value)
    } else {
      setInternalText(e.target.value)
    }
  }

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
        value={value}
        onChange={handleChange}
        aria-label="Search products"
      />
    </div>
  )
}

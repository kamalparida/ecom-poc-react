import { useEffect, useState } from 'react'
import { fetchProduct } from '../../api/store'
import type { ApiProduct } from '../../types'

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<ApiProduct | null>(null)
  const [loading, setLoading] = useState(() => Boolean(id))
  const [error, setError] = useState<string | null>(() =>
    id ? null : 'Product id is missing'
  )

  useEffect(() => {
    if (!id) {
      return
    }

    const productId = id
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchProduct(productId)
        if (!cancelled) setProduct(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product')
          setProduct(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [id])

  return { product, loading, error }
}

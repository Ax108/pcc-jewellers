import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets window scroll position to the top on page reloads, route changes,
 * query param updates (e.g. footer collection buttons), and navigation clicks.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  // Reset scroll on route change or search query changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search])

  // Global listener for internal links (e.g., clicking footer buttons while already on /collections)
  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a')
      if (!link) return
      const href = link.getAttribute('href')
      if (href && (href.startsWith('/collections') || href.startsWith('/'))) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }

    document.addEventListener('click', handleLinkClick, true)
    return () => document.removeEventListener('click', handleLinkClick, true)
  }, [])

  // Prevent browser from restoring scroll position on reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.scrollTo(0, 0)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return null
}

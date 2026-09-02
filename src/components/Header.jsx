import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  MapPin,
  Phone,
  Clock,
  Menu,
  X,
} from 'lucide-react'
import { SITE_INFO, NAV_LINKS } from '../configs/siteContent'
import { fetchLocalizedGoldRate } from '../helpers/goldRateService'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [localizedGoldRate, setLocalizedGoldRate] = useState(SITE_INFO.goldRate)
  const navigate = useNavigate()

  useEffect(() => {
    fetchLocalizedGoldRate().then((res) => {
      if (res && res.displayString) {
        setLocalizedGoldRate(res.displayString)
      }
    })
  }, [])

  const handleSearchSubmit = (e) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/collections')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      {/* Top Utility Bar */}
      <div className="border-b border-neutral-100 bg-[#FAF8F5] text-[13.5px] text-neutral-600">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#801424]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#801424] animate-pulse" />
              {localizedGoldRate}
            </span>
            <span className="hidden text-neutral-300 md:inline">|</span>
            <span className="hidden items-center gap-1.5 text-neutral-600 md:inline-flex">
              <Clock className="h-4 w-4 text-neutral-400" />
              Celebrating 85 Years of Heritage
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:18002081939"
              className="hidden items-center gap-1.5 transition-colors hover:text-[#801424] sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5 text-neutral-400" />
              <span>Toll Free: {SITE_INFO.tollFree}</span>
            </a>
            <a
              href="#stores"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#801424]"
            >
              <MapPin className="h-3.5 w-3.5 text-neutral-400" />
              <span>Find Showrooms</span>
            </a>
            <a
              href="#track"
              className="hidden transition-colors hover:text-[#801424] md:inline"
            >
              Track Order
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Trademark Badges */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-neutral-700 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="hidden items-center gap-4 sm:flex">
              <img
                src="/assets/85-years-completion.webp"
                alt="85 Years of P.C. Chandra"
                className="h-16 sm:h-20 w-auto object-contain"
              />
              <img
                src="/assets/trademark.webp"
                alt="P.C. Chandra Trademark"
                className="h-13 sm:h-16 w-auto object-contain opacity-95"
              />
            </div>
          </div>

          {/* Official Brand Logo */}
          <Link to="/" className="flex flex-col items-center">
            <img
              src="/assets/logo.avif"
              alt="P. C. Chandra Jewellers"
              className="h-11 sm:h-13 w-auto object-contain"
            />
            <span className="mt-0.5 text-xs tracking-[0.25em] text-neutral-500 uppercase font-medium">
              A Jewel of Jewels • Est. 1939
            </span>
          </Link>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative hidden w-72 lg:block">
              <input
                type="text"
                placeholder="Search jewellery, gold, diamonds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-neutral-50/70 py-2 pr-4 pl-10 text-sm text-neutral-800 placeholder-neutral-400 transition-colors focus:border-[#801424] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                className="absolute top-2.5 left-3.5 text-neutral-400 hover:text-[#801424]"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="p-2 text-neutral-700 transition-colors hover:text-[#801424] lg:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <a
                href="#wishlist"
                className="relative p-2 text-neutral-700 transition-colors hover:text-[#801424]"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#801424] text-[10px] font-semibold text-white">
                  0
                </span>
              </a>

              <a
                href="#cart"
                className="relative p-2 text-neutral-700 transition-colors hover:text-[#801424]"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#801424] text-[10px] font-semibold text-white">
                  0
                </span>
              </a>

              <a
                href="#account"
                className="p-2 text-neutral-700 transition-colors hover:text-[#801424]"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Desktop) */}
      <nav className="hidden border-t border-neutral-150 bg-[#FAF8F5] md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ul className="flex items-center justify-center gap-9 py-3">
            {NAV_LINKS.map((link) => {
              let targetHref = '/collections'
              if (link.label === 'Gold') targetHref = '/collections?metal=gold'
              else if (link.label === 'Diamond') targetHref = '/collections?metal=diamond'
              else if (link.label === 'Bridal' || link.label === 'Polki & Jadau') targetHref = '/collections?category=bridal'
              else if (link.label === 'Daily Wear') targetHref = '/collections?category=rings'

              return (
                <li key={link.label}>
                  <Link
                    to={targetHref}
                    className="group relative text-[15.5px] font-medium tracking-wide text-neutral-800 transition-colors hover:text-[#801424]"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#801424] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="mb-4 flex items-center gap-3 border-b border-neutral-150 pb-3">
            <img
              src="/assets/85-years-completion.webp"
              alt="85 Years"
              className="h-9 w-auto"
            />
            <img
              src="/assets/trademark.webp"
              alt="Trademark"
              className="h-8 w-auto opacity-80"
            />
          </div>

          <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="relative mb-4">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-neutral-300 py-2 pr-4 pl-9 text-sm text-neutral-800 focus:border-[#801424] focus:outline-none"
            />
            <button type="submit" className="absolute top-2.5 left-3 text-neutral-400 hover:text-[#801424]">
              <Search className="h-4 w-4" />
            </button>
          </form>

          <ul className="space-y-3">
            {NAV_LINKS.map((link) => {
              let targetHref = '/collections'
              if (link.label === 'Gold') targetHref = '/collections?metal=gold'
              else if (link.label === 'Diamond') targetHref = '/collections?metal=diamond'
              else if (link.label === 'Bridal' || link.label === 'Polki & Jadau') targetHref = '/collections?category=bridal'
              else if (link.label === 'Daily Wear') targetHref = '/collections?category=rings'

              return (
                <li key={link.label}>
                  <Link
                    to={targetHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-neutral-800 hover:text-[#801424]"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}

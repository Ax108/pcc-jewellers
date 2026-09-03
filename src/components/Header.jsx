import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  Video,
  ChevronRight,
} from 'lucide-react'
import { SITE_INFO, NAV_LINKS } from '../configs/siteContent'
import { fetchLocalizedGoldRate } from '../helpers/goldRateService'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [localizedGoldRate, setLocalizedGoldRate] = useState(SITE_INFO.goldRate)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchLocalizedGoldRate().then((res) => {
      if (res && res.displayString) {
        setLocalizedGoldRate(res.displayString)
      }
    })
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Automatically close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, location.search])

  const handleSearchSubmit = (e) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/collections')
    }
    setMobileMenuOpen(false)
  }

  const quickSearchTags = ['Gold Jhumka', 'Bridal Choker', 'Solitaire Ring', 'Men’s Kada']

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
        {/* Top Utility Bar */}
        <div className="border-b border-neutral-100 bg-[#FAF8F5] text-[11px] sm:text-[13px] text-neutral-600">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-1.5 sm:px-6 sm:py-2">
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#801424] shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-[#801424] animate-pulse" />
                <span>{localizedGoldRate}</span>
              </span>
              <span className="hidden text-neutral-300 md:inline">|</span>
              <span className="hidden items-center gap-1.5 text-neutral-600 md:inline-flex">
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                Celebrating 85 Years of Heritage
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 text-neutral-700">
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
                <span className="hidden xs:inline">Showrooms</span>
                <span className="xs:hidden">Stores</span>
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
        <div className="relative mx-auto max-w-7xl px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="relative flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Hamburger + Badges */}
            <div className="flex items-center gap-2 sm:gap-6 z-10">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/90 bg-[#FAF8F5] text-neutral-800 transition-colors hover:border-[#801424] hover:text-[#801424] active:scale-95 md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="hidden items-center gap-3 sm:flex">
                <img
                  src="/assets/85-years-completion.webp"
                  alt="85 Years of P.C. Chandra"
                  className="h-14 sm:h-18 w-auto object-contain"
                />
                <img
                  src="/assets/trademark.webp"
                  alt="P.C. Chandra Trademark"
                  className="h-12 sm:h-15 w-auto object-contain opacity-95"
                />
              </div>
            </div>

            {/* Official Brand Logo - Dead Centered on Mobile */}
            <Link
              to="/"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shrink-0 md:static md:translate-x-0 md:translate-y-0"
            >
              <img
                src="/assets/logo.avif"
                alt="P. C. Chandra Jewellers"
                className="h-11 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-200 hover:scale-102"
              />
            </Link>

            {/* Right: Search & Actions */}
            <div className="flex items-center gap-1 sm:gap-3 z-10">
              {/* Search Input Form (Desktop) */}
              <form onSubmit={handleSearchSubmit} className="relative hidden w-64 xl:w-72 lg:block">
                <input
                  type="text"
                  placeholder="Search jewellery, gold, diamonds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-neutral-300 bg-neutral-50/70 py-2 pr-4 pl-10 text-xs text-neutral-800 placeholder-neutral-400 transition-colors focus:border-[#801424] focus:bg-white focus:outline-none shadow-2xs"
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
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:text-[#801424] lg:hidden"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>

                <Link
                  to="/collections"
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:text-[#801424]"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#801424] text-[10px] font-semibold text-white">
                    0
                  </span>
                </Link>

                <Link
                  to="/collections"
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:text-[#801424]"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#801424] text-[10px] font-semibold text-white">
                    0
                  </span>
                </Link>

                <a
                  href="#account"
                  className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:text-[#801424]"
                  aria-label="Account"
                >
                  <User className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar (Desktop) */}
        <nav className="hidden border-t border-neutral-200/70 bg-[#FAF8F5]/95 md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ul className="flex items-center justify-center gap-6 lg:gap-8 py-2">
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
                      className="group relative text-[13px] font-medium tracking-wide text-neutral-700 transition-colors hover:text-[#801424]"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#801424] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* Premium Sliding Off-Canvas Hamburger Drawer (Mobile) via createPortal to prevent stacking clipping */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[99999] flex md:hidden">
                {/* Backdrop Blur Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Sliding Drawer Container */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                  className="relative flex h-full h-dvh max-h-screen w-[85vw] max-w-[340px] flex-col bg-white shadow-2xl z-10 overflow-y-auto no-scrollbar"
                >
                  {/* Drawer Top Header */}
                  <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-4">
                    <img
                      src="/assets/logo.avif"
                      alt="P. C. Chandra Jewellers"
                      className="h-8 w-auto object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-[#801424] hover:text-white"
                      aria-label="Close menu"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Clean Gold Rate Bar */}
                  <div className="bg-[#801424] px-5 py-2.5 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>Live 22KT Rate</span>
                    </div>
                    <span className="text-xs font-bold text-amber-200">
                      {localizedGoldRate.split('|')[0]?.replace('Today 22KT Gold: ', '').trim() || '₹7,940 / gm'}
                    </span>
                  </div>

                  {/* Search Bar */}
                  <div className="p-4 border-b border-neutral-150 bg-[#FAF8F5]/60">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        type="text"
                        placeholder="Search jewellery, diamonds..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-full border border-neutral-300 bg-white py-2 pr-4 pl-9 text-xs text-neutral-800 placeholder-neutral-400 focus:border-[#801424] focus:outline-none"
                      />
                      <Search className="absolute top-2.5 left-3 h-4 w-4 text-neutral-400" />
                    </form>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {quickSearchTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag)
                            navigate(`/collections?search=${encodeURIComponent(tag)}`)
                            setMobileMenuOpen(false)
                          }}
                          className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium text-neutral-600 border border-neutral-200 hover:border-[#801424] hover:text-[#801424]"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Links */}
                  <div className="flex-1 px-4 py-3 space-y-1">
                    <div className="flex items-center justify-between px-2 pb-2">
                      <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                        Collections
                      </p>
                      <Link
                        to="/collections"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[11px] font-semibold text-[#801424]"
                      >
                        All Categories →
                      </Link>
                    </div>

                    {NAV_LINKS.map((link) => {
                      let targetHref = '/collections'
                      if (link.label === 'Gold') targetHref = '/collections?metal=gold'
                      else if (link.label === 'Diamond') targetHref = '/collections?metal=diamond'
                      else if (link.label === 'Bridal' || link.label === 'Polki & Jadau') targetHref = '/collections?category=bridal'
                      else if (link.label === 'Daily Wear') targetHref = '/collections?category=rings'

                      return (
                        <Link
                          key={link.label}
                          to={targetHref}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-[#FAF8F5] hover:text-[#801424] transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                        </Link>
                      )
                    })}

                    {/* Services */}
                    <div className="pt-3 border-t border-neutral-150 mt-3 space-y-1">
                      <p className="px-2 pb-1 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                        Services & Help
                      </p>

                      <a
                        href="#video-consult"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                      >
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-[#801424]" />
                          <span>Video Consultation</span>
                        </div>
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                          Book
                        </span>
                      </a>

                      <a
                        href="#stores"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#801424]" />
                          <span>Find Showrooms</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">100+</span>
                      </a>

                      <a
                        href="tel:18002081939"
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#801424]" />
                          <span>Toll Free</span>
                        </div>
                        <span className="text-xs font-semibold text-[#801424]">{SITE_INFO.tollFree}</span>
                      </a>
                    </div>
                  </div>

                  {/* Footer Trademark */}
                  <div className="border-t border-neutral-200 bg-[#FAF8F5] p-3 text-center">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <img
                        src="/assets/85-years-completion.webp"
                        alt="85 Years"
                        className="h-8 w-auto object-contain"
                      />
                      <img
                        src="/assets/trademark.webp"
                        alt="Trademark"
                        className="h-7 w-auto object-contain opacity-90"
                      />
                    </div>
                    <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-medium">
                      100% BIS 916 Hallmarked • Pure Trust
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}



import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Video,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronRight,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ALL_PRODUCTS } from '../configs/siteContent'

const CATEGORIES_LIST = [
  { id: 'all', label: 'All Collections' },
  { id: 'earrings', label: "Earrings & Jhumkas" },
  { id: 'rings', label: 'Rings & Solitaires' },
  { id: 'necklaces', label: 'Necklaces & Chokers' },
  { id: 'bangles', label: 'Bangles & Kadas' },
  { id: 'bridal', label: 'Bridal Heritage' },
  { id: 'mens', label: "Men's Collection" },
]

const GOLD_COLORS = ['Yellow Gold', 'White Gold', 'Rose Gold']
const GENDERS = ['Women', 'Men', 'Kids', 'Unisex']
const METAL_PURITIES = ['22KT Gold', '18KT Diamond', '14KT Gold', 'Platinum']
const DELIVERY_OPTIONS = [
  { value: 3, label: '3 Days (Fastest)' },
  { value: 7, label: '7 Days' },
  { value: 10, label: '10 Days' },
  { value: 25, label: '25 Days (Bespoke)' },
]

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 })
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedGenders, setSelectedGenders] = useState([])
  const [selectedPurities, setSelectedPurities] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const sentinelRef = useRef(null)

  const [wishlist, setWishlist] = useState([])
  const [cartAdded, setCartAdded] = useState({})

  // Keep state comprehensively synced with all URL search params changes
  useEffect(() => {
    const cat = searchParams.get('category')
    const srch = searchParams.get('search')
    const mtl = searchParams.get('metal')
    const gndr = searchParams.get('gender')
    const minP = searchParams.get('minPrice')
    const maxP = searchParams.get('maxPrice')
    const prc = searchParams.get('price')

    // 1. Category parsing
    if (cat) {
      const c = cat.toLowerCase()
      if (c === 'pendants') setActiveCategory('necklaces')
      else if (c === 'wedding') setActiveCategory('bridal')
      else if (c === 'for-him') setActiveCategory('mens')
      else setActiveCategory(c)
    } else {
      setActiveCategory('all')
    }

    // 2. Search keyword
    if (srch !== null && srch !== undefined) {
      setSearchQuery(srch)
    } else {
      setSearchQuery('')
    }

    // 3. Metal / Purity filter
    if (mtl) {
      const m = mtl.toLowerCase()
      if (m === 'diamond') setSelectedPurities(['18KT Diamond'])
      else if (m === 'gold') setSelectedPurities(['22KT Gold', '14KT Gold'])
      else if (m === 'platinum' || m === 'silver') setSelectedPurities(['Platinum'])
    } else {
      setSelectedPurities([])
    }

    // 4. Gender filter
    if (gndr) {
      const g = gndr.toLowerCase()
      if (g === 'women') setSelectedGenders(['Women'])
      else if (g === 'men') setSelectedGenders(['Men'])
      else if (g === 'kids') setSelectedGenders(['Kids'])
    } else {
      setSelectedGenders([])
    }

    // 5. Price range (minPrice, maxPrice, or shortcut price tiers)
    let min = 0
    let max = 500000
    if (minP) min = Math.max(0, Number(minP))
    if (maxP) max = Math.max(0, Number(maxP))

    if (prc) {
      if (prc === 'under-25k') max = 25000
      else if (prc === 'under-50k') max = 50000
      else if (prc === 'under-75k') max = 75000
      else if (prc === 'above-100k') min = 100000
    }

    setPriceRange({ min, max })
    setVisibleCount(12)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [searchParams])

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleAddToCart = (id) => {
    setCartAdded((prev) => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setCartAdded((prev) => ({ ...prev, [id]: false }))
    }, 2000)
  }

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId)
    setVisibleCount(12)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const newParams = new URLSearchParams(searchParams)
    if (catId === 'all') {
      newParams.delete('category')
    } else {
      newParams.set('category', catId)
    }
    setSearchParams(newParams)
  }

  const clearAllFilters = () => {
    setActiveCategory('all')
    setSearchQuery('')
    setPriceRange({ min: 0, max: 500000 })
    setSelectedColors([])
    setSelectedGenders([])
    setSelectedPurities([])
    setSelectedDelivery([])
    setVisibleCount(12)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setSearchParams({})
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory === 'mens') {
        if (product.category !== 'mens' && product.subCategory !== 'mens') return false
      } else if (activeCategory !== 'all') {
        if (product.category !== activeCategory) return false
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = product.name.toLowerCase().includes(q)
        const matchMetal = product.metal.toLowerCase().includes(q)
        const matchBadge = product.badge.toLowerCase().includes(q)
        const matchCategory = product.category.toLowerCase().includes(q)
        if (!matchName && !matchMetal && !matchBadge && !matchCategory) return false
      }

      // Price filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false
      }

      // Gold Color filter
      if (selectedColors.length > 0) {
        if (!selectedColors.includes(product.goldColor)) return false
      }

      // Gender filter
      if (selectedGenders.length > 0) {
        if (!selectedGenders.includes(product.gender) && product.gender !== 'Unisex') {
          return false
        }
      }

      // Metal purity filter
      if (selectedPurities.length > 0) {
        if (!selectedPurities.includes(product.metalPurity)) return false
      }

      // Delivery days filter
      if (selectedDelivery.length > 0) {
        if (!selectedDelivery.includes(product.deliveryDays)) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating || b.reviews - a.reviews
      if (sortBy === 'new') return b.id - a.id
      return 0 // default 'featured'
    })
  }, [
    activeCategory,
    searchQuery,
    priceRange,
    selectedColors,
    selectedGenders,
    selectedPurities,
    selectedDelivery,
    sortBy,
  ])

  // Progressive loading: only load 12 products at a time
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount)
  }, [filteredProducts, visibleCount])

  // Auto load next 12 items as user reaches the end of the products grid
  useEffect(() => {
    if (visibleCount >= filteredProducts.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true)
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 12, filteredProducts.length))
            setIsLoadingMore(false)
          }, 350)
        }
      },
      { rootMargin: '350px' }
    )

    const currentTarget = sentinelRef.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [visibleCount, filteredProducts.length, isLoadingMore])

  // Get active banner title and tagline
  const bannerInfo = useMemo(() => {
    switch (activeCategory) {
      case 'earrings':
        return {
          title: 'EARRINGS COLLECTION',
          subtitle: 'From Iconic Bengali Jhumkas to Cascading Solitaire Drops',
          bg: 'from-[#1A2634] via-[#0E1724] to-[#1E2B3E]',
        }
      case 'rings':
        return {
          title: 'RINGS & SOLITAIRES',
          subtitle: 'Pure 22KT Hand-Filigree, Certified Diamonds & Royal Gemstones',
          bg: 'from-[#2A1820] via-[#1E0F16] to-[#361B28]',
        }
      case 'necklaces':
        return {
          title: 'NECKLACES & CHOKERS',
          subtitle: 'Masterpiece Hansulis, Temple Kasu Malas & Floating Solitaires',
          bg: 'from-[#1F241C] via-[#151913] to-[#2B3227]',
        }
      case 'bangles':
        return {
          title: 'BANGLES & KADAS',
          subtitle: 'Peacock Finial Balas, Diamond Tennis Cuffs & Heavy Nakshi Kadas',
          bg: 'from-[#2C1D14] via-[#1F130B] to-[#3A261A]',
        }
      case 'bridal':
        return {
          title: 'ROYAL BRIDAL ATELIER',
          subtitle: 'Uncut Polki, Matha Patti, Hathphool & Heritage Sita Haars',
          bg: 'from-[#420E18] via-[#2D0910] to-[#541320]',
        }
      case 'mens':
        return {
          title: "MEN'S LUXURY COLLECTION",
          subtitle: 'Solid 22KT Cuban Chains, Signet Rings, Lion Head Kadas & Cufflinks',
          bg: 'from-[#1E1E1E] via-[#121212] to-[#292929]',
        }
      default:
        return {
          title: 'THE IMPERIAL COLLECTION',
          subtitle: 'All 54 Handcrafted Heirloom Creations of P.C. Chandra Jewellers',
          bg: 'from-[#3B1119] via-[#26090F] to-[#4F1621]',
        }
    }
  }, [activeCategory])

  // Dynamic SEO title & meta description update
  useEffect(() => {
    let title = `${bannerInfo.title} | P. C. Chandra Jewellers`
    if (searchQuery.trim()) {
      title = `Search: "${searchQuery}" | P. C. Chandra Jewellers`
    }
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Explore P. C. Chandra Jewellers ${bannerInfo.title.toLowerCase()} — ${bannerInfo.subtitle}. Handcrafted in Kolkata with 100% BIS 916 Hallmarked purity.`
      )
    }
  }, [bannerInfo, searchQuery])

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-neutral-900 flex flex-col">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-white text-xs text-neutral-500 py-2.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#801424] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link to="/collections" className="hover:text-[#801424] transition-colors">
            Collections
          </Link>
          {activeCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-semibold text-neutral-800 capitalize">
                {CATEGORIES_LIST.find((c) => c.id === activeCategory)?.label || activeCategory}
              </span>
            </>
          )}
          {searchQuery && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[#801424] font-medium">Search: "{searchQuery}"</span>
            </>
          )}
        </div>
      </div>

      {/* Panoramic Collection Banner (Like Official Site Screenshot) */}
      <div
        className={`relative w-full bg-gradient-to-r ${bannerInfo.bg} py-12 sm:py-16 text-white overflow-hidden shadow-inner`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ECC880_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            key={bannerInfo.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center md:text-left"
          >
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold mb-2">
              P. C. Chandra Jewellers • 85 Years of Trust
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal tracking-wide text-white">
              {bannerInfo.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-xl font-light">
              {bannerInfo.subtitle}
            </p>
          </motion.div>

          {/* Quick Category Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 max-w-lg">
            {CATEGORIES_LIST.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#801424] text-white shadow-md border border-amber-300/40 font-semibold'
                    : 'bg-white/10 hover:bg-white/20 text-neutral-200 backdrop-blur-xs'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Catalog Container (Sidebar + Products Grid) */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-8 sm:py-12">
        {/* Top Control Bar: Total count & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 lg:hidden shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#801424]" />
              <span>Filters</span>
            </button>
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
              <span className="text-[#801424] font-bold text-base">{filteredProducts.length}</span>{' '}
              Products Available
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <label htmlFor="sort-select" className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-neutral-300 rounded-md text-xs font-medium text-neutral-800 px-3 py-1.5 focus:outline-none focus:border-[#801424] shadow-2xs"
            >
              <option value="featured">Featured Curations</option>
              <option value="new">Date, New to Old</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Active Filters Pill Strip */}
        {(selectedColors.length > 0 ||
          selectedGenders.length > 0 ||
          selectedPurities.length > 0 ||
          selectedDelivery.length > 0 ||
          priceRange.min > 0 ||
          priceRange.max < 500000 ||
          searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
            <span className="text-xs text-neutral-400 font-medium">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-200 px-2.5 py-1 text-xs text-neutral-800">
                Search: "{searchQuery}"
                <button type="button" onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedColors.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs text-neutral-800">
                {c}
                <button type="button" onClick={() => setSelectedColors(selectedColors.filter((x) => x !== c))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedGenders.map((g) => (
              <span key={g} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-800">
                {g}
                <button type="button" onClick={() => setSelectedGenders(selectedGenders.filter((x) => x !== g))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedPurities.map((p) => (
              <span key={p} className="inline-flex items-center gap-1 rounded-full bg-[#801424]/10 border border-[#801424]/20 px-2.5 py-1 text-xs text-[#801424] font-medium">
                {p}
                <button type="button" onClick={() => setSelectedPurities(selectedPurities.filter((x) => x !== p))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedDelivery.map((d) => (
              <span key={d} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-800">
                {d} Days Delivery
                <button type="button" onClick={() => setSelectedDelivery(selectedDelivery.filter((x) => x !== d))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {(priceRange.min > 0 || priceRange.max < 500000) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-800">
                ₹{priceRange.min.toLocaleString('en-IN')} - ₹{priceRange.max.toLocaleString('en-IN')}
                <button type="button" onClick={() => setPriceRange({ min: 0, max: 500000 })}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-[#801424] hover:underline font-semibold ml-2 inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* ================= LEFT SIDEBAR FILTER (As in Screenshot) ================= */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 pr-4 border-r border-neutral-200/80">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Filter
              </h2>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-[#801424] hover:underline font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Price Filter (With Slider and Exact Min/Max Inputs like screenshot) */}
            <div className="border-b border-neutral-200 pb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  — Price
                </span>
                <span className="text-[11px] text-neutral-500">
                  Max: ₹5,00,000
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="5000"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                }
                className="w-full accent-[#801424] cursor-pointer"
              />
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1">
                  <span className="text-[10px] text-neutral-400 block mb-0.5">Min (₹)</span>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({ ...prev, min: Math.max(0, Number(e.target.value)) }))
                    }
                    className="w-full rounded border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-800 focus:border-[#801424] focus:outline-none"
                  />
                </div>
                <span className="text-neutral-400 self-end mb-1">-</span>
                <div className="flex-1">
                  <span className="text-[10px] text-neutral-400 block mb-0.5">Max (₹)</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({ ...prev, max: Math.max(0, Number(e.target.value)) }))
                    }
                    className="w-full rounded border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-800 focus:border-[#801424] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Days (Checkboxes from screenshot) */}
            <div className="border-b border-neutral-200 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-3">
                — Delivery Days
              </span>
              <div className="space-y-2">
                {DELIVERY_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer hover:text-[#801424]">
                    <input
                      type="checkbox"
                      checked={selectedDelivery.includes(opt.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDelivery([...selectedDelivery, opt.value])
                        } else {
                          setSelectedDelivery(selectedDelivery.filter((v) => v !== opt.value))
                        }
                      }}
                      className="rounded border-neutral-300 text-[#801424] focus:ring-[#801424]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gold Color (Checkboxes from screenshot) */}
            <div className="border-b border-neutral-200 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-3">
                — Gold Color
              </span>
              <div className="space-y-2">
                {GOLD_COLORS.map((color) => (
                  <label key={color} className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer hover:text-[#801424]">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedColors([...selectedColors, color])
                        } else {
                          setSelectedColors(selectedColors.filter((c) => c !== color))
                        }
                      }}
                      className="rounded border-neutral-300 text-[#801424] focus:ring-[#801424]"
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Jewellery For (Checkboxes from screenshot) */}
            <div className="border-b border-neutral-200 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-3">
                — Jewellery For
              </span>
              <div className="space-y-2">
                {GENDERS.map((g) => (
                  <label key={g} className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer hover:text-[#801424]">
                    <input
                      type="checkbox"
                      checked={selectedGenders.includes(g)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedGenders([...selectedGenders, g])
                        } else {
                          setSelectedGenders(selectedGenders.filter((item) => item !== g))
                        }
                      }}
                      className="rounded border-neutral-300 text-[#801424] focus:ring-[#801424]"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Metal Purity */}
            <div className="border-b border-neutral-200 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-3">
                — Metal & Purity
              </span>
              <div className="space-y-2">
                {METAL_PURITIES.map((purity) => (
                  <label key={purity} className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer hover:text-[#801424]">
                    <input
                      type="checkbox"
                      checked={selectedPurities.includes(purity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPurities([...selectedPurities, purity])
                        } else {
                          setSelectedPurities(selectedPurities.filter((p) => p !== purity))
                        }
                      }}
                      className="rounded border-neutral-300 text-[#801424] focus:ring-[#801424]"
                    />
                    <span>{purity}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ================= PRODUCT CARDS GRID ================= */}
          <section className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-12 text-center">
                <p className="text-base font-medium text-neutral-800">
                  No jewellery creations matched your current filters.
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Try adjusting the price range or resetting selected checkboxes.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#801424] px-5 py-2 text-xs font-semibold text-white uppercase"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              </div>
            ) : (
              <div>
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {displayedProducts.map((product) => {
                      const isWishlisted = wishlist.includes(product.id)
                      const isAdded = cartAdded[product.id]
                      const discountAmount = product.originalPrice - product.price

                      return (
                        <motion.div
                          layout
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          whileHover={{ y: -8, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                          className="group flex flex-col rounded-xl border border-neutral-200/90 bg-white shadow-xs transition-all duration-300 hover:border-[#801424]/40 hover:shadow-xl"
                        >
                          {/* Product Image Frame */}
                          <div className="relative aspect-square overflow-hidden rounded-t-xl bg-[#FAF6F0]">
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            />

                            {/* Badges on Top Left */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start pointer-events-none">
                              <span className="whitespace-nowrap rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold text-neutral-800 shadow-sm border border-neutral-100">
                                {product.badge}
                              </span>
                              {product.weight && (
                                <span className="whitespace-nowrap rounded-full bg-neutral-900/85 backdrop-blur-xs px-2 py-0.5 text-[9px] font-medium text-amber-200 shadow-xs">
                                  {product.weight}
                                </span>
                              )}
                            </div>

                            {/* Top Right Action Buttons */}
                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                              {product.videoPreview && (
                                <button
                                  type="button"
                                  title="360° Studio View Available"
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#801424] shadow-sm hover:bg-[#801424] hover:text-white transition-colors"
                                  aria-label="360 Video View"
                                >
                                  <Video className="h-4 w-4" />
                                </button>
                              )}

                              <motion.button
                                whileTap={{ scale: 0.75 }}
                                type="button"
                                onClick={() => toggleWishlist(product.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-neutral-700 shadow-sm transition-colors hover:text-[#801424]"
                                aria-label="Add to wishlist"
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    isWishlisted ? 'fill-[#801424] text-[#801424]' : ''
                                  }`}
                                />
                              </motion.button>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="flex flex-1 flex-col p-5">
                            <p className="text-[11px] font-medium tracking-wide text-neutral-500 line-clamp-1">
                              {product.metal}
                            </p>

                            <h3 className="mt-1.5 text-base font-semibold text-neutral-900 group-hover:text-[#801424] transition-colors line-clamp-1">
                              {product.name}
                            </h3>

                            {/* Rating */}
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-600">
                              <div className="flex items-center text-amber-500">
                                <Star className="h-3.5 w-3.5 fill-amber-400" />
                              </div>
                              <span className="font-semibold text-neutral-800">{product.rating}</span>
                              <span className="text-neutral-400 text-[11px]">
                                ({product.reviews} reviews)
                              </span>
                            </div>

                            {/* Price & Savings Badge */}
                            <div className="mt-4 flex items-center justify-between gap-1.5">
                              <div className="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
                                <span className="text-base sm:text-lg font-bold text-neutral-900 whitespace-nowrap">
                                  ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs text-neutral-400 line-through whitespace-nowrap">
                                  ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              </div>
                              {discountAmount > 0 && (
                                <span className="inline-flex items-center whitespace-nowrap shrink-0 rounded bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 leading-normal">
                                  Save ₹{discountAmount.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto pt-4 border-t border-neutral-100">
                              <motion.button
                                whileTap={{ scale: 0.97 }}
                                whileHover={{ scale: 1.01 }}
                                type="button"
                                onClick={() => handleAddToCart(product.id)}
                                className={`flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                                  isAdded
                                    ? 'bg-emerald-700 text-white'
                                    : 'bg-neutral-900 text-white hover:bg-[#801424]'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="h-4 w-4" />
                                    <span>Added to Bag</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="h-4 w-4" />
                                    <span>Add to Cart</span>
                                  </>
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Auto Load Sentinel & Progressive Loading Indicator */}
                {visibleCount < filteredProducts.length && (
                  <div
                    ref={sentinelRef}
                    className="mt-12 flex flex-col items-center justify-center gap-3 py-6"
                  >
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-[#801424]">
                      <span className="h-2 w-2 rounded-full bg-[#801424] animate-ping" />
                      <span>Loading more handcrafted masterpieces...</span>
                    </div>
                    <p className="text-xs text-neutral-400 font-medium">
                      Showing <span className="font-semibold text-neutral-900">{displayedProducts.length}</span> of{' '}
                      <span className="font-semibold text-neutral-900">{filteredProducts.length}</span> creations
                    </p>
                    <div className="h-1.5 w-48 rounded-full bg-neutral-200 overflow-hidden">
                      <div
                        className="h-full bg-[#801424] transition-all duration-300 rounded-full"
                        style={{
                          width: `${(displayedProducts.length / filteredProducts.length) * 100}%`,
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredProducts.length))}
                      className="mt-1 text-xs font-medium text-neutral-500 hover:text-[#801424] hover:underline cursor-pointer"
                    >
                      Click to load 12 more manually
                    </button>
                  </div>
                )}

                {/* Reached End of Catalog */}
                {visibleCount >= filteredProducts.length && filteredProducts.length > 12 && (
                  <div className="mt-14 text-center text-xs text-neutral-400 py-4 border-t border-neutral-200">
                    You have viewed all {filteredProducts.length} handcrafted creations in this collection
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile Filters Modal Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 lg:hidden">
          <div className="relative ml-auto w-full max-w-xs bg-white p-6 h-full overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold uppercase tracking-wider text-neutral-900">
                  Filters
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-neutral-500 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Slider */}
              <div className="mb-5 pb-5 border-b border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2">
                  Price: Up to ₹{priceRange.max.toLocaleString('en-IN')}
                </span>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                  }
                  className="w-full accent-[#801424]"
                />
              </div>

              {/* Categories */}
              <div className="mb-5 pb-5 border-b border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2">
                  Category
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES_LIST.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleCategoryClick(c.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-full ${
                        activeCategory === c.id
                          ? 'bg-[#801424] text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gold Color */}
              <div className="mb-5 pb-5 border-b border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2">
                  Gold Color
                </span>
                <div className="space-y-1.5">
                  {GOLD_COLORS.map((col) => (
                    <label key={col} className="flex items-center gap-2 text-xs text-neutral-700">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(col)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedColors([...selectedColors, col])
                          else setSelectedColors(selectedColors.filter((x) => x !== col))
                        }}
                        className="rounded text-[#801424]"
                      />
                      <span>{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex gap-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-2.5 text-xs font-semibold uppercase text-neutral-600 border border-neutral-300 rounded-md"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold uppercase bg-[#801424] text-white rounded-md"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

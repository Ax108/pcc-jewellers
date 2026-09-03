import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BANNERS = [
  {
    id: 'live-call',
    tabTitle: 'Live Video Shopping',
    shortTitle: 'Live Video',
    alt: 'Shop Latest Designs Live On Call with P. C. Chandra Experts',
    image: '/images/banner_1.png',
    href: '#video-consult',
  },
  {
    id: 'framed-for-fame',
    tabTitle: 'Framed For Fame',
    shortTitle: 'Framed',
    alt: 'Framed For Fame - Ayushmann Khurrana x P. C. Chandra Jewellers',
    image: '/images/banner_2.webp',
    href: '/collections?category=mens&gender=men',
  },
  {
    id: 'custom-craft',
    tabTitle: 'Customized Jewellery',
    shortTitle: 'Custom',
    alt: 'Customized Jewellery - Your Designs, Our Craft',
    image: '/images/banner_3.webp',
    href: '#custom-jewellery',
  },
  {
    id: '9kt-gold',
    tabTitle: 'New 9KT Collection',
    shortTitle: '9KT Gold',
    alt: 'Introducing Our New 9KT Gold Collection',
    image: '/images/banner_4.webp',
    href: '/collections?metal=gold',
  },
  {
    id: 'astral-gems',
    tabTitle: 'Astral Gems',
    shortTitle: 'Astral Gems',
    alt: 'Gems and Astrology - Astral Gems Collection',
    image: '/images/banner_5.webp',
    href: '/collections?category=rings',
  },
]

export default function CampaignBanners() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto advance every 6 seconds
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length)
  }

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)
  }

  const current = BANNERS[currentIndex]
  const isInternalCollection = current.href.startsWith('/collections')

  return (
    <section
      className="w-full bg-white border-b border-neutral-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Thin Distinction Strip Separating Hero and Banners */}
      <div className="w-full border-b border-[#6E0F1D] bg-[#801424] py-2.5 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 text-center">
          <p className="text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-white/95">
            Celebrating 85 Years of Pure Trust, Master Craftsmanship & BIS 916 Hallmarked Purity
          </p>
        </div>
      </div>

      {/* Mobile Phone View: Curated Banners Stacked with Elegant Luxury Separators */}
      <div className="md:hidden flex flex-col bg-[#F9F7F4] py-3.5 px-3 sm:px-4 space-y-4">
        {BANNERS.map((banner, index) => {
          const isInternal = banner.href.startsWith('/collections')
          const cardContent = (
            <div className="group relative w-full overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-950 shadow-xs transition-transform duration-200 active:scale-[0.99]">
              <div className="relative w-full aspect-[1886/675]">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  loading="lazy"
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
          )

          return (
            <div key={banner.id} className="flex flex-col">
              {/* Refined Gold Filigree Separator Strip Above Each Banner (after 1st) */}
              {index > 0 && (
                <div className="flex items-center justify-center gap-3 py-2.5 mb-1.5">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-amber-400/50" />
                  <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#801424]">
                    <span className="text-amber-500 text-xs">❖</span>
                    <span>{banner.tabTitle}</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-neutral-300 to-amber-400/50" />
                </div>
              )}

              {/* Banner Link Card */}
              {isInternal ? (
                <Link to={banner.href} className="block w-full">
                  {cardContent}
                </Link>
              ) : (
                <a href={banner.href} className="block w-full">
                  {cardContent}
                </a>
              )}
            </div>
          )
        })}
      </div>

      {/* Desktop View: Panoramic Slideshow Carousel with Switcher Controls */}
      <div className="hidden md:block">
        <div className="relative w-full overflow-hidden bg-neutral-950">
          {isInternalCollection ? (
            <Link
              to={current.href}
              className="relative block w-full aspect-[1886/675] select-none bg-neutral-950"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 h-full w-full object-contain object-center"
                />
              </AnimatePresence>
            </Link>
          ) : (
            <a
              href={current.href}
              className="relative block w-full aspect-[1886/675] select-none bg-neutral-950"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 h-full w-full object-contain object-center"
                />
              </AnimatePresence>
            </a>
          )}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevBanner}
            className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/50 text-white shadow-md backdrop-blur-xs transition-all hover:bg-[#801424] hover:scale-110 focus:outline-none"
            aria-label="Previous campaign"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextBanner}
            className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/50 text-white shadow-md backdrop-blur-xs transition-all hover:bg-[#801424] hover:scale-110 focus:outline-none"
            aria-label="Next campaign"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop Campaign Switcher Tabs */}
        <div className="w-full border-t border-neutral-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-5 items-center justify-between py-3 gap-4">
              {BANNERS.map((banner, index) => {
                const isActive = index === currentIndex
                return (
                  <button
                    key={banner.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`group relative flex flex-col items-center justify-center pb-2 pt-1 transition-all text-center uppercase ${
                      isActive
                        ? 'text-[#801424] font-bold'
                        : 'text-neutral-500 hover:text-neutral-900 font-medium'
                    }`}
                  >
                    <span className="text-xs tracking-wider">
                      {banner.tabTitle}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeBannerTab"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#801424] rounded-full"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


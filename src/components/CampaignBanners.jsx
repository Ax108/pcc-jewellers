import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BANNERS = [
  {
    id: 'live-call',
    tabTitle: 'Live Video Shopping',
    alt: 'Shop Latest Designs Live On Call with P. C. Chandra Experts',
    image: '/images/banner_1.png',
    href: '#video-consult',
  },
  {
    id: 'framed-for-fame',
    tabTitle: 'Framed For Fame',
    alt: 'Framed For Fame - Ayushmann Khurrana x P. C. Chandra Jewellers',
    image: '/images/banner_2.webp',
    href: '/collections?category=mens&gender=men',
  },
  {
    id: 'custom-craft',
    tabTitle: 'Customized Jewellery',
    alt: 'Customized Jewellery - Your Designs, Our Craft',
    image: '/images/banner_3.webp',
    href: '#custom-jewellery',
  },
  {
    id: '9kt-gold',
    tabTitle: 'New 9KT Collection',
    alt: 'Introducing Our New 9KT Gold Collection',
    image: '/images/banner_4.webp',
    href: '/collections?metal=gold',
  },
  {
    id: 'astral-gems',
    tabTitle: 'Astral Gems',
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

      {/* Full-Width Panoramic Banner Showcase */}
      <div className="relative w-full overflow-hidden bg-neutral-950">
        {isInternalCollection ? (
          <Link
            to={current.href}
            className="relative block w-full aspect-[1886/675] min-h-[200px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[460px] select-none"
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
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </AnimatePresence>
          </Link>
        ) : (
          <a
            href={current.href}
            className="relative block w-full aspect-[1886/675] min-h-[200px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[460px] select-none"
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
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </AnimatePresence>
          </a>
        )}

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevBanner}
          className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/40 text-white shadow-lg backdrop-blur-xs transition-all hover:bg-[#801424] hover:scale-110 focus:outline-none"
          aria-label="Previous campaign"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={nextBanner}
          className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/40 text-white shadow-lg backdrop-blur-xs transition-all hover:bg-[#801424] hover:scale-110 focus:outline-none"
          aria-label="Next campaign"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Campaign Switcher Controls Moved to the Bottom */}
      <div className="w-full border-t border-neutral-200 bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-center overflow-x-auto py-3 no-scrollbar gap-5 sm:gap-8">
            {BANNERS.map((banner, index) => {
              const isActive = index === currentIndex
              return (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`group relative whitespace-nowrap pb-1.5 text-xs font-semibold tracking-wider transition-all uppercase ${
                    isActive
                      ? 'text-[#801424]'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <span>{banner.tabTitle}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeBannerTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#801424]"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

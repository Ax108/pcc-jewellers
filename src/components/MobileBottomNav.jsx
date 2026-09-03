import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Gem,
  Coins,
  Heart,
  PhoneCall,
  X,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { fetchLocalizedGoldRate } from '../helpers/goldRateService'
import { SITE_INFO } from '../configs/siteContent'

export default function MobileBottomNav() {
  const location = useLocation()
  const [goldRateModalOpen, setGoldRateModalOpen] = useState(false)
  const [conciergeModalOpen, setConciergeModalOpen] = useState(false)
  const [goldRateData, setGoldRateData] = useState({
    rate22kt: '₹7,940',
    rate24kt: '₹8,520',
    rate18kt: '₹6,495',
    silverRate: '₹98.50',
    displayString: 'Today 22KT Gold: ₹7,940 / gm',
  })

  useEffect(() => {
    fetchLocalizedGoldRate().then((res) => {
      if (res && res.ratePerGram22k) {
        setGoldRateData({
          rate22kt: `₹${res.ratePerGram22k.toLocaleString('en-IN')}`,
          rate24kt: `₹${Math.round(res.ratePerGram22k * (24 / 22)).toLocaleString('en-IN')}`,
          rate18kt: `₹${Math.round(res.ratePerGram22k * (18 / 22)).toLocaleString('en-IN')}`,
          silverRate: '₹98.50',
          displayString: res.displayString,
        })
      }
    })
  }, [])

  const isHome = location.pathname === '/'
  const isCollections = location.pathname.startsWith('/collections')

  return (
    <>
      {/* Mobile Floating App Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 block md:hidden bg-white/95 backdrop-blur-lg border-t border-neutral-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] safe-area-pb">
        <div className="flex items-center justify-around py-1.5 px-2">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
              isHome ? 'text-[#801424]' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Home</span>
          </Link>

          {/* Collections */}
          <Link
            to="/collections"
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
              isCollections ? 'text-[#801424]' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Gem className="h-5 w-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Explore</span>
          </Link>

          {/* Quirky Floating Live Gold Rate Quick Pill */}
          <button
            type="button"
            onClick={() => setGoldRateModalOpen(true)}
            className="flex flex-col items-center py-1 px-2.5 text-amber-700 hover:text-amber-800 relative"
          >
            <div className="relative">
              <Coins className="h-5 w-5 text-amber-600" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-tight text-[#801424] mt-0.5">
              Live Rates
            </span>
          </button>

          {/* Wishlist */}
          <Link
            to="/collections"
            className="flex flex-col items-center py-1 px-2.5 rounded-lg text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <div className="relative">
              <Heart className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Wishlist</span>
          </Link>

          {/* Concierge Hotline */}
          <button
            type="button"
            onClick={() => setConciergeModalOpen(true)}
            className="flex flex-col items-center py-1 px-2.5 rounded-lg text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <PhoneCall className="h-5 w-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Concierge</span>
          </button>
        </div>
      </div>

      {/* Live Bullion Rates Quick Bottom Modal */}
      <AnimatePresence>
        {goldRateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGoldRateModalOpen(false)}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative z-10 w-full rounded-t-2xl bg-white p-6 shadow-2xl safe-area-pb"
            >
              {/* Modal Handle */}
              <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-neutral-300" />

              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-base font-bold text-neutral-900 font-editorial">
                    Official Live Bullion Board
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setGoldRateModalOpen(false)}
                  className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-1 text-xs text-neutral-500">
                Updated in real-time. Transparent pricing across all P. C. Chandra Showrooms.
              </p>

              {/* Rate Cards Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-orange-50/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-amber-900">
                      22KT Standard Gold
                    </span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                      Hallmarked
                    </span>
                  </div>
                  <p className="mt-2 text-xl font-bold text-[#801424]">
                    {goldRateData.rate22kt}
                    <span className="text-xs font-normal text-neutral-500"> / gm</span>
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">BIS 916 Standard</p>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-[#FAF8F5] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-neutral-700">
                      24KT Pure Bullion
                    </span>
                    <span className="text-[9px] bg-neutral-200 text-neutral-800 font-bold px-1.5 py-0.5 rounded">
                      999 Purity
                    </span>
                  </div>
                  <p className="mt-2 text-xl font-bold text-neutral-900">
                    {goldRateData.rate24kt}
                    <span className="text-xs font-normal text-neutral-500"> / gm</span>
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Investment Grade</p>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-[#FAF8F5] p-3.5">
                  <span className="text-[11px] font-bold uppercase text-neutral-700 block">
                    18KT Diamond Gold
                  </span>
                  <p className="mt-2 text-xl font-bold text-neutral-900">
                    {goldRateData.rate18kt}
                    <span className="text-xs font-normal text-neutral-500"> / gm</span>
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Fine Jewellery Alloy</p>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-[#FAF8F5] p-3.5">
                  <span className="text-[11px] font-bold uppercase text-neutral-700 block">
                    Fine Silver 999
                  </span>
                  <p className="mt-2 text-xl font-bold text-neutral-900">
                    {goldRateData.silverRate}
                    <span className="text-xs font-normal text-neutral-500"> / gm</span>
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Pujas & Gifting</p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  to="/collections?metal=gold"
                  onClick={() => setGoldRateModalOpen(false)}
                  className="flex-1 rounded-xl bg-[#801424] py-3 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-[#9B1127]"
                >
                  Shop Gold Creations
                </Link>
                <button
                  type="button"
                  onClick={() => setGoldRateModalOpen(false)}
                  className="rounded-xl border border-neutral-300 px-4 py-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Concierge & Fast Help Modal */}
      <AnimatePresence>
        {conciergeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConciergeModalOpen(false)}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative z-10 w-full rounded-t-2xl bg-white p-6 shadow-2xl safe-area-pb"
            >
              <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-neutral-300" />

              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-bold text-neutral-900 font-editorial">
                  P. C. Chandra Concierge
                </h3>
                <button
                  type="button"
                  onClick={() => setConciergeModalOpen(false)}
                  className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <a
                  href="tel:18002081939"
                  className="flex items-center justify-between rounded-xl border border-neutral-200 bg-[#FAF8F5] p-3.5 transition-colors hover:border-[#801424]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#801424] text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">Call Toll-Free Helpline</p>
                      <p className="text-[11px] text-neutral-500">1800-208-1939 (10 AM - 7 PM)</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-neutral-400" />
                </a>

                <a
                  href="#video-consult"
                  onClick={() => setConciergeModalOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 bg-[#FAF8F5] p-3.5 transition-colors hover:border-[#801424]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">Schedule Video Consultation</p>
                      <p className="text-[11px] text-neutral-500">View jewellery live with atelier experts</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-neutral-400" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

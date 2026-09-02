import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, Check, ArrowRight } from 'lucide-react'
import { FEATURED_PRODUCTS } from '../configs/siteContent'

export default function TrendingCollection() {
  const [wishlist, setWishlist] = useState([])
  const [cartAdded, setCartAdded] = useState({})

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

  return (
    <section id="trending-creations" className="bg-[#FAF8F5] py-16 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="text-[#801424] text-xs font-semibold tracking-widest uppercase mb-2">
              <span>Signature Repertoire • 85 Years of Karigari</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-normal text-neutral-900 font-editorial tracking-tight">
              Masterpieces of the Week
            </h2>
            <p className="text-base sm:text-[17px] text-neutral-600 mt-2.5">
              Handpicked heirloom creations embodying the pinnacle of Bengali fine jewellery craftsmanship.
            </p>
          </div>

          <motion.div whileHover={{ x: 4 }} className="shrink-0">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#801424] hover:underline uppercase"
            >
              <span>View All 54 Creations in Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Product Cards Grid with Staggered Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURED_PRODUCTS.map((product) => {
            const isWishlisted = wishlist.includes(product.id)
            const isAdded = cartAdded[product.id]
            const discountAmount = product.originalPrice - product.price

            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                className="group flex flex-col rounded-xl border border-neutral-200 bg-white shadow-xs transition-all duration-300 hover:border-[#801424]/40 hover:shadow-xl"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square overflow-hidden rounded-t-xl bg-[#FAF6F0]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start pointer-events-none">
                    <span className="whitespace-nowrap rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-800 shadow-sm">
                      {product.badge}
                    </span>
                    {product.weight && (
                      <span className="whitespace-nowrap rounded-full bg-neutral-900/80 px-2 py-0.5 text-[9px] font-medium text-amber-200">
                        {product.weight}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <motion.button
                    whileTap={{ scale: 0.75 }}
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm transition-colors hover:text-[#801424]"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isWishlisted ? 'fill-[#801424] text-[#801424]' : ''
                      }`}
                    />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-medium tracking-wide text-neutral-500 line-clamp-1">
                    {product.metal}
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-neutral-900 group-hover:text-[#801424] transition-colors line-clamp-1">
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

                  {/* Price & Savings Badge (Single uniform row, never wrapping) */}
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

                  {/* Action Button (Pinned to bottom with mt-auto) */}
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
        </motion.div>

        {/* Bottom CTA to explore all collections */}
        <div className="mt-12 text-center">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#801424] px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#600f1b] hover:shadow-lg"
          >
            <span>Explore Complete Collection (54 Designs)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

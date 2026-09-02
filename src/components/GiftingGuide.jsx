import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { GIFTING_COLLECTIONS, PRICE_TIERS } from '../configs/siteContent'

export default function GiftingGuide() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-normal text-neutral-900 font-editorial tracking-tight">
            Celebrate Every Unforgettable Moment
          </h2>
          <p className="text-base sm:text-[17px] text-neutral-600 mt-3 leading-relaxed">
            Mark birthdays, anniversaries, and sacred celebrations with certified 22KT gold and diamond keepsakes.
          </p>
        </motion.div>

        {/* Occasion Cards Grid with Stagger */}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {GIFTING_COLLECTIONS.map((gift) => (
            <motion.div
              key={gift.title}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
            >
              <Link
                to={gift.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:border-[#801424]/40 hover:shadow-xl h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={gift.image}
                    alt={gift.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900 group-hover:text-[#801424] transition-colors">
                      {gift.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      {gift.tagline}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#801424]">
                    <span>Discover Gifts</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Shop by Price Tier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-neutral-200 bg-[#FAF8F5] p-8 sm:p-10 text-center shadow-xs"
        >
          <h3 className="text-lg font-semibold text-neutral-900 font-editorial sm:text-xl">
            Shop Fine Jewellery by Budget
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Discover exquisite certified purity tailored to your budget
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {PRICE_TIERS.map((tier) => (
              <motion.div
                key={tier.price}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link
                  to={tier.href}
                  className="group block rounded-xl border border-neutral-300 bg-white p-4 transition-all hover:border-[#801424] hover:bg-[#801424] hover:shadow-lg"
                >
                  <span className="block text-[11px] font-medium text-neutral-500 group-hover:text-white/85 transition-colors uppercase">
                    {tier.label}
                  </span>
                  <span className="block text-base font-bold text-neutral-900 group-hover:text-white transition-colors mt-1">
                    {tier.price}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

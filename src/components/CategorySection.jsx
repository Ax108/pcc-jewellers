import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { GENDER_TABS, CATEGORIES } from '../configs/siteContent'

export default function CategorySection() {
  const [activeGender, setActiveGender] = useState('women')

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-normal text-neutral-900 font-editorial tracking-tight">
            Shop by Category
          </h2>
          <p className="text-base sm:text-[17px] text-neutral-600 mt-3 leading-relaxed">
            Explore authentic handcrafted 22KT gold, diamond, and precious gemstone collections.
          </p>

          {/* Gender Filter Tabs with Fluid Animated Pill */}
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-[#FAF8F5] p-1.5 mt-7 shadow-xs relative">
            {GENDER_TABS.map((tab) => {
              const isActive = activeGender === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveGender(tab.id)}
                  className={`relative rounded-full px-6 py-2.5 text-[14px] font-medium transition-colors z-10 ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryGenderTab"
                      className="absolute inset-0 rounded-full bg-[#801424] shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Category Grid with Staggered Scroll Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
            >
              <Link
                to={`/collections?category=${cat.id}&gender=${activeGender}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:border-[#801424]/40 hover:shadow-xl h-full"
              >
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900 group-hover:text-[#801424] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[13px] text-neutral-500 mt-1">
                      {cat.itemsCount}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center justify-center gap-1 text-[13px] font-medium text-[#801424] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All For Active Gender CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              to={`/collections?gender=${activeGender}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#801424] hover:underline px-4 py-2 rounded-md hover:bg-[#801424]/5 transition-colors"
            >
              <span>
                Explore Complete {activeGender === 'women' ? "Women's" : activeGender === 'men' ? "Men's" : "Kids'"} Collection
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

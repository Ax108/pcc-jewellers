import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { GENDER_TABS, CATEGORIES } from '../configs/siteContent'

export default function CategorySection() {
  const [activeGender, setActiveGender] = useState('women')

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-normal text-neutral-900 font-editorial tracking-tight">
            Shop by Category
          </h2>
          <p className="text-base sm:text-[17px] text-neutral-600 mt-3 leading-relaxed">
            Explore authentic handcrafted 22KT gold, diamond, and precious gemstone collections.
          </p>

          {/* Gender Filter Tabs */}
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-[#FAF8F5] p-1.5 mt-7 shadow-xs">
            {GENDER_TABS.map((tab) => {
              const isActive = activeGender === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveGender(tab.id)}
                  className={`rounded-full px-6 py-2.5 text-[14px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#801424] text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/collections?category=${cat.id}&gender=${activeGender}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:border-[#801424]/40 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-base font-semibold text-neutral-900 group-hover:text-[#801424] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[13px] text-neutral-500 mt-1">
                  {cat.itemsCount}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-[#801424] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All For Active Gender CTA */}
        <div className="mt-10 text-center">
          <Link
            to={`/collections?gender=${activeGender}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#801424] hover:underline"
          >
            <span>
              Explore Complete {activeGender === 'women' ? "Women's" : activeGender === 'men' ? "Men's" : "Kids'"} Collection
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

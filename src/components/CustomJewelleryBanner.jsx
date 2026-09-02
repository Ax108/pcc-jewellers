import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { BESPOKE_BANNER } from '../configs/siteContent'

export default function CustomJewelleryBanner() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#161412] text-white shadow-2xl">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            {/* Image Column */}
            <div className="relative h-72 sm:h-96 lg:h-full lg:col-span-6 overflow-hidden">
              <img
                src={BESPOKE_BANNER.image}
                alt="Bespoke Jewellery Craftsmanship at P. C. Chandra Atelier"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#161412]" />
            </div>

            {/* Content Column */}
            <div className="p-8 sm:p-12 lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight font-editorial leading-tight">
                {BESPOKE_BANNER.title}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
                {BESPOKE_BANNER.description}
              </p>

              {/* Bespoke Process Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>1-on-1 Designer Session</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>3D CAD & Wax Model</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>100% BIS Hallmarked</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/collections?category=bridal"
                  className="inline-flex items-center gap-2 rounded-md bg-[#801424] px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#9B1D30]"
                >
                  <span>{BESPOKE_BANNER.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

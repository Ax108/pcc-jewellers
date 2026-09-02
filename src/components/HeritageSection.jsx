import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { HERITAGE_STORY } from '../configs/siteContent'

export default function HeritageSection() {
  return (
    <section className="bg-[#FAF8F5] py-16 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-normal text-neutral-900 font-editorial leading-tight tracking-tight">
              {HERITAGE_STORY.title}
            </h2>

            <div className="space-y-4 text-base sm:text-[17px] leading-relaxed text-neutral-600">
              {HERITAGE_STORY.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* Heritage Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-200">
              {HERITAGE_STORY.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#801424] font-editorial">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/collections?metal=gold"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#801424] hover:border-[#801424]"
              >
                <span>{HERITAGE_STORY.cta}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Showroom Image Showcase */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
              <img
                src={HERITAGE_STORY.image}
                alt="Flagship Boutique Interior of P. C. Chandra Jewellers"
                className="h-[360px] sm:h-[420px] w-full object-cover"
              />

              {/* Heritage Badge Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-neutral-900 shadow-md">
                <img
                  src="/assets/85-years-completion.webp"
                  alt="85 Years"
                  className="h-10 w-auto"
                />
                <div className="border-l border-neutral-200 pl-2">
                  <p className="text-[10px] font-bold tracking-wider text-[#801424] uppercase">
                    Unmatched Legacy
                  </p>
                  <p className="text-xs font-semibold text-neutral-700">
                    Four Generations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

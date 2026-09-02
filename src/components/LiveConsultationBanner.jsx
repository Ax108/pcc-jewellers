import { Video, Calendar, ShieldCheck, ArrowRight } from 'lucide-react'
import { LIVE_CONSULTATION } from '../configs/siteContent'

export default function LiveConsultationBanner() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#FBF9F5] shadow-sm">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            {/* Content Column */}
            <div className="p-8 sm:p-12 lg:col-span-6 xl:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 font-editorial leading-tight">
                {LIVE_CONSULTATION.title}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-600">
                {LIVE_CONSULTATION.description}
              </p>

              {/* Consultation Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#801424] shrink-0" />
                  <span>360° Macro HD Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#801424] shrink-0" />
                  <span>Flexible Time Slots</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#801424] shrink-0" />
                  <span>Zero Purchase Obligation</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#book-video"
                  className="inline-flex items-center gap-2 rounded-md bg-[#801424] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#68101D]"
                >
                  <span>{LIVE_CONSULTATION.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative h-72 sm:h-96 lg:h-full lg:col-span-6 xl:col-span-5 overflow-hidden">
              <img
                src={LIVE_CONSULTATION.image}
                alt="Live Video Call Consultation for Diamond and Gold Jewellery"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

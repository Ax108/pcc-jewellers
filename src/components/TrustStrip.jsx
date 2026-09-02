import { ShieldCheck, Gem, Truck, RotateCcw } from 'lucide-react'
import { TRUST_STRIP } from '../configs/siteContent'

const ICONS = [ShieldCheck, Gem, Truck, RotateCcw]

export default function TrustStrip() {
  return (
    <section className="border-b border-neutral-200 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {TRUST_STRIP.map((item, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 border-neutral-200 py-1 sm:px-2 md:border-r md:last:border-r-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#801424]/10 text-[#801424]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-xs font-semibold text-neutral-900">
                    {item.title}
                  </h4>
                  <p className="hidden text-[11px] text-neutral-500 sm:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import {
  ShieldCheck,
  Gem,
  Scale,
  BadgeCheck,
  RefreshCw,
  Truck,
  RotateCcw,
  Hammer,
  HeartHandshake,
  Award,
} from 'lucide-react'
import { TRUST_TOKENS } from '../configs/siteContent'

const TOKEN_ICONS = [
  ShieldCheck,
  Gem,
  Scale,
  BadgeCheck,
  RefreshCw,
  Truck,
  RotateCcw,
  Hammer,
  HeartHandshake,
  Award,
]

export default function TrustTokens() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-normal text-neutral-900 font-editorial tracking-tight">
            10 Tokens of Trust
          </h2>
          <p className="text-base sm:text-[17px] text-neutral-600 mt-3 leading-relaxed">
            The unshakeable standard of integrity, certified purity, and care upheld since 1939.
          </p>
        </div>

        {/* 10 Tokens Grid (2 rows of 5 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {TRUST_TOKENS.map((token, idx) => {
            const Icon = TOKEN_ICONS[idx % TOKEN_ICONS.length]
            return (
              <div
                key={token.id}
                className="group flex flex-col items-center rounded-xl border border-neutral-200 bg-[#FAF8F5] p-5 text-center transition-all hover:border-[#801424]/40 hover:bg-white hover:shadow-md"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#801424]/10 text-[#801424] transition-colors group-hover:bg-[#801424] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-xs font-bold text-neutral-900 leading-tight">
                  {token.title}
                </h3>

                <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500 line-clamp-3">
                  {token.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

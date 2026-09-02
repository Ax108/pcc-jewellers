import { motion } from 'framer-motion'
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-neutral-900 font-editorial tracking-tight">
            10 Tokens of Trust
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            The unshakeable standard of integrity, certified purity, and care upheld since 1939.
          </p>
        </motion.div>

        {/* 10 Tokens Grid with Stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6"
        >
          {TRUST_TOKENS.map((token, idx) => {
            const Icon = TOKEN_ICONS[idx % TOKEN_ICONS.length]
            return (
              <motion.div
                key={token.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className="group flex flex-col items-center rounded-2xl border border-neutral-200/90 bg-[#FAF8F5] p-6 sm:p-7 text-center transition-all duration-300 hover:border-[#801424]/40 hover:bg-white hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#801424]/10 text-[#801424] transition-all duration-300 group-hover:bg-[#801424] group-hover:text-white group-hover:shadow-md"
                >
                  <Icon className="h-7 w-7" />
                </motion.div>

                <h3 className="text-base sm:text-[17px] font-bold text-neutral-900 leading-snug group-hover:text-[#801424] transition-colors">
                  {token.title}
                </h3>

                <p className="mt-2.5 text-sm sm:text-[14px] leading-relaxed text-neutral-600 font-normal">
                  {token.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

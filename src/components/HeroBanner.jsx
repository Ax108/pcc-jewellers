import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award } from 'lucide-react'
import { HERO_DATA } from '../configs/siteContent'

export default function HeroBanner() {
  return (
    <section className="relative flex-1 min-h-0 flex items-center overflow-hidden border-b border-neutral-800 bg-[#0E0C0B]">
      {/* Visible Showroom Architectural Background with Dark Cinematic Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/images/heritage_showroom.jpg"
          alt=""
          className="h-full w-full object-cover object-center scale-100 opacity-75"
        />
        {/* Dark Luxury Gradient Overlay ensuring high image visibility + supreme text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/50" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Content Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
            className="lg:col-span-6 xl:col-span-5 space-y-5 text-white"
          >
            {/* Title */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white font-editorial leading-[1.14]"
            >
              {HERO_DATA.title}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="block mt-2 font-serif italic text-amber-300"
              >
                {HERO_DATA.highlight}
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-sm sm:text-base leading-relaxed text-neutral-200 max-w-xl font-light"
            >
              {HERO_DATA.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 rounded-md bg-[#801424] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#9B1C2E] hover:shadow-2xl hover:shadow-[#801424]/40"
                >
                  <span>{HERO_DATA.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#video-consult"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-xs transition-colors hover:border-white hover:bg-white/20"
                >
                  <span>{HERO_DATA.secondaryCta}</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Assurance Line */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.8, delay: 0.4 } },
              }}
              className="flex items-center gap-5 border-t border-white/20 pt-5 text-xs text-neutral-300"
            >
              <div className="flex items-center gap-2 font-medium text-white">
                <Award className="h-4 w-4 text-amber-400" />
                <span>100% BIS 916 Hallmarked Gold</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="font-medium text-white">
                <span>IGI & SGL Certified Natural Diamonds</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Reverted Content Image Showcase with Gentle Float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-neutral-950 shadow-2xl"
            >
              <img
                src={HERO_DATA.image}
                alt="The Royal Bengal Heritage Gold & Diamond Collection"
                className="h-[320px] sm:h-[400px] lg:h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Quality Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-black/80 px-5 py-3 text-white backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-auto"
              >
                <p className="text-[11px] font-medium tracking-widest text-[#F2C94C] uppercase">
                  Featured Masterwork
                </p>
                <p className="text-sm font-semibold">
                  Raj-Mahal 22KT Polki Choker Suite
                </p>
                <p className="text-xs text-neutral-300">
                  Natural Zambian Emeralds • Bengali Filigree Art
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

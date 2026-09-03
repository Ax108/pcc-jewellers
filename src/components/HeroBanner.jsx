import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Video } from 'lucide-react'
import { HERO_DATA } from '../configs/siteContent'

export default function HeroBanner() {
  return (
    <section className="relative flex-1 min-h-0 flex flex-col justify-center overflow-hidden border-b border-neutral-800 bg-[#0E0C0B]">
      {/* Background for Mobile: Immersive Full-Bleed Gold Necklace with Cinematic Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden lg:hidden">
        <img
          src={HERO_DATA.image}
          alt="The Royal Bengal Heritage Gold & Diamond Collection"
          className="h-full w-full object-cover object-center scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
        <div className="absolute inset-0 bg-radial-[at_top_center] from-transparent via-black/40 to-black/80" />
      </div>

      {/* Background for Desktop: Architectural Showroom with Dark Luxury Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
        <img
          src="/images/heritage_showroom.jpg"
          alt=""
          className="h-full w-full object-cover object-center scale-100 opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/50" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 py-4 sm:py-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12">
          {/* Content Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.05,
                },
              },
            }}
            className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-6 text-white"
          >
            {/* Title (Larger, Majestic Editorial Serif) */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-white font-editorial leading-[1.12]"
            >
              {HERO_DATA.title}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="block mt-1 sm:mt-2 font-serif italic text-amber-300 text-2xl xs:text-3xl sm:text-4xl lg:text-4xl"
              >
                {HERO_DATA.highlight}
              </motion.span>
            </motion.h1>

            {/* Description (Slightly Larger, Legible & Engaging) */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="text-sm xs:text-[15px] sm:text-base leading-relaxed text-neutral-100 max-w-xl font-light drop-shadow-xs"
            >
              {HERO_DATA.description}
            </motion.p>

            {/* CTAs (Side-by-Side Responsive Row) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="flex flex-row items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1 sm:flex-none">
                <Link
                  to="/collections"
                  className="flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-transparent bg-[#801424] px-4 sm:px-6 text-xs sm:text-sm font-semibold text-white shadow-xl transition-all hover:bg-[#9B1C2E] hover:shadow-2xl hover:shadow-[#801424]/40"
                >
                  <span className="truncate">{HERO_DATA.primaryCta}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1 sm:flex-none">
                <a
                  href="#video-consult"
                  className="flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-3.5 sm:px-6 text-xs sm:text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-colors hover:border-white hover:bg-white/20"
                >
                  <Video className="h-4 w-4 shrink-0 text-amber-300" />
                  <span className="hidden xs:inline">{HERO_DATA.secondaryCta}</span>
                  <span className="xs:hidden">Video Call</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Assurance Line */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } },
              }}
              className="flex items-center gap-3 sm:gap-5 border-t border-white/20 pt-3 sm:pt-4 text-[11px] sm:text-xs text-neutral-300"
            >
              <div className="flex items-center gap-1.5 font-medium text-white">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0" />
                <span>100% BIS 916 Hallmarked Gold</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="font-medium text-white">
                <span>Certified Natural Diamonds</span>
              </div>
            </motion.div>

            {/* Mobile Featured Masterwork Frosted Pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
              }}
              className="rounded-xl border border-white/20 bg-black/60 p-3 backdrop-blur-md flex items-center justify-between text-white lg:hidden"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#F2C94C] block">
                  Featured Masterwork
                </span>
                <p className="text-xs font-semibold text-white">
                  Raj-Mahal 22KT Polki Choker Suite
                </p>
                <p className="text-[10px] text-neutral-300">
                  Natural Zambian Emeralds • Bengali Filigree
                </p>
              </div>
              <span className="shrink-0 text-[10px] font-medium bg-[#801424] text-white px-2.5 py-1 rounded-full border border-amber-300/40">
                Pure Karigari
              </span>
            </motion.div>
          </motion.div>

          {/* Reverted Content Image Showcase with Gentle Float (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:block lg:col-span-6 xl:col-span-7"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-neutral-950 shadow-2xl"
            >
              <img
                src={HERO_DATA.image}
                alt="The Royal Bengal Heritage Gold & Diamond Collection"
                className="h-[360px] sm:h-[420px] lg:h-[470px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Quality Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-black/85 p-4 text-white backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-auto"
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


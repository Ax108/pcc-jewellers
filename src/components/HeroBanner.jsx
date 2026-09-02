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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-5 space-y-5 text-white"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white font-editorial leading-[1.14]">
              {HERO_DATA.title}
              <span className="block mt-2 font-serif italic text-amber-300">
                {HERO_DATA.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed text-neutral-200 max-w-xl font-light">
              {HERO_DATA.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 rounded-md bg-[#801424] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#9B1C2E] hover:shadow-xl"
              >
                <span>{HERO_DATA.primaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#video-consult"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-xs transition-colors hover:border-white hover:bg-white/20"
              >
                <span>{HERO_DATA.secondaryCta}</span>
              </a>
            </div>

            {/* Trust Assurance Line */}
            <div className="flex items-center gap-5 border-t border-white/20 pt-5 text-xs text-neutral-300">
              <div className="flex items-center gap-2 font-medium text-white">
                <Award className="h-4 w-4 text-amber-400" />
                <span>100% BIS 916 Hallmarked Gold</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="font-medium text-white">
                <span>IGI & SGL Certified Natural Diamonds</span>
              </div>
            </div>
          </motion.div>

          {/* Reverted Content Image Showcase (the way it was at first) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-7"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-neutral-950 shadow-2xl">
              <img
                src={HERO_DATA.image}
                alt="The Royal Bengal Heritage Gold & Diamond Collection"
                className="h-[320px] sm:h-[400px] lg:h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Quality Tag */}
              <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-black/80 px-5 py-3 text-white backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-auto">
                <p className="text-[11px] font-medium tracking-widest text-[#F2C94C] uppercase">
                  Featured Masterwork
                </p>
                <p className="text-sm font-semibold">
                  Raj-Mahal 22KT Polki Choker Suite
                </p>
                <p className="text-xs text-neutral-300">
                  Natural Zambian Emeralds • Bengali Filigree Art
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

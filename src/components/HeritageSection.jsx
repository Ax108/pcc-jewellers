import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HERITAGE_STORY } from '../configs/siteContent'

export default function HeritageSection() {
  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-20 border-b border-neutral-200 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full min-w-0 space-y-6"
          >
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 font-editorial leading-tight tracking-tight">
              {HERITAGE_STORY.title}
            </h2>

            <div className="space-y-4 text-base sm:text-[17px] leading-relaxed text-neutral-600">
              {HERITAGE_STORY.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* Heritage Key Metrics Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-200"
            >
              {HERITAGE_STORY.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -4 }}
                >
                  <p className="text-2xl font-bold text-[#801424] font-editorial">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link
                  to="/collections?metal=gold"
                  className="inline-flex items-center gap-2 rounded-md border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase shadow-sm transition-all hover:bg-[#801424] hover:border-[#801424] hover:shadow-lg"
                >
                  <span>{HERITAGE_STORY.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Showroom Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full min-w-0"
          >
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl group w-full">
              <img
                src={HERITAGE_STORY.image}
                alt="Flagship Boutique Interior of P. C. Chandra Jewellers"
                className="h-[280px] sm:h-[420px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Heritage Badge Overlay */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2 text-neutral-900 shadow-lg backdrop-blur-xs max-w-[calc(100%-24px)]"
              >
                <img
                  src="/assets/85-years-completion.webp"
                  alt="85 Years"
                  className="h-8 sm:h-10 w-auto shrink-0"
                />
                <div className="border-l border-neutral-200 pl-2 min-w-0">
                  <p className="text-[10px] font-bold tracking-wider text-[#801424] uppercase truncate">
                    Unmatched Legacy
                  </p>
                  <p className="text-xs font-semibold text-neutral-700 truncate">
                    Four Generations
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { BESPOKE_BANNER } from '../configs/siteContent'

export default function CustomJewelleryBanner() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#161412] text-white shadow-2xl"
        >
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            {/* Image Column */}
            <div className="relative h-72 sm:h-96 lg:h-full lg:col-span-6 overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                src={BESPOKE_BANNER.image}
                alt="Bespoke Jewellery Craftsmanship at P. C. Chandra Atelier"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#161412]" />
            </div>

            {/* Content Column */}
            <div className="p-8 sm:p-12 lg:col-span-6 space-y-6">
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-normal tracking-tight font-editorial leading-tight"
              >
                {BESPOKE_BANNER.title}
              </motion.h2>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
                {BESPOKE_BANNER.description}
              </p>

              {/* Bespoke Process Highlights */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-300"
              >
                {[
                  '1-on-1 Designer Session',
                  '3D CAD & Wax Model',
                  '100% BIS Hallmarked',
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/collections?category=bridal"
                    className="inline-flex items-center gap-2 rounded-md bg-[#801424] px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-[#9B1D30] hover:shadow-xl hover:shadow-[#801424]/30"
                  >
                    <span>{BESPOKE_BANNER.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

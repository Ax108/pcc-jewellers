import { motion } from 'framer-motion'
import { Video, Calendar, ShieldCheck, ArrowRight } from 'lucide-react'
import { LIVE_CONSULTATION } from '../configs/siteContent'

export default function LiveConsultationBanner() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#FBF9F5] shadow-sm"
        >
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            {/* Content Column */}
            <div className="p-8 sm:p-12 lg:col-span-6 xl:col-span-7 space-y-6">
              <motion.h2
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 font-editorial leading-tight"
              >
                {LIVE_CONSULTATION.title}
              </motion.h2>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-600">
                {LIVE_CONSULTATION.description}
              </p>

              {/* Consultation Features */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-neutral-700"
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-200/60 shadow-2xs"
                >
                  <Video className="h-4 w-4 text-[#801424] shrink-0" />
                  <span>360° Macro HD Preview</span>
                </motion.div>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-200/60 shadow-2xs"
                >
                  <Calendar className="h-4 w-4 text-[#801424] shrink-0" />
                  <span>Flexible Time Slots</span>
                </motion.div>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-200/60 shadow-2xs"
                >
                  <ShieldCheck className="h-4 w-4 text-[#801424] shrink-0" />
                  <span>Zero Purchase Obligation</span>
                </motion.div>
              </motion.div>

              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <a
                    href="#book-video"
                    className="inline-flex items-center gap-2 rounded-md bg-[#801424] px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[#68101D] hover:shadow-xl hover:shadow-[#801424]/20"
                  >
                    <span>{LIVE_CONSULTATION.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative h-72 sm:h-96 lg:h-full lg:col-span-6 xl:col-span-5 overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                src={LIVE_CONSULTATION.image}
                alt="Live Video Call Consultation for Diamond and Gold Jewellery"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

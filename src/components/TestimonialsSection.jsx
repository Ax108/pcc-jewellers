import { motion } from 'framer-motion'
import { Star, CheckCircle, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../configs/siteContent'

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-normal text-neutral-900 font-editorial tracking-tight">
            Cherished Across Generations
          </h2>
          <p className="text-base sm:text-[17px] text-neutral-600 mt-3 leading-relaxed">
            Over 10 million families trust P. C. Chandra Jewellers for life’s most auspicious moments.
          </p>
        </motion.div>

        {/* Testimonials Grid with Stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((review, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
              className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-[#FBF9F5] p-6 sm:p-8 transition-shadow hover:shadow-xl duration-300"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="h-6 w-6 text-[#801424]/20 mb-2" />

                <p className="text-sm leading-relaxed text-neutral-700 italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">
                      {review.author}
                    </h4>
                    <p className="text-xs text-neutral-500">{review.location}</p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                <p className="text-[11px] font-medium text-[#801424] mt-2">
                  Purchased: {review.occasion}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  ArrowRight,
  Check,
} from 'lucide-react'
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from 'react-icons/fa6'
import {
  SiGooglepay,
  SiPaytm,
} from 'react-icons/si'
import { FOOTER_SECTIONS } from '../configs/siteContent'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail('')
        setSubscribed(false)
      }, 4000)
    }
  }

  return (
    <footer className="w-full text-white">
      {/* Main Red Section */}
      <div className="bg-[#9B1127] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Column 1: Brand Story, Brand Properties, Contact Us */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.brandStory.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-xs text-white/85">
                  {FOOTER_SECTIONS.brandStory.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.brandProperties.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-xs text-white/85">
                  {FOOTER_SECTIONS.brandProperties.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.contact.title}
                </h4>
                <div className="mt-3.5 space-y-2.5 text-xs text-white/85">
                  <a
                    href={`mailto:${FOOTER_SECTIONS.contact.email}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-white/80" />
                    <span>{FOOTER_SECTIONS.contact.email}</span>
                  </a>
                  <a
                    href="tel:8010700400"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-white/80" />
                    <span>{FOOTER_SECTIONS.contact.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Our Collections, Media & Advertisement */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.collections.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-xs text-white/85">
                  {FOOTER_SECTIONS.collections.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="hover:text-white transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.media.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-xs text-white/85">
                  {FOOTER_SECTIONS.media.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Our Categories, Follow Us */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.categories.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-xs text-white/85">
                  {FOOTER_SECTIONS.categories.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="hover:text-white transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.social.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-xs text-white/85">
                  {FOOTER_SECTIONS.social.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 4: Join Our Newsletter & We Accept */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                  {FOOTER_SECTIONS.newsletter.title}
                </h4>
                <p className="mt-2 text-xs text-white/80">
                  {FOOTER_SECTIONS.newsletter.subtitle}
                </p>

                <form onSubmit={handleSubscribe} className="mt-4">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-white/40 bg-transparent px-3.5 py-2.5 pr-10 text-xs text-white placeholder-white/60 focus:border-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute top-0 right-0 flex h-full items-center px-3 text-white transition-colors hover:text-amber-300"
                      aria-label="Submit newsletter subscription"
                    >
                      {subscribed ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {subscribed && (
                    <p className="mt-1.5 text-[11px] text-emerald-300">
                      Thank you for subscribing!
                    </p>
                  )}
                </form>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-3">
                  WE ACCEPT
                </h4>

                {/* Payment Icons Grid matching the official website */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[#1A1F71] shadow-xs">
                    <FaCcVisa className="h-4 w-4" />
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[#EB001B] shadow-xs">
                    <FaCcMastercard className="h-4 w-4" />
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[#006FCF] shadow-xs">
                    <FaCcAmex className="h-4 w-4" />
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[10px] font-bold text-neutral-800 shadow-xs">
                    RuPay
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[10px] font-bold text-neutral-800 shadow-xs">
                    UPI
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-neutral-700 shadow-xs">
                    <SiGooglepay className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[#002970] shadow-xs">
                    <SiPaytm className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[9px] font-bold text-neutral-800 shadow-xs">
                    NET
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[9px] font-bold text-neutral-800 shadow-xs">
                    BHIM
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white text-[9px] font-bold text-neutral-800 shadow-xs">
                    BANK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charcoal Bar */}
      <div className="bg-[#3C3233] px-4 py-5 text-neutral-300">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/70">
            {FOOTER_SECTIONS.legalLinks.map((item, idx) => (
              <span key={item.label} className="inline-flex items-center">
                <a href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </a>
                {idx < FOOTER_SECTIONS.legalLinks.length - 1 && (
                  <span className="mx-2 text-white/30">|</span>
                )}
              </span>
            ))}
          </div>

          <p className="mt-4 text-[11px] font-medium tracking-wide text-white/60">
            {FOOTER_SECTIONS.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

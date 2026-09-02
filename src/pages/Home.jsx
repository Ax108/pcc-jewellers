import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import CampaignBanners from '../components/CampaignBanners'
import CategorySection from '../components/CategorySection'
import CustomJewelleryBanner from '../components/CustomJewelleryBanner'
import TrendingCollection from '../components/TrendingCollection'
import LiveConsultationBanner from '../components/LiveConsultationBanner'
import GiftingGuide from '../components/GiftingGuide'
import HeritageSection from '../components/HeritageSection'
import TestimonialsSection from '../components/TestimonialsSection'
import TrustTokens from '../components/TrustTokens'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* 100vh Hero Viewport: Header + Hero occupies exactly full screen on load */}
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <Header />
        <HeroBanner />
      </div>

      {/* Main Scrollable Content */}
      <main className="flex-1">
        {/* Full-Width Panoramic Campaign Banners below Hero */}
        <CampaignBanners />

        <CategorySection />
        <CustomJewelleryBanner />
        <TrendingCollection />
        <LiveConsultationBanner />
        <GiftingGuide />
        <HeritageSection />
        <TestimonialsSection />
        <TrustTokens />
      </main>
      <Footer />
    </div>
  )
}

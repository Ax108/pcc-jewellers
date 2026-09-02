# P. C. Chandra Jewellers | Digital Flagship

> **"A Jewel of Jewels" — Celebrating 85 Years of Pure Trust, Master Craftsmanship & BIS 916 Hallmarked Purity (Est. 1939)**

A luxury digital commerce web application built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed to deliver an opulent, high-performance shopping experience reflecting the iconic legacy and Bengali karigari of P. C. Chandra Jewellers.

---

## Key Highlights & Features

### 1. Live Gold Rate Integration
- **Real-Time API**: Powered by `https://api.goldprice.dev/v1/carat?currency=INR` to fetch live 22K and 24K per-gram gold rates in Indian Rupees (INR).
- **Smart Caching**: Implements a 5-minute client-side `localStorage` cache to ensure rapid page loads and prevent unnecessary API rate limiting.
- **Top Ticker**: Features a live pulsating ticker across all pages displaying current 22KT & 24KT bullion market prices.

### 2. Dedicated Collections Catalog (`/collections`)
- **Expanded Repertoire**: Complete catalog of 54 curated pieces across 6 core categories:
  - **Earrings & Jhumkas** (Bengali Kanpashas, Jhumkas, Diamond studs & drops)
  - **Rings & Solitaires** (22KT filigree bands, bridal cocktails, signet rings)
  - **Necklaces & Chokers** (Royal Sita Haars, Chokers, Hasli & Mangalsutras)
  - **Bangles & Kadas** (Peacock finial Balas, Chur, Diamond tennis bracelets, Nakshi Kadas)
  - **Royal Bridal Atelier** (Heritage Matha Patti, Hathphool, Uncut Polki sets)
  - **Men's Luxury** (Heavy Cuban links, Sovereign signets, Lion-head Kadas)
- **Rate-Limited Progressive Loading & Infinite Scroll**:
  - Initial batch limited to 12 items for lightweight rendering.
  - Automatic loading of subsequent 12-item batches as the user scrolls toward the bottom of the grid using an `IntersectionObserver` sentinel.
  - Interactive progress indicator with live product counters.

### 3. Deep Filter Synchronization & URL State
- **Two-Way Filter Sync**: Filters react to and update browser search parameters (`?category=...&gender=...&metal=...&minPrice=...&maxPrice=...&search=...`).
- **Sidebar Controls**:
  - Real-time price slider (`₹0` to `₹5,00,000`).
  - Metal purity filters (`22KT Gold`, `18KT Diamond`, `14KT Gold`, `Platinum`).
  - Gender targeting (`Women`, `Men`, `Kids`).
  - Gold tones (`Yellow Gold`, `White Gold`, `Rose Gold`).
  - Delivery timelines (`3 Days`, `7 Days`, `10 Days`, `25 Days Bespoke`).
- **Unified Global Search**: Search bar in the desktop and mobile headers instantly filters the collections grid by keyword matching across titles, metals, and badges.

### 4. Flawless Scroll Restoration
- **Zero Scroll Bleed**: Automatically scrolls to `(0, 0)` upon page reload and on every internal route navigation.
- **Query Param Scroll**: Clicking footer category buttons (e.g. *Wedding*, *Diamond*, *Kids*) while already on the collections page immediately scrolls back to the top of the catalog.
- **Manual Scroll Restoration**: Sets `history.scrollRestoration = 'manual'` to prevent browser scroll jump.

### 5. Luxury Visual Design & Craftsmanship
- **Cinematic Hero**: Full-viewport showcase featuring the historic showroom ambiance with high-contrast luxury typography.
- **Consistent Product Geometry**: Prevents discount pills from wrapping onto multiple lines (`whitespace-nowrap shrink-0`) and pins action buttons (`mt-auto`) for identical card alignment across all screen sizes.
- **Curated Homepage Layout**: Homepage displays 4 handpicked showcase masterpieces to keep the landing experience clean and invite users into the dedicated collections page.
- **Campaign Banners**: Panoramic campaign carousel featuring Ayushmann Khurrana x P.C. Chandra Jewellers (*Framed For Fame*), Bespoke Atelier, New 9KT Gold, and Astral Gems.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component hierarchy & hooks architecture |
| **Vite** | Fast HMR, development server, and optimized bundling |
| **Tailwind CSS v4** | Custom luxury color tokens, typography, and responsive layouts |
| **Framer Motion** | Smooth cinematic transitions and layout animations |
| **React Router v7** | Dynamic client-side routing and URL search param synchronization |
| **Lucide React & React Icons** | Crisp UI icons, badges, and trust tokens |

---

## Project Structure

```text
pcc-jewellers/
├── public/
│   ├── assets/              # Logos, heritage crests, trademark marks
│   └── images/
│       ├── products/        # 54 cropped 1:1 square product assets
│       └── ...              # Banner campaigns and editorial backgrounds
├── src/
│   ├── components/
│   │   ├── CampaignBanners.jsx      # Full-width panoramic campaign carousel
│   │   ├── CategorySection.jsx      # Shop by Category with gender switching
│   │   ├── CustomJewelleryBanner.jsx# Bespoke atelier call-to-action
│   │   ├── Footer.jsx               # Corporate, store locator, and collections links
│   │   ├── GiftingGuide.jsx         # Occasion & budget tier filters
│   │   ├── Header.jsx               # Live gold ticker, navigation & search bar
│   │   ├── HeritageSection.jsx      # 85-year legacy story & milestone metrics
│   │   ├── HeroBanner.jsx           # Fullscreen editorial hero banner
│   │   ├── LiveConsultationBanner.jsx # 360° video shopping preview
│   │   ├── ScrollToTop.jsx          # Instant scroll-to-top on reload & navigation
│   │   ├── TestimonialsSection.jsx  # Client reviews & ratings
│   │   ├── TrendingCollection.jsx   # 4 curated weekly masterpieces
│   │   └── TrustTokens.jsx          # 10 core pillars of customer assurance
│   ├── configs/
│   │   └── siteContent.js           # Single source of truth for 54 items & metadata
│   ├── helpers/
│   │   └── goldRateService.js       # Live gold rate API fetcher with localStorage caching
│   ├── pages/
│   │   ├── Collections.jsx          # Filterable catalog with auto-loading infinite scroll
│   │   └── Home.jsx                 # Flagship landing page
│   ├── App.jsx                      # Router & top-level layout configuration
│   ├── index.css                    # Design system tokens and global CSS
│   └── main.jsx                     # Application entry point
├── index.html                       # HTML5 template with Google typography & scroll config
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**

### Installation
```bash
# Clone or navigate to the repository
cd pcc-jewellers

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

---

## License
Private and confidential. Developed for freelance client presentation.

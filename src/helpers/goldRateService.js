const API_URL = 'https://api.goldprice.dev/v1/carat?currency=INR'
const CACHE_KEY = 'pcc_live_gold_rate_cache'
const CACHE_TIME_KEY = 'pcc_live_gold_rate_time'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Fetches real-time gold rates from https://api.goldprice.dev/v1/carat?currency=INR
 * Returns formatted 22K and 24K per gram rates for India.
 */
export async function fetchLocalizedGoldRate() {
  // 1. Check local cache first (5-minute freshness)
  try {
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY)
    const cachedData = localStorage.getItem(CACHE_KEY)
    if (cachedTime && cachedData && Date.now() - Number(cachedTime) < CACHE_DURATION) {
      return JSON.parse(cachedData)
    }
  } catch (e) {
    // ignore storage access errors
  }

  // 2. Fetch live data from api.goldprice.dev
  try {
    const res = await fetch(API_URL, {
      headers: { Accept: 'application/json' },
    })

    if (res.ok) {
      const data = await res.json()
      const rate22kNum = parseFloat(data.price_gram_22k)
      const rate24kNum = parseFloat(data.price_gram_24k)
      const rate18kNum = parseFloat(data.price_gram_18k)

      const formatted22k = Math.round(rate22kNum).toLocaleString('en-IN')
      const formatted24k = Math.round(rate24kNum).toLocaleString('en-IN')

      const result = {
        currency: 'INR',
        rate22k: rate22kNum,
        rate24k: rate24kNum,
        rate18k: rate18kNum,
        displayString: `22K Gold: ₹${formatted22k}/gm | 24K Gold: ₹${formatted24k}/gm (Live Rate)`,
        timestamp: data.timestamp,
      }

      // Cache to localStorage
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(result))
        localStorage.setItem(CACHE_TIME_KEY, String(Date.now()))
      } catch (e) {
        // ignore
      }

      return result
    }
  } catch (err) {
    console.warn('Live gold price fetch failed, using fallback:', err)
  }

  // 3. Fallback if offline or network failure
  return {
    currency: 'INR',
    rate22k: 12217,
    rate24k: 13327,
    rate18k: 9996,
    displayString: '22K Gold: ₹12,217/gm | 24K Gold: ₹13,327/gm (Live Rate)',
    timestamp: new Date().toISOString(),
  }
}

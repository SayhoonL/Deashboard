const API_KEY = import.meta.env.VITE_STOCK_API_KEY
const BASE_URL = "https://finnhub.io/api/v1/quote"

export async function fetchStock(symbol: string) {
  const response = await fetch(
    `${BASE_URL}?symbol=${symbol}&token=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Stock fetch failed")
  }

  return response.json()
}

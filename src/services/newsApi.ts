const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = "https://newsapi.org/v2/top-headlines"

export async function fetchTechNews() {
  const response = await fetch(
    `${BASE_URL}?category=technology&language=en&pageSize=8&apiKey=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("News fetch failed")
  }

  return response.json()
}

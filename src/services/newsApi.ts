const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = "https://gnews.io/api/v4/top-headlines"

export async function fetchTechNews() {
  const response = await fetch(
    `${BASE_URL}?category=technology&lang=en&max=8&apikey=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("News fetch failed")
  }

  return response.json()
}


const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY

export async function fetchTechNews() {
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=technology&language=en`
  )

  if (!response.ok) {
    throw new Error("News fetch failed")
  }

  return response.json()
}

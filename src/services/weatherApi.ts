const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = "https://api.weatherapi.com/v1/current.json"

export async function fetchWeather(city: string) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${city}`
  )

  if (!response.ok) {
    throw new Error("Weather fetch failed")
  }

  return response.json()
}


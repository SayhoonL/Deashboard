import { useEffect, useState } from "react"
import "./App.css"

import TechNews from "./components/TechNews"
import StockCard from "./components/StockCard"
import { fetchWeather } from "./services/weatherApi"

interface WeatherData {
  location: {
    name: string
  }
  current: {
    temp_c: number
    humidity: number
    wind_kph: number
    condition: {
      text: string
    }
  }
}

const STORAGE_KEY = "dashboardSettings"

function App() {
  const saved = localStorage.getItem(STORAGE_KEY)
  const parsed = saved ? JSON.parse(saved) : {}

  const initialCity = parsed.city || "San Francisco"
  const initialSymbols: string[] =
    parsed.symbols || ["AAPL", "MSFT", "TSLA"]

  const [city, setCity] = useState(initialCity)
  const [tempCity, setTempCity] = useState(initialCity)

  const [symbols, setSymbols] = useState<string[]>(initialSymbols)
  const [tempSymbols, setTempSymbols] = useState(
    initialSymbols.join(", ")
  )

  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  async function refreshWeather() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchWeather(city)
      setWeather(data)
    } catch {
      setError("Could not load weather data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshWeather()
  }, [city, refreshKey])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ city, symbols })
    )
  }, [city, symbols])

  function parseSymbols(input: string): string[] {
    return input
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
          >
             Refresh
          </button>
          <button
            onClick={() => {
              setTempCity(city)
              setTempSymbols(symbols.join(", "))
              setIsSettingsOpen(true)
            }}
          >
            ⚙ Settings
          </button>
        </div>
      </header>

      <div className="dashboard">
        <div className="main">
          <div className="card">
            <TechNews key={refreshKey} />
          </div>
        </div>

        <div className="sidebar">
          <div className="card weather-card">
            <h2>Weather</h2>
            <h3>{city}</h3>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {weather && !loading && !error && (
              <>
                <div className="temp">
                  {weather.current.temp_c}°C
                </div>
                <p>{weather.current.condition.text}</p>
                <hr className="divider" />
                <div className="weather-meta">
                  <div>
                    <strong>Humidity</strong>
                    <span>{weather.current.humidity}%</span>
                  </div>
                  <div>
                    <strong>Wind Speed</strong>
                    <span>{weather.current.wind_kph} km/h</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="card stock-card">
            <StockCard
              symbols={symbols}
              refreshKey={refreshKey}
            />
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Dashboard Settings</h2>

            <div className="modal-field">
              <label>Weather City</label>
              <input
                type="text"
                value={tempCity}
                onChange={(e) =>
                  setTempCity(e.target.value)
                }
              />
            </div>

            <div className="modal-field">
              <label>Stock Symbols</label>
              <input
                type="text"
                value={tempSymbols}
                onChange={(e) =>
                  setTempSymbols(e.target.value)
                }
              />
            </div>

            <div className="modal-actions">
              <button
                className="secondary"
                onClick={() =>
                  setIsSettingsOpen(false)
                }
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (tempCity.trim()) {
                    setCity(tempCity.trim())
                  }
                  setSymbols(
                    parseSymbols(tempSymbols)
                  )
                  setIsSettingsOpen(false)
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

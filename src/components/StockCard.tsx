import { useEffect, useState } from "react"
import { fetchStock } from "../services/stockApi"

interface StockData {
  c: number
  dp: number
}

interface Props {
  symbols: string[]
  refreshKey: number
}

function StockCard({ symbols, refreshKey }: Props) {
  const [stocks, setStocks] = useState<Record<string, StockData>>({})

  useEffect(() => {
    async function loadStocks() {
      const result: Record<string, StockData> = {}
      for (const symbol of symbols) {
        const data = await fetchStock(symbol)
        result[symbol] = data
      }
      setStocks(result)
    }

    loadStocks()
  }, [symbols, refreshKey])

  return (
    <>
      <h2>Stock Market</h2>
      {symbols.map((symbol) => {
        const stock = stocks[symbol]
        if (!stock) return null
        return (
          <div className="stock-row" key={symbol}>
            <strong>{symbol}</strong>
            <span>
              ${stock.c.toFixed(2)}{" "}
              {stock.dp >= 0 ? "▲" : "▼"}{" "}
              {stock.dp.toFixed(2)}%
            </span>
          </div>
        )
      })}
    </>
  )
}

export default StockCard

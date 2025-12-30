import { useEffect, useState } from "react"
import { fetchTechNews } from "../services/newsApi"

interface Article {
  title: string
  link: string
  source_name: string
  pubDate: string
}

function TechNews() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchTechNews()

        if (data.status !== "success" || !Array.isArray(data.results)) {
          throw new Error("Invalid response")
        }

        setArticles(data.results)
      } catch {
        setError("Could not load tech news")
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) return <p>Loading news...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <h2>Tech News</h2>
      <p className="section-subtitle">
        Latest headlines from around the web
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {articles.map((article) => (
          <li key={article.link} className="news-item">
            <a
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="news-row"
            >
              <div>
                <h4>{article.title}</h4>
                <p>
                  {article.source_name} •{" "}
                  {new Date(article.pubDate).toLocaleTimeString()}
                </p>
              </div>
              <span className="news-link">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TechNews

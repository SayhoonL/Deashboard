import { useEffect, useState } from "react"
import { fetchTechNews } from "../services/newsApi"

interface Article {
  title: string
  url: string
  source: {
    name: string
  }
  publishedAt: string
}

function TechNews() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchTechNews()
        setArticles(data.articles)
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
        {articles.map((article, index) => (
            <li className="news-item">
            <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="news-row"
            >
                <div>
                <h4>{article.title}</h4>
                <p>
                    {article.source.name} •{" "}
                    {new Date(article.publishedAt).toLocaleTimeString()}
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

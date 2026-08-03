import { useEffect, useState } from 'react'
import { getTopAnime, getAiringAnime, getTrendingAnime } from '../services/api'
import AnimeCard from '../components/AnimeCard'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const [popular, setPopular] = useState([])
  const [airing, setAiring] = useState([])
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [pop, air, trend] = await Promise.all([
          getTopAnime(1),
          getAiringAnime(1),
          getTrendingAnime()
        ])
        setPopular(pop?.data || [])
        setAiring(air?.data || [])
        setTrending(trend || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-orange-600/20 via-pink-600/10 to-purple-600/20 border border-white/10 p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Discover Your Next <span className="text-orange-500">Favorite Anime</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Real-time data from MyAnimeList & AniList. Search, browse and explore thousands of titles.
        </p>
      </section>

      {trending.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-orange-500 rounded-full"></span>
            Trending Now
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trending.slice(0, 12).map((a) => <AnimeCard key={a.id} anime={a} />)}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
          Currently Airing
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {airing.slice(0, 12).map((a) => <AnimeCard key={a.mal_id} anime={a} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-pink-500 rounded-full"></span>
          Most Popular
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popular.slice(0, 18).map((a) => <AnimeCard key={a.mal_id} anime={a} />)}
        </div>
      </section>
    </div>
  )
}

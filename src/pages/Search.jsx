import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchAnime, getTopAnime } from '../services/api'
import AnimeCard from '../components/AnimeCard'
import { Loader2, Search as SearchIcon } from 'lucide-react'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [query, setQuery] = useState(q)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = q ? await searchAnime(q) : await getTopAnime()
        setResults(res?.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [q])

  const submit = (e) => {
    e.preventDefault()
    setParams(query.trim() ? { q: query.trim() } : {})
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={submit} className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any anime..."
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-3.5 pl-5 pr-14 text-base focus:outline-none focus:border-orange-500"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-500 p-2.5 rounded-full">
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>
      </form>

      {q && <h2 className="text-lg font-semibold mb-5">Results for “{q}”</h2>}

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-orange-500" /></div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No anime found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((a) => <AnimeCard key={a.mal_id} anime={a} />)}
        </div>
      )}
    </div>
  )
}

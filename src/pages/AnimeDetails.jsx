import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAnimeById } from '../services/api'
import { Loader2, Star, Play, Calendar, Tv } from 'lucide-react'

export default function AnimeDetails() {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState('japanese')

  useEffect(() => {
    getAnimeById(id)
      .then(res => setAnime(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex justify-center min-h-[60vh] items-center"><Loader2 className="w-10 h-10 animate-spin text-orange-500" /></div>
  if (!anime) return <div className="text-center py-20 text-gray-500">Anime not found</div>

  const title = anime.title_english || anime.title
  const image = anime.images?.jpg?.large_image_url

  return (
    <div>
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={image} className="w-full h-full object-cover opacity-30 blur-sm scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <img src={image} alt={title} className="w-40 md:w-52 rounded-xl shadow-2xl mx-auto md:mx-0" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold mb-1">{title}</h1>
            {anime.title_japanese && <p className="text-gray-400 mb-4">{anime.title_japanese}</p>}

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-5 text-sm">
              {anime.score && (
                <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400" /> {anime.score}
                </span>
              )}
              {anime.year && <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" />{anime.year}</span>}
              {anime.episodes && <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full"><Tv className="w-4 h-4" />{anime.episodes} eps</span>}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5">
              {['japanese','english','hindi','bangla'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${lang === l ? 'bg-orange-600' : 'bg-white/5'}`}>
                  {l}
                </button>
              ))}
            </div>

            <Link to={`/watch/${id}`} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-full font-medium">
              <Play className="w-5 h-5 fill-white" /> Watch Now
            </Link>

            {anime.genres?.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
                {anime.genres.map(g => (
                  <span key={g.mal_id} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">{g.name}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {anime.synopsis && (
          <div className="mt-8 max-w-3xl">
            <h2 className="text-lg font-semibold mb-2">Synopsis</h2>
            <p className="text-gray-400 leading-relaxed">{anime.synopsis}</p>
          </div>
        )}
      </div>
    </div>
  )
}

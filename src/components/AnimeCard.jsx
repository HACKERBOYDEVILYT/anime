import { Link } from 'react-router-dom'
import { Star, Play } from 'lucide-react'

export default function AnimeCard({ anime }) {
  const title = anime.title_english || anime.title || anime.title?.english || anime.title?.romaji || 'Unknown'
  const image = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || anime.coverImage?.large || anime.coverImage?.medium
  const score = anime.score || (anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null)
  const id = anime.mal_id || anime.idMal || anime.id

  return (
    <Link to={`/anime/${id}`} className="group block rounded-xl overflow-hidden bg-[#141414] hover:ring-2 hover:ring-orange-500/60 transition">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-4">
          <div className="bg-orange-600 rounded-full p-2.5">
            <Play className="w-4 h-4 fill-white" />
          </div>
        </div>
        {score && (
          <div className="absolute top-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-xs flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {score}
          </div>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-orange-400 transition">{title}</h3>
        {(anime.year || anime.seasonYear) && (
          <p className="text-xs text-gray-500 mt-1">{anime.year || anime.seasonYear}</p>
        )}
      </div>
    </Link>
  )
}

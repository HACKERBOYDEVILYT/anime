import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAnimeById } from '../services/api'
import { Loader2, ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

export default function Watch() {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [lang, setLang] = useState('japanese')
  const [episode, setEpisode] = useState(1)
  const videoRef = useRef(null)

  useEffect(() => {
    getAnimeById(id).then(r => setAnime(r.data)).catch(console.error).finally(() => setLoading(false))
  }, [id])

  const togglePlay = () => {
    if (!videoRef.current) return
    playing ? videoRef.current.pause() : videoRef.current.play()
    setPlaying(!playing)
  }

  if (loading) return <div className="flex justify-center min-h-[60vh] items-center"><Loader2 className="w-10 h-10 animate-spin text-orange-500" /></div>
  if (!anime) return <div className="text-center py-20 text-gray-500">Not found</div>

  const title = anime.title_english || anime.title
  const total = anime.episodes || 12

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Link to={`/anime/${id}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden group">
            <video ref={videoRef} className="w-full h-full object-contain" poster={anime.images?.jpg?.large_image_url} onClick={togglePlay} muted={muted}>
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-4">
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm text-gray-300">EP {episode} • {lang}</p>
              </div>
              <div className="flex justify-center">
                <button onClick={togglePlay} className="bg-orange-600 rounded-full p-4">
                  {playing ? <Pause className="w-7 h-7 fill-white" /> : <Play className="w-7 h-7 fill-white" />}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setMuted(!muted)}>{muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}</button>
                <div className="flex-1 h-1 bg-white/20 rounded-full"><div className="w-1/3 h-full bg-orange-500 rounded-full" /></div>
                <Maximize className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {['japanese','english','hindi','bangla'].map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-full text-sm capitalize ${lang===l ? 'bg-orange-600' : 'bg-white/5'}`}>{l}</button>
            ))}
          </div>
        </div>

        <div className="bg-[#141414] rounded-xl p-4 max-h-[70vh] overflow-y-auto">
          <h3 className="font-semibold mb-3">Episodes</h3>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({length: Math.min(total, 24)}, (_,i) => i+1).map(ep => (
              <button key={ep} onClick={() => setEpisode(ep)}
                className={`aspect-square rounded-lg text-sm font-medium ${episode===ep ? 'bg-orange-600' : 'bg-white/5 hover:bg-white/10'}`}>
                {ep}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Demo player (public domain sample)</p>
        </div>
      </div>
    </div>
  )
}

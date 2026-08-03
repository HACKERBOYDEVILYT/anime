import { useState, useEffect } from 'react'
import { Settings, Plus, Trash2, Save, Key, Database } from 'lucide-react'

const KEY = 'anime_admin_data'
const API_KEY = 'anime_api_config'

export default function Admin() {
  const [tab, setTab] = useState('anime')
  const [list, setList] = useState([])
  const [form, setForm] = useState({ title: '', poster: '', videoUrl: '', language: 'japanese', episodes: 1 })
  const [api, setApi] = useState({ jikan: true, anilist: true, customUrl: '', customKey: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem(KEY)
    if (s) setList(JSON.parse(s))
    const a = localStorage.getItem(API_KEY)
    if (a) setApi(JSON.parse(a))
  }, [])

  const saveList = (l) => { setList(l); localStorage.setItem(KEY, JSON.stringify(l)) }

  const add = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    saveList([{ id: Date.now(), ...form }, ...list])
    setForm({ title: '', poster: '', videoUrl: '', language: 'japanese', episodes: 1 })
  }

  const saveApi = () => {
    localStorage.setItem(API_KEY, JSON.stringify(api))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-orange-500" />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <div className="flex gap-2 mb-6 border-b border-white/10">
        {['anime', 'api', 'list'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm rounded-t-lg capitalize ${tab===t ? 'bg-orange-600' : 'text-gray-400'}`}>
            {t === 'anime' ? 'Add Anime' : t === 'api' ? 'API Settings' : `Library (${list.length})`}
          </button>
        ))}
      </div>

      {tab === 'anime' && (
        <form onSubmit={add} className="bg-[#141414] rounded-xl p-5 space-y-4">
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Anime Title *" required
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 focus:border-orange-500 outline-none" />
          <input value={form.poster} onChange={e => setForm({...form, poster: e.target.value})} placeholder="Poster URL"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 focus:border-orange-500 outline-none" />
          <input value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} placeholder="Video Source URL"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 focus:border-orange-500 outline-none" />
          <div className="flex gap-3">
            <select value={form.language} onChange={e => setForm({...form, language: e.target.value})}
              className="bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2">
              <option value="japanese">Japanese</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="bangla">Bangla</option>
            </select>
            <input type="number" min="1" value={form.episodes} onChange={e => setForm({...form, episodes: +e.target.value})}
              className="w-24 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2" />
          </div>
          <button type="submit" className="bg-orange-600 hover:bg-orange-500 px-5 py-2.5 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>
      )}

      {tab === 'api' && (
        <div className="bg-[#141414] rounded-xl p-5 space-y-4">
          <label className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
            <span>Jikan API (MyAnimeList)</span>
            <input type="checkbox" checked={api.jikan} onChange={e => setApi({...api, jikan: e.target.checked})} className="accent-orange-500" />
          </label>
          <label className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
            <span>AniList API</span>
            <input type="checkbox" checked={api.anilist} onChange={e => setApi({...api, anilist: e.target.checked})} className="accent-orange-500" />
          </label>
          <input value={api.customUrl} onChange={e => setApi({...api, customUrl: e.target.value})} placeholder="Custom API URL (optional)"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5" />
          <button onClick={saveApi} className="bg-orange-600 px-5 py-2.5 rounded-lg flex items-center gap-2">
            <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      )}

      {tab === 'list' && (
        <div className="space-y-3">
          {list.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-[#141414] rounded-xl">No anime added yet</div>
          ) : list.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-[#141414] rounded-xl p-3">
              {item.poster ? <img src={item.poster} className="w-12 h-16 object-cover rounded" /> : <div className="w-12 h-16 bg-white/5 rounded" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.language} • {item.episodes} eps</p>
              </div>
              <button onClick={() => saveList(list.filter(x => x.id !== item.id))} className="text-red-400 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

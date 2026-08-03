import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Play } from 'lucide-react'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
              <Play className="w-4 h-4 fill-white text-white" />
            </div>
            <span>Anime<span className="text-orange-500">Stream</span></span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-orange-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-5 text-sm">
            <Link to="/" className="hover:text-orange-500 transition">Home</Link>
            <Link to="/search" className="hover:text-orange-500 transition">Browse</Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg py-2 px-3 text-sm"
              />
              <button type="submit" className="bg-orange-600 px-3 rounded-lg">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <Link to="/" onClick={() => setOpen(false)} className="block py-2">Home</Link>
            <Link to="/search" onClick={() => setOpen(false)} className="block py-2">Browse</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

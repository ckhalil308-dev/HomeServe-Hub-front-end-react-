import React from 'react'
import { Search } from 'lucide-react'

function Searchbar({search, handleSearch}) {
  return (
    <div className="mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition" size={20} />
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
  )
}

export default Searchbar
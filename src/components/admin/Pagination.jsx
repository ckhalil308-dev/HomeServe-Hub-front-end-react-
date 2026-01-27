import { i } from 'motion/react-client'
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
function Pagination({currentPage, totalPages, setPage}) {
  return (
      <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalPages}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => currentPage > 1 && setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition duration-200"
            >
              <ChevronLeft size={18} />
              Precedent
            </button>
            <button
              onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition duration-200"
            >
              Suivant
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
  )
}

export default Pagination
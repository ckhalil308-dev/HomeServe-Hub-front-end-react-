import React, { useState, useEffect } from 'react';

function FilterBar({ 
  categories, 
  selectedCategory, 
  handleCategoryChange, 
  minPrice, 
  maxPrice, 
  handleMinPriceChange, 
  handleMaxPriceChange, 
  handleResetFilters 
}) {
  
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleMinPriceChange({ target: { value: localMin } });
    }, 400);
    return () => clearTimeout(handler);
  }, [localMin]);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleMaxPriceChange({ target: { value: localMax } });
    }, 400);
    return () => clearTimeout(handler);
  }, [localMax]);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  return (
    <aside className="w-72 flex-shrink-0">
      <div className="bg-white sticky top-20 rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-base text-gray-900">Filtres</h2>
          <button 
            onClick={handleResetFilters}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Réinitialiser
          </button>
        </div>

        {/* Catégories - Liste propre */}
        <div className="mb-7">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Catégorie
          </label>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <label key={category} className="relative flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={handleCategoryChange}
                  className="peer hidden"
                />
                <div className="w-full py-2.5 px-3.5 rounded-md border border-gray-200 text-gray-600 text-sm font-normal transition-all duration-200 peer-checked:bg-blue-50 peer-checked:border-blue-300 peer-checked:text-blue-700 hover:border-gray-300 group-hover:bg-gray-50">
                  <span>{category}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Budget - Sliders Professionnels */}
        <div className="border-t border-gray-200 pt-7">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-5">
            Budget (dt)
          </label>

          <div className="mb-5">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xs text-gray-600">
                Min: <span className="font-semibold text-gray-900">{localMin} dt</span>
              </div>
              <div className="text-xs text-gray-600">
                Max: <span className="font-semibold text-gray-900">{localMax} dt</span>
              </div>
            </div>
            
            <div className="space-y-3">
               <input
                type="range"
                min="0"
                max="500"
                value={localMin}
                onChange={(e) => setLocalMin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-sky-300"
              />
              <input
                type="range"
                min="0"
                max="500"
                value={localMax}
                onChange={(e) => setLocalMax(Number(e.target.value))}
                className="w-full h-2 bg rounded-full appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="text-center py-2.5 color rounded-md text-m font-semibold text-gray-700 border border-gray-200">
            {localMin} - {localMax} dt
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FilterBar;
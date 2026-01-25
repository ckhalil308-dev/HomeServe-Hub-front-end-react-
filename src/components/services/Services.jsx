import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllServices } from '../../../api/services.api'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Loading from './loading'
import { ServiceCard } from './ServiceCard'

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialized = useRef(false)

  // State
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice')|| 0)
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice')||500)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category')||'')  
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = ['tous', 'Plomberie', 'Électricité', 'Peinture', 'Climatisation', 'Réparation','Bricolage']
  useEffect(() => {
    setSearchParams({
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      category: selectedCategory,
    })
    fetchServices()
  }, [minPrice, maxPrice, selectedCategory])


  
  const fetchServices = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
        category: selectedCategory,
      })

      const response = await getAllServices(params)
      console.log('Services récupérés:', response)
      setServices(response)
    } catch (error) {
      console.error('Erreur lors du chargement des services:', error)
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value))
  }

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value))
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleResetFilters = () => {
    setMinPrice(0)
    setMaxPrice(500)
    setSelectedCategory('')
  }

  return (
    <div className=  "  animate min-h-screen bg-gray-50">
      {/* Header */}
   
      <div className="     max-w-7xl mx-auto px-4 py-8">
          <Link to="/" className="absolute top-7 left-6 text-white font-bold text-3xl hover:underline"><ArrowLeft /> </Link>
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className= "   w-72 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 w-[17%] fixed top-20">
              <h2 className="font-bold text-lg mb-6 text-gray-900">Filtres</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Catégorie
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={handleCategoryChange}
                        className="w-4 h-4 text-teal-600 accent-teal-600"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Budget</h3>

                {/* Min Price */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2">
                    Prix minimum: <span className="text-teal-600 font-bold">{minPrice}€</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                {/* Max Price */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2">
                    Prix maximum: <span className="text-teal-600 font-bold">{maxPrice}€</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                {/* Price Display */}
                <div className="text-center py-3 bg-teal-50 rounded-lg mb-4">
                  <span className="text-sm font-medium text-gray-900">
                    {minPrice}dt - {maxPrice}dt
                  </span>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                >
                  Réinitialiser filtres
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Services Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {services.length} service{services.length !== 1 ? 's' : ''} trouvé{services.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
                <Loading />
            ) : services.length > 0 ? (
              <div className=" animate  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Aucun service trouvé</p>
                <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
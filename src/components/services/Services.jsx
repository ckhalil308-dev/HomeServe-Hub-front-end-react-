import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllServices } from '../../../api/services.api'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, X } from 'lucide-react'
import Loading from './loading'
import { ServiceCard } from './ServiceCard'
import Pagination from '../admin/Pagination'
import FilterBar from './FilterBar'


export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  

  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || 0)
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || 500)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = ['Tous', 'Plomberie', 'Électricité', 'Peinture', 'CVC', 'Réparations générales', 'Sécurité']

  const fetchServices = async (currentSearch = search) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
        category: selectedCategory === 'tous' ? '' : selectedCategory,
        page: page.toString(),
        search: currentSearch
      })

      const response = await getAllServices(params)
      console.log('Services chargés:', response)

      setServices(response.services || [])
      setTotalPages(response.totalPages || 1)
    } catch (error) {
      console.error('Erreur lors du chargement des services:', error)
      setServices([])
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    setSearchParams({
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      category: selectedCategory,
      page: page.toString(),
      search: search
    })
    fetchServices()
  }, [minPrice, maxPrice, selectedCategory, page])


  useEffect(() => {
    
    if (search === "") {
        fetchServices("");
        return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchServices(search)
    }, 500) 

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  // Handlers
  const handleMinPriceChange = (e) => setMinPrice(Number(e.target.value))
  const handleMaxPriceChange = (e) => setMaxPrice(Number(e.target.value))
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setPage(1)
  }

  const handleResetFilters = () => {
    setMinPrice(0)
    setMaxPrice(500)
    setSelectedCategory('')
    setSearch('')
    setPage(1)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }


  return (
    <div className="animate min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-6 py-8">

        <div className="flex gap-10">
          <FilterBar
            minPrice={minPrice}
            maxPrice={maxPrice}
            selectedCategory={selectedCategory}
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}
            handleCategoryChange={handleCategoryChange}
            handleResetFilters={handleResetFilters}
            categories={categories}
          />

          <div className="flex-1 pr-4">
            <div className="mb-8 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tous les services</h1>
                <p className="text-gray-500 text-sm font-medium bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
                  {services.length} résultat{services.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Barre de Recherche */}
              <div className="relative group max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un service..."
                  value={search}
                  onChange={handleSearchChange}
                  className="block w-full pl-12 pr-10 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-lg outline-none"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(''); setPage(1); }}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : services.length > 0 ? (
              <>
                <div className="animate grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </div>
                <div className="mt-16 mb-16">
                  <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
                </div>
              </>
            ) : (
              <div className="text-center py-40 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-2xl font-light">Aucun service trouvé</p>
                <button onClick={handleResetFilters} className="text-teal-600 font-semibold mt-4 hover:underline">
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
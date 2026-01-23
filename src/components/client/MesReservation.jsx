import React, { useState, useEffect } from 'react'
import { getClientDemandes } from '../../../api/Demande.Api'
import { Calendar, DollarSign, AlertCircle, CheckCircle, XCircle, Loader2, User } from 'lucide-react'
import Reservation from './Reservation'

function MesReservation() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [demandes, setDemandes] = useState([])
  const [filtre, setFiltre] = useState('tous')
  const [states, setSteates] = useState({
    tous: 0,
    Enattente: 0,
    Approuve: 0,
    Rejete: 0
  })

  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await getClientDemandes(filtre)
        if (filtre === 'tous') {
          setSteates({
            tous: response.length,
            Enattente: response.filter(d => d.status === 'En attente').length,
            Approuve: response.filter(d => d.status === 'Approuve').length,
            Rejete: response.filter(d => d.status === 'Rejete').length
          })
        }
        setDemandes(response || [])
      } catch (error) {
        console.error("Error fetching demandes:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDemandes()
  }, [filtre])

  const counts = {
    tous: states.tous,
    'En attente': states.Enattente,
    'Approuve': states.Approuve,
    'Rejete': states.Rejete
  }

  const tabs = [
    { key: 'tous', label: 'Tous' },
    { key: 'En attente', label: 'En attente' },
    { key: 'Approuve', label: 'Approuvées' },
    { key: 'Rejete', label: 'Rejetées' }
  ]

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-800 font-medium">Une erreur s'est produite</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mes Réservations</h1>
          <p className="text-gray-600">Consultez l'historique et le suivi de vos réservations de services</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFiltre(tab.key)}
              className={`px-5 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                filtre === tab.key
                  ? 'color text-black font-semibold  shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {tab.label} <span className="ml-2 text-sm opacity-75">({counts[tab.key]})</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Chargement de vos réservations...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && demandes.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 font-medium">Aucune réservation trouvée</p>
            <p className="text-sm text-gray-500 mt-2">Vous n'avez pas encore de réservations avec ce statut.</p>
          </div>
        )}

        {/* Reservations List */}
        {!loading && demandes.length > 0 && (
          <div className="space-y-3 animate">
            {demandes.map((demande) => (
              <Reservation  key={demande._id} demande={demande}></Reservation>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MesReservation
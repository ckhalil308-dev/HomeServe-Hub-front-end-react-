import React, { useState } from 'react'
import { Calendar, DollarSign, AlertCircle, CheckCircle, XCircle, User,Star } from 'lucide-react'
import { updateDemandeStatus } from '../../../api/Demande.Api'
import { useNavigate } from 'react-router-dom'

function Reservation({ demande }) {
  const [reponse, setReponse] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    
    switch (status) {
      case 'En attente':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'Termine':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'Rejete':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'Offre envoyée':
        return <AlertCircle className="w-5 h-5 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-50 border-l-4 border-yellow-500'
      case 'Termine':
        return 'bg-green-50 border-l-4 border-green-500'
      case 'Rejete':
        return 'bg-red-50 border-l-4 border-red-500'
      case 'Offre envoyée':
        return 'bg-blue-50 border-l-4 border-blue-500'
      default:
        return 'bg-gray-50 border-l-4 border-gray-500'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800'
      case 'Termine':
        return 'bg-green-100 text-green-800'
      case 'Rejete':
        return 'bg-red-100 text-red-800'
      case 'Offre envoyée':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!reponse) {
      alert('Veuillez choisir une action')
      setLoading(false)
      return
    }
    try {
      await updateDemandeStatus(demande._id, { status: reponse })
      demande.status = reponse
      alert('Statut changé avec succès')
      setReponse('')
    } catch (error) {
      console.error('Erreur lors du changement de status:', error.response.data)
      alert('Erreur lors du changement de statut')
    } finally {
      setLoading(false)
    }
  }
  if (!demande.service) {
    return null; // or some fallback UI
  }

  return (
    <div
      className={`${getStatusColor(demande.status)}   animate rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 p-5`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Title and Status */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h2 className="text-xl font-bold text-gray-900">{demande.service.titre||'non Disponible'}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 ${getStatusBadge(
                demande.status
              )}`}
            >
              {getStatusIcon(demande.status)}
              {demande.status}
            </span>
          </div>

          {/* Professional Info */}
          <div className="flex items-center gap-2 mb-3 text-gray-700">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">
              {demande.service.professionnelId.prenom || 'Non Disponible'} {demande.service.professionnelId.nom || 'Non Disponible'}
            </span>
          </div>

          {/* Price - Show if offer sent */}
          {demande.status === 'Offre envoyée' && (
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Prix Proposé</p>
                <p className="text-lg font-bold text-gray-900">{demande.prix} DT</p>
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Date d'intervention</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(demande.dateIntervention).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Réservation ID</p>
              <p className="text-sm font-mono text-gray-700 bg-white bg-opacity-50 px-3 py-2 rounded">
                {demande._id}
              </p>
            </div>
          {demande.status === 'Termine' && (
  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
        <Star size={20} fill="currentColor" />
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-900">Mission terminée !</p>
        <p className="text-xs text-amber-700">Partagez votre expérience avec cet artisan.</p>
      </div>
    </div>
    
    <button
      onClick={() => navigate(`/ServiceDetails/${demande.service._id}`)}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 text-amber-700 text-sm font-bold rounded-lg hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 shadow-sm active:scale-95"
    >
      Laisser un avis
    </button>
  </div>
)}

            {/* Action Section */}
            {demande.status === 'Offre envoyée' && (
              <div className="bg-blue-500 rounded-lg p-3 border border-blue-400">
                <div className="flex gap-2 items-center">
                  <select
                    value={reponse}
                    onChange={(e) => setReponse(e.target.value)}
                    className="flex-1 px-3 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm font-medium bg-white text-gray-800 shadow-md"
                  >
                    <option value="">Choisir une action</option>
                    <option value="Approuve">✓ Accepter</option>
                    <option value="Rejete">✕ Rejeter</option>
                  </select>

                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="rounded-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-blue-600 font-bold py-2 px-5 text-sm transition duration-200 shadow-md whitespace-nowrap"
                  >
                    {loading ? 'Envoi...' : 'Envoyer'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation
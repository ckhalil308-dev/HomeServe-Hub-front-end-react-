import React from 'react'
import { Calendar, DollarSign, AlertCircle, CheckCircle, XCircle, User } from 'lucide-react'

function Reservation({demande}) {
    
      const getStatusIcon = (status) => {
        switch (status) {
          case 'En attente': return <AlertCircle className="w-5 h-5 text-yellow-500" />
          case 'Approuve': return <CheckCircle className="w-5 h-5 text-green-500" />
          case 'Rejete': return <XCircle className="w-5 h-5 text-red-500" />
          default: return null
        }
      }
    
      const getStatusColor = (status) => {
        switch (status) {
          case 'En attente': return 'bg-yellow-50 border-l-4 border-yellow-500'
          case 'Approuve': return 'bg-green-50 border-l-4 border-green-500'
          case 'Rejete': return 'bg-red-50 border-l-4 border-red-500'
          default: return 'bg-gray-50 border-l-4 border-gray-500'
        }
      }
    
      const getStatusBadge = (status) => {
        switch (status) {
          case 'En attente': return 'bg-yellow-100 text-yellow-800'
          case 'Approuve': return 'bg-green-100 text-green-800'
          case 'Rejete': return 'bg-red-100 text-red-800'
          default: return 'bg-gray-100 text-gray-800'
        }
      }
    
  return (
    <div
                key={demande._id}
                className={`${getStatusColor(demande.status)} rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 p-5`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Title and Status */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h2 className="text-xl font-bold text-gray-900">{demande.service.titre}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 ${getStatusBadge(demande.status)}`}>
                        {getStatusIcon(demande.status)}
                        {demande.status}
                      </span>
                    </div>

                    {/* Professional Info */}
                    <div className="flex items-center gap-2 mb-3 text-gray-700">
                      <User className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">{demande.service.professionnelId.prenom} {demande.service.professionnelId.nom}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4">{demande.description}</p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Prix</p>
                          <p className="text-lg font-bold text-gray-900">{demande.prix} DT</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Date d'intervention</p>
                          <p className="text-lg font-bold text-gray-900">{new Date(demande.dateIntervention).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">Réservation ID</p>
                        <p className="text-sm font-mono text-gray-700 bg-white bg-opacity-50 px-3 py-2 rounded">{demande._id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default Reservation
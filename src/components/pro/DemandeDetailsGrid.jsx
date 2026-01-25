import React from 'react'
import { MapPin, Clock } from 'lucide-react';

function DemandeDetailsGrid({ demande, formattedDate }) {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Localisation</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">{demande.adresse || 'Non spécifiée'}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Date de l'intervention</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">{formattedDate || 'Non spécifiée'}</p>
              </div>

              {demande.status == 'Approuve' && (
                <>
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide block mb-3">Prix de l'intervention</span>
                    <p className="text-gray-900 font-bold text-3xl text-emerald-600">{demande.prix || 'Non spécifié'} DT</p>
                  </div>

                  <div className=" bg-emerald-50 border-emerald-200   rounded-xl p-6">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-3">Numero du Telephone client</span>
                    <p className="text-gray-900 font-bold text-3xl">{demande.numeroTelephone || 'Non spécifié'}</p>
                  </div>
                </>
              )}
            </div>
  )
}

export default DemandeDetailsGrid
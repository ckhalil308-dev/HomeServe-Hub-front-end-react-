import React from 'react'
import { User } from 'lucide-react';

function ProSection({service}) {
  return (
    <div className="mt-16 mb-16 animate">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Prestataire</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl"> <User></User> </span>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Nom du prestataire</p>
                    <h3 className="text-xl font-bold text-slate-900">
                      {service.professionnelId.nom} {service.professionnelId.prenom}
                    </h3>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Contact</p>
                    <a href={`mailto:${service.professionnelId.email}`} className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors">
                      {service.professionnelId.email}
                    </a>
                  </div>
                </div>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap">
                  Contacter
                </button>
              </div>
            </div>
          </div>
  )
}

export default ProSection
import React from 'react'
import { MapPin, Clock, Phone, Banknote } from 'lucide-react';

function DemandeDetailsGrid({ demande, formattedDate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><MapPin size={18} /></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Localisation</span>
        </div>
        <p className="text-gray-900 font-bold text-lg">{demande.adresse || 'Non spécifiée'}</p>
      </div>

      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Clock size={18} /></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Intervention</span>
        </div>
        <p className="text-gray-900 font-bold text-lg">{formattedDate || 'Non spécifiée'}</p>
      </div>

      {demande.status === 'Approuve' && (
        <>
          <div className="bg-emerald-50/50 border-2 border-emerald-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><Banknote size={18} /></div>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Budget Final</span>
            </div>
            <p className="text-4xl font-black text-emerald-600 tracking-tighter">{demande.prix || '0'} <span className="text-sm">DT</span></p>
          </div>

          <div className="bg-blue-50/50 border-2 border-blue-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Phone size={18} /></div>
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Contact Client</span>
            </div>
            <p className="text-4xl font-black text-blue-700 tracking-tighter">{demande.numeroTelephone || '—'}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default DemandeDetailsGrid;
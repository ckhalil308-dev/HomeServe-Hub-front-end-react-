import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexte/context';

export default function ServiceInfo({ service, setCommander }) {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="animate space-y-8 max-w-2xl">
      {/* Title & Category Header */}
      <div className="border-b border-slate-100 pb-6">
        <span className="text-teal-600 font-semibold text-sm tracking-wider uppercase">
          {service.category}
        </span>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
          {service.titre}
        </h1>
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Prix de départ</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">{service.prix}</span>
            <span className="text-xl font-bold text-slate-400">DT</span>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-400 italic">Sous réserve de modification</p>
          <p className="text-xs text-slate-400 italic">selon vos options</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">À propos du service</h3>
        <div className="text-slate-600 leading-relaxed text-lg text-left">
          {service.description.split('\n').map((line, idx) => (
            <p key={idx} className="mb-2">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6">
        {user && user.role === 'professionnel' ? (
          <button 
            onClick={() => navigate("/services")} 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-slate-200"
          >
            Retour aux services
          </button>
        ) : (
          <button 
            onClick={() => user ? setCommander(true) : navigate("/login")} 
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl shadow-teal-100 hover:scale-[1.02]"
          >
            Commander ce service
          </button>
        )}
      </div>
    </div>
  )
}
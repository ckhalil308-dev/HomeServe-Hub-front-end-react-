import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle, XCircle, Check, MapPin, Tag } from 'lucide-react';
import { updateDemandeStatus } from '../../../api/Demande.Api';

export default function Demande({ demande, updateStatus }) {
  const navigate = useNavigate();
  const firstLetter = demande.client.nom?.charAt(0).toUpperCase() || 'U';
  const finalStatus = demande.status || 'En attente';

  const getStatusConfig = () => {
    switch (finalStatus) {
      case 'Termine':
        return { 
          color: 'text-emerald-600', 
          bg: 'bg-emerald-50', 
          border: 'border-emerald-100', 
          icon: CheckCircle, 
          accent: 'bg-emerald-500' 
        };
      case 'Approuve':
        return { 
          color: 'text-blue-600', 
          bg: 'bg-blue-50', 
          border: 'border-blue-100', 
          icon: CheckCircle, 
          accent: 'bg-blue-500' 
        };
      case 'Rejete':
        return { 
          color: 'text-rose-600', 
          bg: 'bg-rose-50', 
          border: 'border-rose-100', 
          icon: XCircle, 
          accent: 'bg-rose-500' 
        };
      case 'Offre envoyée':
        return { 
          color: 'text-purple-600', 
          bg: 'bg-purple-50', 
          border: 'border-purple-100', 
          icon: Clock, 
          accent: 'bg-purple-500' 
        };
      default:
        return { 
          color: 'text-amber-600', 
          bg: 'bg-amber-50', 
          border: 'border-amber-100', 
          icon: Clock, 
          accent: 'bg-amber-500' 
        };
    }
  };

  const marqueTermine = async () => {
    try {
      await updateDemandeStatus(demande._id, { status: 'Termine' });
      updateStatus(demande._id, 'Termine');
    } catch (error) {
      console.error('Erreur:', error.response?.data);
      alert('Erreur lors de la mise à jour');
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="animate relative group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Barre d'accentuation latérale selon le statut */}
      <div className={`absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r-full ${config.accent}`} />

      <div className="flex flex-wrap items-center gap-6">
        
        {/* User Profile Section */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-gray-200">
            {firstLetter}
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">
              {demande.client.nom} {demande.client.prenom}
            </h4>
            <div className="flex items-center gap-1 text-gray-400 mt-1">
               <Tag size={12} />
               <span className="text-[11px] font-medium truncate max-w-[120px]">ID: {demande._id.slice(-6)}</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
          
          {/* Service */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service</span>
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {demande.service.titre}
            </p>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prix de Depart</span>
            <p className="text-sm font-black text-gray-900">
              {demande.prix} <span className="text-blue-600 text-xs">DT</span>
            </p>
          </div>

          {/* Status Badge */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">État actuel</span>
            <div className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-lg border ${config.bg} ${config.border} ${config.color}`}>
              <StatusIcon size={14} className="animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-tighter">
                {finalStatus}
              </span>
            </div>
          </div>

        </div>

        {/* Buttons Section */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => navigate(`/pro/demande-details/${demande._id}`)}
            className="h-10 px-5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 hover:text-gray-900 transition-all flex items-center gap-2"
          >
            Détails
            <ChevronRight size={16} />
          </button>
          
          {finalStatus === 'Approuve' && (
            <button
              onClick={marqueTermine}
              className="h-10 px-5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center gap-2"
            >
              Terminer
              <Check size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
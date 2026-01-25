import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle, XCircle, Check } from 'lucide-react';
import { updateDemandeStatus } from '../../../api/Demande.Api';

export default function Demande({ demande, updateStatus }) {
  const navigate = useNavigate();
  const firstLetter = demande.client.nom?.charAt(0).toUpperCase() || 'U';
  const finalStatus = demande.status || 'En attente';

  const getStatusStyles = () => {
    switch (finalStatus) {
    case 'Termine':
        return { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100', icon: CheckCircle };
      case 'Approuve':
        return { bg: 'bg-green-50', text: 'text-grey-700', badge: 'bg-grey-100', icon: CheckCircle };
      case 'Rejete':
        return { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100', icon: XCircle };
      default:
        return { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100', icon: Clock };
    }
  };
  const marqueTermine=async()=>{
    try{
        await updateDemandeStatus(demande._id,{status:'Termine'});
        demande.status='Termine';
        updateStatus(demande._id, 'Termine');
    }
    catch(error){
        console.error('Erreur lors de la mise à jour du statut:', error.response.data);
        alert('Erreur lors de la mise à jour du statut');
    }
  };
  const statusStyle = getStatusStyles();
  const StatusIcon = statusStyle.icon;

  return (
    <div className= "    flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md hover:border-gray-300 transition-all">
      {/* Avatar */}
      <div className="h-12 w-12 flex-shrink-0 rounded-full color2 flex items-center justify-center text-white font-semibold text-base">
        {firstLetter}
      </div>

      {/* Client Info */}
      <div className="flex-1 min-w-[140px]">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Client</p>
        <p className="text-sm font-semibold text-gray-900">{demande.client.nom} {demande.client.prenom}</p>
      </div>

      {/* Service Info */}
      <div className="flex-1 min-w-[140px]">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Service</p>
        <p className="text-sm text-gray-700">{demande.service.titre}</p>
      </div>

      {/* Price */}
      <div className="flex-1 min-w-[100px]">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prix</p>
        <p className="text-sm font-semibold text-gray-900">{demande.prix} dt</p>
      </div>

      {/* Status */}
      <div className="flex-1 min-w-[120px]">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Statut</p>
        <div className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full ${statusStyle.badge}`}>
          <StatusIcon size={14} className={statusStyle.text} />
          <span className={`text-xs font-semibold capitalize ${statusStyle.text}`}>
            {finalStatus}
          </span>
        </div>
      </div>

      {/* Action Button */}
      
        <button
          onClick={() => navigate(`/pro/demande-details/${demande._id}`)}
          className="flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Détails
          <ChevronRight size={16} />
        </button>
     
        {finalStatus === 'Approuve' && (
        <button
          onClick={() => marqueTermine()}
          className="flex-shrink-0 flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Marquer comme terminé
          <Check size={16} />
        </button>
      )}
    </div>
  );
}
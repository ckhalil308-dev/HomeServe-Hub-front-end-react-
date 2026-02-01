import React, { useState, useEffect, useMemo } from 'react';
import { getClientDemandes } from '../../../api/Demande.Api';
import { Calendar, AlertCircle, Loader2, ClipboardList, Inbox } from 'lucide-react';
import Pagination from '../admin/Pagination';
import Reservation from './Reservation';

function MesReservation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [filtre, setFiltre] = useState('tous');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    tous: 0,
    Enattente: 0,
    Termine: 0,
    Rejete: 0,
    Offreenvoyee: 0
  });

 
  useEffect(() => {
    setPage(1);
  }, [filtre]);

  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getClientDemandes(filtre, page);
        
        setStats({
          tous: response.touslesDemandesCount,
          Enattente: response.demandesEnAttenteCount,
          Termine: response.demandesTermineesCount,
          Rejete: response.demandesRejeteCount,
          Offreenvoyee: response.demandesOffreEnvoyeeCount
        });

        const limit = 5;
       
        const countMap = {
          'tous': response.touslesDemandesCount,
          'En attente': response.demandesEnAttenteCount,
          'Termine': response.demandesTermineesCount,
          'Rejete': response.demandesRejeteCount,
          'Offre envoyée': response.demandesOffreEnvoyeeCount
        };
        
        setTotalPages(Math.ceil((countMap[filtre] || 0) / limit) || 1);
        setDemandes(response.demandes);
      } catch (err) {
        setError(err.message || "Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [filtre, page]);

  const tabs = [
    { key: 'tous', label: 'Toutes', count: stats.tous },
    { key: 'Offre envoyée', label: 'Offres reçues', count: stats.Offreenvoyee },
    { key: 'En attente', label: 'En attente', count: stats.Enattente },
    { key: 'Termine', label: 'Terminées', count: stats.Termine },
    { key: 'Rejete', label: 'Rejetées', count: stats.Rejete },
  ];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-md shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-900 font-bold text-lg">Erreur de chargement</h3>
          <p className="text-red-700 text-sm mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ClipboardList className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mes Réservations</h1>
          </div>
          <p className="text-slate-500 text-lg">Gérez vos demandes et suivez l'avancement de vos services.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFiltre(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap
                ${filtre === tab.key
                  ? 'bg-slate-900 text-white shadow-md transform scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filtre === tab.key ? 'bg-slate-700 text-slate-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-24 animate-in fade-in duration-500">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4 opacity-80" />
              <p className="text-slate-500 font-medium italic">Récupération de vos dossiers...</p>
            </div>
          ) : demandes.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm p-16 text-center border border-slate-100 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Inbox className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Rien à afficher</h3>
              <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                Il n'y a actuellement aucune réservation dans la catégorie "{tabs.find(t => t.key === filtre)?.label}".
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {demandes.map((demande) => (
                <Reservation key={demande._id} demande={demande} />
              ))}
              
              <div className="mt-10 pb-10">
                <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MesReservation;
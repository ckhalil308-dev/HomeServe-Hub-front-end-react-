import React, { useState, useEffect } from 'react';
import HeaderTabAdmin from './HeaderTabAdmin';
import { getAllDemandes } from '../../../api/Demande.Api';
import AdminDemandeUsers from './AdminDemandeTable';
import Pagination from './Pagination';
import { ChevronDown } from 'lucide-react';

function ListeDemandes() {
  const [loading, setLoading] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const tabHeaders = ["Nom", "Prénom", "Titre Service", "Catégorie", "Statut"];

  const statusOptions = [
    { value: 'Tous', label: 'Tous les statuts' },
    { value: 'En attente', label: 'En attente' },
    { value: 'Approuve', label: 'Approuvé' },
    { value: 'Rejete', label: 'Rejeté' },
    { value: 'Termine', label: 'Terminé' },
    { value: 'Offre envoyée', label: 'Offre envoyée' },
  ];

  const statusColorMap = {
    'En attente': 'bg-yellow-50 border-yellow-200',
    'Approuve': 'bg-green-50 border-green-200',
    'Rejete': 'bg-red-50 border-red-200',
    'Termine': 'bg-blue-50 border-blue-200',
    'Offre envoyée': 'bg-purple-50 border-purple-200',
  };

  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true);
      try {
        const filterParam = statusFilter && statusFilter !== 'Tous' ? statusFilter : '';
        const response = await getAllDemandes(filterParam, page);
        setDemandes(response.demandes);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Error fetching demandes:", error);
        setDemandes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [page, statusFilter]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <HeaderTabAdmin role="demandes" description="Liste des demandes" />

      {/* Filter Section */}
      <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <label htmlFor="status-filter" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Filtrer par statut:
          </label>
          <div className="relative w-64">
            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full px-4 py-2.5 appearance-none bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {statusFilter && (
            <button
              onClick={() => {
                setStatusFilter('Tous');
                setPage(1);
              }}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <AdminDemandeUsers
          Demandes={demandes}
          loading={loading}
          tabHeaders={tabHeaders}
          statusColorMap={statusColorMap}
        />
      </div>

      {/* Pagination Section */}
      <div className="mt-8">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default ListeDemandes;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteService, getServicesByProfessionalId } from '../../../api/services.api';
import { Trash2, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

function ProDetails() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getServicesByProfessionalId(id);
        setServices(res);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setError('Impossible de charger les services. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [id]);

  const handleDeleteService = async (serviceId) => {
    try {
      setDeletingId(serviceId);
      await deleteService(serviceId);
      setServices(services.filter(service => service._id !== serviceId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete service:', error);
      setError('Erreur lors de la suppression du service.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Services</h1>
        <p className="text-sm text-gray-500">ID du professionnel: <span className="font-mono text-gray-700">{id}</span></p>
      </div>

      {/* Count */}
      {!error && (
        <div className="mb-6 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{services.length}</span> service{services.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Services List */}
      {services.length > 0 ? (
        <div className="space-y-3">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700">
            <div className="col-span-2">Image</div>
            <div className="col-span-3">Titre</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-1">Prix</div>
            <div className="col-span-3 text-center">Action</div>
          </div>

          {/* Data Rows */}
          {services.map((service) => (
            <div
              key={service._id}
              className="grid grid-cols-12 gap-4 px-6 py-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 items-center"
            >
              {/* Image */}
              <div className="col-span-2 flex justify-center">
                {service.imagesUrls?.[0] ? (
                  <img
                    src={`${API_URL}/${service.imagesUrls[0]}`}
                    alt={service.titre}
                    className="w-24 h-24 object-cover rounded-lg bg-gray-100 shadow-sm"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                )}
              </div>

              {/* Title */}
              <div className="col-span-3">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-3">
                  {service.titre}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-3">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Price */}
              <div className="col-span-1">
                <span className="text-base font-bold text-gray-900">{service.prix} DT</span>
              </div>

              {/* Delete Button */}
              <div className="col-span-3 flex justify-center">
                <button
                  onClick={() => setDeleteConfirm(service._id)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors duration-150"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-gray-900 font-semibold mb-1">Aucun service trouvé</h3>
          <p className="text-sm text-gray-500">Aucun service n'a été ajouté pour le moment.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-xs w-full shadow-lg">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Supprimer?</h3>
            <p className="text-xs text-gray-600 mb-4">Cette action est irréversible.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-150"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteService(deleteConfirm)}
                disabled={deletingId === deleteConfirm}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors duration-150 flex items-center justify-center gap-1"
              >
                {deletingId === deleteConfirm ? (
                  <>
                    <Loader className="w-3 h-3 animate-spin" />
                    Suppr...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3 h-3" />
                    Supprimer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProDetails;
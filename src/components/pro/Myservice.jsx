import React, { useState } from 'react';
import { Trash2, Edit2, ChevronRight } from 'lucide-react';
import { deleteService } from '../../../api/services.api';
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function ServiceCard({ service, onEdit,services, deleteServiceFromList }) {
    const navigate=useNavigate();
    const[loading,setLoading]=useState(false);
    const[modifiable,setModifiable]=useState(false);
   const onDelete = async (serviceId) => {
    setLoading(true);
    if (!window.confirm("Are you sure you want to delete this service?")) {
      setLoading(false);
      return;
    }
    try {
      await deleteService(serviceId);
      deleteServiceFromList(serviceId);
     console.log("Service deleted successfully");
    } catch (error) {
      console.error("Failed to delete service:", error.data);
    } finally {
      setLoading(false);
    }
   }
  const imageUrl = service.imagesUrls?.[0] 
    ? `${API_URL}/${service.imagesUrls[0]}` 
    : 'service-placeholder.png';

  return (
    loading ? (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">Loading...</div>
      </div>
    ) : (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex items-stretch">
        {/* Image Section */}
        <div className="relative w-40 h-40 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={service.titre} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {service.titre}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {service.description || 'No description provided'}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Prix</span>
              <span className="text-1xl font-bold text-black">
                {service.prix?.toFixed(2) || '0.00'} DT
              </span>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col gap-3 p-4 justify-center bg-gray-50/50 group-hover:bg-gray-100/50 transition-colors">
          <button 
            onClick={() => navigate(`/pro/edit-service/${service._id}`)}
            className="flex items-center justify-center gap-2 color2 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm group/btn"
          >
            <Edit2 size={18} className="group-hover/btn:scale-110 transition-transform" />
            <span  className="hidden lg:inline" >Modifier</span>
          </button>
          <button 
            onClick={() => onDelete(service._id)}
            className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm group/btn border border-red-200 hover:border-red-600"
          >
            <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
            <span className="hidden lg:inline">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
    )
  );
}

export default ServiceCard;
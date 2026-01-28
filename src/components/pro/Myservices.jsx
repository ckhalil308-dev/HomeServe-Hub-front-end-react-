import React from 'react'
import { getServicesByProfessional } from '../../../api/services.api'

import { useState,useEffect } from 'react'
import { set } from 'lodash';
import Myservice from './Myservice';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexte/context';
import { p } from 'motion/react-client';

function Myservices() {
  const [services, setServices]=useState([]);
  const [loadingServices, setLoadingServices]=useState(true);
    const { user, setUser, loading } = useUser();

  const fetchServices=async()=>{
    setLoadingServices(true);
    try {
      const services=await getServicesByProfessional();
      console.log(services);
      setServices(services);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
    finally{
      setLoadingServices(false);
    }
    
  }
  useEffect(()=>{
    fetchServices();  
  },[]);
if (!user.isVerified) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white rounded-2xl border border-dashed border-gray-200 ">
      {/* Icône animée ou stylisée */}
      <div className="w-20 h-20  rounded-full flex items-center justify-center mb-6 animate-pulse">
        <svg 
          className="w-10 h-10 text-amber-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Texte */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Vérification en cours
      </h2>
      <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
        Votre profil professionnel est actuellement en cours d'examen par notre équipe. 
        <span className="block mt-2 font-medium text-amber-600">
          Dès que l'administrateur aura validé votre compte, vous pourrez publier vos services ici.
        </span>
      </p>

      
    </div>
  );
} 
        

  return (
    <div className="min-h-screen  from-gray-50 via-white to-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Mes services </h1>
          <p className="text-gray-600 text-sm">Gérez vos services publiés</p>
        </div>
        
        <Link to="/pro/add-service">
          <button className="flex items-center gap-2 color2 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg">
            <Plus size={22} strokeWidth={2.5} />
            Créer un service
          </button>
        </Link>
      </div>

      {/* Content */}
      { loadingServices ? (
        <div className="flex items-center justify-center py-16 animate">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading your services...</p>
          </div>
        </div>
      ) :
        services.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <Plus size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg font-medium mb-2">Pas encore de services</p>
          <p className="text-gray-500 mb-6">Créez votre premier service pour commencer</p>
          <Link to="/pro/add-service">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
              Créer un service
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4 max-w-6xl">
          {services.map((service) => (
            <Myservice key={service._id} services={services} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Myservices
  'use client';
  import React from 'react';
  import { Link, useNavigate , } from 'react-router-dom';

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  import { Star, MapPin, Phone, Eye } from 'lucide-react';
  // import { Button } from '@/components/ui/button';

  export function ServiceCard(  { service, } ) {
    const navigate =useNavigate();
    const firstImage =   `${API_URL}/${service.imagesUrls?.[0]}`;
    const professionalName = `${service.professionnelId.prenom} ${service.professionnelId.nom || ''}`.trim();

    return (
      <div
      
        className="group overflow-hidden rounded-2xl bg-white border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-56 w-full overflow-hidden  border border-blue-100">
          <img
            src={firstImage || "/placeholder.svg"}
            alt={service.titre}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full color2 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            {service.category}
          </div>

          {/* Rating Badge */}
          {/* <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span>{props.rating}</span>
            <span className="text-gray-500">({props.reviewCount})</span>
          </div> */}
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-3 p-4">
          {/* Service Title */}
          <div>
            <h3 className="font-semibold text-base text-gray-900 line-clamp-2 leading-tight">
              {service.titre}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-full color2 from-blue-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
              {professionalName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col gap-0">
              <p className="font-medium text-gray-900 text-xs">{professionalName}</p>
              <p className="text-gray-500 text-xs">Professionnel</p>
            </div>
          </div>
          <div className="h-px color2"></div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500">À partir de</p>
              <p className="text-xl font-bold text-black">
                {service.prix}
                <span className="text-sm font-semibold ml-1">DT</span>
              </p>
            </div>
            
         {/*  */}

            
              <button className='flex gap-3 cursor-pointer h-9 px-4 flex items-center text-sm font-semibold rounded-lg color2 hover:bg-blue-700 hover:scale-[1.01] transition-all duration-300 ease-in text-white d-flex ' onClick={() => navigate(`/ServiceDetails/${service._id}`)}> Consulter   <Eye></Eye></button>
            
          </div>
        </div>
      </div>
    );
  }

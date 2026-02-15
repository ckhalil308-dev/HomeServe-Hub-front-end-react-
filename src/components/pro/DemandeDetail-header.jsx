import React from 'react'
const API_URL = import.meta.env.VITE_API_URL;

function DemandeDetailHeader({ demande }) {
  if (!demande.service?.imagesUrls?.[0]) return null;

  return (
    <div className="relative w-full h-72 overflow-hidden bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
      <img
        src={`${API_URL}/${demande.service.imagesUrls[0]}`}
        alt="Service"
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
}

export default DemandeDetailHeader;
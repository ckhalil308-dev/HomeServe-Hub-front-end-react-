import React from 'react'

function DemandeDetailHeader({ demande }) {
  return (
    <>
      {demande.service?.imagesUrls?.[0] && (
            <div className="w-full h-64 overflow-hidden bg-gray-100">
              <img
                src={demande.service.imagesUrls[0]}
                alt="Service"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          </>
  )
}

export default DemandeDetailHeader
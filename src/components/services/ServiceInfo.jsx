import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexte/context';

export default function ServiceInfo({service,setCommander}) {
  
  const navigate=useNavigate();
  const {user}=useUser();
  return (
      <div className="animate space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                {service.titre}
              </h1>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
              <p className="text-slate-600 text-sm font-medium mb-2">À partir de</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-teal-600">
                  {service.prix}
                </span>
                <span className="text-lg text-slate-600">DT</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Prix final peut varier selon les options</p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Catégorie</p>
              <span className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
                {service.category}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Description</p>
             <p className="text-slate-600 leading-relaxed text-base text-left">
     {service.description.split('\n').map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ))}
</p>
</div>

            {/* Action Buttons */}
            {user&& user.role === 'professionnel' &&(
               <div className="grid grid-cols-1 sm:grid-cols gap-4 pt-4">

              <button onClick={() => navigate("/services")} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in shadow-md hover:shadow-lg hover:scale-102">
               retour aux services
              </button>
             
            </div>
            )}
             {!user  && (
               <div className="grid grid-cols-1 sm:grid-cols gap-4 pt-4">

              <button onClick={() =>  navigate("/login")   } className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in shadow-md hover:shadow-lg hover:scale-102">
                  commander
              </button>
             
            </div>
             )}
              {user && user.role=="client"  && (
               <div className="grid grid-cols-1 sm:grid-cols gap-4 pt-4">

              <button onClick={() => setCommander(true)} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in shadow-md hover:shadow-lg hover:scale-102">
                  commander
              </button>
             
            </div>
             )}

             
          


           

          </div>
  )
}

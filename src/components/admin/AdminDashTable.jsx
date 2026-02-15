import React from 'react'

function AdminDashTable({ tab2, title }) {
  // Configuration précise des couleurs par statut
const getStatusTheme = (status) => {
    switch (status) {
      case 'Approuve':
        return { text: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' };
      case 'En attente':
        return { text: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-500' };
      case 'Offre envoyée':
        return { text: 'text-indigo-600', bg: 'bg-indigo-50', dot: 'bg-indigo-500' };
      case 'Rejete':
        return { text: 'text-rose-600', bg: 'bg-rose-50', dot: 'bg-rose-500' };
      case 'Termine':
        return { text: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' };
      default:
        return { text: 'text-gray-600', bg: 'bg-gray-50', dot: 'bg-gray-400' };
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Titre Stylisé */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-3">
          {title}
        </h3>
      </div>

      <div className="space-y-4">
        {tab2.map((item, index) => {
          const theme = getStatusTheme(item?.status);
          const serviceName = item?.service?.titre || item?.service?.category || item.specialite || "Service général";

          return (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {/* Avatar avec initiale */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-50 to-slate-100 border border-gray-200 flex items-center justify-center text-slate-700 font-bold shadow-sm">
                  {(item?.client?.nom?.[0] || item.nom?.[0] || "?").toUpperCase()}
                </div>

                <div>
                  {/* Nom du Client */}
                  <p className="text-sm font-bold text-gray-900">
                    {item?.client?.nom || item.nom} {item?.client?.prenom || item.prenom}
                  </p>
                  {/* Service Concerné */}
                  <p className="text-xs font-medium text-blue-600 mt-0.5">
                    {serviceName}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${theme.bg} border border-transparent transition-colors`}>
                <span className={`w-2 h-2 rounded-full ${theme.dot} animate-pulse`} />
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>
                  {item?.status || "En cours"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminDashTable
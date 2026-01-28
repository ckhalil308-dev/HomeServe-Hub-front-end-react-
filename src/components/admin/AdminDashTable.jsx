import React from 'react'

function AdminDashTable({headerTab, tab2, title}) {
  return (
    <div className="w-full mt-6">
      {/* Titre minimaliste sans boîte */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 px-1">
        {title}
      </h3>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              {headerTab.map((header, index) => (
                <th
                  key={index}
                  className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tab2.map((item, index) => (
              <tr 
                key={index} 
                className="group hover:bg-blue-50/40 transition-colors duration-150"
              >
                {/* Nom & Prénom - Plus grand et espacé */}
                <td className="py-3.5 px-4">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item?.client?.nom || item.nom || ""} {item?.client?.prenom || item.prenom || ""}
                  </div>
                </td>

                {/* Email - Style plus léger */}
                <td className="py-3.5 px-4 text-sm text-gray-500 font-light">
                  {item?.email || item?.adresse}
                </td>

                {/* Adresse / Spécialité */}
                <td className="py-3.5 px-4 text-sm text-gray-600 font-light">
                  {item?.adresse || item.specialite || "—"}
                </td>

                {/* Catégorie */}
                <td className="py-3.5 px-4">
                   <span className="text-xs font-medium bg-gray-150 px-2.5 py-1.5 rounded-md text-gray-700 uppercase tracking-tight">
                    {item?.service?.category || new Date(item?.createdAt).toLocaleDateString() || "—"}
                   </span>
                </td>

                {/* Statut - Juste du texte avec un indicateur discret */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-xs font-semibold ${
                      item?.status === "Terminé" ? "text-green-600" : 
                      item?.status === "En attente" ? "text-amber-600" : "text-red-600"
                    }`}>
                      {item?.status || "Non vérifié"}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item?.status === "Terminé" ? "bg-green-500" : 
                      item?.status === "En attente" ? "bg-amber-500" : "bg-red-500"
                    }`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashTable
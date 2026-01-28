import React from 'react'

function AdminDemandeUsers({ Demandes , loading , tabHeaders}) {
  return (
     <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                {tabHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-8 py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-8 py-12 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Demandes.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-8 py-12 text-center text-gray-500">
                    No demandes found
                  </td>
                </tr>
              ) : (
                Demandes.map((demande) => (
                  <tr
                    key={demande._id}
                    className="hover:bg-blue-50 transition duration-200 group cursor-pointer"
                  >
                    <td className="px-8 py-4 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">
                      {demande.client.nom}
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-700">{demande.client.prenom}</td>
                    <td className="px-8 py-4 text-sm text-gray-600 group-hover:text-gray-900 transition">
                      {demande.service.titre}
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-600 group-hover:text-gray-900 transition">
                       <p >{demande.service.category }</p> 

                    </td>

                    <td className="px-8 py-4 text-sm text-gray-600 group-hover:text-gray-900 transition">
                       <p >{demande.status }</p> 

                    </td>
                    {demande.role === 'professionnel' && (
                      <td className="px-8 py-4 text-sm text-gray-700">
                        {demande.specialite || 'N/A'}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
  )
}

export default AdminDemandeUsers
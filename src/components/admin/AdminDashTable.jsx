import React from 'react'

function AdminDashTable({headerTab,tab2}) {
  return (
    <>
     <p className="text-blue-600 font-semibold text-xl mb-4">
    Demandes Récentes
  </p>

  <table className="w-full border-collapse " >
    <thead>
      <tr className="border-b border-gray-200">
        {headerTab.map((header, index) => (
          <th
            key={index}
            className="text-left text-sm font-medium text-gray-600 p-2"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {tab2.map((item, index) => (
        <tr key={index} className="border-b border-gray-100">
          <td  className="p-2">{item.client.nom} {item.client.prenom} </td>
          <td className="p-2">{item.adresse}</td>
          <td className="p-2">{item.service.category}</td>
          <td
            className={`p-2 font-medium ${
              item.status === "Terminé"
                ? "text-green-600"
                : item.status === "En attente"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {item.status}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </>
  )
}

export default AdminDashTable
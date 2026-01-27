import React from 'react'

function AdminTableUsers({ users , loading }) {
  return (
     <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Nom</th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Prénom</th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                {users[0]?.role === 'professionnel' && (
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Spécialité</th>
                )}
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
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-8 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-blue-50 transition duration-200 group cursor-pointer"
                  >
                    <td className="px-8 py-4 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">
                      {user.nom}
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-700">{user.prenom}</td>
                    <td className="px-8 py-4 text-sm text-gray-600 group-hover:text-gray-900 transition">
                      {user.email}
                    </td>
                    {user.role === 'professionnel' && (
                      <td className="px-8 py-4 text-sm text-gray-700">
                        {user.specialite || 'N/A'}
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

export default AdminTableUsers
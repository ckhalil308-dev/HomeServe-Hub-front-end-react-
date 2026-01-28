import { Check } from 'lucide-react'
import React, { use } from 'react'
import { useState } from 'react';
import { BanUser, ModifyUsersByAdmin, verifyProfessional } from '../../../api/Users.api';
import { Edit, Ban, X } from 'lucide-react';

function AdminTableUsers({ users, loading, tabHeaders }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '', 
    email: '',
    role: '' 
    })
    ;
    const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      id: user._id
    });
    setIsEditModalOpen(true);
  };const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await ModifyUsersByAdmin(formData.id, formData);
      setIsEditModalOpen(false);
      alert("Utilisateur mis à jour avec succès");
      window.location.reload();

      
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };














  const handleVerify = async (userID) => {
    try {
      await verifyProfessional(userID);
      window.location.reload();


    }
    catch (error) {
      console.error("Verification failed", error);
    }
  }
  const BanUsers=async(userID)=>{
     const confirmBan = window.confirm(
    "Are you sure you want to ban this user?"
  );

  if (!confirmBan) return;
    try {
      await BanUser(userID);
      
      window.location.reload();
    }
    catch (error) {
      console.error("Banning failed", error);
    }
  }
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
                  <>
                    <td className="px-8 py-4 text-sm text-gray-700">
                      {user.specialite || 'N/A'}
                    </td>

                    <td className={`px-8 py-4 text-sm text-gray-700 ${user.isVerified ? 'text-green-600' : 'text-red-600'} transition`}>
                      {user.isVerified ? 'Verifié' : 'Non Vérifié'}
                    </td>
                  </>


                )}
                {user.role === 'professionnel' && !user.isVerified && tabHeaders.includes("Vérification") && (
                  <td className='flex justify-center  items-center' ><button onClick={() => handleVerify(user._id)} className='w-[50%] mt-2 mr-14   p-2 flex items-center gap-2 justify-center text-sm  
                   rounded-lg bg-blue-100  hover:bg-blue-600 hover:text-white text-blue-700  '>Verifier<Check size={18} />    
                    </button> </td>
                )}
                   <td>
                  <button
                    className="p-2  text-blue-600 bg-blue-50   gap-2 items-center justify-center flex rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    title="Modifier l'utilisateur"
                    onClick={() => openEditModal(user)}
                  >
                   <p className='text-sm' > Modifier </p>
                    <Edit size={18} />
                  </button>

                </td>
                <td>
                  <button
                    onClick={() => BanUsers(user._id)}
                    className="p-2 flex gap-2 items-center justify-center text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200"
                    title="Bannir l'utilisateur"
                  >
                    <p className='text-sm'>Bannir </p>
                    <Ban size={18} />
                  </button>
                </td>
              </tr>

            ))
            
          )}
        </tbody>
      </table>
      {/* edit popup */}
      {isEditModalOpen && (
        <div className="animate fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Modifier l'utilisateur</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Nom</label>
                  <input className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Prénom</label>
                  <input className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <input className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Rôle</label>
                <select className="w-full mt-1 p-2 border rounded-lg outline-none" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="client">Client</option>
                  <option value="professionnel">Professionnel</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg transition">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTableUsers
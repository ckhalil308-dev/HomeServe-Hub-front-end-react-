import { Check ,Eye,Mail} from 'lucide-react'
import React, { use } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BanUser, ModifyUsersByAdmin, unBanUser,   verifyProfessional } from '../../../api/Users.api';
import { Edit, Ban, X, AlertCircle } from 'lucide-react';

function AdminTableUsers({ users, loading, tabHeaders, verifierPro, bannerClient, bannerPro,debanirUser, modifierClient 
 , modifierPro
}) {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', role: '' });
  
  // New states for clean feedback and confirmation
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [confirmAction, setConfirmAction] = useState({ show: false, userId: null, type: '' });

  const showFeedback = (text, type = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 3000);
  };

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
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
       const client=await ModifyUsersByAdmin(formData.id, formData);
          const updatedUser = { ...selectedUser, ...formData };
      if (modifierClient) modifierClient(updatedUser); // Update the user in the parent component
      if (modifierPro) modifierPro(updatedUser); // Update the user in the parent component
      setIsEditModalOpen(false);
      showFeedback("Utilisateur mis à jour avec succès");
      
      // setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      showFeedback(error?.response?.data?.message || "Erreur lors de la mise à jour", "error");
    }
  };

  const handleVerify = async (userID) => {
    try {
      await verifyProfessional(userID);
      showFeedback("Utilisateur vérifié");
      verifierPro(userID);
    } catch (error) {
      console.error("Verification failed", error);
      showFeedback("Échec de la vérification", "error");
    }
  }

  const executeAction = async () => {
    const { userId, type } = confirmAction;
    try {
      if (type === 'unban') {
        await unBanUser(userId);
        debanirUser(userId);
        showFeedback("Utilisateur débanni");
      } else {
        await BanUser(userId);
        if (bannerPro) bannerPro(userId);
        if (bannerClient) bannerClient(userId);
        showFeedback("Utilisateur banni");
      }
      setConfirmAction({ show: false, userId: null, type: '' });
     
    } catch (error) {
      showFeedback("L'action a échoué", "error");
      setConfirmAction({ show: false, userId: null, type: '' });
    }
  };

  const UnbanUsers = (userID) => {
    setConfirmAction({ show: true, userId: userID, type: 'unban' });
  };

  const BanUsers = (userID) => {
    setConfirmAction({ show: true, userId: userID, type: 'ban' });

  };

  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
      
      {/* --- CLEAN FEEDBACK TOAST --- */}
      {statusMsg.text && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl border animate-bounce-in flex items-center gap-2 ${
          statusMsg.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
        }`}>
          {statusMsg.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
          <span className="font-medium text-sm">{statusMsg.text}</span>
        </div>
      )}

      {/* --- CLEAN CONFIRMATION MODAL --- */}
      {confirmAction.show && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center animate  backdrop-blur-lg p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${confirmAction.type === 'ban' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmation</h3>
            <p className="text-gray-600 text-sm mb-6">
              Êtes-vous sûr de vouloir {confirmAction.type === 'ban' ? 'bannir' : 'débannir'} cet utilisateur ?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmAction({ show: false, userId: null, type: '' })} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">Annuler</button>
              <button onClick={executeAction} className={`flex-1 px-4 py-2 text-white rounded-xl font-semibold transition ${confirmAction.type === 'ban' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>Confirmer</button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <tr>
            {tabHeaders.map((header, index) => (
              <th key={index} className="px-8 py-4 text-left text-sm font-semibold text-gray-900">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={tabHeaders.length} className="px-8 py-12 text-center">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">Loading...</span>
                </div>
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={tabHeaders.length} className="px-8 py-12 text-center text-gray-500">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="hover:bg-blue-50 transition duration-200 group cursor-pointer">
                <td className="px-8 py-4 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">{user.nom}</td>
                <td className="px-8 py-4 text-sm text-gray-700">{user.prenom}</td>
                <td className="px-8 py-4 text-sm text-gray-600 group-hover:text-gray-900 transition">{user.email}</td>
                {user.isBanned ? (
                  <>
                    <td className="px-8 py-4 text-sm text-gray-700">{user.role}</td>
                    <td>
                      <button onClick={() => UnbanUsers(user._id)} className="p-2 flex gap-2 items-center justify-center text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200">
                        <p className='text-sm'>Débannir </p>
                        <Check size={18} />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {user.role === 'professionnel' && user.isVerified && (
                      <>
                        <td className="px-8 py-4 text-sm text-gray-700">{user.specialite || 'N/A'}</td>
                        <td className={`px-8 py-4 text-sm text-gray-700 ${user.isVerified ? 'text-green-600' : 'text-red-600'} transition`}>
                          {user.isVerified ? 'Verifié' : 'Non Vérifié'}
                        </td>
                       
                        
                      </>
                    )}
                    {user.role === 'professionnel' && !user.isVerified && tabHeaders.includes("Vérification") && (
                      <>
                         <td className="px-8 py-4 text-sm text-gray-700">{user.specialite || 'N/A'}</td>
                      <td className='flex justify-center items-center'>
                        <button onClick={() => handleVerify(user._id)} className='w-[80%] mt-2 p-2 flex items-center gap-2 justify-center text-sm rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-700'>
                          Verifier<Check size={18} />
                        </button>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
  <a 
    href={`mailto:${user.email}`}
    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-all duration-200"
  >
    <Mail size={16} />
    <span>Contacter le pro</span>
  </a>
</td>
                      </>
                    )}
                  {(user.role === 'client' || (user.role === 'professionnel' && user.isVerified)) && (
                    <>
                    <td>
                      <button className="p-2 text-blue-600 bg-blue-50 gap-2 items-center justify-center flex rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200" onClick={() => openEditModal(user)}>
                        <p className='text-sm'> Modifier </p>
                        <Edit size={18} />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => BanUsers(user._id)} className="p-2 flex gap-2 items-center justify-center text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200">
                        <p className='text-sm'>Bannir </p>
                        <Ban size={18} />
                      </button>
                    </td>
                    </>)}
               
                     
                  </> 
                )}
                   {user.role=='professionnel' && user.isVerified && (
                <td className='flex justify-center items-center'>
                          <button onClick={() => {  navigate(`/admin/pro-details/${user._id}`); }} className="p-2 text-gray-600 bg-gray-50 gap-2 items-center justify-center flex rounded-lg hover:bg-gray-600 hover:text-white transition-colors duration-200">
                            <Eye size={18} />
                          </button>
                        </td>   )}

              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* edit popup */}
      {isEditModalOpen && (
        <div className=" animate rounded-lg fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-lg p-4">
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

export default AdminTableUsers;
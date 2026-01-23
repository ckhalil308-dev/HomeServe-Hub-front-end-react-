import React from 'react'
import { User, Mail, Briefcase, Check, X } from 'lucide-react';
import { useState } from 'react';
import { updateMe } from '../../../api/Users.api';
import { set } from 'lodash';
import { form, s } from 'motion/react-client';


function ChangeProfile({formData, setFormData,user,isEditing,setIsEditing,fetchUser}) {
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [loading, setLoading] = useState(false);
    const [modified, setModified] = useState(false);
     const specialitesOptions = [
    "Plomberie",
    "Électricité",
    "CVC (Chauffage/Climatisation)",
    "Peinture",
    "Réparations générales",
    "Sécurité",
  ]
     
      const validateForm = () => {
    const newErrors = {};

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (user?.role === 'professionnel' && !formData.specialite.trim()) {
      newErrors.specialite = 'La spécialité est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  const HandleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setErrors({});
    if(!validateForm()){
      setLoading(false);
      return;
    }
    try{
        await updateMe(formData);
         setModified(false);
        alert('Profil mis à jour avec succès!');
        fetchUser();
       


    }
    catch(error){
    console.error('Erreur lors de la mise à jour du profil:', error.response.data.message);
    setSubmitError(error.response.data.message || 'Une erreur est survenue lors de la mise à jour du profil.');
      
    }
    finally{
        setLoading(false);
    }

  }
  return (
     <div className="space-y-6">
        {submitError && (
                <p className="text-red-500 text-sm mb-4">{submitError}</p>
        )
            }
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <User size={18} /> Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  placeholder="Entrez votre prénom"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white transition ${
                    errors.prenom ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                />
                {errors.prenom && (
                  <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <User size={18} /> Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Entrez votre nom"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white transition ${
                    errors.nom ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                />
                {errors.nom && (
                  <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Mail size={18} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Entrez votre email"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white transition ${
                  errors.email ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {user?.role === 'professionnel' && (
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Briefcase size={18} /> Spécialité
                </label>
                <select 
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white transition ${
                    errors.specialite ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                     {specialitesOptions.map((spec) => (
                    <option className="w-full px-4 py-3 bg-white/5 border rounded-xl text-black focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10   " key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                {errors.specialite && (
                  <p className="text-red-500 text-xs mt-1">{errors.specialite}</p>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                 onClick={async (e) => {
                    await HandleSubmit(e);
                   
                }}
                className={"flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition " + (loading ? ' opacity-50 cursor-not-allowed' : '')}
              >
                <Check size={18} /> Enregistrer
              </button>
              <button
                onClick={(e) => {
                    setIsEditing(false);
                 
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                <X size={18} /> Annuler
              </button>
            </div>
          </div>
  )
}

export default ChangeProfile
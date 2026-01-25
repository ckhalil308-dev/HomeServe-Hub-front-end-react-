
import React from 'react'
import { Check, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { ChangePassword as ChangePasswordApi } from '../../../api/Users.api';

function ChangePassword({setPasswordChanging}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [formData, setFormData] = useState({
      ancienMotDePasse: '',
      nouveauMotDePasse: '',
      confirmerMotDePasse: ''
    });
    const [errors, setErrors] = useState({});
    const inputChange=(e)=>{
      const {name,value}=e.target;
      setFormData(prev=>({
        ...prev,
        [name]:value,
      }));
    }
    const validateForm = () => {
      const newErrors = {};
      if (!formData.ancienMotDePasse.trim()) {
        newErrors.ancienMotDePasse = 'L\'ancien mot de passe est requis';
      }
      if (!formData.nouveauMotDePasse.trim()) {
        newErrors.nouveauMotDePasse = 'Le nouveau mot de passe est requis';
      }
      if(formData.nouveauMotDePasse.length < 8)
        {
          newErrors.nouveauMotDePasse = 'Le nouveau mot de passe doit contenir au moins 8 caractères';
        }
      if (formData.nouveauMotDePasse !== formData.confirmerMotDePasse) {
        newErrors.confirmerMotDePasse = 'Les mots de passe ne correspondent pas';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
     const HandleSubmit=async (e)=>{
      e.preventDefault();
      setLoading(true);
      setErrors({});
      if(!validateForm()){
        setLoading(false);
        return;
      }
      console.log("dformData", formData);
      try{
         await ChangePasswordApi(formData);
         alert('Mot de passe mis à jour avec succès!');
         setPasswordChanging(false);
         setFormData({
          ancienMotDePasse: '',
          nouveauMotDePasse: '',
          confirmerMotDePasse: ''
        });
      }catch(error){
         alert(error.response.data.message || 'Une erreur est survenue lors de la mise à jour du mot de passe.');
      } finally {
        setLoading(false);
      }
    }


  return (
    <div className="  animate min-h-screen bg-white " style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}>
      <div className="max-w-2xl">
        <div className="space-y-6">
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{submitError}</span>
            </div>
          )}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              Ancien mot de passe
            </label>
            <input 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type={showPassword ? "text" : "password"}
              name="ancienMotDePasse" 
              value={formData.ancienMotDePasse}
              placeholder="Entrez votre ancien mot de passe" 
              onChange={inputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-slate-400 hover:text-teal-400 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.ancienMotDePasse && (
              <p className="text-red-500 text-sm mt-1">{errors.ancienMotDePasse}</p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              Nouveau mot de passe
            </label>
            <input 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showNewPassword ? "text" : "password"} 
              name="nouveauMotDePasse"
              value={formData.nouveauMotDePasse}
              placeholder="Entrez votre nouveau mot de passe" 
              onChange={inputChange}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-10 text-slate-400 hover:text-teal-400 transition-colors"
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.nouveauMotDePasse && (
              <p className="text-red-500 text-sm mt-1">{errors.nouveauMotDePasse}</p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              Confirmer le mot de passe
            </label>
            <input 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmerMotDePasse"
              value={formData.confirmerMotDePasse}
              placeholder="Confirmez votre nouveau mot de passe" 
              onChange={inputChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-10 text-slate-400 hover:text-teal-400 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.confirmerMotDePasse && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmerMotDePasse}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
             onClick={(e)=> 
                HandleSubmit(e)
             }
              className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition"
            >
              <Check size={18} /> Enregistrer
            </button>
            <button
              onClick={() => setPasswordChanging(false)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
            >
              <X size={18} /> Annuler
              
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword;
import React, { useState } from 'react';
import { FileText, Calendar, Send, ArrowLeft, MapPin, Phone, Sparkles, Loader } from 'lucide-react';
import { createDemande } from '../../../api/Demande.Api';
import { updateNeed } from '../../../api/AI.api';

function ReserverService({ setCommander, service }) {
  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    description: '',
    date: '', 
    adresse: '',
    numeroTelephone: ''
  });

  const validateForm = () => {
    const newErrors = {};
    if (!form.description) newErrors.description = "Dites-en un peu plus sur votre besoin.";
    if (!form.date) newErrors.date = "La date est requise.";
    
    // Validation Date Future (pour éviter le 400 du backend)
    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) newErrors.date = "La date doit être aujourd'hui ou plus tard.";

    if (!form.adresse) newErrors.adresse = "L'adresse est requise.";
    if (!form.numeroTelephone) newErrors.numeroTelephone = "Le numéro est requis.";
    if (!form.numeroTelephone.match(/^(?:\+216|216)?[2-9]\d{7}$/)) newErrors.numeroTelephone = "Format invalide.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(''); // Reset l'erreur au clic
    
    if (!validateForm()) return;
    setLoading(true);
    
    // CONSTRUCTION DE L'OBJET EXACT ATTENDU PAR LE BACKEND
    const formData = {
      service: service._id,
      description: form.description,
      prix: Number(service.prix), // Forcer en Nombre pour la comparaison back (prix < prixService)
      dateIntervention: form.date,
      adresse: form.adresse,
      numeroTelephone: form.numeroTelephone
    };

    try {
      await createDemande(formData);
      alert("Commande soumise avec succès!");
      setCommander(false);
    } catch (err) {
      // On récupère le message exact du backend : "Le prix doit être au minimum..." ou "Demande déjà en cours"
      const backendMessage = err.response?.data?.message || "Erreur lors de l'envoi";
      setSubmitError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNeed = async () => {
    if (!form.description) return;
    setLoadingAI(true);
    try {
      const des = { topic: form.description };
      const updatedDescription = await updateNeed(des);
      setForm(prev => ({ ...prev, description: updatedDescription.reformulatedNeed }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="animate max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Passer une commande</h2>
        <p className="text-slate-500 text-sm italic">Service : <span className="font-bold text-blue-600">{service?.titre}</span></p>
      </div>

      {/* Affichage de l'erreur du backend s'il y en a une */}
      {submitError && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold">
          {submitError}
        </div>
      )}

      <div className="space-y-6">
        {/* Adresse */}
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
            <MapPin size={12} /> Adresse complète
          </label>
          <input 
            className={`w-full bg-slate-50 border ${error.adresse ? 'border-red-500' : 'border-slate-200'} rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all`} 
            type="text" 
            placeholder="N°, Rue, Ville, Gouvernorat..."
            value={form.adresse}
            onChange={(e) => setForm({...form, adresse: e.target.value})}
          />
          {error.adresse && <p className="text-red-500 text-[10px] ml-2">{error.adresse}</p>}
        </div>

        {/* Grille Téléphone / Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
              <Phone size={12} /> Téléphone
            </label>
            <input 
              className={`w-full bg-slate-50 border ${error.numeroTelephone ? 'border-red-500' : 'border-slate-200'} rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all`} 
              type="tel" 
              placeholder="Ex: 216XXXXXXXX"
              value={form.numeroTelephone}
              onChange={(e) => setForm({...form, numeroTelephone: e.target.value})}
            />
            {error.numeroTelephone && <p className="text-red-500 text-[10px] ml-2">{error.numeroTelephone}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
              <Calendar size={12} /> Date souhaitée
            </label>
            <input 
              className={`w-full bg-slate-50 border ${error.date ? 'border-red-500' : 'border-slate-200'} rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all`} 
              type="date" 
              value={form.date}
              onChange={(e) => setForm({...form, date: e.target.value})}
            />
            {error.date && <p className="text-red-500 text-[10px] ml-2">{error.date}</p>}
          </div>
        </div>

        {/* Description & AI Button */}
        <div className="space-y-2 pt-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
            <FileText size={12} /> Détails de votre besoin
          </label>
          <textarea 
            className={`w-full bg-slate-50 border ${error.description ? 'border-red-500' : 'border-slate-200'} rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none min-h-[130px]`} 
            placeholder="Décrivez votre besoin avec vos propre mot .."
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          />
          {error.description && <p className="text-red-500 text-[10px] ml-2">{error.description}</p>}

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
            <button 
              type="button"
              onClick={handleUpdateNeed} 
              disabled={loadingAI || !form.description}
              className="relative whitespace-nowrap px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-black text-[10px] flex items-center gap-2 shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-95 disabled:opacity-50 tracking-widest group"
            >
              {loadingAI ? <Loader size={14} className="animate-spin" /> : <><Sparkles size={14} /> AMÉLIORER AVEC AI</>}
            </button>
            <p className="text-[11px] text-slate-600 font-medium">
                Écrivez normalement, l'IA reformulera tout pour le professionnel.
            </p>
          </div>
        </div>

        {/* Actions finales */}
        <div className="flex gap-3 pt-6 border-t border-slate-50">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-slate-900 hover:bg-black text-white rounded-2xl py-4 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 disabled:opacity-50"
          >
            {loading ? <Loader className="animate-spin" /> : <><Send size={16} /> Envoyer la demande</>}
          </button>
          <button 
            type="button"
            onClick={() => setCommander(false)} 
            className="px-6 py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReserverService;
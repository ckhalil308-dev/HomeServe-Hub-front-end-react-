  import React from 'react'
  import { FileText, DollarSign, Calendar , Send, ArrowLeft,MapPin,Phone } from 'lucide-react';
  import { useState } from 'react';
  import { set } from 'lodash';
  import { createDemande } from '../../../api/Demande.Api';
  import { div } from 'motion/react-client';

  function ReserverService({setCommander,service}) {
    const [form, setForm] = useState({
      description: '',
      prix: '',
      date: '',
      adresse: '',
      numeroTelephone: ''
    });
    const[submitError,setSubmitError]=useState(''); 
    const[error,setError]=useState({});
    const[loading,setLoading]=useState(false);
    const validateForm=()=>{
  
      const newErrors={};
      if(!form.description) newErrors.description="La description est requise.";
      // if(!form.prix) newErrors.prix="Le prix est requis.";
      // if(Number(form.prix) <  Number(service.prix)) newErrors.prix=`Le prix doit être au moins de ${service.prix} DT.`;
      if(!form.date) newErrors.date="La date est requise.";
      if(!form.adresse) newErrors.adresse="L'adresse est requise.";
      if(!form.numeroTelephone) newErrors.numeroTelephone="Le numéro de téléphone est requis.";
      if(!form.numeroTelephone.match(/^(?:\+216|216)?[2-9]\d{7}$/)) newErrors.numeroTelephone="Le numéro de téléphone n'est pas valide.";

      setError(newErrors);
      return Object.keys(newErrors).length===0;
    }
    const handleSubmit= async (e)=>{
      e.preventDefault();
      

      setError({});
      setLoading(true);
      if(!validateForm()) {
        setLoading(false);
        return;
      }
      const formData={
        service:service._id,
        description:form.description,
        prix:service.prix,
        dateIntervention:form.date,
        adresse: form.adresse,
        numeroTelephone: form.numeroTelephone
      }
        console.log("Données du formulaire de commande:",formData);
      try{
        await createDemande(formData);
        alert("Commande soumise avec succès!");
        setCommander(false);



      }
      catch(err){
        console.error("Erreur lors de la soumission de la commande:",err.response.data.message);
        setSubmitError(err.response.data.message);
      }
      finally{
        setLoading(false);
      }
    }
    if(!service) {
      return <div>Chargement du service...</div>;
    }
      
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Chargement des détails...</p>
          </div>
        </div>
      );
    }
   
    

      
    return (
    
    <div>
      
    <h2 className='mb-8 font-bold text-3xl text-gray-900'>Passer une Commande</h2>
    {submitError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{submitError}</div>}
    
    <div className='space-y-6 max-w-2xl'>
{/* 
      <div className='relative'>
        <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
          <DollarSign size={18} /> Prix
        </label>
        <input 
          className='w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="number" 
          placeholder="Entrez le prix"
          value={form.prix}
          onChange={(e) => setForm({...form, prix: Number(e.target.value)})}
        />
        {error.prix && <p className="text-red-500 text-sm mt-1">{error.prix}</p>}
      </div> */}

    

      <div className='relative'>
        <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
          <MapPin size={18} /> Adresse
        </label>
        <input 
          className='w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="text"
          placeholder="Entrez votre adresse"
          value={form.adresse}
          onChange={(e) => setForm({...form, adresse: e.target.value})}
        />
        {error.adresse && <p className="text-red-500 text-sm mt-1">{error.adresse}</p>}
      </div>

      <div className='relative'>
        <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
          <Phone size={18} /> Numéro de téléphone
        </label>
        <input 
          className='w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="tel"
          placeholder="216+xxxxxxxxx"
          value={form.numeroTelephone}
          onChange={(e) => setForm({...form, numeroTelephone: e.target.value})}
        />
        {error.numeroTelephone && <p className="text-red-500 text-sm mt-1">{error.numeroTelephone}</p>}
      </div>
       <div className='relative'>
        <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
          <Calendar size={18} /> Date
        </label>
        <input 
          className='w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="date"
          value={form.date}
          onChange={(e) => setForm({...form, date: e.target.value})}
        />
        {error.date && <p className="text-red-500 text-sm mt-1">{error.date}</p>}
      </div>
      <div className='relative'>
        <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
          <FileText size={18} /> Description de votre cas 
        </label>
        <textarea 
          className='w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' 
          placeholder="Décrivez votre commande"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
        />
        {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
      </div>

      <div className='flex gap-3 pt-4'>
        <button
          onClick={handleSubmit}
        className=' border flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:border-blue transition-all  ease-in' >
          <Send size={18} /> Envoyer
          
        </button>
        <button onClick={() => setCommander(false)} 
        className='flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg 
        text-sm font-medium hover:bg-gray-200
         hover:scale-105 transition-all ease-in'>
          <ArrowLeft size={18} /> Retour
        </button>
      </div>
    </div>
      </div>
                  
      
    )
  }

  export default ReserverService
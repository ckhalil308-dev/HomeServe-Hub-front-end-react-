'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '../contexte/context';
import { User, Mail, Briefcase, Edit2, Lock, ShieldCheck } from 'lucide-react';
import ChangeProfile from './ChangeProfile';
import ChangePassword from './ChangePassword';

function MyProfile() {
  const { user, loading, fetchUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', specialite: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        specialite: user.specialite || '',
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-gray-400 font-medium">Chargement du profil...</div>
      </div>
    );
  }

  // Générateur d'avatar simple
  const initials = `${formData.prenom?.charAt(0)}${formData.nom?.charAt(0)}`.toUpperCase();

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header avec Avatar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {initials}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {formData.prenom} {formData.nom}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100">
                  {user?.role || 'Utilisateur'}
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <p className="text-gray-500 text-sm">{formData.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu Principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-8">
            {isEditing ? (
              <ChangeProfile 
                formData={formData} 
                setFormData={setFormData} 
                user={user} 
                setIsEditing={setIsEditing} 
                fetchUser={fetchUser} 
              />
            ) : passwordChanging ? (
              <ChangePassword setPasswordChanging={setPasswordChanging} />
            ) : (
              <div className="space-y-10">
                
                {/* Section : Informations Personnelles */}
                <section>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <User size={14} /> Détails personnels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <InfoItem label="Prénom" value={formData.prenom} icon={<User size={18}/>} />
                    <InfoItem label="Nom" value={formData.nom} icon={<User size={18}/>} />
                    <InfoItem label="Email" value={formData.email} icon={<Mail size={18}/>} isFullWidth />
                    
                    {user?.role === 'professionnel' && (
                      <InfoItem 
                        label="Spécialité métier" 
                        value={formData.specialite} 
                        icon={<Briefcase size={18}/>} 
                        isFullWidth 
                      />
                    )}

                    {user?.role === 'admin' && (
                      <div className="col-span-2 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3">
                        <ShieldCheck className="text-amber-600" size={20} />
                        <p className="text-sm text-amber-800 font-medium">Compte Administrateur : Accès complet activé</p>
                      </div>
                    )}
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* Section : Actions */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-95"
                  >
                    <Edit2 size={16} /> Modifier le profil
                  </button>
                  <button
                    onClick={() => setPasswordChanging(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                  >
                    <Lock size={16} /> Sécurité & Mot de passe
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Petit composant interne pour la propreté
function InfoItem({ label, value, icon, isFullWidth = false }) {
  return (
    <div className={isFullWidth ? "col-span-2" : "col-span-1"}>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
        {label}
      </p>
      <div className="flex items-center gap-3 text-gray-800">
        <span className="text-gray-300">{icon}</span>
        <p className="text-base font-medium">{value || 'Non renseigné'}</p>
      </div>
    </div>
  );
}

export default MyProfile;
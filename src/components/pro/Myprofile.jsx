'use client';

import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexte/context';
import { User, Mail, Briefcase, Edit2, Lock, Check, X } from 'lucide-react';
import { set } from 'lodash';
import ChangeProfile from './ChangeProfile';
import { div, p } from 'motion/react-client';
import ChangePassword from './ChangePassword';

function MyProfile() {
  const navigate = useNavigate();
  const { user, loading, setUser, fetchUser } = useUser();
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
      <div className="flex items-center justify-center min-h-screen" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}>
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez les informations de votre profil</p>
        </div>

        {isEditing ? (
          <ChangeProfile formData={formData} setFormData={setFormData} user={user} isEditing={isEditing} setIsEditing={setIsEditing} fetchUser={fetchUser} />
        ) 
        : (passwordChanging  )? (
            <ChangePassword setPasswordChanging={setPasswordChanging} ></ChangePassword>
        )
        : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="border-b border-gray-200 pb-4">
                <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                  <User size={16} /> PRÉNOM
                </p>
                <p className="text-lg font-medium text-gray-900">{formData.prenom}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                  <User size={16} /> NOM
                </p>
                <p className="text-lg font-medium text-gray-900">{formData.nom}</p>
              </div>

              <div className="col-span-2 border-b border-gray-200 pb-4">
                <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                  <Mail size={16} /> EMAIL
                </p>
                <p className="text-lg font-medium text-gray-900">{formData.email}</p>
              </div>

              {user?.role === 'professionnel' && (
                <div className="col-span-2 border-b border-gray-200 pb-4">
                  <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                    <Briefcase size={16} /> SPÉCIALITÉ
                  </p>
                  <p className="text-lg font-medium text-gray-900">{formData.specialite}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-2.5 color2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                <Edit2 size={18} /> Modifier le profil
              </button>
              <button
                onClick={() => setPasswordChanging(true)}
                className="flex items-center gap-2 px-6 py-2.5 color2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                <Lock size={18} /> Changer le mot de passe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
import React from 'react';
import MyProfile from '../pro/Myprofile';
import { Settings, Shield, User } from 'lucide-react';

function AdminSettings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres Admin</h1>
        </div>
        <p className="text-gray-600 ml-11">Gérez vos informations personnelles et votre sécurité.</p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl">
        {/* Profile Section Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Mon Profil</h2>
                <p className="text-sm text-gray-600">Mettez à jour vos informations personnelles</p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8">
            <MyProfile />
          </div>
        </div>

        {/* Security Info Card */}
        
      </div>
    </div>
  );
}

export default AdminSettings;
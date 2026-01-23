import React from 'react'
import ChangeProfile from '../pro/ChangeProfile'
import MyProfile from '../pro/Myprofile'
import { User } from 'lucide-react'
import { Footer } from '../landingPage/Footer'

function Profil() {
  return (
    <>
    <div className="    min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 color2 rounded-full">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Mon Profil</h1>
          </div>
          <p className="text-gray-600 text-lg">Gérez vos informations personnelles</p>
        </div>

        {/* Profile Container */}
        <div className=" animate  bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Decorative Top Bar */}
          <div className="h-1 bg-gradient-to-r from-blue-300 via-blue-color2 to-color2"></div>

          {/* Profile Content */}
          <div className="p-8 md:p-12">
            <MyProfile />
          </div>

          {/* Bottom Accent */}
          <div className="h-1 bg-gradient-to-r from-blue-300 via-blue-color2 to-color2"></div>
        </div>

       
      </div>
 
     </div>
          <Footer></Footer>
    </>
  )
}

export default Profil
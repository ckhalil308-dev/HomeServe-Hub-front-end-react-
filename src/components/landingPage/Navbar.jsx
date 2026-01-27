"use client"
import { useState } from "react"
import {
  ChevronDown,
  Home,
  Droplets,
  Zap,
  Wind,
  Paintbrush,
  Wrench,
  Shield,
  User,
  LogOut,
  Settings,
} from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useUser } from "../contexte/context"

const SERVICES = [
  { title: "Plomberie", description: "Réparations, installations & maintenance", icon: Droplets },
  { title: "Électricité", description: "Câblage, réparations & installations", icon: Zap },
  { title: "CVC", description: "Chauffage, climatisation & ventilation", icon: Wind },
  { title: "Peinture", description: "Peinture intérieure & extérieure", icon: Paintbrush },
  { title: "Réparations générales", description: "Bricolage & réparations diverses", icon: Wrench },
  { title: "Sécurité", description: "Serrures, alarmes & caméras", icon: Shield },
]

export function Navbar() {
  const navigate = useNavigate()
  const { user, setUser, loading } = useUser()
  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/")
  }
  if (loading) {
    return <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 h-16" />
  }

  const renderRoleNav = () => {
    if (!user   ) return null

    const navMap = {
      client: [
        { label: "Mes demandes  ", path: "/reservation-client" },
        { label: "Profile", path: "/client-profile" },
      ],
      professionnel: [
        { label: "Dashboard", path: "/pro" },
    
        
      ],
    
    }

    return navMap[user.role]?.map(({ label, path }) => (
      <Link key={path} to={path} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
        {label}
      </Link>
    ))
  }
  // if(user && user.role==="admin"){
  //   navigate("/admin")
  // }

 

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              HomeService<span className="text-teal-600">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            
            
              <>
                <a href="/#FAQ" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  F.A.Q
                </a>
               
              </>
            

            
              <div className="relative group">
                <button
                  onClick={() => navigate("/services")}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1 transition-colors"
                >
                  Services
                  <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-0 w-96 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {SERVICES.map(({ title, description, icon: Icon }) => (
                      <Link
                        key={title}
                        to={`/services?minPrice=0&maxPrice=500&category=${title}`}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal-100">
                          <Icon className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{title}</div>
                          <p className="text-xs text-gray-500">{description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            


            {renderRoleNav()}
          </nav>

          {/* User Section */}
          <div className="hidden lg:flex items-center gap-3">
            {user && user.role !== "admin" ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.nom?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.prenom} {user.nom}
                  </span>
                </div>
                <Link to="/settings" className="p-2 text-gray-700 hover:text-teal-600 transition-colors">
                  <Settings className="h-4 w-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Login
                </button>
                <Link to="/signup" className="px-6 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
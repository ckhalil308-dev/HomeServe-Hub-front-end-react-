"use client"

import React, { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react"
import { Footer } from "../LandingPage/footer"
import authApi, { login } from "../../../api/Auth.api"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../contexte/context"

export default function LoginForm() {
  const [erroerMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate()
    const { setUser, fetchUser, user } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("");
    try{
        const data= await login({email,motDePasse,rememberMe});
        console.log( data);
        localStorage.setItem("token",data.token);
        await fetchUser();
        // alert("Connexion réussie !");
        if (data.user?.role === "admin") {
      navigate("/admin")
       } else {
      navigate("/")
      }




    }
    catch(error){
        console.error("Erreur de connexion :", error.response.data.message);
        setErrorMessage(error.response.data.message);

      
    }
    finally {
        setIsLoading(false);
    }
  }

  return (
    
    <div className=" relative  min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
       <Link to="/" className="absolute top-7 left-6 text-white font-bold text-3xl hover:underline"><ArrowLeft /> </Link>
      <div className="w-full max-w-md">
        {/* Card with glassmorphism effect */}
        <div className=" animate    backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="space-y-3 mb-8">
            <div className="inline-block p-3 bg-teal-500/20 rounded-xl mb-2">
              <Lock className="h-6 w-6 text-teal-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Bienvenue</h1>
            <p className="text-slate-300 text-sm">Connectez-vous à HomeServiceHub</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
          
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Adresse Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-400 transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                Mot de passe
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-400 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-teal-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
                {erroerMessage && ( 
              <div className="text-red-500 text-sm mb-4 ml-20">{erroerMessage}</div>
            )}
            </div>

            {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-teal-500 focus:ring-teal-500 accent-teal-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">Se souvenir de moi</span>
                </label>
                
              </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-teal-500/50"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2  from-slate-900 via-slate-800 to-slate-900 text-slate-400">ou</span>
            </div>
          </div>

          <p className="text-center text-slate-300">
            Vous n'avez pas de compte?{" "}
            <Link to="/signup" className="font-semibold text-teal-400 hover:text-teal-300 transition-colors">
              Inscrivez-vous
            </Link>
          </p>
        </div>

      
      </div>


      
    </div>
  
    
    
  )
}
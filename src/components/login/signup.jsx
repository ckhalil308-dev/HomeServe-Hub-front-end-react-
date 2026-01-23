import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle , ArrowLeft} from "lucide-react"
import { form, nav } from "motion/react-client"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../../../api/Auth.api"

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const specialitesOptions = [
    "Plomberie",
    "Électricité",
    "CVC (Chauffage/Climatisation)",
    "Peinture",
    "Réparations générales",
    "Sécurité",
  ]

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    role: "client",
    specialite: "",
  })
   const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
      specialite: role === "client" ? "" : prev.specialite,
    }))
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.nom.trim()) {
      errors.nom = "Le nom est requis"
    }
    if (!formData.prenom.trim()) {
      errors.prenom = "Le prénom est requis"
    }
    if (!formData.email.includes("@")) {
      errors.email = "Email invalide"
    }
    if (formData.motDePasse.length < 8) {
      errors.motDePasse = "Le mot de passe doit contenir au moins 8 caractères"
    }
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      errors.confirmMotDePasse = "Les mots de passe ne correspondent pas"
    }
    if (formData.role === "professionnel" && !formData.specialite.trim()) {
      errors.specialite = "La spécialité est requise pour les professionnels"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFieldErrors({})
    setSuccess("")

    if (!validateForm()) return

    setIsLoading(true)
  try {
    // console.log("Données du formulaire :", formData);
    const response = await register(formData);
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    console.log("Réponse d'inscription :", response);
    navigate("/login");
    
    
  }
  catch(error){
    console.error("Erreur d'inscription :", error.response.data.message);
    setErrorMessage(error.response.data.message);
  }
finally{
    setIsLoading(false)
}}

  return (
    <div className="  min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Link to="/login" className="absolute top-7 left-6 text-white font-bold text-3xl hover:underline"><ArrowLeft /> </Link>
      <div className="  animate w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          {/* Header */}
        
          <div className="space-y-3 mb-8">
            <div className="inline-block p-3 bg-teal-500/20 rounded-xl mb-2">
              <User className="h-6 w-6 text-teal-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Créer un compte</h1>
            <p className="text-slate-300 text-sm">Rejoignez HomeServiceHub</p>
          </div>
            {errorMessage && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-500 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />      {errorMessage}
            </div>
          )}

          <div className="space-y-5">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">Type de compte</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange("client")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    formData.role === "client"
                      ? "bg-teal-500 text-white"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("professionnel")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    formData.role === "professionnel"
                      ? "bg-teal-500 text-white"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  Professionnel
                </button>
              </div>
            </div>

            {/* Nom Input */}
            <div className="space-y-2">
              <label htmlFor="nom" className="block text-sm font-medium text-slate-200">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                placeholder="Votre nom"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10 ${
                  fieldErrors.nom ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-teal-500"
                }`}
                required
              />
              {fieldErrors.nom && <p className="text-xs text-red-400">{fieldErrors.nom}</p>}
            </div>

            {/* Prenom Input */}
            <div className="space-y-2">
              <label htmlFor="prenom" className="block text-sm font-medium text-slate-200">
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                placeholder="Votre prénom"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10 ${
                  fieldErrors.prenom ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-teal-500"
                }`}
                required
              />
              {fieldErrors.prenom && <p className="text-xs text-red-400">{fieldErrors.prenom}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="vous@exemple.com"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10 ${
                    fieldErrors.email ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-teal-500"
                  }`}
                  required
                />
              </div>
              {fieldErrors.email && <p className="text-xs text-red-400">{fieldErrors.email}</p>}
            </div>

            {/* Specialite Select - Only for professionals */}
            {formData.role === "professionnel" && (
              <div className="space-y-2">
                <label htmlFor="specialite" className="block text-sm font-medium text-slate-200">
                  Spécialité
                </label>
                <select
                  id="specialite"
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10 ${
                    fieldErrors.specialite ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-teal-500"
                  }`}
                  required
                >
                  <option value="" >Choisir une spécialité </option>
                  {specialitesOptions.map((spec) => (
                    <option className="w-full px-4 py-3 bg-white/5 border rounded-xl text-black focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10   " key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                {fieldErrors.specialite && <p className="text-xs text-red-400">{fieldErrors.specialite}</p>}
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10 ${
                    fieldErrors.motDePasse ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-teal-500"
                  }`}
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
              <p className="text-xs text-slate-400">Minimum 8 caractères</p>
              {fieldErrors.motDePasse && <p className="text-xs text-red-400">{fieldErrors.motDePasse}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmMotDePasse"
                  value={formData.confirmMotDePasse}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10 ${
                    fieldErrors.confirmMotDePasse ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-teal-500"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-teal-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {fieldErrors.confirmMotDePasse && <p className="text-xs text-red-400">{fieldErrors.confirmMotDePasse}</p>}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-teal-500/50"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                <>
                  Créer un compte
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2  from-slate-900 via-slate-800 to-slate-900 text-slate-400">
                ou
              </span>
            </div>
          </div>

          <p className="text-center text-slate-300">
            Vous avez déjà un compte?{" "}
            <Link to="/login" className="font-semibold text-teal-400 hover:text-teal-300 transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
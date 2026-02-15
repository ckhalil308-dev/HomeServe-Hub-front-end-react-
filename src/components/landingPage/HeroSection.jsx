import React from 'react'
import { House, Star, Sparkles, ShieldCheck, Zap, Search, ArrowDown,Loader } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SearchServiceAI } from '../../../api/AI.api';

function HeroSection() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const[prompt,setPrompt]=useState("");
  const RechercherAvecAi= async(prompt)=>{
     setLoading(true);
     try {
      const data={
        topic:prompt
      }
      const service=await SearchServiceAI(data);
      console.log("AI Service Search Result:", service);
      nav('/services/?category='+service.category);

  }
  catch (error) {
    console.error('AI Service Search failed:', error);
  }
  finally {
    setLoading(false);
  }
  }

  return (
    <section className=" animate color mt-17 min-h-[95vh] w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* Background Abstract Shapes - adds depth without distraction */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-black/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10 text-center">
        
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-black/5 rounded-full px-6 py-2 mb-10 shadow-sm animate-fade-in">
          <Sparkles className="text-gray-900 h-4 w-4" />
          <span className="text-gray-900 text-xs font-bold uppercase tracking-widest">L'intelligence artificielle au service de votre foyer</span>
        </div>

        {/* Massive Centered Headline */}
        <h1 className="text-3xl md:text-[100px] font-black text-gray-950 leading-[0.85] tracking-tighter mb-12">
         L'excellence du service <br />
          <span className="text-gray-800/40 italic">à domicile.</span>
        </h1>

        {/* The "Centerpiece" - Floating Search Box that breaks the layout */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="absolute -inset-2 bg-black/5 blur-xl rounded-[3rem]" />
          
          <div className="relative bg-white p-3 md:p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-4 px-6 flex-1 w-full">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <House className="text-gray-400" size={24} />
              </div>
              <input 
                value={prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                className="w-full bg-transparent text-gray-800 outline-none text-xl font-medium placeholder:text-gray-300" 
                placeholder="Quel est votre problème ? (ex: robinet cassé...)" 
                type="text" 
              />
            </div>
            
            <button 
              onClick={() => RechercherAvecAi(prompt)}
              className={"color w-full md:w-auto px-10 py-5 text-white font-black rounded-[2rem] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 whitespace-nowrap" + (loading ? " animate-pulse opacity-50 cursor-not-allowed" : "")}

            > 
            {loading &&(
              <Loader className="animate-spin text-white" size={20} />
            )}
              <Search size={22} strokeWidth={3} />
              TROUVER MA SOLUTION
            </button>
          </div>
          
          {/* Tags floating just below the search */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {['Plomberie', 'Électricité', 'Chauffage', 'Serrurerie'].map((item) => (
              <span key={item} className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] bg-black/5 px-3 py-1 rounded-md">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-black/5 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
              <ShieldCheck className="text-gray-900" size={20} />
            </div>
            <p className="text-gray-950 font-bold text-sm">Experts Certifiés</p>
            <p className="text-gray-500 text-xs">Vérification stricte de chaque pro.</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
              <Zap className="text-gray-900" size={20} />
            </div>
            <p className="text-gray-950 font-bold text-sm">Matching IA</p>
            <p className="text-gray-500 text-xs">Le bon service pour le bon problème.</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
              <Star className="text-gray-900" size={20} />
            </div>
            <p className="text-gray-950 font-bold text-sm">Satisfaction 100%</p>
            <p className="text-gray-500 text-xs">Suivi complet jusqu'à la fin.</p>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ArrowDown size={24} className="text-gray-950" />
      </div>
    </section>
  )
}

export default HeroSection
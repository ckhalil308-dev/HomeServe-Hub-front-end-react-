import React from 'react'
import { ArrowRight, Star } from "lucide-react"
import { useNavigate } from 'react-router-dom'

function heroSection() {
  const nav= useNavigate();
  return (
 
   <section className="  color mt-17  h-[75vh]  w-[100%] flex justify-center items-center" >
      <div />

      <div className=" animate   container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>Trusted by 50,000+ homeowners</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl">
           Des services à domicile quand  <span className="text-primary text-white">   vous en  avez  <br />besoin </span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
            Connect with verified professionals for plumbing, electrical, HVAC, and all your home service needs. Quality
            work, guaranteed.
          </p>

          <div className="flex justify-center">
             <button onClick={() => nav('/services')} className='     mt-10 ml-6 bg-white text-black p-3 rounded-[20px] hover:scale-[1.02] transition duration-300 ease-in-out'> <div className="flex items-center justify-center gap-">
              Trouver un service   <ArrowRight className="mt-1 h-5 w-5" /> </div>  </button>
           <button onClick={() => nav('/signup')} className=' mt-10 ml-6 bg-white text-black p-3 rounded-[20px] hover:scale-[1.02] transition duration-300 ease-in-out'>Devenir partenaire </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default heroSection
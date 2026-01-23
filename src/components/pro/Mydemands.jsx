import React, { useEffect } from 'react'
import { getProfessionalDemandes } from '../../../api/Demande.Api'
import { useState } from 'react'
import Demande from './Demande'


function Mydemands() {
  const[demandes,setDemandes]=useState([])
  const[loading,setLoading]=useState(true)
   const getDemandes=async()=>{
    setLoading(true);
    try{
 
      const response = await getProfessionalDemandes();
      console.log("Fetched demandes:", response);
      setDemandes(response);
    }
    catch(error){
      console.error("Error fetching demandes:", error);
    }
    finally{
      setLoading(false);
    }
   }
   useEffect(()=>{
    getDemandes();
   },[])
   const demandesEnAttente = demandes.filter((demande)=>demande.status==="En attente").length;
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className='text-4xl font-bold text-gray-900 mb-10'>Mes Demandes</h1>
        <p className='mb-5  '>  {demandesEnAttente} demande  trouvée{demandesEnAttente > 1 ? 's' : ''} </p>
        
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            </div>
            <p className="ml-4 text-gray-600 font-medium">Chargement...</p>
          </div>
        )}
        
        {demandesEnAttente===0 && !loading && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
            <p className='text-lg text-gray-600 font-medium'>Aucune demande en attente.</p>
          </div>
        )}
        
        <div className='flex flex-col gap-6'>
          {demandes.map((demande)=>(
            demande.status==="En attente" &&(
               <Demande key={demande._id} demande={demande} />
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default Mydemands
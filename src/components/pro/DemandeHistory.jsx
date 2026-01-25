import React from 'react'
import { useEffect } from 'react'
import { getProfessionalDemandes } from '../../../api/Demande.Api'
import { useState } from 'react'
import Demande from './Demande'

function DemandeHistory() {
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
       const demandesHistorique = demandes.filter((demande)=>demande.status==="Termine").length;
  return (
    <>
    <div className='mb-10 w-full flex items-center justify-center mt-10'
    >
      <h1 className='text-2xl font-bold font-sans '>Historique des demandes</h1>

    </div>
        {loading && <p>Loading...</p>}
    { demandesHistorique===0  && <p className=' flex items-center justify-center'>Aucune demande en historique.</p>}

        <div className='animate p-10'>
          {demandes.map((demande)=>(
            ( demande.status=="Termine") &&(
               <Demande key={demande._id} demande={demande} />
            )
          ))}
        </div>
    </>
  )
}

export default DemandeHistory
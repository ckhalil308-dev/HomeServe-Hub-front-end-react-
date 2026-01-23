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
  return (
    <>
    <div className='mb-10'>DemandeHistory</div>
        {loading && <p>Loading...</p>}
    { demandes.length===0  && <p className=' flex items-center justify-center'>Aucune demande en historique.</p>}
          {demandes.map((demande)=>(
            demande.status!=="En attente" &&(
               <Demande key={demande._id} demande={demande} />
            )
          ))}
    </>
  )
}

export default DemandeHistory
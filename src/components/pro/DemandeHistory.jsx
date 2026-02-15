import React from 'react'
import { useEffect } from 'react'
import { getProfessionalDemandes } from '../../../api/Demande.Api'
import { useState } from 'react'
import Demande from './Demande'

function DemandeHistory() {
      const[demandes,setDemandes]=useState([])
      const[nbrDemande,setNbrDemande]=useState(0)
      const[loading,setLoading]=useState(true)
       const getDemandes=async()=>{
        setLoading(true);
        try{
     
          const response = await getProfessionalDemandes("Termine");
          console.log("Fetched demandes:", response);
          setDemandes(response.demandes);
          setNbrDemande(response.demandes.length);
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
       const demandesHistorique = demandes.length;
  return (
    <>
    <div className='mb-10 w-full flex items-center justify-center mt-10'
    >
      <h1 className='text-2xl font-bold font-sans '>Historique des demandes</h1>

    </div>
        {loading && <p>Loading...</p>}
    { demandesHistorique===0  && <p className=' flex items-center justify-center'>Aucune demande en historique. </p>}

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
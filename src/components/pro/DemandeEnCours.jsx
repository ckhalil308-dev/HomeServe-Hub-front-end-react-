import React from 'react'
import { useEffect } from 'react'
import { getProfessionalDemandes } from '../../../api/Demande.Api'
import { useState } from 'react'
import Demande from './Demande'

function DemandeEnCours() {
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
       const updateStatus = (id, newStatus) => {
  setDemandes(prev =>
    prev.map(d =>
      d._id === id ? { ...d, status: newStatus } : d
    )
  )
  
}  
const DemandesEnCours = demandes.filter((demande)=>demande.status==="Approuve").length;  
  return (
    <>
    <div className='mb-10 w-full flex items-center justify-center mt-10'
    >
      <h1 className='text-2xl font-bold font-sans '>Demande En cours</h1>

    </div>
        {loading && <p>Loading...</p>}
    { DemandesEnCours===0  && 
      <div className=" animate bg-white rounded-lg shadow-md p-15 text-center border border-gray-200">
            <p className='text-lg text-gray-600 font-medium'>Aucune demande en cours.</p>
          </div>}
        <div className='animate p-10'>
          {demandes.map((demande)=>(
            ( demande.status=="Approuve") &&(
               <Demande key={demande._id} demande={demande} updateStatus={updateStatus} />
            )
          ))}
        </div>
    </>
  )
}

export default DemandeEnCours
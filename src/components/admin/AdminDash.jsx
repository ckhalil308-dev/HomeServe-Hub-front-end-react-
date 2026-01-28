import { DollarSign, DollarSignIcon, Home, PersonStanding, Settings, Briefcase, Check } from 'lucide-react'
import { div, s } from 'motion/react-client'
import React, { use } from 'react'
import CountUp from '../../CountUp'
import AdminDashTable from './AdminDashTable'
import { useState ,useEffect} from 'react'
import { getPros } from '../../../api/Users.api'
import { set } from 'lodash'
import { getClients } from '../../../api/Users.api'
import { getAllDemandes } from '../../../api/Demande.Api'
function AdminDash() {
  const[nombrePros,setNombrePros]=useState(0);
  const[nombreClients,setNombreClients]=useState(0);
  const[nombreProsCetteSemaine,setNombreProsCetteSemaine]=useState(0);
  const[nombreClientsCetteSemaine,setNombreClientsCetteSemaine]=useState(0);
  const[totaleDemandes,setTotaleDemandes]=useState(0);
  const [DemandeRecente,setDemandeRecente]=useState([]);
  const[Loading,setLoading]=useState(false);
  useEffect(()=>{
     
      const fetchProsAndClients=async()=>{
        setLoading(true);
        const query={};
        try{
          const pros = await getPros("", 0);
          const clients = await getClients("", 0);
          const DemandesTotales=await getAllDemandes("",1);
          
          setTotaleDemandes(DemandesTotales.termine);
          setDemandeRecente(DemandesTotales.recentes);
          console.log("Demandes Recents:",DemandesTotales.recentes);
           setNombrePros(pros.total);
          setNombreClients(clients.total);
          setNombreProsCetteSemaine(pros.nouveaux);
          setNombreClientsCetteSemaine(clients.nouveaux);
          setLoading(false);
        }
        catch(error){
          console.error("Failed to fetch pros and clients:",error);
          setLoading(false);
        }
      };
      fetchProsAndClients();
  },[]);


  
   const tab=[
    {
      icon:<Briefcase/>,
      title:"nombre de professionnels",
      number:<CountUp to={nombrePros} duration={2} />,
      percent: `+${nombreProsCetteSemaine} cette semaine`,
    },
    {
      icon:<PersonStanding  />,
      title:"nombre de clients",
      number:<CountUp to={nombreClients} duration={2} />,
      percent:`+${nombreClientsCetteSemaine} cette semaine`,
    },
    {
      icon:<Check/>,
      title:"interventions terminées",
      number:<CountUp to={totaleDemandes} duration={1} />,
      percent:"+12% ce mois",

    }
 
   ]
      const headerTab=[
      "Client",
      "Ville",
      "Type",
      "Status"
    ]
   const tab2=[
    {
      nom:"John Doe",
      ville:"Paris",
      type:"Plomberie",
      status:"En attente"
    },
    {
      nom:"Jane Smith",
      ville:"Lyon",
      type:"Électricité",
      status:"Terminé"
    },
    {
      nom:"Mike Johnson",
      ville:"Marseille",
      type:"Peinture",
      status:"Rejeté"
    },
   ]
  return (
    <>
     <div className='animate mt-15 flex justify-center gap-[50%] items-center mb-[5%] '>
      <div >
         <p className='text-blue-700 font-[500]'>Admin</p>
         <p className='font-[700] text-3xl'>HomeServe Hub Dashboard</p>

      </div>
      <div>
        <button className='flex items-center justify-center gap-2 text-white bg-blue-600 p-2 rounded-lg  hover:scale-102 hover:shadow-md  transition-transform linear 2s'> 
           <Settings size={16}></Settings>
          parametres
         
        </button>

      </div>
        </div>
    <div className='animate flex  items-center gap-25 mb-8 justify-center  mt-[1%]'>
      {tab.map((item,index)=>(
      <div key={index} className=' w-[25%] bg-white flex items-center p-5 shadow-md rounded-lg gap-10 hover:scale-102 hover:shadow transition-transform linear 2s  '> 
        <div className='rounded-full bg-gray-200 shadow-md p-3 flex items-center '>
          {item.icon}
        </div>
        <div className='flex flex-col justify-center '>
                <p className='text-sm ' >{item.title}</p>
                <p className=' text-2xl font-bold '>{item.number}</p>
                <p className='text-[0.7rem] text-green-700'>{item.percent}</p>
        </div>

      </div>
      ))}
      </div>
      <div className='flex justify-center gap-20'>
      <div className="w-[50%] shadow-md rounded-lg p-6">
        <AdminDashTable 
           headerTab={headerTab}
           tab2={DemandeRecente}
        ></AdminDashTable>
 
     </div>
       <div className="w-[50%] shadow-md rounded-lg p-6">
        <AdminDashTable 
           headerTab={headerTab}
           tab2={DemandeRecente}
        ></AdminDashTable>
 
     </div>
      </div>
      </>
  )
}

export default AdminDash
import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/login/Login.jsx'
import { Route, Router, Routes,useLocation } from 'react-router-dom';
import SignUpForm from './components/login/signup.jsx';
import { register } from '../api/Auth.api.js';
import ServicesPage from './components/services/services.jsx';
import Publicguards from './guards/publicguards.jsx';
import Privateguards from './guards/Privateguards.jsx';
import NavDash from './components/dashboards/NavDash.jsx';
import { i } from 'motion/react-client';
import { Navbar } from './components/LandingPage/navBar.jsx';
import Myservices from './components/pro/Myservices.jsx';
import AddService from './components/pro/AddService.jsx';
import Mydemands from './components/pro/Mydemands.jsx';
import Myprofile from './components/pro/Myprofile.jsx';
import ChangePassword from './components/pro/ChangePassword.jsx';
import DemandeHistory from './components/pro/DemandeHistory.jsx';
import { UserProvider } from './components/contexte/context.jsx';
import ServiceDetails from './components/services/ServiceDetails.jsx';
import MesReservation from './components/client/MesReservation.jsx';
import Profil from './components/client/Profil.jsx';
import EditService from './components/pro/EditService.jsx';






function App() {
  const location = useLocation() ;
  const [count, setCount] = useState(0)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const hideNavRoutes = ['/login', '/signup',  '/pro', '/pro/services', '/pro/add-service', '/pro/mes-demandes'
  , '/pro/profile', '/pro/change-password', '/pro/demande-history'
  ];
  const showNav = !hideNavRoutes.includes(location.pathname)
  return (
    <>
    <UserProvider>
       
      {showNav && <Navbar></Navbar>}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path="/login"
          element={
             <Publicguards><Login /> </Publicguards>
              
          }
        />
          <Route path='/ServiceDetails/:id'  element={<ServiceDetails />} />    
        <Route
          path="/signup"
          element={
            <Publicguards><SignUpForm /> </Publicguards>
          }
        />
        <Route index  path='/services' element={<ServicesPage />} />

    <Route   path='/reservation-client'  element={
       <Privateguards roles={['client']}>
           <MesReservation></MesReservation>
        </Privateguards>
    } ></Route>   
       <Route   path='/profil-client'  element={
       <Privateguards roles={['client']}>
           <Profil></Profil>
        </Privateguards>
    } ></Route>  
      



        
        <Route path='/pro' element={ <Privateguards roles={['professionnel']}>
      <NavDash />
    </Privateguards> }>
        <Route index element={<Myservices />} />
        <Route  path='services' element={<Myservices/>} />
        <Route path='mes-demandes' element={ <Mydemands />} />
        <Route path='add-service' element={<AddService />} />
        <Route path='profile' element={ <Myprofile />} />
        <Route path='change-password' element={ <ChangePassword />} />
        <Route path='demande-history' element={ <DemandeHistory />} />
        <Route path='edit-service/:id' element={ <EditService />} />

        
          

        </Route>

        <Route path='*' element={<div>404 Not Found</div>} />
        


      </Routes>
   </UserProvider>
    </>
  )
}

export default App
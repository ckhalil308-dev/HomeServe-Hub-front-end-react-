import React from 'react'

import "../../App.css"
import HeroSection from './heroSection'
import Howitworks from './howItWorks'
import { ServiceCard } from './ServiceCardProps'
import { Anchor, ArrowUp, Users, Briefcase, CheckCircle } from 'lucide-react'
import { Wrench } from 'lucide-react'
import { Zap } from "lucide-react";   
import { House } from "lucide-react";
import { useInView } from 'motion/react';
import { useRef } from 'react';
import CountUp from '../../CountUp'
import FAQ from './faq';
import { Navbar } from './navBar'
import { Footer } from './footer'
import { link } from 'motion/react-client'



function LandingPage() {
  const countUp=[{
    to:10,
    label:"Clients satisfaits",
    icon: Users
  },
  {
    to:100,
    label:"Services disponibles",
    icon: Briefcase
  },
  {
    to:50,
    label:"Professionnels inscrits",
    icon: CheckCircle
  }]
  const servicees=[
    {
      icon:Anchor,
      title:"Plomberie",
      features:["Prestataires certifiés","Intervention rapide","Tarifs transparents"],
      link:"/services/?category=Plomberie"
    },
    {
      icon:Wrench,
      title:"Réparations générales",
      features:["Prestataires certifiés","Intervention rapide","Tarifs transparents"],
      link:"/services/?category=Réparations générales"
    },
    {
      icon:Zap,
      title:"Électricité",
      features:["Prestataires certifiés","Intervention rapide","Tarifs transparents"],
      link:"/services/?category=Électricité"
    },
    {
      icon:House,
      title:"CVC",
      features:["Prestataires certifiés","Intervention rapide","Tarifs transparents"],
      link:"/services/?category=CVC"
    },  
  ]
  
const ref = useRef(null);
const ref2= useRef(null);
const ref3= useRef(null);
const ref4= useRef(null);
   const isInView = useInView(ref, { once: true, margin: '0px' });
   const isInView2 = useInView(ref2, { once: true, margin: '0px' });
   const isInView3 = useInView(ref3, { once: true, margin: '0px' });
   const isInView4 = useInView(ref4, { once: true, margin: '0px' });


  return (  
    <>
    <div className='color min-h-screen '>
      
       <a href="#top"><ArrowUp className=" fixed  w-9 h-auto color1  rounded-full bg-blue-100 ml-5  mt-[40%]  mb-10"/></a>
       <div className='  flex justify-center'>
        <  HeroSection ></HeroSection>
        </div>
      <div    className={`flex flex-col justify-center items-center mt-10 mb-20 gap-10 `}>
          <div><h1 className='ser font-semibold text-4xl '>Nos services populaires</h1> </div>
         <div
         
           ref={ref} className={`flex justify-center mt-1 gap-20 transition-opacity duration-2400 ${ isInView ? 'opacity-100 ' : 'opacity-0 ' } `}>
            {servicees.map((service)=>(
              <ServiceCard key={service.title}
               icon={service.icon} title={service.title}
                features={service.features} link={service.link}>

               </ServiceCard>
            ))} 
      </div>
      </div>
      <div id='ccm'  ref={ref2} className={` mt-60 transition-opacity duration-4000 ${ isInView2 ? 'opacity-100 ' : 'opacity-0 ' } `}>
        <   Howitworks></Howitworks>
   
      </div>
<div ref={ref3} className={`w-full py-20 transition-opacity duration-2000 ${isInView3 ? 'opacity-100' : 'opacity-0'}`}>
  <div className='max-w-6xl mx-auto px-4'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-20'>
      {countUp.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className='flex flex-col items-center justify-center p-8 rounded-lg bg-white border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300'>
            <IconComponent className='w-10 h-10 text-teal-600 mb-4' />
            <CountUp
              to={stat.to}
              from={0} 
              duration={2.5}
              separator=","
              delay={0.5}
              startWhen={true}
              className="text-5xl font-bold text-teal-600"
            />
            <p className='text-slate-600 font-medium mt-3 text-center text-sm'>{stat.label}</p>
          </div>
        );
      })}
    </div>
  </div>
</div>

     <div id='FAQ' ref={ref4} className={ `  transition-opacity duration-5000 ${ isInView4 ? 'opacity-100 ' : 'opacity-0 ' } `}>
      
     <FAQ></FAQ>
    
     </div>
    
     
     
      
     <Footer></Footer>
     

    </div>
   




    
    
    </>
  )
}

export default LandingPage
import React from 'react'
import { useInView } from 'motion/react';
import { useRef } from 'react';
import {useState} from 'react';
import BounceCards from './BounceCards';
import howItWorks1 from '../../assets/howItWorks1.png';
import h2 from '../../assets/h2.png';
import h3 from '../../assets/h3.png';
import h4 from '../../assets/h4.png';







function howItWorks() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const images = [
    h2,
    h3,
    h4,
   
 
];
  const ref = useRef(null);  
    const isInView = useInView(ref, { once: true, margin: '0px' });
  return (
    <div>
        <div className='flex justify-center gap-[20%]'>
            <div>
                <h1 className='font-bold text-4xl ml-20'>Comment ça marche?</h1>
                 <div className=' min-h-screen p-8'>
                <div className='max-w-md mx-auto space-y-4 mt-10'>
        
        <div onMouseEnter={()=> setIsHovered1(true)} onMouseLeave={()=> setIsHovered1(false)}className=' border-2 rounded-xl p-4 mb-10 hover:scale-[1.02] hover:border-blue-600 transition duration-300 ease-in-out transition duration-300 ease-in-out '>
          <h3 className='font-semibold text-gray-800 mb-2'>choisir un service</h3>
          <p className='text-gray-700 text-sm'>Choisissez parmi nos prestataires vérifiés le service dont vous avez besoin</p>
        </div>
         <div onMouseEnter={()=> setIsHovered2(true)} onMouseLeave={()=> setIsHovered2(false)}    className=' border-2 rounded-xl p-4 mb-10 hover:scale-[1.02] hover:border-blue-600 transition duration-300 ease-in-out transition duration-300 ease-in-out  '>
          <h3 className='font-semibold text-gray-800 mb-2'>choisir un service</h3>
          <p className='text-gray-700 text-sm'>Choisissez parmi nos prestataires vérifiés le service dont vous avez besoin</p>
        </div>

 <div onMouseEnter={()=> setIsHovered3(true)} onMouseLeave={()=> setIsHovered3(false)} className=' border-2 rounded-xl p-4  hover:scale-[1.02] hover:border-blue-600 transition duration-300 ease-in-out transition duration-300 ease-in-out '>
          <h3 className='font-semibold text-gray-800 mb-2'>choisir un service</h3>
          <p className='text-gray-700 text-sm'>Choisissez parmi nos prestataires vérifiés le service dont vous avez besoin</p>
        </div>


        

      </div>
    </div>

            </div>
            <div>
                {/* <ImageGallery
                enableHover={true}
                images={images}
                containerWidth={400}
                containerHeight={400}
                className="custom-bounceCards"
               /> */}
               <BounceCards
                isHovered1={isHovered1}
                isHovered2={isHovered2}
                isHovered3={isHovered3}
                enableHover={true}
                images={images}
                containerWidth={400}
                containerHeight={400}
                className="custom-bounceCards mt-30 ml-10"
               />
            </div>
        </div>
        
        
  







    </div>
  )
}

export default howItWorks
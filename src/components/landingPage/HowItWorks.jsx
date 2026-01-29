import React, { useState, useRef } from 'react';
import { useInView } from 'motion/react';
import BounceCards from './BounceCards';
import { Search, CalendarCheck, ShieldCheck } from "lucide-react";

// Assets
import h2 from '../../assets/h2.png';
import h3 from '../../assets/h3.png';
import h4 from '../../assets/h4.png';

function HowItWorks() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const images = [h2, h3, h4];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section className="py-24 color overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: The Interactive Content */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-950 tracking-tighter mb-6">
                Comment ça <span className="text-gray-400 italic">marche ?</span>
              </h2>
              <p className="text-gray-600 text-lg font-medium max-w-md">
                Une expérience fluide, du diagnostic IA jusqu'à la fin de vos travaux.
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div 
                onMouseEnter={() => setIsHovered1(true)} 
                onMouseLeave={() => setIsHovered1(false)}
                className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex gap-5 cursor-default
                  ${isHovered1 ? 'border-blue-600 bg-white shadow-xl scale-[1.02]' : 'border-gray-100 bg-gray-50/50'}`}
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors 
                  ${isHovered1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  <Search size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-xl mb-1">Choisir un service</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Utilisez notre IA pour trouver exactement le prestataire dont vous avez besoin.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div 
                onMouseEnter={() => setIsHovered2(true)} 
                onMouseLeave={() => setIsHovered2(false)}
                className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex gap-5 cursor-default
                  ${isHovered2 ? 'border-blue-600 bg-white shadow-xl scale-[1.02]' : 'border-gray-100 bg-gray-50/50'}`}
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors 
                  ${isHovered2 ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  <CalendarCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-xl mb-1">Planifier l'intervention</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Réservez un créneau avec un expert vérifié selon vos disponibilités.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div 
                onMouseEnter={() => setIsHovered3(true)} 
                onMouseLeave={() => setIsHovered3(false)}
                className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex gap-5 cursor-default
                  ${isHovered3 ? 'border-blue-600 bg-white shadow-xl scale-[1.02]' : 'border-gray-100 bg-gray-50/50'}`}
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors 
                  ${isHovered3 ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-xl mb-1">Résultat garanti</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Profitez d'un travail de qualité, certifié et assuré par nos soins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The BounceCards Visual */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative Circle behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
              
              <BounceCards
                isHovered1={isHovered1}
                isHovered2={isHovered2}
                isHovered3={isHovered3}
                enableHover={true}
                images={images}
                containerWidth={500}
                containerHeight={500}
                className="custom-bounceCards"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
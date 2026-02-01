import React, { useRef } from 'react'
import "../../App.css"
import HeroSection from './heroSection'
import Howitworks from './howItWorks'
import { ServiceCard } from './ServiceCardProps'
import { Anchor, ArrowUp, Users, Briefcase, CheckCircle, Wrench, Zap, House } from 'lucide-react'
import { useInView } from 'motion/react';
import CountUp from '../../CountUp'
import FAQ from './faq';
import { Footer } from './footer'

function LandingPage() {
  const countUp = [
    { to: 10, label: "Clients satisfaits", icon: Users },
    { to: 100, label: "Services disponibles", icon: Briefcase },
    { to: 50, label: "Professionnels inscrits", icon: CheckCircle }
  ]

  const servicees = [
    { icon: Anchor, title: "Plomberie", features: ["Prestataires certifiés", "Intervention rapide", "Tarifs transparents"], link: "/services/?category=Plomberie" },
    { icon: Wrench, title: "Réparations générales", features: ["Prestataires certifiés", "Intervention rapide", "Tarifs transparents"], link: "/services/?category=Réparations générales" },
    { icon: Zap, title: "Électricité", features: ["Prestataires certifiés", "Intervention rapide", "Tarifs transparents"], link: "/services/?category=Électricité" },
    { icon: House, title: "CVC", features: ["Prestataires certifiés", "Intervention rapide", "Tarifs transparents"], link: "/services/?category=CVC" },
  ]

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  // Triggering slightly earlier (margin) for a smoother feel
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const isInView2 = useInView(ref2, { once: true, margin: "-200px" });
  const isInView3 = useInView(ref3, { once: true, margin: "-200px" });
  const isInView4 = useInView(ref4, { once: true, margin: "-200px" });

  return (
    <>
      <div className='color min-h-screen'>
        <a href="#top">
          <ArrowUp className="fixed w-9 h-auto color1 rounded-full bg-blue-100 ml-5 mt-[40%] mb-10 z-50 shadow-lg" />
        </a>

        <div className='flex justify-center'>
          <HeroSection />
        </div>

        {/* Section: Service Cards */}
        <div className="flex flex-col justify-center items-center mt-10 mb-20 gap-10">
          <div className={`mb-12 ${isInView ? 'animate' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-gray-950" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Catalogue</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-950 tracking-tighter">
              Nos services <br />
              <span className="text-black-400 italic">les plus demandés.</span>
            </h2>
          </div>

          <div 
            ref={ref} 
            className={`flex justify-center mt-1 gap-20 ${isInView ? 'animate [animation-delay:200ms]' : 'opacity-0'}`}
          >
            {servicees.map((service) => (
              <ServiceCard 
                key={service.title}
                icon={service.icon} 
                title={service.title}
                features={service.features} 
                link={service.link} 
              />
            ))}
          </div>
        </div>

        {/* Section: How It Works */}
        <div id='ccm' ref={ref2} className={`mt-60 ${isInView2 ? 'animate' : 'opacity-0'}`}>
          <Howitworks />
        </div>

        {/* Section: Stats/CountUp */}
        <div ref={ref3} className={`w-full py-20 ${isInView3 ? 'animate' : 'opacity-0'}`}>
          <div className='max-w-7xl mx-auto px-6 py-20'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-25 md:gap-y-0 relative">
              {countUp.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="flex flex-col items-center justify-center px-4 relative group">
                    {index !== countUp.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-[1px] bg-gray-200" />
                    )}
                    <div className="mb-6 transition-transform duration-500 group-hover:-translate-y-2">
                      <IconComponent className="w-8 h-8 text-gray-950 opacity-80" />
                    </div>
                    <div className="flex items-center gap-1">
                      <CountUp
                        to={stat.to}
                        from={0}
                        duration={2.5}
                        separator=","
                        className="text-7xl lg:text-8xl font-black text-gray-950 tracking-[-0.05em]"
                      />
                      <span className="text-blue-600 font-black text-3xl lg:text-4xl">+</span>
                    </div>
                    <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs mt-6">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section: FAQ */}
        <div id='FAQ' ref={ref4} className={`transition-all ${isInView4 ? 'animate' : 'opacity-0'}`}>
          <FAQ />
        </div>

        <Footer />
      </div>
    </>
  )
}

export default LandingPage
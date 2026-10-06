import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const industriesData = [
  {
    id: '01', name: 'MSMEs & Entrepreneurs',
    rightTitle: "MSMES &\nENTREPRENEURS",
    descriptor: 'Business funding, working capital and growth-stage financial solutions for small and medium enterprises.',
    image: '/images/industries/01-msme.jpg'
  },
  {
    id: '02', name: 'Manufacturers',
    rightTitle: "MANUFACTURERS",
    descriptor: 'Capex financing, machinery funding and supply-chain financial solutions for manufacturing businesses.',
    image: '/images/industries/02-manufacturing.jpg'
  },
  {
    id: '03', name: 'Traders & Distributors',
    rightTitle: "TRADERS &\nDISTRIBUTORS",
    descriptor: 'Trade finance, inventory funding and logistics-related financial support for trading businesses.',
    image: '/images/industries/03-traders.jpg'
  },
  {
    id: '04', name: 'Service Businesses',
    rightTitle: "SERVICE\nBUSINESSES",
    descriptor: 'Cash flow solutions, expansion funding and operational finance for service-oriented organisations.',
    image: '/images/industries/04-service.jpg'
  },
  {
    id: '05', name: 'Real Estate Developers',
    rightTitle: "REAL ESTATE\nDEVELOPERS",
    descriptor: 'Project finance, construction funding and land acquisition support for real estate developers.',
    image: '/images/industries/05-realestate.jpg'
  },
  {
    id: '06', name: 'Infrastructure & Construction Companies',
    rightTitle: "INFRASTRUCTURE &\nCONSTRUCTION",
    descriptor: 'Equipment financing, structured guarantees and project-level financial solutions for infrastructure firms.',
    image: '/images/industries/06-infrastructure.jpg'
  },
  {
    id: '07', name: 'Professionals',
    rightTitle: "PROFESSIONALS",
    descriptor: 'Practice financing, professional expansion funding and wealth management advisory for professionals.',
    image: '/images/industries/07-professionals.jpg'
  },
  {
    id: '08', name: 'Corporate Organisations',
    rightTitle: "CORPORATE\nORGANISATIONS",
    descriptor: 'Treasury solutions, corporate finance structuring and capital management for established organisations.',
    image: '/images/industries/08-corporate.jpg'
  },
  {
    id: '09', name: 'Start-ups & Growing Enterprises',
    rightTitle: "START-UPS &\nGROWING ENTERPRISES",
    descriptor: 'Venture-stage debt, scaling capital solutions and strategic financial advisory for growing enterprises.',
    image: '/images/industries/09-startups.jpg'
  },
  {
    id: '10', name: 'Individuals & Families',
    rightTitle: "INDIVIDUALS\n& FAMILIES",
    descriptor: 'Wealth advisory, portfolio management and comprehensive insurance solutions for individuals and families.',
    image: '/images/industries/10-individuals.jpg'
  },
];

const IndustryDirectory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    // Only run intersection observer on desktop
    if (window.innerWidth < 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0
      }
    );

    const currentRefs = itemRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="bg-[#0A9B73] pt-[100px] lg:pt-[160px] pb-[20px] lg:pb-[40px] relative">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-[5vw]">
        
        {/* ─── Section Intro (Top Center) ─── */}
        <div className="hidden lg:flex flex-col items-center text-center max-w-[800px] mx-auto mb-20 lg:mb-32">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-white/60"></span>
            <span className="text-white uppercase tracking-[0.16em] text-[13px] font-semibold">
              Who We Serve
            </span>
            <span className="w-8 h-[1px] bg-white/60"></span>
          </div>
          <h2 className="text-[42px] xl:text-[52px] 2xl:text-[60px] font-semibold text-white leading-[1.1] mb-6 font-heading">
            Built for different<br/>
            <span className="text-white/90">ways of doing business.</span>
          </h2>
          <p className="text-[16px] xl:text-[18px] leading-[1.6] text-white/80 font-sans max-w-[600px]">
            We work with businesses, entrepreneurs, professionals and individuals 
            across different stages, requirements and financial objectives.
          </p>
        </div>

        {/* ─── Desktop Layout (Minimal Editorial) ─── */}
        <div className="hidden lg:grid grid-cols-12 gap-10 xl:gap-12 relative max-w-[1536px] mx-auto w-full">
          
          {/* CENTER: Industry List */}
          <div className="col-span-5 xl:col-span-4 relative z-10 pb-[20vh]">
            <div className="flex flex-col">
              {/* Top Divider */}
              <div className="w-full h-[1px] bg-white/20" />
              
              {industriesData.map((ind, i) => {
                const isActive = activeIndex === i;
                return (
                  <div 
                    key={ind.id}
                    ref={el => itemRefs.current[i] = el}
                    data-index={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="relative cursor-pointer group flex flex-col justify-center py-[60px] xl:py-[80px]"
                  >
                     <div className="flex gap-5 xl:gap-6 items-start">
                       <span className={`mt-2 xl:mt-3 text-[14px] xl:text-[16px] font-semibold tabular-nums transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40'}`}>
                         {ind.id}
                       </span>
                       <h3 
                         className={`text-[48px] xl:text-[56px] 2xl:text-[68px] font-semibold font-heading leading-[1.05] tracking-tight transition-all duration-500 ease-out origin-left ${
                           isActive 
                             ? 'text-white opacity-100 scale-100 xl:scale-[1.02]' 
                             : 'text-white opacity-40 scale-100'
                         }`}
                       >
                         {ind.name}
                       </h3>
                    </div>

                    {/* Bottom Divider */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px]">
                       <div className="w-full h-full bg-white/20 transition-opacity duration-500" />
                       <div 
                         className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out"
                         style={{ width: isActive ? '100%' : '0%' }}
                       />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Fixed Image Area */}
          <div className="col-span-7 xl:col-span-8 relative pointer-events-none pl-10 xl:pl-20">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="w-full aspect-[3/2] overflow-hidden rounded-[24px] bg-[#e9ebe8] relative shadow-lg">
                <AnimatePresence>
                   <motion.img 
                     key={activeIndex}
                     src={industriesData[activeIndex].image}
                     alt={industriesData[activeIndex].name}
                     initial={{ opacity: 0, x: 30 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 30 }}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                     className="absolute inset-0 w-full h-full object-cover"
                   />
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* ─── Mobile Layout (Vertical List) ─── */}
        <div className="block lg:hidden w-full">
           <div className="mb-16">
              {/* Mobile Intro */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[1px] bg-white/60"></span>
                <span className="text-white uppercase tracking-[0.16em] text-[12px] font-semibold">
                  Who We Serve
                </span>
              </div>
              <h2 className="text-[40px] font-semibold text-white leading-[1.05] mb-6 font-heading">
                Built for different<br/>
                <span className="text-white/90">ways of doing business.</span>
              </h2>
              <p className="text-[16px] leading-[1.6] text-white/80 font-sans">
                We work with businesses, entrepreneurs, professionals and individuals 
                across different stages, requirements and financial objectives.
              </p>
           </div>

           <div className="flex flex-col">
              <div className="w-full h-[1px] bg-white/20" />
              
              {industriesData.map((ind) => (
                 <div key={ind.id} className="py-10 relative">
                    <div className="flex gap-4 items-start mb-8">
                       <span className="mt-1.5 text-[14px] font-semibold tabular-nums text-white/70">
                         {ind.id}
                       </span>
                       <h3 className="text-[36px] md:text-[44px] font-semibold text-white font-heading leading-[1.1] tracking-tight">
                         {ind.name}
                       </h3>
                    </div>
                    
                    <div className="w-full aspect-video bg-white/10 overflow-hidden mb-4 rounded-2xl">
                       <img 
                         src={ind.image}
                         alt={ind.name}
                         className="w-full h-full object-cover"
                         loading="lazy"
                       />
                    </div>

                    {/* Bottom Divider */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
                 </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default IndustryDirectory;

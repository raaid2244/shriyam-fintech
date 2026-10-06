import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { whoWeServeSegments } from '../../data/aboutData';

const WhoWeAreFor = () => {
  const shouldReduceMotion = useReducedMotion();

  // Entrance animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05 // 50ms stagger
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F7F8F6] pt-[140px] pb-[150px] lg:pt-[170px] lg:pb-[180px]">
      
      {/* OPTIONAL LARGE BACKGROUND TYPOGRAPHY */}
      <div 
        className="absolute top-[40%] left-[-2%] text-[180px] xl:text-[260px] font-heading font-bold text-[#06152F] opacity-[0.025] pointer-events-none select-none z-0 tracking-tighter"
        aria-hidden="true"
      >
        SPECTRUM
      </div>

      <div className="relative z-10 max-w-[1440px] xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER AREA */}
        <motion.div 
          className="lg:w-[60%] mb-[90px] lg:mb-[120px]"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center mb-8 lg:mb-10">
            <div className="w-[30px] md:w-[40px] h-[1px] bg-[#0A9B73] mr-4 md:mr-5"></div>
            <p className="text-[#0A9B73] font-heading font-semibold text-[13px] md:text-[15px] uppercase tracking-[0.16em]">
              CLIENT SPECTRUM
            </p>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-[#06152F] font-heading font-semibold text-[44px] md:text-[64px] lg:text-[76px] leading-[1] md:leading-[1.02] tracking-[-0.035em] mb-6 md:mb-8">
            Built for Different Financial<br className="hidden md:block" /> Journeys.
          </h2>
          
          {/* Description */}
          <p className="text-[#64748B] font-sans text-[18px] md:text-[20px] leading-[1.65] max-w-[700px] xl:max-w-[800px]">
            From growing enterprises to corporate institutions and individuals seeking protection and structured capital.
          </p>
        </motion.div>

        {/* LIST AREA */}
        <div className="w-full mt-12 lg:mt-20">
          <motion.div 
            variants={shouldReduceMotion ? {} : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-10 lg:gap-14"
          >
            {whoWeServeSegments.map((segment, idx) => (
              <motion.div
                key={segment.id}
                variants={shouldReduceMotion ? {} : itemVariants}
                className="flex w-full"
              >
                {/* Desktop Stagger Spacer */}
                <div 
                  className="hidden lg:block shrink-0" 
                  style={{ width: `min(${idx * 6}vw, ${idx * 60}px)` }} 
                />
                {/* Mobile Stagger Spacer */}
                <div 
                  className="lg:hidden shrink-0" 
                  style={{ width: `${idx * 12}px` }} 
                />
                
                {/* Content Block */}
                <div className="flex-1 lg:flex-none flex flex-col group w-full lg:w-auto lg:min-w-[480px] xl:min-w-[550px]">
                  
                  {/* Number */}
                  <div className="text-[#0A9B73] font-heading font-semibold text-[13px] md:text-[15px] tracking-[0.12em] mb-2">
                    {segment.id}
                  </div>
                  
                  {/* Title & Arrow */}
                  <div className="flex items-center justify-between border-b border-[rgba(6,21,47,0.14)] pb-4 lg:pb-6 group-hover:border-[rgba(6,21,47,0.3)] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <h3 className="text-[#06152F] group-hover:text-[#0A9B73] font-heading font-medium md:font-semibold text-[24px] md:text-[32px] lg:text-[36px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-[12px] pr-6 md:pr-12">
                      {segment.name}
                    </h3>
                    
                    {/* Arrow */}
                    <div className="text-[#0A9B73] text-[20px] lg:text-[22px] font-light transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-[8px]">
                      →
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default WhoWeAreFor;

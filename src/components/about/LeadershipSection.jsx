import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const DIRECTORS = [
  { id: '01', name: 'S. Sathyanarayanan', role: 'DIRECTOR' },
  { id: '02', name: 'Venkatramanan', role: 'DIRECTOR' },
  { id: '03', name: 'Vadivel', role: 'DIRECTOR' },
];

const DirectorCard = ({ director, index, hoveredIndex, setHoveredIndex, shouldReduceMotion }) => {
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full relative h-[440px] md:h-[500px] overflow-visible group"
    >
      <div 
        className="w-full h-full relative overflow-hidden rounded-[4px] cursor-pointer"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          opacity: isOtherHovered ? 0.85 : 1,
          transition: 'opacity 500ms ease-out'
        }}
      >
        {/* IMAGE / PLACEHOLDER REVEAL */}
        <motion.div
          variants={shouldReduceMotion ? {} : imageVariants}
          className="absolute inset-0 w-full h-full bg-[#E2E8F0] overflow-hidden"
        >
          <div className="w-full h-full transform scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            {/* PLACEHOLDER DIV FOR ACTUAL PHOTO */}
            {/* <!-- /assets/directors/s-sathyanarayanan.jpg --> */}
            <div className="w-full h-full bg-[#CBD5E1]" /> 
          </div>
          
          {/* Subtle green tint overlay */}
          <div 
            className="absolute inset-0 bg-[rgba(10,155,115,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-10 pointer-events-none"
          />

          {/* Subtle dark navy gradient at bottom */}
          <div 
            className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[rgba(6,21,47,0.85)] via-[rgba(6,21,47,0.3)] to-transparent z-20 pointer-events-none"
          />
        </motion.div>

        {/* OVERLAYS AND TEXT */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
          
          {/* Text bottom */}
          <div 
            className="flex flex-col transform translate-y-0 group-hover:-translate-y-3 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          >
            <h3 
              className="text-white font-heading font-semibold"
              style={{ fontSize: 'clamp(24px, 2vw, 28px)', letterSpacing: '-0.01em', lineHeight: 1.1 }}
            >
              {director.name}
            </h3>
            <span 
              className="text-[#0A9B73] group-hover:text-[#0FC1AB] transition-colors duration-700 font-sans font-medium uppercase mt-2 block"
              style={{ fontSize: '12px', letterSpacing: '0.18em' }}
            >
              {director.role}
            </span>
          </div>
        </div>
        
        {/* Bottom border wipe */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] z-40 bg-transparent pointer-events-none">
          <div 
            className="h-full bg-[#0A9B73] w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
};

const LeadershipSection = () => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section ref={sectionRef} className="bg-[#F7F8F6] py-24 md:py-32 w-full">
      <div className="max-w-[1400px] w-[84%] md:w-[88%] mx-auto flex flex-col">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <span className="font-heading font-medium text-[#0A9B73] uppercase tracking-[0.2em] text-[12px] block mb-4">
            CORPORATE GOVERNANCE
          </span>
          <h2 className="text-[#06152F] font-heading font-semibold text-[32px] md:text-[40px] mb-4">
            OUR DIRECTORS
          </h2>
          <p className="text-[#64748B] font-sans text-[17px] md:text-[19px] max-w-[600px] leading-relaxed">
            Leadership behind a relationship-driven approach to financial solutions.
          </p>
        </motion.div>

        {/* PHOTO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {DIRECTORS.map((director, index) => (
            <DirectorCard 
              key={director.id} 
              director={director} 
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;

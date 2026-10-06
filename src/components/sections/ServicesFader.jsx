import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionEyebrow from '../ui/SectionEyebrow';

const FaderRow = ({ text, color, textColor = "#111111", defaultWidth = 30 }) => {
  const xValue = useMotionValue(defaultWidth);
  const width = useSpring(xValue, { stiffness: 120, damping: 20, mass: 1 });
  
  const containerRef = useRef(null);
  
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    xValue.set(percentage);
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-[18vh] md:h-[22vh] lg:h-[26vh] cursor-ew-resize border-b border-white/20 select-none flex items-center bg-[#0A9B73] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center">
        <h2 className="text-[8vw] md:text-[5.5vw] font-heading font-black italic uppercase text-white pl-6 pr-12 md:pl-16 md:pr-24 tracking-tighter leading-[0.9]">
          {text}
        </h2>
      </div>

      <motion.div 
        className="absolute top-0 left-0 h-full overflow-hidden flex items-center"
        style={{ 
          width: useMotionTemplate`${width}%`,
          backgroundColor: color 
        }}
      >
         <div className="min-w-[100vw] h-full flex items-center">
           <h2 
             className="text-[8vw] md:text-[5.5vw] font-heading font-black italic uppercase pl-6 pr-12 md:pl-16 md:pr-24 tracking-tighter leading-[0.9]" 
             style={{ color: textColor }}
           >
              {text}
           </h2>
         </div>
      </motion.div>
      
      <motion.div
         className="absolute top-1/2 -translate-y-1/2 w-10 md:w-14 h-[60%] bg-[#000000] rounded-l-lg border-l-2 border-t-2 border-b-2 shadow-2xl flex flex-col items-center justify-center z-10"
         style={{ 
           left: useMotionTemplate`calc(${width}% - clamp(2.5rem, 3.5vw, 3.5rem))`,
           borderColor: color
         }} 
      >
        <Link 
          to="/solutions"
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer pointer-events-auto group"
        >
          <ArrowRight className="text-[#0A9B73] w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  )
};

export default function ServicesFader() {
  return (
    <section className="w-full bg-[#0A9B73] py-24 flex flex-col justify-center">
      <div className="w-full flex flex-col items-center mb-20 px-6 gap-6">
        <SectionEyebrow text="What We Do" color="text-white" lineColor="bg-white" align="center" className="mb-0" />
        
        <h3 className="font-heading text-white text-center text-3xl md:text-5xl font-bold tracking-tight max-w-4xl">
          Comprehensive Financial Solutions
        </h3>
        
        <p className="font-sans text-white/90 text-center text-sm md:text-base leading-relaxed max-w-2xl">
          Six core pillars of financial expertise, engineered to build resilience, drive growth, and protect your enterprise in modern markets.
        </p>
      </div>

      <div className="w-full flex flex-col border-t border-white/20">
        <FaderRow 
          text="Corporate & Business Loans" 
          color="#9485FA" 
          textColor="#111111"
          defaultWidth={15}
          initialReading="-4.2"
        />
        <FaderRow 
          text="Loan Against Property & Secured Funding" 
          color="#FF4D38" 
          textColor="#111111"
          defaultWidth={30}
          initialReading="-1.8"
        />
        <FaderRow 
          text="Trade Finance & Working Capital" 
          color="#FFBA00" 
          textColor="#111111"
          defaultWidth={45}
          initialReading="+0.5"
        />
        <FaderRow 
          text="Project & Real Estate Funding" 
          color="#38BDF8" 
          textColor="#111111"
          defaultWidth={60}
          initialReading="+2.1"
        />
        <FaderRow 
          text="Government & Institutional Finance" 
          color="#A3E635" 
          textColor="#111111"
          defaultWidth={75}
          initialReading="+4.3"
        />
        <FaderRow 
          text="Insurance & Risk Management" 
          color="#F472B6" 
          textColor="#111111"
          defaultWidth={90}
          initialReading="+5.8"
        />
      </div>
    </section>
  );
}

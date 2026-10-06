import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { capabilities } from './whatWeDoData';

const HorizontalTimeline = ({ scrollProgress, activeIndex }) => {
  // Map scroll buckets (0.15, 0.30, 0.45, 0.60, 0.75) strictly to timeline node positions (0.2, 0.4, 0.6, 0.8, 1.0)
  const lineProgress = useTransform(
    scrollProgress,
    [0, 0.15, 0.30, 0.45, 0.60, 0.75, 1],
    [0, 0.2, 0.4, 0.6, 0.8, 1, 1]
  );

  return (
    <div className="w-full select-none pt-4 pb-6">
      
      {/* End Labels Row: REQUIREMENT (Left) & GROWTH (Right) */}
      <div className="flex justify-between items-center w-full mb-8 sm:mb-12 px-1">
        <span className="font-heading font-semibold text-[10px] sm:text-[11px] tracking-[0.25em] text-[#64748B] uppercase">
          REQUIREMENT
        </span>
        <span 
          className={`font-heading font-semibold text-[10px] sm:text-[11px] tracking-[0.25em] uppercase transition-colors duration-700
            ${activeIndex === 5 ? 'text-[#0A9B73]' : 'text-[#64748B]'}`}
        >
          GROWTH
        </span>
      </div>

      {/* Main Timeline Track Container */}
      <div className="relative w-full">
        
        {/* The Background Line */}
        <div className="absolute top-[28px] sm:top-[32px] left-0 right-0 h-[1px] bg-[#E2E8F0] z-0" />
        
        {/* Continuous Emerald Progress Line perfectly synced to nodes */}
        <motion.div 
          className="absolute top-[28px] sm:top-[32px] left-0 right-0 h-[1px] bg-[#0A9B73] origin-left z-0"
          style={{ scaleX: lineProgress }}
        />

        {/* 6 Nodes across the line */}
        <div className="relative z-10 flex justify-between items-start w-full">
          {capabilities.map((cap, i) => {
            const isActive = i === activeIndex;
            const isCompleted = i < activeIndex;

            return (
              <div 
                key={cap.number} 
                className="flex flex-col items-center w-[54px] sm:w-[100px] lg:w-[140px]"
              >
                {/* Number Above Node */}
                <span 
                  className={`mb-4 sm:mb-5 font-heading font-medium text-[12px] sm:text-[14px] tracking-widest transition-colors duration-500
                    ${isActive ? 'text-[#0A9B73]' : isCompleted ? 'text-[#06152F]' : 'text-[#94A3B8]'}`}
                >
                  {cap.number}
                </span>

                {/* Node Dot Container */}
                <div className="relative flex items-center justify-center h-4 w-4">
                  {/* Circular Dot */}
                  <div 
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-500 z-10
                      ${isActive ? 'bg-[#0A9B73]' : isCompleted ? 'bg-[#0A9B73]' : 'bg-[#CBD5E1]'}`}
                  />
                </div>

                {/* Service Title Below Node */}
                <span 
                  className={`mt-4 sm:mt-5 font-heading text-[11px] sm:text-[13px] lg:text-[17px] leading-[1.3] text-center uppercase transition-colors duration-500 whitespace-pre-line
                    ${isActive ? 'font-semibold text-[#06152F]' : 'font-medium text-[#64748B]'}`}
                >
                  {cap.title.replace(' & ', ' &\n')}
                </span>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default HorizontalTimeline;

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const STAGES = [
  { id: 'requirement', label: 'REQUIREMENT' },
  { id: 'funding', label: 'FUNDING' },
  { id: 'protection', label: 'PROTECTION' },
  { id: 'growth', label: 'GROWTH' },
  { id: 'risk', label: 'RISK MANAGEMENT' },
  { id: 'final', label: 'A SOLUTION\nSTRUCTURED AROUND YOU', isFinal: true },
];

const PathwayNode = ({ stage, isActive }) => {
  const isFinal = stage.isFinal;
  const isReq = stage.id === 'requirement';

  if (isFinal) {
    return (
      <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-[#F7F8F6] py-3 px-4 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'}`}>
        <div className="text-[24px] lg:text-[34px] font-semibold text-[#06152F] leading-tight mb-3 font-heading">
          A SOLUTION<br/>
          <span className="text-[#0A9B73]">STRUCTURED AROUND YOU</span>
        </div>
        <div className="text-[#475569] text-[16px] lg:text-[18px] max-w-[420px] font-sans leading-[1.6]">
          Because the right financial solution begins with <span className="text-[#0A9B73]">understanding the requirement.</span>
        </div>
      </div>
    );
  }

  const baseClass = isReq 
    ? 'text-[16px] lg:text-[18px] uppercase tracking-[0.16em] font-semibold' 
    : 'text-[28px] md:text-[38px] lg:text-[46px] font-semibold font-heading';
  
  if (isReq) {
    return (
      <div className={`relative z-10 flex flex-col items-center text-center bg-[#F7F8F6] py-3 ${baseClass} ${isActive ? 'text-[#06152F]' : 'text-[#94A3B8]'} transition-colors duration-500`}>
        {stage.label}
      </div>
    );
  }

  return (
    <div className={`relative z-10 flex flex-col items-center text-center bg-[#F7F8F6] py-3 ${baseClass}`}>
      {/* Base Layer */}
      <div className="text-[#CBD5E1]">
        {stage.label}
      </div>
      
      {/* Overlay Green Wipe Layer */}
      <div 
        className="absolute top-3 left-0 w-full text-center text-[#0A9B73] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
        style={{ clipPath: isActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
      >
        {stage.label}
      </div>
    </div>
  );
};

const FinancialPerspective = () => {
  const desktopContainerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  
  const [desktopActiveStage, setDesktopActiveStage] = useState(0);
  const [mobileActiveStage, setMobileActiveStage] = useState(0);

  // Desktop Scroll Tracker
  const { scrollYProgress: desktopScroll } = useScroll({
    target: desktopContainerRef,
    offset: ["start 10%", "end 90%"]
  });

  useMotionValueEvent(desktopScroll, "change", (latest) => {
    let index = Math.floor(latest * 6);
    if (index > 5) index = 5;
    if (index < 0) index = 0;
    if (index !== desktopActiveStage) setDesktopActiveStage(index);
  });

  // Mobile Scroll Tracker
  const { scrollYProgress: mobileScroll } = useScroll({
    target: mobileContainerRef,
    offset: ["start 60%", "end 70%"]
  });

  useMotionValueEvent(mobileScroll, "change", (latest) => {
    let index = Math.floor(latest * 6);
    if (index > 5) index = 5;
    if (index < 0) index = 0;
    if (index !== mobileActiveStage) setMobileActiveStage(index);
  });

  return (
    <section className="bg-[#F7F8F6] relative w-full overflow-hidden">
      
      {/* ========================================================
          DESKTOP LAYOUT (Sticky Scroll)
          ======================================================== */}
      <div className="hidden md:block relative w-full min-h-[180vh]" ref={desktopContainerRef}>
        <div className="sticky top-0 h-screen flex items-center justify-center py-20">
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-[8vw] flex items-center justify-between h-[90vh] max-h-[900px]">
            
            {/* LEFT COLUMN: INTRO */}
            <div className="w-[50%] flex flex-col justify-center pr-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[1px] bg-[#0A9B73]"></span>
                <span className="text-[#0A9B73] uppercase tracking-[0.16em] text-[12px] lg:text-[14px] font-semibold">
                  Financial Perspective
                </span>
              </div>
              
              <h2 className="text-[48px] lg:text-[clamp(48px,5.5vw,78px)] font-semibold text-[#06152F] leading-[1.02] mb-8 font-heading tracking-[-0.04em]">
                Every financial requirement<br/>
                starts with a <span className="text-[#0A9B73]">different need.</span>
              </h2>
              
              <p className="max-w-[500px] text-[18px] lg:text-[20px] leading-[1.6] text-[#475569] font-sans">
                We look beyond individual financial products to understand the 
                requirement as a whole, bringing together the relevant funding, 
                protection and risk-management solutions around one relationship.
              </p>
            </div>

            {/* RIGHT COLUMN: PATHWAY */}
            <div className="w-[45%] h-full relative flex justify-center">
              
              {/* Pathway Container */}
              <div className="relative flex flex-col items-center justify-between h-[85%] my-auto py-8 w-full">
                
                {/* Background Line */}
                <div className="absolute top-[40px] bottom-[40px] left-1/2 -translate-x-1/2 w-[1px] bg-[#D8DEE5]" />
                
                {/* Active Green Line */}
                <div 
                  className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[1px] bg-[#0A9B73] transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-top"
                  style={{ height: `calc(${(desktopActiveStage / 5) * 100}% - 80px)` }} 
                />

                {/* Nodes */}
                {STAGES.map((stage, i) => (
                  <PathwayNode key={stage.id} stage={stage} isActive={desktopActiveStage >= i} />
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 font-sans text-[13px] tracking-widest font-medium">
                <span className="text-[#0A9B73]">0{desktopActiveStage + 1}</span>
                <span className="text-[#94A3B8] mx-1">/</span>
                <span className="text-[#94A3B8]">06</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE LAYOUT
          ======================================================== */}
      <div className="md:hidden flex flex-col px-4 py-24 w-full">
        {/* Intro */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-[1px] bg-[#0A9B73]"></span>
            <span className="text-[#0A9B73] uppercase tracking-[0.16em] text-[12px] font-semibold">
              Financial Perspective
            </span>
          </div>
          
          <h2 className="text-[42px] font-semibold text-[#06152F] leading-[1.05] mb-6 font-heading tracking-tight">
            Every financial requirement<br/>
            starts with a <span className="text-[#0A9B73]">different need.</span>
          </h2>
          
          <p className="text-[16px] leading-[1.65] text-[#475569] font-sans">
            We look beyond individual financial products to understand the 
            requirement as a whole, bringing together the relevant funding, 
            protection and risk-management solutions around one relationship.
          </p>
        </div>

        {/* Mobile Pathway */}
        <div className="relative flex flex-col items-center text-center w-full min-h-[700px] py-6" ref={mobileContainerRef}>
          {/* Background Line */}
          <div className="absolute top-[30px] bottom-[30px] left-1/2 -translate-x-1/2 w-[1px] bg-[#D8DEE5]" />
          
          {/* Active Line (driven by mobile scroll progress) */}
          <div 
            className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[1px] bg-[#0A9B73] transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-top"
            style={{ height: `calc(${(mobileActiveStage / 5) * 100}% - 60px)` }} 
          />

          <div className="flex flex-col justify-between h-[700px] w-full relative z-10">
            {STAGES.map((stage, i) => (
              <PathwayNode key={stage.id} stage={stage} isActive={mobileActiveStage >= i} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default FinancialPerspective;

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { valueProposition } from '../../data/aboutData';
import SectionEyebrow from '../ui/SectionEyebrow';

const ValueProposition = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"]
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveIndex(3); // All active if reduced motion
    }
  }, [shouldReduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.5) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    <section 
      ref={containerRef}
      className="bg-[#F7F8F6] pt-[100px] pb-[100px] lg:pt-[140px] lg:pb-[150px]"
    >
      <div className="max-w-[1440px] xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-[60px] lg:gap-[80px] xl:gap-[120px]">
          
          {/* LEFT AREA */}
          <div className="lg:w-[45%] xl:w-[40%]">
            <SectionEyebrow text={valueProposition.eyebrow} center={false} className="mb-10 lg:mb-12" />
            
            <h2 className="font-heading font-semibold leading-[1] md:leading-[1.02] tracking-[-0.04em] mb-8">
              <div className="text-[#06152F] text-[44px] md:text-[56px] xl:text-[64px] mb-2 md:mb-3">
                <span className="block">Your Financial</span>
                <span className="block">Growth.</span>
              </div>
              <div className="text-[#0A9B73] text-[44px] md:text-[56px] xl:text-[64px]">
                <span className="block">Our Strategic</span>
                <span className="block">Support.</span>
              </div>
            </h2>
            
            <p className="text-[#475569] font-sans text-[16px] md:text-[18px] leading-[1.65] max-w-[500px]">
              {valueProposition.body}
            </p>
          </div>

          {/* RIGHT AREA - FOUR PRINCIPLES */}
          <div className="lg:w-[55%] xl:w-[60%] w-full flex flex-col lg:pt-4">
            {/* Top border for the first item */}
            <div className="w-full h-[1px] bg-[rgba(6,21,47,0.14)]" />
          
          {valueProposition.journeyStages.map((stage, idx) => {
            const isScrollActive = idx === activeIndex;
            const isHoverActive = idx === hoverIndex;
            // Hover takes precedence: if we are hovering over any item, only the hovered item is active.
            // Otherwise, fall back to the scroll-driven active index.
            const isActive = (hoverIndex !== null ? isHoverActive : isScrollActive) || (shouldReduceMotion && idx <= 3);
            const transitionClass = shouldReduceMotion ? '' : 'transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

            return (
              <div 
                key={stage.step}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`group relative w-full border-b flex flex-col md:flex-row md:items-start cursor-pointer ${transitionClass} ${isActive ? 'py-8 lg:py-12 border-[#0A9B73] opacity-100' : 'py-6 lg:py-8 border-[rgba(6,21,47,0.14)] opacity-[0.5] hover:opacity-[0.85]'}`}
              >
                
                {/* Desktop layout elements */}
                <div className="flex flex-col md:flex-row md:items-start w-full">
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col pl-2 md:pl-4">
                    <h3 className={`text-[24px] md:text-[32px] lg:text-[36px] font-heading font-semibold uppercase ${transitionClass} ${isActive ? 'text-[#06152F]' : 'text-[#06152F]'}`}>
                      {stage.label}
                    </h3>
                    
                    {/* Expandable Description */}
                    <div className={`grid ${transitionClass} ${isActive ? 'grid-rows-[1fr] mt-2 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0 md:opacity-[0.35]'}`}>
                      <div className="overflow-hidden">
                        <p className="text-[#64748B] text-[15px] md:text-[16px] font-sans leading-relaxed">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className={`hidden md:block text-[20px] md:text-[22px] font-light text-[#0A9B73] pt-2 ${transitionClass} ${isActive ? 'translate-x-0' : '-translate-x-4 opacity-0'}`}>
                    →
                  </div>

                </div>
                
                {/* Mobile Arrow */}
                <div className={`md:hidden absolute right-0 top-8 text-[18px] text-[#0A9B73] ${transitionClass} ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
                  →
                </div>

              </div>
            );
          })}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ValueProposition;

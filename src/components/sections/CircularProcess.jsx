import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence, useMotionValue } from 'framer-motion';
import Logo from '../ui/Logo';

const stages = [
  { num: "01", title: "UNDERSTAND", desc: "We begin by understanding the client's financial requirement, business situation, objectives and priorities." },
  { num: "02", title: "ANALYSE", desc: "We analyse the requirement, financial position and relevant considerations to understand the appropriate financial direction." },
  { num: "03", title: "STRUCTURE", desc: "We structure an appropriate financial approach around the requirement and funding objective." },
  { num: "04", title: "CONNECT", desc: "We connect clients with suitable lending and financial institutions based on the requirement." },
  { num: "05", title: "SUPPORT", desc: "We remain involved through the process, providing professional support and building long-term relationships." }
];

const CircularProcess = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80px", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  const circleRotation = useTransform(smoothProgress, [0, 1], [0, -360]);
  
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let index = Math.round(latest * 5);
    if (index > 4) index = 4;
    setActiveIndex(index);
  });

  return (
    <section className="bg-[#F7F8F6] relative z-10 pt-24 md:pt-32" aria-label="Our Approach">
      
      {/* ── NORMAL FLOW INTRO ── */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="text-center max-w-4xl mx-auto px-6 mb-8 md:mb-12 relative z-20"
      >
        <motion.span 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
          className="font-heading font-semibold text-[#0A9B73] uppercase tracking-[0.15em] text-[11px] md:text-sm block mb-4"
        >
          THE SHRIYAM APPROACH
        </motion.span>
        <motion.h2 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
          className="font-heading font-bold text-[#06152F] text-3xl md:text-4xl lg:text-[44px] leading-[1.2] mb-6 md:mb-8"
        >
          A PROCESS BUILT AROUND<br className="hidden md:block" /> THE REQUIREMENT.
        </motion.h2>
        <motion.p 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
          className="text-[#475569] text-sm md:text-base leading-relaxed font-sans max-w-3xl mx-auto"
        >
          “We understand each requirement, analyse the financial context, structure an appropriate approach, connect clients with suitable financial institutions, and remain involved through the process.”
        </motion.p>
      </motion.div>

      {/* ── SCROLL-CONTROLLED ANIMATION TRACK ── */}
      <div ref={containerRef} className="relative h-[200vh]">
        
        {/* STICKY VIEWPORT */}
        <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center overflow-hidden py-4 md:py-8">
          
          {/* CIRCULAR COMPOSITION */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-full aspect-square flex-shrink-0 mt-8 md:mt-14" 
            style={{ maxWidth: 'min(800px, 70vh, calc(100vw - 110px))' }}
          >
            
            {/* 1. Center Shriyam Logo (Fixed) - Removed duplicate text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <div className="w-auto scale-[0.8] md:scale-100 md:w-40 lg:w-48">
                <Logo theme="light" /> 
              </div>
            </div>



            {/* 3. Rotating Container */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              style={{ rotate: circleRotation }}
            >
              {/* SVG Tracks */}
              <svg 
                viewBox="0 0 104 104" 
                className="absolute inset-0 w-full h-full overflow-visible"
                style={{ transform: "rotate(-90deg)" }}
              >
                {/* Neutral Track */}
                <circle cx="52" cy="52" r="50" stroke="#CBD5E1" strokeWidth="0.3" fill="none" opacity="0.6" />
                
                {/* Active Green Trail */}
                <motion.circle 
                  cx="52" cy="52" r="50" 
                  stroke="#0A9B73" strokeWidth="0.6" 
                  fill="none" strokeLinecap="round"
                  style={{ pathLength: smoothProgress }}
                />
              </svg>

              {/* Nodes */}
              {stages.map((step, i) => {
                const baseAngle = i * 72;
                const counterRotation = useTransform(circleRotation, (r) => -r - baseAngle);
                const isPassed = i <= activeIndex;

                return (
                  <div 
                    key={i}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${baseAngle}deg)` }}
                  >
                    {/* Node Center exactly on the orbit edge */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      
                      {/* Counter-rotating container keeps text upright */}
                      <motion.div 
                        style={{ rotate: counterRotation }}
                        className="relative flex flex-col items-center justify-center pointer-events-auto"
                      >
                        {/* Node marker dot */}
                        <div 
                          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${isPassed ? 'bg-[#0A9B73]' : 'bg-[#CBD5E1]'}`} 
                        />
                        
                        <span 
                          className="font-heading font-bold text-[11px] md:text-sm lg:text-lg mt-1 md:mt-1.5 transition-colors duration-300 whitespace-nowrap bg-[#F7F8F6] md:bg-transparent px-1 md:px-0" 
                          style={{ color: isPassed ? "#06152F" : "#CBD5E1" }}
                        >
                          {step.title}
                        </span>
                      </motion.div>
                      
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </motion.div>

          {/* ACTIVE DESCRIPTION (Stationary Bottom) */}
          <div className="shrink-0 w-full px-6 h-20 md:h-24 flex items-center justify-center relative z-20 mt-2 md:mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl mx-auto text-center"
              >
                <p className="text-[#475569] text-[13px] md:text-[15px] lg:text-base leading-relaxed font-sans">
                  {stages[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CircularProcess;

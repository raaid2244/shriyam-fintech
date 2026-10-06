import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { whyChooseShriyam } from '../../data/aboutData';

const WhyShriyam = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll progress through the 800vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update active index based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      whyChooseShriyam.length - 1,
      Math.max(0, Math.floor(latest * whyChooseShriyam.length))
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const active = whyChooseShriyam[activeIndex];

  // Helper to color the last word green for a premium typographic accent
  const renderTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(' ')} <span className="text-[#0A9B73]">{lastWord}</span>
        </>
      );
    }
    return <span className="text-[#0A9B73]">{title}</span>;
  };

  return (
    <section className="bg-[#F7F8F6] w-full relative">
      
      {/* ======================================================== */}
      {/* MOBILE LAYOUT (Normal Flow) */}
      {/* ======================================================== */}
      <div className="block md:hidden relative px-[6vw] py-[100px] overflow-hidden">
        
        {/* Giant Background Text for mobile */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-around items-end right-[-5vw] opacity-[0.045] py-20">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-heading font-bold text-[#06152F] text-[clamp(70px,20vw,100px)] leading-[0.82] tracking-tight text-right whitespace-nowrap mb-32">
              WHY<br/>SHRIYAM?
            </span>
          ))}
        </div>

        <div className="relative z-10">
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="flex items-center text-[#0A9B73] font-semibold text-[11px] uppercase tracking-[0.16em] mb-16"
          >
            <span className="inline-block w-[20px] h-[1px] bg-[#0A9B73] mr-4" />
            THE SHRIYAM ADVANTAGE
          </motion.div>

          <div className="flex flex-col gap-24">
            {whyChooseShriyam.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col"
              >
                <span className="text-[#0A9B73] font-sans text-[14px] tracking-[0.12em] font-semibold mb-4">
                  {item.number}
                </span>
                <h3 className="font-heading font-bold text-[#06152F] uppercase leading-[0.9] text-[44px] sm:text-[58px] mb-5">
                  {renderTitle(item.title)}
                </h3>
                <p className="text-[#64748B] text-[15px] sm:text-[17px] leading-[1.5] max-w-[400px]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP LAYOUT (Scroll Reveal) */}
      {/* ======================================================== */}
      <div 
        ref={containerRef} 
        className="hidden md:block h-[800vh] relative"
      >
        <div className="sticky top-0 h-screen min-h-[900px] w-full overflow-hidden flex items-center">
          
          {/* Giant Background Typography */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.045 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute right-[-2vw] top-[50%] -translate-y-1/2 pointer-events-none z-0"
          >
            <span className="font-heading font-bold text-[#06152F] text-[clamp(140px,15vw,240px)] leading-[0.82] tracking-tight block text-right whitespace-nowrap">
              WHY<br/>SHRIYAM?
            </span>
          </motion.div>

          <div className="relative z-10 w-full h-full flex flex-col pt-[240px] xl:pt-[280px] max-w-[1450px] mx-auto px-[8vw]">
            
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="absolute top-[120px] left-[8vw] flex items-center text-[#0A9B73] font-semibold text-[13px] uppercase tracking-[0.16em]"
            >
              <span className="inline-block w-[24px] h-[1px] bg-[#0A9B73] mr-4" />
              THE SHRIYAM ADVANTAGE
            </motion.div>

            {/* Active Content */}
            <div className="w-full max-w-[1000px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="flex flex-col items-start"
                >
                  <motion.span 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="text-[#0A9B73] font-sans text-[15px] md:text-[16px] tracking-[0.12em] font-semibold mb-6"
                  >
                    {active.number}
                  </motion.span>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="font-heading font-bold text-[#06152F] uppercase leading-[0.94] text-[72px] lg:text-[84px] xl:text-[96px] mb-8"
                  >
                    {renderTitle(active.title)}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="text-[#64748B] text-[17px] md:text-[19px] leading-[1.5] max-w-[450px]"
                  >
                    {active.description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Subtle Progress Indicator */}
            <div className="absolute right-[7vw] top-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="text-[#0A9B73] font-sans text-[13px] tracking-[0.1em] font-semibold mb-5">
                {active.number}
              </span>
              <div className="w-[2px] h-[140px] bg-[rgba(6,21,47,0.12)] relative rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-[#0A9B73] rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: `${((activeIndex + 1) / whyChooseShriyam.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyShriyam;

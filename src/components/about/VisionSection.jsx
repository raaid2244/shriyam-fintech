import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate } from 'framer-motion';

const VisionSectionContent = () => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for the entire section to drive the background wipe
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end end"]
  });

  // Background wipe: inset right from 100% to 0% over [0, 0.7] of scroll
  const rightInset = useTransform(scrollYProgress, [0, 0.7], [100, 0]);
  const greenClipPath = useMotionTemplate`inset(0 ${rightInset}% 0 0)`;

  // Label color transitions naturally as the wipe passes the left side (~10%)
  const labelColor = useTransform(scrollYProgress, [0.05, 0.15], ["#06152F", "#F7F8F6"]);

  // Vision text reveals exactly as the wipe progresses over it
  const visionOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const visionY = useTransform(scrollYProgress, [0.1, 0.45], [30, 0]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#F7F8F6]">
      
      {/* THE GREEN WIPE LAYER */}
      {!shouldReduceMotion ? (
        <motion.div 
          className="absolute inset-0 bg-[#0A9B73] z-0"
          style={{ clipPath: greenClipPath }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-[#0A9B73] z-0" aria-hidden="true" />
      )}

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[6vw] lg:px-[8vw] xl:px-[10vw]">
        
        {/* VISION BLOCK */}
        <div className="min-h-[100vh] lg:min-h-[110vh] pt-[15vh] lg:pt-[18vh] flex flex-col">
          <motion.div 
            className="w-full flex flex-col items-center mb-16 lg:mb-24"
            style={shouldReduceMotion ? { color: "#F7F8F6" } : { color: labelColor }}
          >
            <p className="font-heading font-semibold text-[13px] md:text-[15px] uppercase tracking-[0.16em] mb-4">
              VISION
            </p>
            <div className="w-[30px] h-[1px] bg-current opacity-60"></div>
          </motion.div>
          
          <motion.h2 
            className="font-heading font-medium md:font-semibold text-[38px] md:text-[52px] lg:text-[64px] xl:text-[72px] leading-[1.12] md:leading-[1.1] lg:leading-[1.08] tracking-tight max-w-[1050px]"
            style={shouldReduceMotion ? { color: "#F7F8F6" } : { opacity: visionOpacity, y: visionY, color: "#F7F8F6" }}
          >
            To become a <span className="text-[#06152F] font-semibold">trusted</span> financial solutions partner for businesses and individuals by providing <span className="text-[#06152F] font-semibold">accessible</span>, <span className="text-[#06152F] font-semibold">transparent</span> and <span className="text-[#06152F] font-semibold">customised</span> financial solutions.
          </motion.h2>
        </div>

      </div>
    </section>
  );
};

const MissionSectionContent = () => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for Mission section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end end"]
  });

  // White wipe: right to left.
  const leftInset = useTransform(scrollYProgress, [0, 0.7], [100, 0]);
  const whiteClipPath = useMotionTemplate`inset(0 0 0 ${leftInset}%)`;

  // Label color transitions naturally from white to navy as wipe sweeps over it
  const labelColor = useTransform(scrollYProgress, [0.6, 0.65], ["#F7F8F6", "#06152F"]);

  // Mission text reveals exactly as the wipe progresses over it.
  // Since it's a right-to-left wipe and the text is left-aligned, we can just use the same scroll timing.
  const missionOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const missionY = useTransform(scrollYProgress, [0.1, 0.45], [30, 0]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A9B73]">
      
      {/* THE WHITE WIPE LAYER */}
      {!shouldReduceMotion ? (
        <motion.div 
          className="absolute inset-0 bg-[#F7F8F6] z-0"
          style={{ clipPath: whiteClipPath }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-[#F7F8F6] z-0" aria-hidden="true" />
      )}

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[6vw] lg:px-[8vw] xl:px-[10vw]">
        
        {/* MISSION BLOCK */}
        <div className="min-h-[100vh] lg:min-h-[110vh] pt-[15vh] lg:pt-[18vh] flex flex-col">
          <motion.div 
            className="w-full flex flex-col items-center mb-16 lg:mb-24"
            style={shouldReduceMotion ? { color: "#06152F" } : { color: labelColor }}
          >
            <p className="font-heading font-semibold text-[13px] md:text-[15px] uppercase tracking-[0.16em] mb-4">
              MISSION
            </p>
            <div className="w-[30px] h-[1px] bg-current opacity-60"></div>
          </motion.div>
          
          <motion.h2 
            className="font-heading font-medium md:font-semibold text-[38px] md:text-[52px] lg:text-[64px] xl:text-[72px] leading-[1.12] md:leading-[1.1] lg:leading-[1.08] tracking-tight max-w-[1050px]"
            style={shouldReduceMotion ? { color: "#06152F" } : { opacity: missionOpacity, y: missionY, color: "#06152F" }}
          >
            We understand <span className="text-[#0A9B73] font-semibold">financial needs</span>, structure <span className="text-[#0A9B73] font-semibold">suitable solutions</span>, and build <span className="text-[#0A9B73] font-semibold">lasting relationships</span> through transparent professional support.
          </motion.h2>
        </div>
        
      </div>
    </section>
  );
};

const VisionMissionSection = () => {
  return (
    <>
      <VisionSectionContent />
      <MissionSectionContent />
    </>
  );
};

export default VisionMissionSection;

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const PILLARS = [
  {
    id: 'funding',
    title: 'Funding',
    desc: 'Structured funding aligned with business requirements.',
  },
  {
    id: 'insurance',
    title: 'Insurance',
    desc: 'Insurance solutions designed around people and assets.',
  },
  {
    id: 'risk',
    title: 'Risk Management',
    desc: 'Solutions that help identify and manage financial exposure.',
  },
  {
    id: 'growth',
    title: 'Business Growth',
    desc: 'Strategic financial support for expanding enterprises.',
  },
];

const RightItem = ({ item, index, scrollYProgress, shouldReduceMotion }) => {
  const start = 0.5 + (index * 0.1);
  const end = start + 0.1;

  const itemClipPath = useTransform(scrollYProgress, [start, end], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const dividerWidth = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);
  const titleColor = useTransform(scrollYProgress, [start, end], ["rgba(6,21,47,0.45)", "#06152F"]);
  
  return (
    <div className="w-full relative mb-14 lg:mb-20 last:mb-0">
      
      <div className="flex flex-col">
        {/* TITLE - Smooth fade to navy/black */}
        <motion.h3 
          className="font-heading mb-3"
          style={{ 
            fontSize: 'clamp(25px, 2.5vw, 30px)',
            color: shouldReduceMotion ? '#06152F' : titleColor,
            fontWeight: 600
          }}
        >
          {item.title}
        </motion.h3>

        {/* DESCRIPTION - Green wipe */}
        <div className="relative">
          {/* Base Muted Layer */}
          <p 
            className="font-sans" 
            style={{ 
              fontSize: 'clamp(15px, 1.2vw, 17px)', 
              lineHeight: 1.5,
              color: '#94A3B8'
            }}
            aria-hidden="true"
          >
            {item.desc}
          </p>

          {/* Overlay Green Layer */}
          <motion.p 
            className="font-sans absolute inset-0 text-[#0A9B73] pointer-events-none" 
            style={{ 
              fontSize: 'clamp(15px, 1.2vw, 17px)', 
              lineHeight: 1.5,
              clipPath: shouldReduceMotion ? "inset(0 0% 0 0)" : itemClipPath
            }}
          >
            {item.desc}
          </motion.p>
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-full h-[1px] mt-8 lg:mt-10 relative" style={{ backgroundColor: 'rgba(6,21,47,0.10)' }}>
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#0A9B73]"
          style={{ width: shouldReduceMotion ? '100%' : dividerWidth }}
        />
      </div>
    </div>
  );
};

const BrandStatement = () => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"]
  });

  // Mappings for scroll progress
  const headingClipPath = useTransform(scrollYProgress, [0.0, 0.4], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const paragraphOpacity = useTransform(scrollYProgress, [0.4, 0.45], [0, 1]);
  const paragraphY = useTransform(scrollYProgress, [0.4, 0.45], [20, 0]);
  const focusOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
  const focusY = useTransform(scrollYProgress, [0.45, 0.5], [10, 0]);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#F7F8F6] w-full min-h-[780px] overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-[1400px] w-[84%] md:w-[88%] mx-auto flex flex-col">
        
        {/* TOP CENTER EYEBROW */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center w-full mb-16 lg:mb-20"
        >
          <span className="w-[30px] h-[1px] bg-[#0A9B73] mr-4 block" />
          <span className="font-heading font-medium text-[#0A9B73] uppercase tracking-[0.2em] text-[12px]">
            Who We Are
          </span>
          <span className="w-[30px] h-[1px] bg-[#0A9B73] ml-4 block" />
        </motion.div>

        {/* MAIN TWO-COLUMN AREA */}
        <div className="flex flex-col md:flex-row md:justify-between items-start w-full">
          
          {/* LEFT SIDE: Heading + Paragraph + Summary + Closing */}
          <div className="w-full md:w-[50%] lg:w-[55%] flex flex-col md:pr-12 lg:pr-20">
            
            {/* Wiping Heading */}
            <div className="relative mb-10 lg:mb-12">
              {/* Base Muted Layer */}
              <h2 
                className="font-heading"
                style={{ 
                  fontSize: 'clamp(64px, 5.5vw, 76px)',
                  fontWeight: 600,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: 'rgba(6,21,47,0.18)'
                }}
              >
                <span className="block">Finance for a</span>
                <span className="block">broader</span>
                <span className="block">perspective.</span>
              </h2>

              {/* Green Overlay Layer */}
              <motion.h2 
                className="font-heading absolute inset-0 text-[#0A9B73]"
                style={{ 
                  fontSize: 'clamp(64px, 5.5vw, 76px)',
                  fontWeight: 600,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  clipPath: shouldReduceMotion ? "inset(0 0% 0 0)" : headingClipPath
                }}
              >
                <span className="block">Finance for a</span>
                <span className="block">broader</span>
                <span className="block">perspective.</span>
              </motion.h2>
            </div>

            {/* Paragraph (Delayed Reveal) */}
            <motion.p
              className="font-sans text-[#64748B] max-w-[560px] mb-8 lg:mb-10"
              style={{ 
                fontSize: 'clamp(17px, 1.3vw, 19px)', 
                lineHeight: 1.6,
                opacity: shouldReduceMotion ? 1 : paragraphOpacity,
                y: shouldReduceMotion ? 0 : paragraphY,
                visibility: (shouldReduceMotion) ? 'visible' : undefined
              }}
            >
              Shriyam Fintech looks beyond individual financial products
              to understand the requirement as a whole. We bring together
              funding, insurance, risk-management and growth solutions to
              support businesses, professionals and individuals through
              different stages of their financial journey.
            </motion.p>
            
            {/* Focus Line (Delayed Reveal) */}
            <motion.div
              className="flex flex-col mb-16 lg:mb-20"
              style={{
                opacity: shouldReduceMotion ? 1 : focusOpacity,
                y: shouldReduceMotion ? 0 : focusY,
                visibility: (shouldReduceMotion) ? 'visible' : undefined
              }}
            >
              <span 
                className="font-sans font-semibold text-[#0A9B73] uppercase tracking-[0.12em]" 
                style={{ fontSize: 'clamp(11px, 1vw, 13px)', lineHeight: 1.5 }}
              >
                FUNDING &middot; INSURANCE &middot; RISK MANAGEMENT &middot; BUSINESS GROWTH
              </span>
            </motion.div>

            {/* CLOSING AREA */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <h3 
                  className="font-heading font-semibold"
                  style={{ 
                    fontSize: 'clamp(30px, 3vw, 38px)',
                    lineHeight: 1.05
                  }}
                >
                  <span className="block text-[#06152F]">One relationship.</span>
                  <span className="block text-[#0A9B73]">Broader possibilities.</span>
                </h3>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <p 
                  className="font-sans text-[#64748B] max-w-[560px]"
                  style={{ 
                    fontSize: 'clamp(16px, 1.3vw, 18px)',
                    lineHeight: 1.6
                  }}
                >
                  Whether you are building, protecting or expanding,
                  Shriyam Fintech brings together the right financial
                  solutions to support your financial requirements.
                </p>
              </motion.div>
            </div>
            
          </div>

          {/* RIGHT SIDE: Scroll Reveal List */}
          <div 
            className="w-full md:w-[45%] lg:w-[45%] flex flex-col mt-20 md:mt-32"
            style={{ paddingRight: 'clamp(0px, 6vw, 100px)' }}
          >
            {PILLARS.map((item, idx) => (
              <RightItem 
                key={item.id}
                item={item} 
                index={idx} 
                scrollYProgress={scrollYProgress} 
                shouldReduceMotion={shouldReduceMotion} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStatement;

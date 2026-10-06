import React from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';

const WhatWeDoClosing = ({ scrollProgress }) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Fade in at the end of the scroll sequence (88% to 98%)
  const opacity = useTransform(scrollProgress, [0.88, 0.96], [0, 1]);
  const y = useTransform(scrollProgress, [0.88, 0.96], [shouldReduceMotion ? 0 : 8, 0]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="mt-6 sm:mt-10 max-w-[650px]"
    >
      <p className="font-heading font-semibold text-[16px] sm:text-[20px] lg:text-[24px] text-[#06152F] tracking-[0.15em] uppercase leading-relaxed">
        ONE RELATIONSHIP. <br className="hidden sm:block" />
        <span className="text-[#0A9B73]">MULTIPLE FINANCIAL SOLUTIONS.</span>
      </p>
    </motion.div>
  );
};

export default WhatWeDoClosing;


import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { capabilities } from './whatWeDoData';

const ActiveServiceContent = ({ activeIndex }) => {
  const shouldReduceMotion = useReducedMotion();
  const service = capabilities[activeIndex] || capabilities[0];

  return (
    <div className="relative w-full max-w-[620px] min-h-[140px] sm:min-h-[150px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="w-full text-left relative z-0"
        >
          {/* Number & Title */}
          <div className="flex flex-col mb-4 sm:mb-5">
            <span className="font-heading font-semibold text-[18px] sm:text-[20px] lg:text-[24px] text-[#0A9B73] tracking-widest mb-1 sm:mb-2">
              {service.number}
            </span>
            <h3 className="font-heading font-semibold text-[32px] sm:text-[42px] lg:text-[52px] text-[#06152F] tracking-tight uppercase leading-tight">
              {service.title}
            </h3>
          </div>
          
          {/* Description */}
          <p className="font-sans text-[16px] sm:text-[18px] lg:text-[20px] text-[#475569] leading-relaxed max-w-[600px] lg:max-w-[650px]">
            {service.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ActiveServiceContent;


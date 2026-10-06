import React from 'react';
import { motion } from 'framer-motion';

const SectionEyebrow = ({ text, className = "mb-6", color = "text-[#0A9B73]", lineColor = "bg-[#0A9B73]", align = "left", asMotion = false, variants }) => {
  
  const content = (
    <>
      <div className={`w-8 md:w-12 h-px ${lineColor} opacity-60`} />
      <span className={`font-mono ${color} text-[11px] md:text-[13px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap`}>
        {text}
      </span>
      <div className={`w-8 md:w-12 h-px ${lineColor} opacity-60`} />
    </>
  );

  const containerClasses = `flex items-center gap-3 md:gap-4 ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`;

  if (asMotion) {
    return (
      <motion.div variants={variants} className={containerClasses}>
        {content}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
};

export default SectionEyebrow;

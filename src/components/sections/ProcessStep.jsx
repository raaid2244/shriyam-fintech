import React from 'react';
import { motion } from 'framer-motion';

const ProcessStep = ({ step, index, isLast }) => {
  return (
    <div className="relative flex flex-col items-center md:flex-row md:items-start group">
      
      {/* Desktop connector line */}
      {!isLast && (
        <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-gradient-to-r from-brand-green/40 to-transparent -z-10" />
      )}
      
      {/* Mobile connector line */}
      {!isLast && (
        <div className="md:hidden absolute top-[60px] left-1/2 w-[2px] h-full bg-gradient-to-b from-brand-green/40 to-transparent -z-10 -translate-x-1/2" />
      )}

      <div className="flex flex-col items-center flex-1 text-center px-4 mb-10 md:mb-0">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
          className="w-16 h-16 rounded-full bg-brand-white shadow-lg border-4 border-brand-white flex items-center justify-center mb-6 relative z-10 group-hover:border-brand-green transition-colors duration-300"
        >
          <span className="text-xl font-semibold text-brand-navy">
            {step.number}
          </span>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="text-lg font-semibold text-brand-navy mb-3"
        >
          {step.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
          className="text-sm text-brand-gray"
        >
          {step.description}
        </motion.p>
      </div>
      
    </div>
  );
};

export default ProcessStep;

import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false,
  light = false 
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`text-3xl md:text-4xl font-semibold mb-4 tracking-tight ${
          light ? 'text-brand-white' : 'text-brand-navy'
        }`}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-lg max-w-3xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-brand-gray-light/80' : 'text-brand-gray'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-1 w-20 mt-6 ${centered ? 'mx-auto' : ''} ${
          light ? 'bg-brand-green' : 'bg-brand-green'
        }`}
      />
    </div>
  );
};

export default SectionHeading;

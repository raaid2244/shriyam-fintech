import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StrategicWord = ({ children }) => {
  const ref = useRef(null);
  
  // Track this specific word's position in the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 35%"]
  });

  // Color transition: Light Grey (#E2E8F0) -> Green (#0A9B73) -> Navy (#06152F)
  const color = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#E2E8F0", "#0A9B73", "#06152F"]
  );

  return (
    <motion.div 
      ref={ref}
      style={{ color }}
      className="text-[12vw] md:text-[8vw] leading-[1.1] font-heading font-bold tracking-tight"
    >
      {children}
    </motion.div>
  );
};

const StrategicSpectrum = () => {
  return (
    <section className="bg-white py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-px bg-brand-green" />
          <span className="text-brand-green font-heading font-semibold text-xs tracking-[0.16em] uppercase">
            Beyond Individual Products
          </span>
        </motion.div>

        <div className="flex flex-col mb-24">
          <StrategicWord>Funding.</StrategicWord>
          <StrategicWord>Protection.</StrategicWord>
          <StrategicWord>Growth.</StrategicWord>
          <StrategicWord>Risk Management.</StrategicWord>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl ml-auto md:mr-24"
        >
          <p className="text-[#475569] text-xl md:text-2xl font-sans leading-relaxed border-l-2 border-brand-green/30 pl-8">
            We work at the intersection of Fintech, Corporate Finance and Insurance Advisory, giving our clients a broader perspective on their financial requirements and risk exposure.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default StrategicSpectrum;

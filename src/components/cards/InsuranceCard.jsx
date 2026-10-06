import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const InsuranceCard = ({ category, index }) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(6,21,47,0.18)' }}
      className="group relative bg-[#0A2144] rounded-2xl overflow-hidden flex flex-col h-full border border-white/8 hover:border-brand-green/30 transition-all duration-400 cursor-default"
    >
      {/* Animated gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] animate-gradient"
        style={{ background: 'linear-gradient(90deg, #0A9B73, #10B981, #06152F, #0A9B73)', backgroundSize: '200% 100%' }}
      />

      {/* Blob accent */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-green/8 blur-2xl pointer-events-none group-hover:bg-brand-green/15 transition-colors duration-500" />

      {/* Header */}
      <div className="relative z-10 p-6 flex items-center gap-4 border-b border-white/8">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="w-12 h-12 bg-brand-green/15 rounded-xl flex items-center justify-center border border-brand-green/20 group-hover:bg-brand-green/25 transition-colors duration-300"
        >
          {Icon && <Icon size={22} className="text-brand-green" strokeWidth={1.5} />}
        </motion.div>
        <h3 className="text-lg font-heading font-semibold text-white">{category.title}</h3>
      </div>

      {/* Items */}
      <div className="relative z-10 p-6 flex-grow">
        <ul className="space-y-3.5">
          {category.items.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 + idx * 0.07 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
              <span className="text-white/70 font-sans text-sm leading-snug hover:text-white transition-colors">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default InsuranceCard;

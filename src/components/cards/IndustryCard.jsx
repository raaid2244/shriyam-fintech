import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const IndustryCard = ({ industry, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: '0 16px 32px rgba(6,21,47,0.10)' }}
      className="group relative bg-white p-6 rounded-2xl border border-[#F0F0F0] hover:border-brand-green/30 transition-all duration-350 cursor-default overflow-hidden"
    >
      {/* Animated accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-green rounded-l-2xl"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.09 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top' }}
      />
      {/* Index number */}
      <span className="absolute top-4 right-4 text-3xl font-heading font-bold text-[#F5F5F5] group-hover:text-brand-green/10 transition-colors duration-400 leading-none select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <h3 className="text-base font-heading font-semibold text-brand-navy mb-2 group-hover:text-brand-green transition-colors duration-300 pr-8">
          {industry.title}
        </h3>
        <p className="text-sm text-[#6B7280] leading-relaxed font-sans mb-4">
          {industry.description}
        </p>
        <div className="flex items-center gap-1 text-brand-green text-xs font-heading font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Learn More <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
};

export default IndustryCard;

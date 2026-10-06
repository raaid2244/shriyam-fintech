import React from 'react';
import { motion } from 'framer-motion';
import { User, Star } from 'lucide-react';

const DirectorCard = ({ director, index }) => {
  const initials = director.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(6,21,47,0.12)' }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#F0F0F0] shadow-lg transition-all duration-400 cursor-default"
    >
      {/* Animated gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl animate-gradient"
        style={{ background: 'linear-gradient(90deg, #0A9B73, #06152F, #10B981, #0A9B73)', backgroundSize: '200% 100%' }}
      />

      {/* Avatar area */}
      <div className="relative bg-gradient-to-b from-[#F8FAFB] to-[#F0F2F5] py-12 flex justify-center overflow-hidden">
        {/* Background blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-brand-green/6 blur-xl group-hover:bg-brand-green/12 transition-colors duration-500" />
        </div>
        {/* Orbit ring */}
        <div
          className="absolute w-32 h-32 rounded-full border border-brand-navy/5"
          style={{ animation: 'orbitSpin 16s linear infinite' }}
        />
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="relative z-10 w-24 h-24 bg-brand-navy rounded-full flex items-center justify-center shadow-xl group-hover:shadow-brand-green/20 transition-shadow duration-400"
        >
          <span className="text-white font-heading font-bold text-2xl">{initials}</span>
        </motion.div>
        {/* Role badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-green/15 border border-brand-green/25 text-brand-green text-[10px] font-heading font-semibold uppercase tracking-widest">
            <Star size={8} />
            Director
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-heading font-semibold text-brand-navy mb-1 group-hover:text-brand-green transition-colors duration-300">
          {director.name}
        </h3>
        <p className="text-[#6B7280] font-sans text-sm">Shriyam Fintech Pvt Ltd</p>
      </div>
    </motion.div>
  );
};

export default DirectorCard;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionCard = ({ solution, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-[#F0F0F0] shadow-lg hover:shadow-2xl hover:shadow-black/8 transition-all duration-400 overflow-hidden cursor-default"
    >
      {/* Animated gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 animate-gradient"
        style={{ background: 'linear-gradient(90deg, #0A9B73, #10B981, #06152F, #0A9B73)', backgroundSize: '200% 100%' }}
      />

      {/* Number watermark */}
      <div className="absolute top-4 right-5 text-6xl font-heading font-bold text-[#F5F5F5] group-hover:text-brand-green/10 transition-colors duration-400 leading-none select-none">
        {solution.number}
      </div>

      <div className="p-8 relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="w-14 h-14 bg-brand-navy/5 rounded-xl flex items-center justify-center text-brand-navy group-hover:bg-brand-green group-hover:text-white transition-all duration-400 mb-6 shadow-sm"
        >
          {Icon && <Icon size={28} strokeWidth={1.5} />}
        </motion.div>

        <h3 className="text-xl font-heading font-semibold text-brand-navy mb-3 group-hover:text-brand-green transition-colors duration-300">
          {solution.title}
        </h3>

        <p className="text-brand-gray mb-6 leading-relaxed text-sm line-clamp-2">
          {solution.description}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-brand-green font-heading font-semibold text-sm hover:text-brand-navy transition-colors mb-4 group/btn"
        >
          {isExpanded ? 'Hide Details' : 'Explore Solution'}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChevronDown size={16} className="group-hover/btn:text-brand-navy" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {solution.services.length > 0 && (
                <ul className="space-y-2.5 mb-6 border-t border-[#F0F0F0] pt-4">
                  {solution.services.map((service, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.06 }}
                      className="flex items-start text-sm text-brand-gray gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0" />
                      {service}
                    </motion.li>
                  ))}
                </ul>
              )}
              <Link
                to="/contact"
                className="shimmer-btn inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-brand-navy text-white font-heading font-semibold text-sm rounded-lg hover:bg-brand-green transition-all duration-300 group/cta"
              >
                Discuss Requirement
                <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SolutionCard;

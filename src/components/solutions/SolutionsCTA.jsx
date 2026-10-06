import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsCTA = () => {
  return (
    <section className="relative bg-[#06152F] py-32 overflow-hidden flex items-center justify-center text-center">
      
      {/* Subtle CSS Diagonal Lines Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="diagonal-lines" width="40" height="40" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-brand-green" />
          <span className="text-brand-green font-heading font-semibold text-xs tracking-[0.16em] uppercase">
            Find the Right Solution
          </span>
          <span className="w-8 h-px bg-brand-green" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white mb-6 tracking-tight"
        >
          Your <span className="text-brand-green">requirement</span><br className="hidden sm:block" /> comes first.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl font-sans leading-relaxed max-w-2xl mb-12"
        >
          Tell us what you are looking to achieve. We'll help you explore the financial solutions relevant to your requirement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Link 
            to="/contact"
            className="group flex items-center justify-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-heading font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-[0_4px_20px_rgba(10,155,115,0.25)]"
          >
            Talk to an Expert
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/contact"
            className="group flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 px-8 py-4 rounded-full font-heading font-semibold text-sm hover:bg-white/5 transition-colors"
          >
            Contact Shriyam
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform opacity-50" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default SolutionsCTA;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsHero = () => {
  return (
    <section className="relative min-h-[90vh] bg-white flex items-center pt-24 pb-16">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/solutions-hero.jpg" 
          alt="Shriyam Fintech Solutions Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Elegant White Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30 md:to-white/10" />
        
        {/* Top gradient specifically to hide any baked-in UI from the screenshot background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-brand-green" />
            <span className="text-brand-green font-heading font-semibold text-xs tracking-[0.16em] uppercase">
              Our Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[48px] sm:text-[64px] lg:text-[84px] leading-[1] font-heading font-semibold text-brand-navy mb-8"
          >
            Financial solutions for every stage of <span className="text-brand-green">your journey.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#475569] text-lg sm:text-xl font-sans leading-relaxed mb-10 max-w-lg"
          >
            From business funding and working capital to project finance, insurance and risk management, Shriyam Fintech brings together financial solutions around the requirement — not just the product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button 
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }}
              className="group flex items-center justify-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-heading font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-[0_4px_20px_rgba(10,155,115,0.25)]"
            >
              Explore Solutions
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link 
              to="/contact"
              className="group flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-brand-navy border border-brand-navy/20 px-8 py-4 rounded-full font-heading font-semibold text-sm hover:bg-white transition-colors"
            >
              Talk to an Expert
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform opacity-50" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;

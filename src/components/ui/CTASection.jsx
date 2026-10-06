import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-brand-green relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-brand-navy/15 blur-3xl animate-blob-delay" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-6"
        >
          <Zap size={12} className="text-white" />
          <span className="text-white font-heading font-semibold text-xs uppercase tracking-widest">
            Ready to start?
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-heading font-semibold text-white mb-6 leading-tight"
        >
          Have a Funding or Protection<br />Requirement?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg text-white/85 mb-10 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Let's understand your requirement and explore the right financial solution together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="shimmer-btn inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-navy text-white font-heading font-semibold text-sm rounded-lg hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-xl shadow-brand-navy/30 group"
          >
            Talk to Shriyam Fintech
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-heading font-semibold text-sm rounded-lg hover:border-white/70 hover:bg-white/10 transition-all duration-300"
          >
            View Solutions
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

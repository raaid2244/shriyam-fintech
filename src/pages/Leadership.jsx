import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import DirectorCard from '../components/cards/DirectorCard';
import AboutCTA from '../components/about/AboutCTA';
import { directors } from '../data/content';
import { Users } from 'lucide-react';

const Leadership = () => {
  return (
    <div className="bg-white">
      {/* ── Rich Gradient Hero Header ───────────────────── */}
      <section className="relative bg-brand-navy overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/6 blur-3xl animate-blob-delay" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="lead-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lead-grid)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,64 C360,0 1080,64 1440,32 L1440,64 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/30 mb-6"
          >
            <Users size={12} className="text-brand-green" />
            <span className="text-brand-green font-heading font-semibold text-xs uppercase tracking-widest">
              Leadership Team
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-heading font-semibold text-white mb-6 leading-tight"
          >
            Our <span className="text-brand-green">Directors</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Together, the leadership team brings a relationship-driven approach towards financial solutions, business funding, insurance and risk management.
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {directors.map((director, index) => (
            <DirectorCard key={index} director={director} index={index} />
          ))}
        </div>
      </section>

      <AboutCTA />
    </div>
  );
};

export default Leadership;

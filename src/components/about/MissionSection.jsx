import React from 'react';
import SectionEyebrow from '../ui/SectionEyebrow';
import { motion } from 'framer-motion';
import { missionItems } from '../../data/aboutData';

const MissionSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Diagonal into dark */}
      <div className="relative h-20 bg-[#F6F8FA]">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 80L1440 0V80H0Z" fill="#06152F" />
        </svg>
      </div>

      <section className="bg-[#06152F] py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-[#0A9B73] font-heading font-semibold text-sm uppercase tracking-widest mb-4">
              ORGANISATIONAL PURPOSE
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-heading font-semibold text-white leading-[1.1] tracking-tight">
              Our Mission
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg font-sans mt-5 leading-relaxed">
              Five core commitments that guide how we serve every client.
            </p>
          </div>

          {/* M2P-style: horizontal connected circles row */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {missionItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Circle badge — M2P signature style */}
                    <div className="relative w-20 h-20 mb-6">
                      {/* Outer ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/15 group-hover:border-[#0A9B73]/60 transition-colors duration-300" />
                      {/* Inner ring */}
                      <div className="absolute inset-[5px] rounded-full border border-white/10 group-hover:border-[#0A9B73]/30 transition-colors duration-300" />
                      {/* Icon center */}
                      <div className="absolute inset-0 flex items-center justify-center text-white group-hover:text-[#0A9B73] transition-colors duration-300">
                        <Icon size={26} strokeWidth={1.6} />
                      </div>
                      {/* Dot connector */}
                      {index < missionItems.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-[calc(50%+8px)] w-3 h-3 rounded-full bg-[#0A9B73]/50 border border-[#0A9B73] -translate-y-1/2" />
                      )}
                    </div>

                    <span className="text-[#F47A20] font-heading text-[10px] font-semibold uppercase tracking-widest block mb-1">
                      {item.number}
                    </span>
                    <h3 className="text-white font-heading font-semibold text-base mb-2 group-hover:text-[#0A9B73] transition-colors">
                      {item.shortTitle}
                    </h3>
                    <p className="text-[#94A3B8] font-sans text-xs leading-relaxed max-w-[140px]">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Diagonal back to light */}
      <div className="relative h-20 bg-[#06152F]">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 0L1440 80V0H0Z" fill="#F6F8FA" />
        </svg>
      </div>
    </div>
  );
};

export default MissionSection;

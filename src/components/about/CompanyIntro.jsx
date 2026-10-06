import React from 'react';
import SectionEyebrow from '../ui/SectionEyebrow';
import { motion } from 'framer-motion';
import { companyIntro } from '../../data/aboutData';

const CompanyIntro = () => {
  return (
    <section className="bg-[#F6F8FA] py-24 md:py-32">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centre-aligned editorial intro — M2P style */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <SectionEyebrow text="OUR STORY" center={true} className="mb-4" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-3xl sm:text-4xl lg:text-[52px] font-heading font-semibold text-[#06152F] leading-[1.1] tracking-tight"
          >
            {companyIntro.editorialHeading}
          </motion.h2>
        </div>

        {/* Two-column text block */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-[#06152F] text-base sm:text-lg font-sans leading-relaxed font-medium">
              {companyIntro.paragraphs[0]}
            </p>
            <p className="text-[#64748B] text-base font-sans leading-relaxed">
              {companyIntro.paragraphs[1]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="space-y-5"
          >
            {/* Pull-quote block */}
            <div className="border-l-4 border-[#0A9B73] pl-6">
              <p className="text-[#06152F] text-base sm:text-lg font-sans leading-relaxed italic">
                "{companyIntro.paragraphs[2]}"
              </p>
            </div>
            {/* Three quick pillars */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Understand' },
                { label: 'Structure' },
                { label: 'Support' },
              ].map(p => (
                <div key={p.label} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center mx-auto shadow-sm mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0A9B73]" />
                  </div>
                  <p className="text-xs font-heading font-semibold text-[#06152F]">{p.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CompanyIntro;

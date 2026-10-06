import React from 'react';
import { motion } from 'framer-motion';

const SolutionsIntro = () => {
  return (
    <section className="bg-[#F7F8F6] pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-brand-green" />
          <span className="text-brand-green font-heading font-semibold text-xs tracking-[0.16em] uppercase">
            What We Provide
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[36px] sm:text-[44px] md:text-[52px] leading-[1.1] font-heading font-semibold text-brand-navy"
          >
            One platform.<br />
            Multiple financial solutions.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-4"
          >
            <p className="text-[#475569] text-lg sm:text-xl font-sans leading-relaxed">
              We bring together funding, financing and insurance solutions to help businesses, entrepreneurs, professionals and individuals address different financial requirements through one relationship.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SolutionsIntro;

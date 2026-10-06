import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import SolutionItem from './SolutionItem';
import { solutionsData } from '../../data/solutionsPageData';

const SolutionsIndex = () => {

  return (
    <section className="bg-brand-green pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-white/60" />
            <span className="text-white font-heading font-semibold text-xs tracking-[0.16em] uppercase">
              Our Core Solutions
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-[56px] leading-[1.1] font-heading font-semibold text-white mb-8 max-w-3xl"
          >
            Solutions structured around the requirement.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-lg sm:text-xl font-sans leading-relaxed max-w-2xl"
          >
            From business funding and working capital to project finance and insurance, we bring together solutions designed around the requirement rather than a single financial product.
          </motion.p>
        </div>

        {/* Index List */}
        <div className="flex flex-col relative w-full">
          <LayoutGroup>
            {solutionsData.map((solution) => (
              <SolutionItem 
                key={solution.id} 
                data={solution} 
              />
            ))}
          </LayoutGroup>
          {/* Final divider to close the last row */}
          <div className="w-full h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
};

export default SolutionsIndex;

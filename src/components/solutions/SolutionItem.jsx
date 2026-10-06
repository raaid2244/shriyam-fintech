import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SolutionItem = ({ data }) => {
  const markerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Track when the top "header" of the solution enters the center portion of the screen
  const isInView = useInView(markerRef, { 
    margin: "-40% 0px -40% 0px" 
  });

  const isActive = isInView || isHovered;

  const handleClick = () => {
    if (markerRef.current) {
      const yOffset = -200; 
      const y = markerRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div layout
      className="w-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Animated Expanding Divider */}
      <motion.div 
        className="absolute top-0 left-0 h-[2px] bg-white"
        initial={{ width: "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Header Row (Observer Target) */}
      <div 
        ref={markerRef}
        onClick={handleClick}
        className="py-8 md:py-12 flex items-start gap-6 cursor-pointer"
      >
        <div className="w-12 shrink-0">
          <motion.span 
            className="text-lg md:text-xl font-heading font-medium"
            animate={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
            transition={{ duration: 0.3 }}
          >
            {data.id}
          </motion.span>
        </div>

        <div className="flex-grow flex items-center justify-between">
          <motion.h3 
            className="text-2xl md:text-4xl font-heading font-semibold tracking-tight"
            animate={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)' }}
            transition={{ duration: 0.3 }}
          >
            {data.title}
          </motion.h3>

          <motion.div
            animate={{ rotate: isActive ? 90 : 0, color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="ml-4 shrink-0"
          >
            <ArrowRight size={24} />
          </motion.div>
        </div>
      </div>

      {/* Expanded Content Panel */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl ml-0 md:ml-[4.5rem] p-6 md:p-10 mb-12 mt-2">
              <div className="max-w-3xl">
                
                {/* Heading & Description */}
                <motion.h4 
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl md:text-2xl font-heading font-semibold text-brand-green mb-4"
                >
                  {data.heading}
                </motion.h4>
                
                <motion.p 
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-brand-green/80 text-base md:text-lg font-sans leading-relaxed mb-10"
                >
                  {data.description}
                </motion.p>

                {/* Offerings Logic */}
                {data.isInsurance && data.categories ? (
                  <div className="flex flex-col gap-10">
                    {data.categories.map((cat, catIdx) => (
                      <motion.div 
                        key={catIdx}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + (catIdx * 0.1) }}
                      >
                        <h5 className="text-brand-green font-heading font-semibold text-sm tracking-widest uppercase mb-4">
                          {cat.name}
                        </h5>
                        <div className="w-full h-px bg-brand-green/15 mb-4" />
                        <div className="flex flex-col gap-3">
                          {cat.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="text-brand-green/95 font-medium text-sm md:text-base font-sans">
                              {item}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  data.offerings && data.offerings.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col border-t border-brand-green/10"
                    >
                      {data.offerings.map((item, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + (idx * 0.05) }}
                          className="py-4 border-b border-brand-green/10 text-brand-green/95 font-medium text-sm md:text-base font-sans"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </motion.div>
                  )
                )}
                
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SolutionItem;

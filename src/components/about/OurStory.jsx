import React from 'react';
import SectionEyebrow from '../ui/SectionEyebrow';
import { motion } from 'framer-motion';
import './OurStory.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const JourneyVisual = () => {
  return (
    <div className="os-visual-wrapper">
      <svg viewBox="0 0 1000 420" className="os-svg" aria-label="From Requirement to Relationship Growth Journey">
        {/* The Curve */}
        <motion.path 
          d="M 100 350 C 300 350, 700 70, 900 70" 
          fill="none" 
          stroke="#0A9B73" 
          strokeWidth="1.5" 
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Dotted Lines */}
        <motion.g initial={{opacity:0}} whileInView={{opacity:1}} viewport={{ once: true }} transition={{delay: 1.5, duration: 1}}>
          <line x1="200" y1="180" x2="200" y2="336" stroke="#0A9B73" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
          <line x1="350" y1="120" x2="350" y2="280" stroke="#0A9B73" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
          <line x1="413" y1="256" x2="413" y2="370" stroke="#0A9B73" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
          <line x1="674" y1="130" x2="674" y2="310" stroke="#0A9B73" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
          <line x1="780" y1="92" x2="780" y2="240" stroke="#0A9B73" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
          <line x1="845" y1="75" x2="845" y2="200" stroke="#0A9B73" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
        </motion.g>

        {/* Keywords */}
        <motion.g initial={{opacity:0, y: 10}} whileInView={{opacity:1, y: 0}} viewport={{ once: true }} transition={{delay: 1.7, duration: 0.8}}>
          <text x="200" y="165" fill="#334155" fontSize="14" textAnchor="middle" opacity="0.6" className="floating-keyword font-medium">Funding</text>
          <text x="350" y="105" fill="#334155" fontSize="14" textAnchor="middle" opacity="0.6" className="floating-keyword font-medium">Working Capital</text>
          <text x="413" y="390" fill="#334155" fontSize="14" textAnchor="middle" opacity="0.6" className="floating-keyword font-medium">Insurance</text>
          <text x="674" y="330" fill="#334155" fontSize="14" textAnchor="middle" opacity="0.6" className="floating-keyword font-medium">Project Finance</text>
          <text x="780" y="260" fill="#334155" fontSize="14" textAnchor="middle" opacity="0.6" className="floating-keyword font-medium">Risk Management</text>
          <text x="845" y="220" fill="#334155" fontSize="14" textAnchor="middle" opacity="0.6" className="floating-keyword font-medium">Advisory</text>
        </motion.g>

        {/* Nodes & Labels */}
        <motion.g initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{ once: true }} transition={{delay: 0.2, duration: 0.5}}>
          <circle cx="100" cy="350" r="5" fill="#0A9B73" />
          <text x="100" y="380" fill="#06152F" fontSize="15" fontWeight="500" textAnchor="middle">Requirement</text>
        </motion.g>

        <motion.g initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{ once: true }} transition={{delay: 0.6, duration: 0.5}}>
          <circle cx="280" cy="305" r="5" fill="#0A9B73" />
          <text x="280" y="335" fill="#06152F" fontSize="15" fontWeight="500" textAnchor="middle">Understanding</text>
        </motion.g>

        <motion.g initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{ once: true }} transition={{delay: 1.4, duration: 0.5}}>
          <circle cx="590" cy="169" r="5" fill="#0A9B73" />
          <text x="590" y="199" fill="#06152F" fontSize="15" fontWeight="500" textAnchor="middle">Structure</text>
        </motion.g>

        <motion.g initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{ once: true }} transition={{delay: 1.8, duration: 0.5}}>
          <circle cx="759" cy="99" r="5" fill="#0A9B73" />
          <text x="759" y="129" fill="#06152F" fontSize="15" fontWeight="500" textAnchor="middle">Connection</text>
        </motion.g>

        <motion.g initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{ once: true }} transition={{delay: 2.2, duration: 0.5}}>
          <circle cx="900" cy="70" r="5" fill="#0A9B73" />
          <text x="900" y="45" fill="#06152F" fontSize="15" fontWeight="500" textAnchor="middle">Growth</text>
        </motion.g>

        {/* Center Brand Element */}
        <motion.g initial={{opacity:0, y: 20}} whileInView={{opacity:1, y: 0}} viewport={{ once: true }} transition={{delay: 1.0, duration: 0.8}}>
          {/* Navy circle with thin green outline */}
          <circle cx="500" cy="210" r="38" fill="#06152F" stroke="#0A9B73" strokeWidth="1" />
          <text x="500" y="215" fill="#FFFFFF" fontSize="12" fontWeight="600" letterSpacing="0.1em" textAnchor="middle">SHRIYAM</text>
          
          <text x="500" y="275" fill="#06152F" fontSize="16" fontWeight="500" textAnchor="middle">One Relationship</text>
        </motion.g>
      </svg>
    </div>
  );
};

const MobileJourneyVisual = () => {
  const nodes = [
    { label: 'Requirement', keywords: ['Funding'] },
    { label: 'Understanding', keywords: ['Working Capital'] },
    { label: 'One Relationship', keywords: ['Insurance', 'Project Finance'], isCenter: true },
    { label: 'Structure', keywords: ['Risk Management'] },
    { label: 'Connection', keywords: ['Advisory'] },
    { label: 'Growth', keywords: [] }
  ];

  return (
    <div className="md:hidden flex flex-col w-full py-8 px-2">
      {nodes.map((node, i) => (
        <div key={i} className="flex relative">
          {/* Vertical Line */}
          {i !== nodes.length - 1 && (
            <div className="absolute left-[19px] top-[40px] bottom-[-20px] w-px bg-gradient-to-b from-[#0A9B73]/50 to-[#0A9B73]/10" />
          )}

          {/* Node Icon */}
          <div className="relative z-10 flex flex-col items-center mr-6">
            {node.isCenter ? (
              <div className="w-10 h-10 rounded-full bg-[#06152F] border border-[#0A9B73] flex items-center justify-center shadow-lg mt-1">
                <span className="text-[7px] text-white font-bold tracking-widest uppercase">Shriyam</span>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#0A9B73] shadow-[0_0_10px_rgba(10,155,115,0.4)]" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col pb-10 pt-2">
            <h4 className={`font-heading font-semibold text-[16px] mb-2 ${node.isCenter ? 'text-[#0A9B73]' : 'text-[#06152F]'}`}>
              {node.label}
            </h4>
            {node.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {node.keywords.map(kw => (
                  <span key={kw} className="px-3 py-1 bg-[#0A9B73]/10 text-[#0A9B73] text-[11px] font-medium rounded-full uppercase tracking-wider">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const OurStory = () => {
  return (
    <section className="our-story-section">
      <div className="os-container">
        {/* TOP CENTER EYEBROW */}
        <SectionEyebrow text="OUR STORY" />

        <motion.div 
          className="os-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* LEFT COLUMN */}
          <div className="os-left">
            <motion.h2 className="os-heading" variants={fadeUpVariant}>
              Your financial needs evolve.<br />
              <span className="text-[#0A9B73]">Our relationship remains constant.</span>
            </motion.h2>
          </div>

          {/* RIGHT COLUMN */}
          <div className="os-right">
            <motion.p className="os-p1" variants={fadeUpVariant}>
              Shriyam Fintech Pvt Ltd was built around a simple belief: financial requirements should be understood as a whole, not as isolated products.
            </motion.p>
            <motion.p className="os-p2" variants={fadeUpVariant}>
              Businesses, entrepreneurs, professionals and individuals often face different financial needs throughout their journey. From business funding and working capital to project finance, insurance, and risk management — these are all interconnected pieces of a larger picture.
            </motion.p>
            <motion.p className="os-p3" variants={fadeUpVariant}>
              Our role is to understand your requirements, analyse your objectives, and structure solutions that make sense for your current stage. We connect clients with relevant financial institutions or insurance providers, supporting the journey at every step.
            </motion.p>
          </div>
        </motion.div>

        {/* QUOTE */}
        <motion.div 
          className="os-quote-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="os-quote-bg">"</div>
          <blockquote className="os-quote">
            "Every financial journey deserves a solution built around the requirement — not the other way around."
          </blockquote>
        </motion.div>

        {/* SIGNATURE VISUAL */}
        <div className="os-visual-container">
          <div className="hidden md:block">
            <JourneyVisual />
          </div>
          <MobileJourneyVisual />
        </div>

        {/* HUMAN DETAIL */}
        <motion.div 
          className="os-human-detail"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="os-divider"></div>
          <h3 className="os-hd-title">One Relationship.</h3>
          <h4 className="os-hd-subtitle">Multiple Financial Solutions.</h4>
          <p className="os-hd-tags">Funding &bull; Protection &bull; Growth &bull; Risk Management</p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;

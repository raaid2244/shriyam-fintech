import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, ArrowRight, Zap } from 'lucide-react';
import Logo from '../ui/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }
  }),
};

const FooterLink = ({ to, children, index = 0 }) => (
  <motion.div variants={fadeUp} custom={index}>
    <Link
      to={to}
      className="group flex items-center text-[#AAB7C9] hover:text-[#0A9B73] transition-all duration-300 font-heading font-medium text-sm"
    >
      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
        {children}
      </span>
      <ArrowRight
        size={14}
        className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-[#0A9B73]"
      />
    </Link>
  </motion.div>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#06152F] overflow-hidden pt-12">
      {/* Background Graphic Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="financial-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="60" cy="60" r="2" fill="white" />
              <path d="M 0 60 Q 30 30 60 0" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2,2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#financial-grid)" />
        </svg>
      </div>

      {/* Animated glow orbs */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-brand-green/5 blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-32 left-1/4 w-48 h-48 rounded-full bg-brand-green/4 blur-3xl pointer-events-none animate-blob-delay" />



      {/* ── Main Footer Grid ──────────────────────────────── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="bg-white p-4 rounded-xl inline-block hover:scale-105 transition-transform duration-300">
              <Logo theme="light" />
            </div>
            <p className="text-white font-heading font-semibold text-lg leading-snug pr-4">
              Integrated Financial Solutions for Businesses, Professionals &amp; Individuals.
            </p>
            <p className="text-[#AAB7C9] text-sm leading-relaxed max-w-sm font-sans">
              Shriyam Fintech Pvt Ltd helps businesses, professionals and individuals access customised funding, insurance and risk-management solutions through one trusted relationship.
            </p>
          </motion.div>

          {/* Solutions Column */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Solutions</h4>
            <div className="flex flex-col space-y-4">
              {['Corporate & Business Loans', 'Secured Funding', 'Trade Finance', 'Project & Real Estate Funding', 'Government & Institutional Finance', 'Insurance & Risk Management'].map((item, i) => (
                <FooterLink key={i} to="/solutions" index={i}>{item}</FooterLink>
              ))}
            </div>
          </motion.div>

          {/* Company Column */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Company</h4>
            <div className="flex flex-col space-y-4">
              {[
                { label: 'About Shriyam', to: '/about' },
                { label: 'Our Approach', to: '/approach' },
                { label: 'Our Solution', to: '/solutions' },
                { label: 'Who We Serve', to: '/industries' },
                { label: 'Contact Us', to: '/contact' },
              ].map((item, i) => (
                <FooterLink key={i} to={item.to} index={i}>{item.label}</FooterLink>
              ))}
            </div>
          </motion.div>

          {/* Insurance Column */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Insurance</h4>
            <div className="flex flex-col space-y-4">
              {['Life Insurance', 'Health Insurance', 'General Insurance', 'Commercial Insurance', 'Risk Management'].map((item, i) => (
                <FooterLink key={i} to="/solutions" index={i}>{item}</FooterLink>
              ))}
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Get in Touch</h4>

            <div className="p-4 rounded-xl bg-[#0A2144] border border-white/5 shadow-inner hover:border-brand-green/20 transition-colors duration-300">
              <p className="text-white font-heading font-medium text-sm mb-2">Have a financial requirement?</p>
              <a
                href="tel:8610389508"
                className="text-[#0A9B73] font-heading font-semibold text-lg hover:text-emerald-400 transition-colors block mb-1"
              >
                8610389508
              </a>
              <Link
                to="/contact"
                className="text-[#AAB7C9] text-xs font-medium hover:text-white transition-colors inline-flex items-center group"
              >
                Talk to our team <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <ul className="space-y-4 text-[#AAB7C9] text-sm font-sans">
              <li className="flex items-start group">
                <MapPin size={18} className="mr-3 text-[#0A9B73] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="hover:text-white transition-colors cursor-default">Chennai, Tamil Nadu, India</span>
              </li>
              <li>
                <a href="mailto:contact@shriyamfintech.com" className="flex items-center hover:text-white transition-colors group">
                  <Mail size={18} className="mr-3 text-[#0A9B73] shrink-0 group-hover:scale-110 transition-transform" />
                  contact@shriyamfintech.com
                </a>
              </li>
              <li>
                <a href="https://www.shriyamfintech.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors group">
                  <Globe size={18} className="mr-3 text-[#0A9B73] shrink-0 group-hover:scale-110 transition-transform" />
                  www.shriyamfintech.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Background Watermark Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0">
        <span className="text-[12vw] font-heading font-bold text-white opacity-[0.03] whitespace-nowrap leading-none tracking-tight -translate-y-1/4">
          SHRIYAM
        </span>
      </div>

      {/* Animated Brand Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] w-full animate-gradient"
        style={{
          background: 'linear-gradient(90deg, #06152F, #0A9B73, #F47A20, #0A9B73, #06152F)',
          backgroundSize: '200% 100%',
          transformOrigin: 'center',
        }}
      />

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 bg-[#040D1D] py-6">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          <p className="text-[#AAB7C9] text-sm font-sans">
            &copy; 2026 Shriyam Fintech Pvt Ltd. All rights reserved.
          </p>
          <div className="text-[#AAB7C9] text-xs sm:text-sm font-heading font-medium tracking-wide flex flex-wrap justify-center gap-2">
            <span>Funding</span>
            <span className="text-[#0A9B73]">•</span>
            <span>Insurance</span>
            <span className="text-[#0A9B73]">•</span>
            <span>Risk Management</span>
            <span className="text-[#0A9B73]">•</span>
            <span>Business Growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

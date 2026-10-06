import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';
import { CheckCircle2, ArrowRight, Shield, TrendingUp, Building2, Briefcase, Landmark, Globe, ShieldCheck, Zap, Target, Users, BarChart3, PieChart, Layers, Award, Handshake, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import ServicesFader from '../components/sections/ServicesFader';
import FinancialPerspective from '../components/sections/FinancialPerspective';
import WhoWeAre from '../components/sections/WhoWeAre';
import ApproachSection from '../components/sections/ApproachSection';
import WhoWeServeSection from '../components/sections/WhoWeServeSection';
import WhyShriyamSection from '../components/sections/WhyShriyamSection';
import { solutions, whyChooseUs, processSteps } from '../data/content';
import AboutCTA from '../components/about/AboutCTA';

/* ───────────────────────────────────────────────────────
   Showcase items
─────────────────────────────────────────────────────── */
const showcaseItems = [
  {
    num: '01',
    icon: Briefcase,
    title: 'Corporate & Business Funding',
    points: [
      'Business Loans, Working Capital & Term Loans',
      'SME Funding & Unsecured Business Finance',
      'Structured Finance & Corporate Loans',
    ],
  },
  {
    num: '02',
    icon: Building2,
    title: 'Asset & Project Finance Suite',
    points: [
      'Loan Against Property (LAP) & Mortgage Funding',
      'Project Finance & Construction Finance',
      'Debt Restructuring & Refinancing',
    ],
  },
  {
    num: '03',
    icon: Shield,
    title: 'Complete Protection Solutions',
    points: [
      'Life, Term & Wealth Insurance',
      'Health & Group Insurance',
      'Commercial, General & Liability Insurance',
    ],
  },
  {
    num: '04',
    icon: Landmark,
    title: 'Trade Finance & Working Capital',
    points: [
      'Working Capital & Trade Finance',
      'Invoice / Receivables Funding',
      'Business Cash Flow Solutions',
    ],
  },
];

/* ───────────────────────────────────────────────────────
   Stat cards — using more impressive framing
─────────────────────────────────────────────────────── */
const stats = [
  { v: '500+', l: 'Cr Facilitated',    d: 'Cumulative funding',  icon: BarChart3 },
  { v: '6',    l: 'Solution Verticals', d: 'Funding to Insurance', icon: Layers },
  { v: '10+',  l: 'Industries Served',  d: 'MSMEs to Corporates',  icon: PieChart },
  { v: '100%', l: 'Client-First',       d: 'Customised Solutions',  icon: Award },
  { v: '1',    l: 'Unified Platform',   d: 'All Needs, One Partner', icon: Target },
  { v: '15+',  l: 'Years Experience',   d: 'Combined Leadership',   icon: Clock },
];

const features = [
  {
    label: 'Funding',
    heading: 'Business Funding Built Around You',
    desc: 'Every business has different funding needs. We map your financial profile and structure the right solution — whether it is working capital, a term loan, or a large-scale project fund.',
    points: ['Business & SME Loans', 'Working Capital Finance', 'Project & Real Estate Funding', 'Trade Finance & Invoice Funding'],
    icon: TrendingUp,
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    accentColor: '#0A9B73',
  },
  {
    label: 'Protection',
    heading: 'Insurance & Risk Management',
    desc: 'From life and health to commercial and group insurance, we help you protect your business, your people and your personal assets with the right coverage for every risk.',
    points: ['Life & Term Insurance', 'Health & Group Insurance', 'Commercial & General Insurance', 'Directors & Officers Liability'],
    icon: Shield,
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    accentColor: '#06152F',
  },
  {
    label: 'Advisory',
    heading: 'End-to-End Strategic Support',
    desc: 'We do not just introduce you to a lender. We understand your requirement, structure your application, and support you through every stage — from approval to disbursement.',
    points: ['Requirement Understanding', 'Financial Profile Analysis', 'Solution Structuring', 'Lender / Insurer Connection'],
    icon: Handshake,
    gradient: 'from-orange-500/20 via-orange-500/5 to-transparent',
    accentColor: '#F47A20',
  },
];

/* ── Base animation variants ────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

/* ── Count-Up Component ─────────────────────────────────── */
const CountUpStat = ({ stat, index }) => {
  const { v, l, d, icon: Icon } = stat;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');
  const numStr = v.replace(/[^0-9.]/g, '');
  const suffix = v.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (!inView) return;
    const target = parseFloat(numStr);
    const dur = 1600;
    const step = target / (dur / 16);
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      setDisplay(Math.round(cur).toString());
      if (cur >= target) { setDisplay(numStr); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numStr]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
      className="bg-white rounded-2xl border border-[#F0F0F0] p-6 text-center group cursor-default relative overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="w-9 h-9 mx-auto mb-3 rounded-xl bg-brand-green/8 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
        <Icon size={16} strokeWidth={2} />
      </div>
      <p className="text-3xl font-heading font-bold text-brand-navy mb-1 tabular-nums group-hover:text-brand-green transition-colors duration-300">
        {display}{suffix}
      </p>
      <p className="text-[11px] font-heading font-semibold text-[#374151] mb-0.5 uppercase tracking-wider">{l}</p>
      <p className="text-[10px] text-[#9CA3AF] font-sans">{d}</p>
    </motion.div>
  );
};

/* ── Rich Feature Visual Card — replaces the empty grey box ─── */
const FeatureVisual = ({ feat, isEven }) => {
  const Icon = feat.icon;
  return (
    <motion.div
      variants={fadeUp}
      className={`${isEven ? 'order-2' : 'order-2 lg:order-1'}`}
    >
      <div
        className="relative rounded-3xl p-10 overflow-hidden"
        style={{ minHeight: '380px', background: `linear-gradient(135deg, ${feat.accentColor}12, ${feat.accentColor}04, transparent)` }}
      >
        {/* Decorative elements */}
        <div className="absolute top-6 right-6 w-32 h-32 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${feat.accentColor}, transparent)` }} />
        <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${feat.accentColor}, transparent)` }} />

        {/* Main icon */}
        <div className="relative z-10 flex flex-col h-full justify-between" style={{ minHeight: '300px' }}>
          <div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${feat.accentColor}, ${feat.accentColor}CC)` }}
            >
              <Icon size={36} className="text-white" strokeWidth={1.5} />
            </motion.div>
            <h4 className="font-heading font-semibold text-xl text-brand-navy mb-4">{feat.heading}</h4>
            <p className="text-[#6B7280] text-sm leading-relaxed font-sans mb-6 max-w-sm">{feat.desc.substring(0, 120)}...</p>
          </div>

          {/* Mini stat pills */}
          <div className="flex flex-wrap gap-2">
            {feat.points.map((pt, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-[11px] font-heading font-semibold border"
                style={{ borderColor: `${feat.accentColor}25`, color: feat.accentColor, background: `${feat.accentColor}08` }}>
                {pt}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Showcase Icon Visual — much richer than concentric circles ── */
const ShowcaseVisual = ({ Icon, num }) => (
  <div className="relative w-72 h-72 flex items-center justify-center">
    {/* Glowing backdrop */}
    <div className="absolute inset-0 rounded-full bg-white/5 blur-xl" />

    {/* Outer hex-like shape */}
    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 288 288" fill="none">
      <path d="M144 8 L268 76 L268 212 L144 280 L20 212 L20 76 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
    </svg>

    {/* Inner ring */}
    <div className="absolute w-48 h-48 rounded-full border border-white/15" />

    {/* Big number background */}
    <span className="absolute text-8xl font-heading font-bold text-white/[0.04] select-none">{num}</span>

    {/* Central icon card */}
    <motion.div
      whileHover={{ scale: 1.08, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="relative z-10 w-28 h-28 rounded-3xl backdrop-blur-md flex items-center justify-center shadow-2xl"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))' }}
    >
      <Icon size={48} className="text-white" strokeWidth={1.5} />
    </motion.div>

    {/* Orbiting dots */}
    <div className="absolute w-full h-full" style={{ animation: 'orbitSpin 20s linear infinite' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/50 shadow-lg" />
    </div>
    <div className="absolute w-4/5 h-4/5" style={{ animation: 'orbitSpinReverse 14s linear infinite' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/30" />
    </div>
  </div>
);

/* ── Process Step with animated connector ───────────────── */
const ProcessStepCard = ({ step, index, total }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-8 h-px z-0 overflow-hidden"
          style={{ left: 'calc(50% + 1.5rem)', width: 'calc(100% - 1rem)' }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-brand-green/40 to-brand-green/10"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      <div className="relative z-10 text-center lg:text-left">
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-green/40 group-hover:bg-brand-green/10 transition-all duration-400"
            whileHover={{ scale: 1.05, rotate: 3 }}
          >
            <span className="text-2xl font-heading font-bold text-brand-green">{step.number}</span>
          </motion.div>
        </div>
        <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          {step.title}
        </h4>
        <p className="text-white/45 text-sm font-sans leading-relaxed max-w-[200px] mx-auto lg:mx-0">{step.description}</p>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════ */
const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <WhoWeAre />
      <WhyShriyamSection />
      <ServicesFader />
      <FinancialPerspective />



      {/* ══════════════════════════════════════════════════
          SECTION 05 - APPROACH SECTION (CINEMATIC)
      ══════════════════════════════════════════════════ */}
      <ApproachSection />

      <WhoWeServeSection />

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <AboutCTA />
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  Copy, 
  ChevronDown, 
  CheckCircle2
} from 'lucide-react';
import Logo from '../components/ui/Logo';

/* ── REUSABLE FORM CONTROLS (GREEN THEME) ─────────────────── */

const FormInput = ({ label, name, required, type = "text", value, onChange, placeholder = " ", min }) => (
  <div className="relative flex flex-col mb-8 group">
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="peer w-full bg-transparent border-b border-white/30 py-3 text-white text-[15px] font-sans outline-none focus:border-white transition-colors"
    />
    <label 
      htmlFor={name}
      className="absolute left-0 top-3 font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-white peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-white/70 pointer-events-none"
    >
      {label}{required && ' *'}
    </label>
  </div>
);

const FormSelect = ({ label, name, required, value, onChange, options }) => (
  <div className="relative flex flex-col mb-8 group">
    <label className="font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase mb-2">
      {label}{required && ' *'}
    </label>
    <div className="relative">
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-white/30 py-3 text-white text-[15px] font-sans outline-none focus:border-white transition-colors appearance-none cursor-pointer pr-8"
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={val} value={val} className="bg-[#06152F] text-white py-2">
              {lbl}
            </option>
          );
        })}
      </select>
      <ChevronDown size={16} className="absolute right-1 top-3.5 text-white/60 pointer-events-none" />
    </div>
  </div>
);

const FormPillGroup = ({ label, options, value, onChange }) => (
  <div className="flex flex-col mb-8">
    <label className="font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase mb-3">
      {label}
    </label>
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2.5 rounded-full font-sans text-[13px] transition-all duration-200 border text-left ${
            value === opt
              ? 'bg-[#06152F] border-[#06152F] text-white shadow-md font-medium'
              : 'bg-white/10 border-white/20 text-white/90 hover:border-white hover:bg-white/15'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const FormCounter = ({ label, value, onChange, min = 0, max = 10 }) => (
  <div className="flex flex-col mb-8">
    <label className="font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase mb-2">
      {label}
    </label>
    <div className="flex items-center gap-3 bg-white/10 border border-white/25 rounded-full px-4 py-2 w-fit">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 disabled:opacity-30 disabled:hover:bg-white/15 flex items-center justify-center text-white text-[16px] font-bold transition-colors select-none"
      >
        −
      </button>
      <span className="font-sans font-semibold text-white text-[16px] min-w-[28px] text-center select-none">
        {value}
      </span>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 disabled:opacity-30 disabled:hover:bg-white/15 flex items-center justify-center text-white text-[16px] font-bold transition-colors select-none"
      >
        +
      </button>
    </div>
  </div>
);

const FormDate = ({ label, name, value, onChange }) => (
  <div className="relative flex flex-col mb-8 group">
    <label className="font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase mb-2">
      {label}
    </label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b border-white/30 py-3 text-white text-[15px] font-sans outline-none focus:border-white transition-colors cursor-pointer [color-scheme:dark]"
    />
  </div>
);

const FormTextarea = ({ label, name, required, value, onChange, placeholder = " " }) => (
  <div className="relative flex flex-col mb-8 group">
    <textarea
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="peer w-full bg-transparent border-b border-white/30 py-3 text-white text-[15px] font-sans outline-none focus:border-white transition-colors resize-none min-h-[100px]"
    />
    <label className="absolute left-0 top-3 font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-white peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-white/70 pointer-events-none">
      {label}{required && ' *'}
    </label>
  </div>
);

const FormCheckbox = ({ checked, onChange, children }) => (
  <label className="flex items-start gap-3 cursor-pointer group mt-4 mb-8 select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div
      className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-all duration-200 shrink-0 ${
        checked
          ? 'bg-[#06152F] border-[#06152F] text-white shadow-sm'
          : 'border-white/40 bg-transparent group-hover:border-white'
      }`}
    >
      {checked && <Check size={14} className="stroke-[3]" />}
    </div>
    <span className="text-[13px] font-sans text-white/85 leading-snug">
      {children}
    </span>
  </label>
);

/* ── CONFIGURATION & OPTIONS ─────────────────────────────── */

const FORM_TABS = [
  {
    id: 'general',
    label: 'General Insurance',
    badge: 'Assets & Business',
    heroEyebrow: 'SHRIYAM FINTECH • GENERAL INSURANCE',
    heroTitle: 'PROTECT YOUR ASSETS.',
    heroAccent: 'SECURE YOUR BUSINESS.',
    heroDesc: 'Get in touch for insurance solutions for your business, property, vehicles and professional liabilities.',
    highlights: [
      'Commercial Property & Factory Cover',
      'Marine Transit & Fleet Insurance',
      'Directors & Officers (D&O) & Liability',
      'Cyber Risk & Business Interruption'
    ]
  },
  {
    id: 'life',
    label: 'Life Insurance',
    badge: 'Family & Legacy',
    heroEyebrow: 'SHRIYAM FINTECH • LIFE INSURANCE',
    heroTitle: 'PROTECT YOUR FAMILY.',
    heroAccent: 'PRESERVE YOUR LEGACY.',
    heroDesc: "Explore life insurance solutions for financial protection, long-term savings, retirement and your family's future.",
    highlights: [
      'Pure Term Life Cover up to ₹10Cr+',
      'Guaranteed Income & Wealth Creation',
      'Retirement & Annuity Pension Plans',
      'Keyman & Business Succession Cover'
    ]
  },
  {
    id: 'health',
    label: 'Health Insurance',
    badge: 'Health & Security',
    heroEyebrow: 'SHRIYAM FINTECH • HEALTH INSURANCE',
    heroTitle: 'YOUR HEALTH. YOUR FAMILY.',
    heroAccent: 'YOUR SECURITY.',
    heroDesc: 'Explore health insurance options for individuals, families, senior citizens and employees.',
    highlights: [
      'Comprehensive Family Floater Cover',
      '10,000+ Cashless Hospital Network',
      'Senior Citizen & Pre-Existing Coverage',
      'Corporate & Group Health Benefits'
    ]
  },
  {
    id: 'corporate',
    label: 'Loan Enquiry',
    badge: 'Funding & Advisory',
    heroEyebrow: 'TALK TO SHRIYAM • LOAN ENQUIRY',
    heroTitle: 'START WITH THE',
    heroAccent: 'REQUIREMENT.',
    heroDesc: 'Every financial requirement is different. Tell us what you are looking to achieve, and our team will guide the conversation from there.',
    highlights: [
      'Corporate & Unsecured Business Loans',
      'Working Capital & Trade Finance',
      'Loan Against Property (LAP)',
      'Project & Real Estate Development'
    ]
  }
];

const GENERAL_INSURANCE_TYPES = [
  'Fire & Property Insurance',
  'Marine & Transit Cargo',
  'Commercial Motor & Fleet',
  'Cyber Liability Insurance',
  'Directors & Officers (D&O) Liability',
  'Commercial General Liability (CGL)',
  'Workmen\'s Compensation / Employer Liability',
  'Plant, Machinery & Equipment Breakdown',
  'Contractor\'s All Risk (CAR)',
  'Business Interruption Cover',
  'Trade Credit Insurance',
  'Other General Insurance'
];

const ASSET_VALUES = [
  'Select approximate coverage value...',
  'Below ₹50 Lakh',
  '₹50 Lakh – ₹1 Crore',
  '₹1 Crore – ₹5 Crore',
  '₹5 Crore – ₹25 Crore',
  '₹25 Crore – ₹100 Crore',
  'Above ₹100 Crore'
];

const GENERAL_INQUIRY_TYPES = [
  'New Policy',
  'Policy Renewal',
  'Existing Policy Review',
  'Claim Assistance Inquiry'
];

const LIFE_OCCUPATIONS = [
  'Salaried',
  'Self-Employed Professional',
  'Business Owner / Entrepreneur',
  'Homemaker',
  'Retired',
  'Other'
];

const LIFE_REQUIREMENTS = [
  'Term Life Insurance',
  'Whole Life Insurance',
  'Guaranteed Savings & Return Plan',
  'Child Education & Future Planning',
  'Retirement & Annuity Pension Plan',
  'Keyman Insurance for Business',
  'Unit Linked Insurance Plan (ULIP)'
];

const LIFE_COVERS = [
  '₹50 Lakh – ₹1 Crore',
  '₹1–2 crore',
  '₹2–5 crore',
  '₹5–10 crore',
  '₹10 crore+',
  'To be advised by advisor'
];

const LIFE_BUDGETS = [
  'Below ₹25,000',
  '₹25,000–₹50,000',
  '₹50,000–₹1,00,000',
  '₹1,00,000–₹2,50,000',
  '₹2,50,000–₹5,00,000',
  '₹5,00,000+'
];

const LIFE_GOALS = [
  'Family Protection',
  'Loan / Liability Protection',
  'Savings and Regular Income',
  'Retirement Planning',
  'Business Protection'
];

const HEALTH_TYPES = [
  'Family Floater',
  'Individual Health Cover',
  'Senior Citizen Health Plan',
  'Critical Illness Cover',
  'Super Top-Up Policy',
  'Group / Corporate Health Insurance'
];

const HEALTH_SUMS = [
  '₹5–10 lakh',
  '₹10–25 lakh',
  '₹25–50 lakh',
  '₹50 lakh–1 crore',
  '₹1 crore+',
  'Need advisory consultation'
];

const HEALTH_INQUIRY_TYPES = [
  'New Policy',
  'Renewal',
  'Explore Portability',
  'Review Existing Cover'
];

const CORPORATE_SERVICES = [
  'BUSINESS FUNDING',
  'WORKING CAPITAL',
  'PROJECT & REAL ESTATE',
  'INSURANCE & PROTECTION',
  'OTHER REQUIREMENTS'
];

/* ── MAIN COMPONENT ─────────────────────────────────────── */

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramTab = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(
    FORM_TABS.some(t => t.id === paramTab) ? paramTab : 'general'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');

  // 1. General Insurance Form State
  const [generalState, setGeneralState] = useState({
    name: '',
    phone: '',
    email: '',
    customerType: 'Individual',
    company: '',
    insuranceType: 'Fire & Property Insurance',
    assetValue: '₹1 Crore – ₹5 Crore',
    inquiryType: 'New Policy',
    expiryDate: '',
    requirements: '',
    consent: true
  });

  // 2. Life Insurance Form State
  const [lifeState, setLifeState] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    occupation: 'Salaried',
    requirement: 'Term Life Insurance',
    desiredCover: '₹1–2 crore',
    budget: '₹25,000–₹50,000',
    financialGoal: 'Family Protection',
    additionalDetails: '',
    consent: true
  });

  // 3. Health Insurance Form State
  const [healthState, setHealthState] = useState({
    name: '',
    phone: '',
    email: '',
    healthType: 'Family Floater',
    adults: 2,
    children: 1,
    eldestAge: '',
    sumInsured: '₹10–25 lakh',
    inquiryType: 'New Policy',
    expiryDate: '',
    requirements: '',
    consent: true
  });

  // 4. Corporate / General Enquiry State
  const [corporateState, setCorporateState] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'BUSINESS FUNDING',
    requirement: '',
    consent: true
  });

  const activeTabConfig = FORM_TABS.find(t => t.id === activeTab) || FORM_TABS[0];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsSubmitted(false);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const handleCopyDetails = () => {
    let text = '';
    if (activeTab === 'general') {
      text = 
`SHRIYAM FINTECH — GENERAL INSURANCE INQUIRY
===========================================
Full Name: ${generalState.name || 'Not provided'}
Mobile Number: ${generalState.phone || 'Not provided'}
Email Address: ${generalState.email || 'Not provided'}
Customer Type: ${generalState.customerType}
Company Name: ${generalState.company || 'N/A'}
Type of Insurance: ${generalState.insuranceType}
Approx Asset / Coverage Value: ${generalState.assetValue}
Inquiry Type: ${generalState.inquiryType}
Existing Policy Expiry Date: ${generalState.expiryDate || 'N/A'}
Additional Requirements: ${generalState.requirements || 'None'}
Consent to Contact: ${generalState.consent ? 'Yes' : 'No'}
===========================================`;
    } else if (activeTab === 'life') {
      text = 
`SHRIYAM FINTECH — LIFE INSURANCE INQUIRY
===========================================
Full Name: ${lifeState.name || 'Not provided'}
Mobile Number: ${lifeState.phone || 'Not provided'}
Email Address: ${lifeState.email || 'Not provided'}
Age: ${lifeState.age || 'Not provided'}
Occupation: ${lifeState.occupation}
Requirement: ${lifeState.requirement}
Desired Life Cover: ${lifeState.desiredCover}
Indicative Annual Budget: ${lifeState.budget}
Primary Financial Goal: ${lifeState.financialGoal}
Additional Details: ${lifeState.additionalDetails || 'None'}
Consent to Contact: ${lifeState.consent ? 'Yes' : 'No'}
===========================================`;
    } else if (activeTab === 'health') {
      text = 
`SHRIYAM FINTECH — HEALTH INSURANCE INQUIRY
===========================================
Full Name: ${healthState.name || 'Not provided'}
Mobile Number: ${healthState.phone || 'Not provided'}
Email Address: ${healthState.email || 'Not provided'}
Type of Health Insurance: ${healthState.healthType}
Covered Members: ${healthState.adults} Adults, ${healthState.children} Children
Age of Eldest Member: ${healthState.eldestAge || 'Not provided'}
Desired Sum Insured: ${healthState.sumInsured}
Inquiry Type: ${healthState.inquiryType}
Existing Policy Expiry Date: ${healthState.expiryDate || 'N/A'}
Additional Requirements: ${healthState.requirements || 'None'}
Consent to Contact: ${healthState.consent ? 'Yes' : 'No'}
===========================================`;
    } else {
      text = 
`SHRIYAM FINTECH — LOAN ENQUIRY
===========================================
Full Name: ${corporateState.name || 'Not provided'}
Company Name: ${corporateState.company || 'N/A'}
Phone Number: ${corporateState.phone || 'Not provided'}
Email Address: ${corporateState.email || 'Not provided'}
Category: ${corporateState.service}
Requirement: ${corporateState.requirement || 'None'}
Consent to Contact: ${corporateState.consent ? 'Yes' : 'No'}
===========================================`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryRef(refCode);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#06152F]">
      
      {/* 01 — TYPOGRAPHIC HERO */}
      <section className="relative w-full bg-white pt-[200px] lg:pt-[240px] pb-[80px] lg:pb-[110px] min-h-[45vh] md:min-h-[50vh] flex flex-col justify-center border-b border-[#E2E8F0]">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-[60px] flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center mb-8"
          >
            <div className="w-10 h-[2px] bg-[#0A9B73] mr-5"></div>
            <span className="font-heading font-medium text-[12px] tracking-[0.25em] text-[#0A9B73] uppercase mt-0.5">
              Direct Inquiries & Advisory
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold text-[44px] md:text-[62px] lg:text-[80px] text-[#06152F] leading-[1.05] max-w-[1000px]"
          >
            LET'S FIND THE RIGHT<br />
            <span className="text-[#0A9B73]">FINANCIAL & INSURANCE PATH.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[17px] md:text-[19px] text-[#475569] leading-[1.6] max-w-[650px] mt-6 mb-10"
          >
            Dedicated inquiry desks for General Insurance, Life Insurance, Health Insurance, and Business Funding solutions.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4 text-[#0A9B73] font-heading font-semibold text-[13px] tracking-[0.15em] uppercase w-fit"
          >
            <span className="border-b border-[#0A9B73]/30 group-hover:border-[#0A9B73] transition-colors pb-1">
              START A CONVERSATION
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* 02 — PREMIUM CONTACT & INSURANCE FORM SECTION */}
      <section id="enquiry" className="relative w-full bg-[#F7F8F6] py-[80px] lg:py-[120px]">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-[60px]">

          {/* Elevated Split Card Container */}
          <div className="w-full bg-white rounded-[20px] shadow-[0_12px_40px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col lg:flex-row border border-[#E2E8F0]">
            
            {/* Left Brand & Details Side */}
            <div className="w-full lg:w-[38%] bg-white p-8 md:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTabConfig.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="inline-block font-heading font-medium text-[11px] tracking-[0.2em] text-[#0A9B73] uppercase mb-4">
                      {activeTabConfig.heroEyebrow}
                    </span>
                    <h2 className="font-heading font-semibold text-[30px] md:text-[38px] text-[#06152F] leading-[1.12] mb-5">
                      {activeTabConfig.heroTitle}<br />
                      <span className="text-[#0A9B73]">{activeTabConfig.heroAccent}</span>
                    </h2>
                    <p className="font-sans text-[15px] text-[#475569] leading-relaxed max-w-[360px] mb-8">
                      {activeTabConfig.heroDesc}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="flex flex-col gap-3 py-4 border-t border-[#F1F5F9] mb-8">
                      <span className="text-[11px] font-heading font-semibold tracking-wider text-slate-400 uppercase">
                        Key Coverage & Capabilities
                      </span>
                      {activeTabConfig.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={15} className="text-[#0A9B73] shrink-0" />
                          <span className="font-sans text-[13px] text-[#334155]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Logo Insertion */}
              <div className="my-8 lg:my-4 flex items-center z-10 pl-2">
                <Logo theme="light" className="scale-[1.25] origin-left" />
              </div>

              {/* Contact Information */}
              <div className="relative z-10 flex flex-col gap-6 mt-4 pt-6 border-t border-[#F1F5F9]">
                <div className="flex flex-col">
                  <span className="font-heading font-medium text-[10px] tracking-[0.2em] text-[#9CA3AF] uppercase mb-1">
                    DIRECT ADVISORY LINE
                  </span>
                  <a href="tel:8610389508" className="font-sans font-semibold text-[20px] text-[#06152F] hover:text-[#0A9B73] transition-colors w-fit">
                    8610389508
                  </a>
                </div>
                
                <div className="flex flex-col">
                  <span className="font-heading font-medium text-[10px] tracking-[0.2em] text-[#9CA3AF] uppercase mb-1">
                    DESK EMAIL
                  </span>
                  <a href="mailto:enquiry@shriyamfintech.com" className="font-sans text-[15px] text-[#06152F] hover:text-[#0A9B73] transition-colors w-fit">
                    enquiry@shriyamfintech.com
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="font-heading font-medium text-[10px] tracking-[0.2em] text-[#9CA3AF] uppercase mb-1">
                    OFFICE LOCATION
                  </span>
                  <p className="font-sans text-[14px] text-[#475569] leading-snug">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form Side (Rich Emerald Theme) */}
            <div className="w-full lg:w-[62%] p-8 md:p-12 lg:p-16 bg-[#0A9B73] flex flex-col justify-between relative">
              
              {/* Select Inquiry Type - Inside Green Box */}
              <div className="mb-8 pb-6 border-b border-white/20">
                <span className="font-heading font-medium text-[11px] tracking-[0.2em] text-white/75 uppercase block mb-3.5">
                  SELECT INQUIRY TYPE
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {FORM_TABS.map((tab) => {
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id)}
                        className={`px-4 sm:px-5 py-2.5 rounded-full font-heading text-[12px] sm:text-[13px] tracking-wider uppercase transition-all duration-200 border text-left ${
                          isSelected
                            ? 'bg-[#06152F] border-[#06152F] text-white shadow-md font-semibold'
                            : 'bg-white/10 border-white/25 text-white/90 hover:bg-white/20 hover:border-white hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Header */}
              <div className="pb-6 mb-8 border-b border-white/15">
                <span className="font-heading font-medium text-[11px] tracking-[0.25em] text-white/75 uppercase block mb-1">
                  SHRIYAM FINTECH • {activeTabConfig.label.toUpperCase()}
                </span>
                <h3 className="font-heading font-semibold text-[22px] md:text-[26px] text-white leading-tight">
                  {activeTab === 'general' && 'General Insurance Inquiry Form'}
                  {activeTab === 'life' && 'Life Insurance Inquiry Form'}
                  {activeTab === 'health' && 'Health Insurance Inquiry Form'}
                  {activeTab === 'corporate' && 'Loan Enquiry Form'}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-20 h-20 bg-white/15 text-white rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <Check size={44} className="stroke-[3]" />
                    </div>
                    <span className="font-heading font-medium text-[12px] tracking-[0.2em] text-white/80 uppercase mb-2">
                      Inquiry Received • Ref: {inquiryRef}
                    </span>
                    <h4 className="font-heading font-semibold text-[30px] md:text-[34px] text-white mb-4">
                      Thank you for choosing Shriyam.
                    </h4>
                    <p className="font-sans text-white/85 text-[16px] max-w-[480px] mb-8 leading-relaxed">
                      Your <strong className="text-white underline">{activeTabConfig.label}</strong> details have been securely logged. Our dedicated insurance advisory desk will review your requirement and connect with you shortly.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={handleCopyDetails}
                        className="bg-white text-[#06152F] hover:bg-slate-100 font-heading font-semibold text-[12px] tracking-wider uppercase px-6 py-3.5 rounded-md flex items-center gap-2 shadow-md transition-all"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        <span>{copied ? 'Copied Details!' : 'Copy Form Details'}</span>
                      </button>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="font-heading font-semibold text-[12px] tracking-widest text-white uppercase border border-white/40 px-6 py-3.5 rounded-md hover:bg-white/10 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <form onSubmit={handleSubmit} className="w-full flex flex-col">
                      
                      {/* ────────────────────────────────────────────────────────
                          TAB 1: GENERAL INSURANCE INQUIRY FORM
                      ──────────────────────────────────────────────────────── */}
                      {activeTab === 'general' && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormInput 
                              label="Full Name" 
                              name="name" 
                              required 
                              value={generalState.name} 
                              onChange={(e) => setGeneralState({ ...generalState, name: e.target.value })} 
                            />
                            <FormInput 
                              label="Mobile Number" 
                              name="phone" 
                              required 
                              type="tel" 
                              value={generalState.phone} 
                              onChange={(e) => setGeneralState({ ...generalState, phone: e.target.value })} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormInput 
                              label="Email Address" 
                              name="email" 
                              type="email" 
                              value={generalState.email} 
                              onChange={(e) => setGeneralState({ ...generalState, email: e.target.value })} 
                            />
                            <FormInput 
                              label="Company Name" 
                              name="company" 
                              value={generalState.company} 
                              placeholder=" " 
                              onChange={(e) => setGeneralState({ ...generalState, company: e.target.value })} 
                            />
                          </div>

                          <FormPillGroup 
                            label="Customer Type" 
                            options={['Individual', 'Business']} 
                            value={generalState.customerType} 
                            onChange={(val) => setGeneralState({ ...generalState, customerType: val })} 
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormSelect 
                              label="Type of Insurance Required" 
                              name="insuranceType" 
                              required 
                              value={generalState.insuranceType} 
                              onChange={(e) => setGeneralState({ ...generalState, insuranceType: e.target.value })} 
                              options={GENERAL_INSURANCE_TYPES} 
                            />
                            <FormSelect 
                              label="Approximate Asset / Coverage Value" 
                              name="assetValue" 
                              value={generalState.assetValue} 
                              onChange={(e) => setGeneralState({ ...generalState, assetValue: e.target.value })} 
                              options={ASSET_VALUES} 
                            />
                          </div>

                          <FormPillGroup 
                            label="Inquiry Type" 
                            options={GENERAL_INQUIRY_TYPES} 
                            value={generalState.inquiryType} 
                            onChange={(val) => setGeneralState({ ...generalState, inquiryType: val })} 
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormDate 
                              label="Existing Policy Expiry Date (if applicable)" 
                              name="expiryDate" 
                              value={generalState.expiryDate} 
                              onChange={(e) => setGeneralState({ ...generalState, expiryDate: e.target.value })} 
                            />
                          </div>

                          <FormTextarea 
                            label="Additional Requirements" 
                            name="requirements" 
                            value={generalState.requirements} 
                            onChange={(e) => setGeneralState({ ...generalState, requirements: e.target.value })} 
                          />

                          <FormCheckbox 
                            checked={generalState.consent} 
                            onChange={() => setGeneralState({ ...generalState, consent: !generalState.consent })}
                          >
                            I consent to being contacted about this inquiry under the website's privacy notice.
                          </FormCheckbox>
                        </>
                      )}

                      {/* ────────────────────────────────────────────────────────
                          TAB 2: LIFE INSURANCE INQUIRY FORM
                      ──────────────────────────────────────────────────────── */}
                      {activeTab === 'life' && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormInput 
                              label="Full Name" 
                              name="name" 
                              required 
                              value={lifeState.name} 
                              onChange={(e) => setLifeState({ ...lifeState, name: e.target.value })} 
                            />
                            <FormInput 
                              label="Mobile Number" 
                              name="phone" 
                              required 
                              type="tel" 
                              value={lifeState.phone} 
                              onChange={(e) => setLifeState({ ...lifeState, phone: e.target.value })} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
                            <div className="md:col-span-2">
                              <FormInput 
                                label="Email Address" 
                                name="email" 
                                type="email" 
                                value={lifeState.email} 
                                onChange={(e) => setLifeState({ ...lifeState, email: e.target.value })} 
                              />
                            </div>
                            <FormInput 
                              label="Age" 
                              name="age" 
                              required 
                              type="number" 
                              min="18" 
                              value={lifeState.age} 
                              onChange={(e) => setLifeState({ ...lifeState, age: e.target.value })} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormSelect 
                              label="Occupation" 
                              name="occupation" 
                              value={lifeState.occupation} 
                              onChange={(e) => setLifeState({ ...lifeState, occupation: e.target.value })} 
                              options={LIFE_OCCUPATIONS} 
                            />
                            <FormSelect 
                              label="Life Insurance Requirement" 
                              name="requirement" 
                              required 
                              value={lifeState.requirement} 
                              onChange={(e) => setLifeState({ ...lifeState, requirement: e.target.value })} 
                              options={LIFE_REQUIREMENTS} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormSelect 
                              label="Desired Life Cover (if applicable)" 
                              name="desiredCover" 
                              value={lifeState.desiredCover} 
                              onChange={(e) => setLifeState({ ...lifeState, desiredCover: e.target.value })} 
                              options={LIFE_COVERS} 
                            />
                            <FormSelect 
                              label="Indicative Annual Premium Budget" 
                              name="budget" 
                              value={lifeState.budget} 
                              onChange={(e) => setLifeState({ ...lifeState, budget: e.target.value })} 
                              options={LIFE_BUDGETS} 
                            />
                          </div>

                          <FormPillGroup 
                            label="Primary Financial Goal" 
                            options={LIFE_GOALS} 
                            value={lifeState.financialGoal} 
                            onChange={(val) => setLifeState({ ...lifeState, financialGoal: val })} 
                          />

                          <FormTextarea 
                            label="Additional Details" 
                            name="additionalDetails" 
                            value={lifeState.additionalDetails} 
                            onChange={(e) => setLifeState({ ...lifeState, additionalDetails: e.target.value })} 
                          />

                          <FormCheckbox 
                            checked={lifeState.consent} 
                            onChange={() => setLifeState({ ...lifeState, consent: !lifeState.consent })}
                          >
                            I consent to being contacted about life insurance options under the website's privacy notice.
                          </FormCheckbox>
                        </>
                      )}

                      {/* ────────────────────────────────────────────────────────
                          TAB 3: HEALTH INSURANCE INQUIRY FORM
                      ──────────────────────────────────────────────────────── */}
                      {activeTab === 'health' && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormInput 
                              label="Full Name" 
                              name="name" 
                              required 
                              value={healthState.name} 
                              onChange={(e) => setHealthState({ ...healthState, name: e.target.value })} 
                            />
                            <FormInput 
                              label="Mobile Number" 
                              name="phone" 
                              required 
                              type="tel" 
                              value={healthState.phone} 
                              onChange={(e) => setHealthState({ ...healthState, phone: e.target.value })} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormInput 
                              label="Email Address" 
                              name="email" 
                              type="email" 
                              value={healthState.email} 
                              onChange={(e) => setHealthState({ ...healthState, email: e.target.value })} 
                            />
                            <FormSelect 
                              label="Type of Health Insurance" 
                              name="healthType" 
                              required 
                              value={healthState.healthType} 
                              onChange={(e) => setHealthState({ ...healthState, healthType: e.target.value })} 
                              options={HEALTH_TYPES} 
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6">
                            <FormCounter 
                              label="Adults" 
                              value={healthState.adults} 
                              min={1} 
                              max={6} 
                              onChange={(val) => setHealthState({ ...healthState, adults: val })} 
                            />
                            <FormCounter 
                              label="Children" 
                              value={healthState.children} 
                              min={0} 
                              max={6} 
                              onChange={(val) => setHealthState({ ...healthState, children: val })} 
                            />
                            <FormInput 
                              label="Age of Eldest Member" 
                              name="eldestAge" 
                              type="number" 
                              min="0" 
                              value={healthState.eldestAge} 
                              onChange={(e) => setHealthState({ ...healthState, eldestAge: e.target.value })} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormSelect 
                              label="Desired Sum Insured" 
                              name="sumInsured" 
                              value={healthState.sumInsured} 
                              onChange={(e) => setHealthState({ ...healthState, sumInsured: e.target.value })} 
                              options={HEALTH_SUMS} 
                            />
                            <FormDate 
                              label="Existing Policy Expiry Date (if applicable)" 
                              name="expiryDate" 
                              value={healthState.expiryDate} 
                              onChange={(e) => setHealthState({ ...healthState, expiryDate: e.target.value })} 
                            />
                          </div>

                          <FormPillGroup 
                            label="Inquiry Type" 
                            options={HEALTH_INQUIRY_TYPES} 
                            value={healthState.inquiryType} 
                            onChange={(val) => setHealthState({ ...healthState, inquiryType: val })} 
                          />

                          <FormTextarea 
                            label="Additional Requirements" 
                            name="requirements" 
                            value={healthState.requirements} 
                            onChange={(e) => setHealthState({ ...healthState, requirements: e.target.value })} 
                          />

                          <FormCheckbox 
                            checked={healthState.consent} 
                            onChange={() => setHealthState({ ...healthState, consent: !healthState.consent })}
                          >
                            I consent to being contacted about health insurance options under the website's privacy notice.
                          </FormCheckbox>
                        </>
                      )}

                      {/* ────────────────────────────────────────────────────────
                          TAB 4: LOAN ENQUIRY FORM
                      ──────────────────────────────────────────────────────── */}
                      {activeTab === 'corporate' && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormInput 
                              label="Your Name" 
                              name="name" 
                              required 
                              value={corporateState.name} 
                              onChange={(e) => setCorporateState({ ...corporateState, name: e.target.value })} 
                            />
                            <FormInput 
                              label="Company Name" 
                              name="company" 
                              value={corporateState.company} 
                              onChange={(e) => setCorporateState({ ...corporateState, company: e.target.value })} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormInput 
                              label="Phone Number" 
                              name="phone" 
                              required 
                              type="tel" 
                              value={corporateState.phone} 
                              onChange={(e) => setCorporateState({ ...corporateState, phone: e.target.value })} 
                            />
                            <FormInput 
                              label="Email Address" 
                              name="email" 
                              required 
                              type="email" 
                              value={corporateState.email} 
                              onChange={(e) => setCorporateState({ ...corporateState, email: e.target.value })} 
                            />
                          </div>

                          <div className="flex flex-col mb-8">
                            <label className="font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase mb-4">
                              WHAT CAN WE HELP YOU WITH?
                            </label>
                            <div className="flex flex-wrap gap-2.5">
                              {CORPORATE_SERVICES.map(service => (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => {
                                    setCorporateState({ ...corporateState, service });
                                  }}
                                  className={`px-5 py-3 border rounded-full font-sans text-[13px] transition-all duration-300 ${
                                    corporateState.service === service
                                      ? 'bg-[#06152F] border-[#06152F] text-white shadow-md'
                                      : 'bg-transparent border-white/30 text-white/90 hover:border-white hover:text-white'
                                  }`}
                                >
                                  {service}
                                </button>
                              ))}
                            </div>

                            {/* Helpful sub-routing when Insurance is selected in general form */}
                            {corporateState.service === 'INSURANCE & PROTECTION' && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 rounded-xl bg-[#06152F]/30 border border-white/20"
                              >
                                <span className="text-[12px] font-heading font-medium text-white/90 uppercase block mb-3">
                                  Looking for specialized insurance? Select category form:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleTabChange('general')}
                                    className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#06152F] text-[12px] font-sans font-medium transition-all"
                                  >
                                    General Insurance Form →
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleTabChange('life')}
                                    className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#06152F] text-[12px] font-sans font-medium transition-all"
                                  >
                                    Life Insurance Form →
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleTabChange('health')}
                                    className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#06152F] text-[12px] font-sans font-medium transition-all"
                                  >
                                    Health Insurance Form →
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <FormTextarea 
                            label="YOUR REQUIREMENT" 
                            name="requirement" 
                            value={corporateState.requirement} 
                            onChange={(e) => setCorporateState({ ...corporateState, requirement: e.target.value })} 
                          />

                          <FormCheckbox 
                            checked={corporateState.consent} 
                            onChange={() => setCorporateState({ ...corporateState, consent: !corporateState.consent })}
                          >
                            I consent to being contacted about this inquiry under the website's privacy notice.
                          </FormCheckbox>
                        </>
                      )}

                      {/* ────────────────────────────────────────────────────────
                          SUBMIT & COPY ACTIONS
                      ──────────────────────────────────────────────────────── */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 pt-6 border-t border-white/20">
                        <button
                          type="submit"
                          className="bg-[#06152F] text-white px-8 py-4 rounded-[4px] font-heading font-semibold text-[13px] tracking-[0.15em] uppercase flex items-center justify-center gap-3 hover:bg-white hover:text-[#06152F] transition-all duration-300 shadow-md group"
                        >
                          <span>SUBMIT INQUIRY</span>
                          <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          type="button"
                          onClick={handleCopyDetails}
                          className="border border-white/35 text-white px-6 py-4 rounded-[4px] font-heading font-medium text-[12px] tracking-[0.12em] uppercase flex items-center justify-center gap-2.5 hover:bg-white/10 hover:border-white transition-all duration-200"
                        >
                          {copied ? (
                            <>
                              <Check size={16} className="text-white" />
                              <span>COPIED INQUIRY DETAILS!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="text-white/80" />
                              <span>COPY INQUIRY DETAILS</span>
                            </>
                          )}
                        </button>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
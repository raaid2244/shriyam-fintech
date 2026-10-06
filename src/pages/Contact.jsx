import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Logo from '../components/ui/Logo';

/* ── PREMIUM FORM COMPONENTS (GREEN THEME) ───────────────── */

const FormInput = ({ label, name, required, type = "text", value, onChange }) => (
  <div className="relative flex flex-col mb-10 group">
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full bg-transparent border-b border-white/30 py-3 text-white text-[16px] font-sans outline-none focus:border-white transition-colors"
    />
    <label className="absolute left-0 top-3 font-heading font-medium text-[12px] tracking-widest text-white/70 uppercase transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:text-white/70">
      {label}{required && ' *'}
    </label>
  </div>
);

const FormTextarea = ({ label, name, required, value, onChange }) => (
  <div className="relative flex flex-col mb-10 group">
    <textarea
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full bg-transparent border-b border-white/30 py-3 text-white text-[16px] font-sans outline-none focus:border-white transition-colors resize-none min-h-[120px]"
    />
    <label className="absolute left-0 top-3 font-heading font-medium text-[12px] tracking-widest text-white/70 uppercase transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:text-white/70">
      {label}{required && ' *'}
    </label>
  </div>
);

const ServiceOption = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left px-5 py-3 border rounded-full font-sans text-[13px] transition-all duration-300
      ${selected 
        ? 'bg-[#06152F] border-[#06152F] text-white shadow-md' 
        : 'bg-transparent border-white/30 text-white/90 hover:border-white hover:text-white'
      }`}
  >
    {label}
  </button>
);

/* ── MAIN COMPONENT ─────────────────────────────────────── */

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '', company: '', phone: '', email: '', service: '', requirement: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "BUSINESS FUNDING",
    "WORKING CAPITAL",
    "PROJECT & REAL ESTATE",
    "INSURANCE & PROTECTION",
    "OTHER REQUIREMENTS"
  ];

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });
  
  const handleServiceSelect = (service) => {
    setFormState({ ...formState, service });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', company: '', phone: '', email: '', service: '', requirement: '' });
    }, 300);
  };

  return (
    <div className="flex flex-col w-full bg-[#06152F]">
      
      {/* 01 — TYPOGRAPHIC HERO */}
      <section className="relative w-full bg-white pt-[200px] lg:pt-[240px] pb-[100px] lg:pb-[140px] min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-[60px] flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center mb-10"
          >
            <div className="w-10 h-[2px] bg-[#0A9B73] mr-5"></div>
            <span className="font-heading font-medium text-[12px] tracking-[0.25em] text-[#0A9B73] uppercase mt-0.5">
              Get in touch
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold text-[46px] md:text-[64px] lg:text-[84px] text-[#06152F] leading-[1.05] max-w-[1000px]"
          >
            LET'S FIND THE RIGHT<br />
            <span className="text-[#0A9B73]">FINANCIAL PATH.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[18px] md:text-[20px] text-[#475569] leading-[1.6] max-w-[600px] mt-8 mb-12"
          >
            Whether you are looking for funding, protection or financial support, let's start with understanding your requirement.
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

      {/* 02 — PREMIUM CONTACT FORM SECTION */}
      <section id="enquiry" className="relative w-full bg-[#F7F8F6] py-[100px] lg:py-[150px]">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-[60px]">
          
          {/* Elevated Split Card Container */}
          <div className="w-full bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row border border-[#E2E8F0]">
            
            {/* Left Brand Side */}
            <div className="w-full lg:w-[40%] bg-white p-10 md:p-14 lg:p-16 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block font-heading font-medium text-[11px] tracking-[0.2em] text-[#0A9B73] uppercase mb-6">
                  TALK TO SHRIYAM
                </span>
                <h2 className="font-heading font-semibold text-[32px] md:text-[42px] text-[#06152F] leading-[1.1] mb-6">
                  START WITH THE<br />
                  <span className="text-[#0A9B73]">REQUIREMENT.</span>
                </h2>
                <p className="font-sans text-[16px] text-[#475569] leading-relaxed max-w-[320px]">
                  Every financial requirement is different. Tell us what you are looking to achieve, and our team will guide the conversation from there.
                </p>
              </div>

              {/* Logo Insertion */}
              <div className="my-16 lg:my-0 flex items-center z-10 pl-6">
                 <Logo theme="light" className="scale-[1.4] origin-left" />
              </div>

              <div className="relative z-10 flex flex-col gap-10 mt-0 lg:mt-16">
                <div className="flex flex-col">
                  <span className="font-heading font-medium text-[11px] tracking-[0.2em] text-[#9CA3AF] uppercase mb-3">
                    DIRECT ADVISORY
                  </span>
                  <a href="tel:8610389508" className="font-sans text-[24px] text-[#06152F] hover:text-[#0A9B73] transition-colors w-fit border-b border-transparent hover:border-[#0A9B73]">
                    8610389508
                  </a>
                </div>
                
                <div className="flex flex-col">
                  <span className="font-heading font-medium text-[11px] tracking-[0.2em] text-[#9CA3AF] uppercase mb-3">
                    OFFICE LOCATION
                  </span>
                  <p className="font-sans text-[16px] text-[#475569] leading-relaxed max-w-[250px]">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form Side */}
            <div className="w-full lg:w-[60%] p-10 md:p-14 lg:p-20 bg-[#0A9B73]">
              <h3 className="font-heading font-semibold text-[24px] text-white mb-12">
                SEND AN ENQUIRY
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex flex-col items-center justify-center text-center py-24"
                  >
                    <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mb-8">
                      <Check size={40} />
                    </div>
                    <h4 className="font-heading font-semibold text-[28px] text-white mb-4">
                      Thank you.
                    </h4>
                    <p className="font-sans text-white/80 text-[18px] mb-10">
                      Your enquiry has been securely received.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="font-heading font-semibold text-[13px] tracking-widest text-white uppercase border-b border-white/30 pb-1 hover:border-white transition-colors"
                    >
                      SEND ANOTHER ENQUIRY
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <FormInput label="Your Name" name="name" required value={formState.name} onChange={handleChange} />
                      <FormInput label="Company Name" name="company" value={formState.company} onChange={handleChange} />
                      <FormInput label="Phone Number" name="phone" required type="tel" value={formState.phone} onChange={handleChange} />
                      <FormInput label="Email Address" name="email" required type="email" value={formState.email} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col mt-4 mb-12">
                      <label className="font-heading font-medium text-[11px] tracking-widest text-white/70 uppercase mb-6">
                        WHAT CAN WE HELP YOU WITH?
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {services.map(service => (
                          <ServiceOption 
                            key={service} 
                            label={service} 
                            selected={formState.service === service}
                            onClick={() => handleServiceSelect(service)}
                          />
                        ))}
                      </div>
                    </div>

                    <FormTextarea 
                      label="YOUR REQUIREMENT" 
                      name="requirement" 
                      value={formState.requirement} 
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className="group w-full md:w-auto bg-[#06152F] text-white px-10 py-5 rounded-[4px] font-heading font-semibold text-[13px] tracking-[0.15em] uppercase flex items-center justify-center md:justify-between gap-4 hover:bg-white hover:text-[#06152F] transition-colors duration-300 mt-6"
                    >
                      <span>SEND ENQUIRY</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
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

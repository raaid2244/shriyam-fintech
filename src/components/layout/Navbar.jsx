import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

/* Pages that use a dark (navy) hero — navbar must render in white mode */
const DARK_HERO_ROUTES = ['/about', '/approach'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overNavyHomeHero, setOverNavyHomeHero] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();

  /* Whether we're on a page with a dark hero (before scroll) */
  const isDarkHero = DARK_HERO_ROUTES.some(r => location.pathname.startsWith(r));
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > 20);
      /* Home hero: navbar is white-on-navy once the pillars have covered the top
         (~35% of hero scroll) and stays that way until the hero's bottom edge
         passes under the navbar, i.e. the next section reaches it. */
      const hero = document.getElementById('home-hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const scrollable = rect.height - vh;
        const progress = scrollable > 0 ? -rect.top / scrollable : 0;
        const NAVBAR_H = 80;
        setOverNavyHomeHero(progress >= 0.35 && rect.bottom > NAVBAR_H);
        setPastHero(rect.bottom <= NAVBAR_H);
      } else {
        setOverNavyHomeHero(false);
        setPastHero(y > 50);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
    setScrolled(false);
    setOverNavyHomeHero(false);
    setPastHero(false);
  }, [location.pathname]);

  /* Navbar text is white (onDark) when transparent over a dark background */
  const onDark = !pastHero && (isDarkHero || (isHome && overNavyHomeHero));

  const navLinks = [
    { name: 'Home',       path: '/' },
    { name: 'About',      path: '/about' },
    { name: 'Solutions',  path: '/solutions' },
    { name: 'Industries', path: '/industries' },
    { name: 'Approach',   path: '/approach' },
    { name: 'Contact',    path: '/contact' },
  ];

  /* Solid white background when past the hero */
  const navBg = pastHero 
    ? 'bg-white/95 backdrop-blur-md shadow-sm pointer-events-auto transition-all duration-300' 
    : 'bg-transparent pointer-events-auto transition-all duration-300';

  const hamburgerColor = onDark ? 'text-white' : 'text-[#06152F]';

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -16 },
    show:   (i) => ({ opacity: 1, x: 0, transition: { duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] } }),
    exit:   { opacity: 0, x: -10 },
  };

  const getActiveItemPath = () => {
    if (location.pathname === '/') return '/';
    const matches = navLinks.filter(item => item.path !== '/' && location.pathname.startsWith(item.path));
    if (matches.length > 0) {
      return matches.sort((a, b) => b.path.length - a.path.length)[0].path;
    }
    return '/';
  };
  
  const activeSectionPath = getActiveItemPath();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${navBg} ${scrolled ? 'py-3' : 'py-4'}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
        <div className="flex justify-between items-center min-h-[56px] py-1">

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo theme={onDark ? "dark" : "light"} />
          </Link>

          {/* Desktop: clean pill nav — centred */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center bg-white border border-[rgba(6,21,47,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.04)] rounded-full px-2 py-1.5">
              {navLinks.map((link) => {
                const isActive = link.path === activeSectionPath;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      px-[20px] py-[12px] rounded-full text-[14px] font-medium transition-all duration-300
                      ${isActive 
                        ? 'bg-[#0A9B73] text-white font-semibold' 
                        : 'text-[#64748B] hover:text-[#06152F]'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop: CTA button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              to="/contact"
              className={`
                shimmer-btn
                font-['Montserrat'] font-semibold text-[14px] tracking-wide
                px-[22px] py-[14px] rounded-[10px] md:rounded-[12px]
                transition-all duration-300
                whitespace-nowrap
                ${onDark
                  ? 'bg-[#0A9B73] text-white hover:bg-white hover:text-[#06152F]'
                  : 'bg-[#06152F] text-white hover:bg-[#0A9B73]'}
              `}
            >
              TALK TO AN EXPERT
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`lg:hidden p-2 rounded-md transition-colors ${hamburgerColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = link.path === activeSectionPath;
                return (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <Link
                      to={link.path}
                      className={`
                        font-['Montserrat'] flex items-center justify-between px-5 py-2.5 text-[14px] font-medium transition-all duration-250 ease-in-out
                        ${isActive
                          ? 'text-white bg-[#0A9B73] rounded-full font-semibold'
                          : 'text-[#64748B] bg-transparent hover:bg-[rgba(10,155,115,0.08)] hover:text-[#06152F] rounded-full'
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                custom={navLinks.length}
                variants={mobileItemVariants}
                initial="hidden"
                animate="show"
                className="pt-3 px-4"
              >
                <Link
                  to="/contact"
                  className="shimmer-btn font-['Montserrat'] block w-full text-center bg-[#06152F] text-white px-5 py-3 rounded-lg font-semibold text-[14px] hover:bg-[#0A9B73] transition-colors"
                >
                  TALK TO AN EXPERT
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

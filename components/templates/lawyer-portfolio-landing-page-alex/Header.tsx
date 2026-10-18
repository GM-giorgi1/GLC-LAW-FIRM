'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Award,
  ChevronRight,
  Globe,
  ChevronDown
} from 'lucide-react';

// Browser subscriptions for smooth continuous scroll animation (SSR-safe via useSyncExternalStore)
function subscribeResize(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function subscribeScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getScrollSnapshot() {
  return typeof window !== 'undefined' ? window.scrollY : 0;
}

function getWindowWidthSnapshot() {
  return typeof window !== 'undefined' ? window.innerWidth : 1200;
}

function getWindowHeightSnapshot() {
  return typeof window !== 'undefined' ? window.innerHeight : 800;
}

const brandLogos = [
  {
    name: 'GBA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'JUSTICE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor">
        <path d="M12 3V21M3 9L12 7L21 9M6 13L3 9L6 9M18 13L21 9L18 9M6 13C6 15 4.5 16 3 16C1.5 16 0 15 0 13M18 13C18 15 19.5 16 21 16C22.5 16 24 15 24 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'COUNSEL',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor">
        <path d="M4 4H20M6 4V20M18 4V20M10 8V16M14 8V16M2 20H22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'EXPERTISE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor">
        <circle cx="12" cy="8" r="6" strokeWidth="2" />
        <path d="M15.477 12.89L17 22L12 19L7 22L8.523 12.89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'STRATEGY',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'INTEGRITY',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor">
        <path d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos];

// Letter-by-letter blurry wave reveal without breaking words
function BlurWaveText({
  text,
  className = '',
  delay = 0.2,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={{
                hidden: { opacity: 0, filter: 'blur(8px)', y: 6 },
                visible: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  transition: { duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] },
                },
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'ENG' | 'GEO' | 'RUS' | 'TUR'>('ENG');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const lastScrollYRef = React.useRef(0);

  // Read scroll and window dimensions using React's native useSyncExternalStore
  const scrollY = useSyncExternalStore(subscribeScroll, getScrollSnapshot, () => 0);
  const windowWidth = useSyncExternalStore(subscribeResize, getWindowWidthSnapshot, () => 1200);
  const windowHeight = useSyncExternalStore(subscribeResize, getWindowHeightSnapshot, () => 800);

  // Continuous scroll interpolation calculations
  const scrollThreshold = Math.min(500, Math.max(280, (windowHeight || 800) * 0.55));
  const t = Math.min(1, Math.max(0, scrollY / scrollThreshold));
  const isOtherSection = scrollY > scrollThreshold * 0.95;

  // Track scroll direction for other sections
  useEffect(() => {
    const handleDirectionScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollYRef.current;
      const heroThreshold = Math.min(500, Math.max(280, (windowHeight || 800) * 0.65));

      // Always show navigation when at or near the hero section
      if (currentY <= heroThreshold) {
        setIsNavHidden(false);
      } else {
        // In other sections:
        // Scrolling down (diff > 4) -> show navigation and middle SVG
        // Scrolling up (diff < -4) -> hide navigation and middle SVG
        if (diff > 4) {
          setIsNavHidden(false);
        } else if (diff < -4) {
          setIsNavHidden(true);
        }
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', handleDirectionScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleDirectionScroll);
  }, [windowHeight]);

  // Continuous dimensions & coordinates for Name SVG:
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  // Exact horizontal padding matching selected div container (px-6=48px, md:px-12=96px, lg:px-[90px]=180px)
  const containerPadding = isMobile ? 48 : (isTablet ? 96 : 180);
  const heroWidth = Math.max(280, windowWidth - containerPadding);
  const heroHeight = heroWidth / 5.188; // 1406x271 native aspect ratio

  // Starting coordinate (at bottom of header)
  const bottomPadding = isMobile ? 12 : 20;
  const initialTop = Math.max(140, windowHeight - heroHeight - bottomPadding);

  // Target coordinate (middle alignment of fixed top navbar, with smaller height as requested)
  const navBarHeight = isMobile ? 56 : 64;
  const targetHeight = isMobile ? 18 : 22; // Sleek and compact in the navbar
  const targetWidth = targetHeight * 5.188;
  const targetTop = (navBarHeight - targetHeight) / 2;

  // Continuous travel from bottom to top with continuous reduction in size
  const currentTop = initialTop + (targetTop - initialTop) * t;
  const currentHeight = heroHeight + (targetHeight - heroHeight) * t;
  const currentWidth = heroWidth + (targetWidth - heroWidth) * t;
  
  // Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceArea: 'Corporate & Business Law',
    date: '',
    time: '10:00 AM',
    notes: ''
  });

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsBookingOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookedSuccess(true);
    setTimeout(() => {
      setIsBookedSuccess(false);
      setIsBookingOpen(false);
      setBookingData({
        name: '',
        email: '',
        phone: '',
        practiceArea: 'Corporate & Business Law',
        date: '',
        time: '10:00 AM',
        notes: ''
      });
    }, 2800);
  };

  return (
    <>
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      <header className="relative w-full min-h-screen lg:h-screen bg-[#0C0D0D] text-[#FAFAFB] flex flex-col justify-between overflow-hidden select-none">
      {/* Background Image Layer with Cinematic Dark Moody Lighting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/.tempmediaStorage/HERO_GUBE.jpeg"
          alt="Giorgi Gubeladze - Senior Business Lawyer"
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover object-top lg:object-[center_20%] brightness-[0.88] contrast-[1.05]"
        />
        {/* Subtle Vignette & Gradient Overlays for optimal typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-transparent to-[#0C0D0D]/60 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0D0D]/90 via-[#0C0D0D]/50 to-transparent opacity-95 lg:opacity-85" />
        
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D3AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Outer Viewport Container - Full Width with specific padding */}
      <div 
        className="relative z-10 w-full max-w-full h-full min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-[90px] box-border"
        style={{ paddingTop: '8px', paddingBottom: '12px' }}
      >
        
        {/* ================= TOP NAVIGATION ROW ================= */}
        <div 
          className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-[90px] h-14 md:h-16 flex flex-row justify-between items-center transition-all duration-300 ${
            isOtherSection 
              ? 'bg-[#0C0D0D]/40 backdrop-blur-md border-b border-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.25)]' 
              : 'bg-transparent border-0 border-none shadow-none'
          }`}
          style={{ 
            transform: isNavHidden && isOtherSection ? 'translateY(-110%)' : 'translateY(0)',
            opacity: isNavHidden && isOtherSection ? 0 : 1,
            pointerEvents: isNavHidden && isOtherSection ? 'none' : 'auto',
          }}
        >
          {/* Left: Icon on Desktop, Icon + Name SVG on Tablet & Mobile */}
          <div 
            className="cursor-pointer flex items-center group shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95 gap-2.5 sm:gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="GLC Law Firm - Back to Top"
            aria-label="Back to Top"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 relative flex items-center justify-center shrink-0">
              <Image 
                src="https://cdn.jiro.build/Alex/All%20SVG/nav%20left%20top%20icon.svg"
                alt="GLC Law Firm"
                width={36}
                height={36}
                priority
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Tablet & Mobile: Name placed directly to the right of the icon */}
            <div className="flex lg:hidden items-center h-5 sm:h-6 md:h-7 w-auto max-w-[130px] sm:max-w-[180px] md:max-w-[220px]">
              <span className="font-antonio font-bold tracking-tight text-[#D3AF37] uppercase text-lg sm:text-xl md:text-2xl whitespace-nowrap">
                GLC Law Firm
              </span>
            </div>
          </div>

          {/* Right: Language Selector & Menu button */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* Multi-language Selector (4 Languages: ENG, GEO, RUS, TUR) */}
            <div className="relative flex items-center">
              {/* Desktop & Tablet: Segmented Pill */}
              <div className="hidden sm:inline-flex items-center p-0.5 rounded-full border border-[#D3AF37]/30 bg-black/40 backdrop-blur-md shadow-sm">
                {(['ENG', 'GEO', 'RUS', 'TUR'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2.5 py-1 text-xs font-semibold tracking-wider transition-all duration-200 rounded-full cursor-pointer ${
                      selectedLang === lang
                        ? 'bg-gradient-to-r from-[#FDE99A] via-[#E2C359] to-[#CDA12B] text-black shadow-[0_2px_10px_rgba(211,175,55,0.35)]'
                        : 'text-[#D3AF37]/80 hover:text-[#D3AF37] hover:bg-[#D3AF37]/10'
                    }`}
                    aria-label={`Select language ${lang}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Mobile: Compact Dropdown Button */}
              <div className="sm:hidden relative">
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#D3AF37]/30 bg-black/40 text-[#D3AF37] hover:bg-[#D3AF37]/10 text-xs font-semibold tracking-wider transition-all"
                  aria-label="Change Language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#D3AF37]" />
                  <span>{selectedLang}</span>
                  <ChevronDown className={`w-3 h-3 text-[#D3AF37] transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-28 rounded-xl bg-[#121213]/95 backdrop-blur-xl border border-[#D3AF37]/30 shadow-2xl py-1 z-50 flex flex-col"
                    >
                      {(['ENG', 'GEO', 'RUS', 'TUR'] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`px-3 py-1.5 text-xs text-left font-semibold tracking-wider flex items-center justify-between transition-colors ${
                            selectedLang === lang
                              ? 'text-[#D3AF37] bg-[#D3AF37]/15'
                              : 'text-white/70 hover:text-[#D3AF37] hover:bg-[#D3AF37]/10'
                          }`}
                        >
                          <span>{lang}</span>
                          {selectedLang === lang && <span className="w-1.5 h-1.5 rounded-full bg-[#D3AF37]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Menu text + Menu icon */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-row items-center gap-2 md:gap-3 cursor-pointer group py-2 px-3 rounded-md focus:outline-none shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Open Navigation Menu"
            >
              <span className="font-antonio font-bold text-xl md:text-[22px] leading-none uppercase tracking-[-0.02em] text-[#FFFEFE]/90 group-hover:text-[#D3AF37] transition-colors">
                MENU
              </span>
              <div className="w-6 h-6 flex items-center justify-center relative">
                {/* Menu Icon Frame with Gold Accent */}
                <div className="w-full h-[14px] border-y-[2.33px] border-[#D3AF37] flex items-center justify-center group-hover:border-white transition-colors">
                  <div className="w-full h-[2px] bg-[#D3AF37] group-hover:bg-white transition-colors" />
                </div>
              </div>
            </button>
          </div>
        </div>


        {/* ================= MIDDLE CONTENT ROW ================= */}
        <div 
          className="w-full mt-16 sm:mt-20 md:mt-24 lg:mt-24 mb-auto pt-2 pb-6 md:pb-8 lg:py-0 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12"
          style={{
            opacity: Math.max(0, 1 - scrollY / 350),
            transform: scrollY > 0 ? `translateY(-${Math.min(80, scrollY * 0.2)}px)` : 'none',
          }}
        >
          
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-8 md:gap-10 max-w-full lg:max-w-[660px]"
          >
            {/* Main Title */}
            <h1 className="font-inter-tight font-medium text-4xl sm:text-5xl lg:text-[60px] leading-[1.15] lg:leading-[1.2] tracking-[-0.02em] text-[#FFFEFE]">
              <BlurWaveText text="Trusted Legal Counsel For Growing Business" delay={0.2} />
            </h1>

            {/* Subheading Row */}
            <div className="flex flex-row items-start gap-4">
              {/* Pillar Icon Frame */}
              <div className="w-6 h-6 shrink-0 mt-1 relative flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-[#D3AF37]"
                >
                  {/* Classical Greek Pillars / Legal Columns Vector */}
                  <rect x="3" y="2" width="18" height="3" rx="0.5" fill="#D3AF37" />
                  <rect x="4" y="6" width="16" height="2" rx="0.5" fill="#D3AF37" />
                  <path d="M6 9V18M10 9V18M14 9V18M18 9V18" stroke="#D3AF37" strokeWidth="2" strokeLinecap="round" />
                  <rect x="4" y="19" width="16" height="3" rx="0.5" fill="#D3AF37" />
                </svg>
              </div>

              {/* Subheading Text */}
              <p className="font-inter-tight font-medium text-xl sm:text-2xl lg:text-[28px] leading-[1.2] tracking-[-0.03em] text-[#FFFEFE]/90 max-w-[340px] sm:max-w-[420px]">
                Focused Representation With Purpose
              </p>
            </div>
          </motion.div>

          {/* Right Card Block (Bar Association Member Badge) */}
          <motion.div 
            initial={{ opacity: 0, x: 140 }}
            animate={{ 
              opacity: scrollY > 260 ? 0 : 1, 
              x: scrollY > 260 ? 140 : 0 
            }}
            transition={{ 
              duration: 1.0, 
              delay: scrollY > 260 ? 0 : 0.25, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="hidden sm:flex w-[224px] min-h-[230px] p-5 bg-[#0C0D0D]/75 backdrop-blur-md border border-[#D3AF37]/80 rounded-[8px] flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-[#D3AF37] transition-all duration-300"
          >
            {/* Header / Gold Laurel & Scales Icon */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#D3AF37]/10 flex items-center justify-center border border-[#D3AF37]/30 text-[#D3AF37] group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
                  {/* Scales of Justice in Wreath */}
                  <path d="M24 10V34M16 16H32M16 16L11 26H21L16 16ZM32 16L27 26H37L32 16Z" stroke="#D3AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 38C8 34 8 26 12 20M36 38C40 34 40 26 36 20" stroke="#D3AF37" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#FAFAFB]/60 font-inter-tight">
                  MEMBER OF THE
                </span>
                <span className="font-antonio font-bold text-[18px] tracking-wider text-[#D3AF37] uppercase">
                  BAR ASSOCIATION
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#D3AF37]/20 my-2" />

            {/* List */}
            <ul 
              style={{ height: '75.9844px' }}
              className="space-y-1.5 text-[#FFFEFE]/80 font-inter-tight font-medium flex flex-col justify-between"
            >
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D3AF37] shrink-0" />
                <span className="text-[16px]">Legal Expertise</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D3AF37] shrink-0" />
                <span className="text-[16px]">Client-Focused</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D3AF37] shrink-0" />
                <span className="text-[16px]">Ethical Representation</span>
              </li>
            </ul>
          </motion.div>

        </div>


        {/* ================= TABLET & MOBILE BOTTOM ROW (STAYS AT BOTTOM, NEVER TRAVELS TO TOP ON SCROLL) ================= */}
        <div className="block lg:hidden w-full relative z-20 pb-4 sm:pb-6 md:pb-8 pt-4 select-none">
          <div className="relative w-full flex items-center justify-center">
            {/* Giant Typography / Name Vector */}
            <div 
              className="w-full flex items-center justify-center"
              style={{
                width: '100%',
                maxWidth: `${heroWidth}px`,
                height: `${heroHeight}px`,
              }}
            >
              <span 
                className="font-antonio font-bold tracking-tighter text-[#D3AF37] uppercase leading-none block select-none whitespace-nowrap text-center"
                style={{
                  fontSize: `${Math.max(32, heroHeight * 0.72)}px`,
                }}
              >
                GLC Law Firm
              </span>
            </div>

            {/* Rotated Consultation Button Floating Over the Name Banner */}
            <motion.div 
              initial={{ opacity: 0, y: -140, rotate: -18, scale: 0.9 }}
              animate={{ 
                opacity: scrollY > 180 ? 0 : 1,
                y: scrollY > 180 ? -140 : 0,
                rotate: -18,
                scale: scrollY > 180 ? 0.9 : 1,
              }}
              transition={{ 
                duration: 1.0, 
                delay: scrollY > 180 ? 0 : 0.3, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ rotate: -12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-row items-center p-1.5 sm:p-2 pr-3.5 sm:pr-5 gap-2 sm:gap-3 bg-[#030405] border border-white/10 shadow-[0px_10px_40px_rgba(0,0,0,0.85)] rounded-xl sm:rounded-2xl cursor-pointer pointer-events-auto"
              style={{ transformOrigin: 'center center' }}
            >
              {/* White Square Icon Box */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#030405]" />
              </div>

              {/* Button Label in Antonio Google Font */}
              <span className="font-antonio font-bold text-lg sm:text-2xl md:text-3xl leading-tight tracking-[-0.03em] text-[#D3AF37] whitespace-nowrap">
                Book a Consultation
              </span>
            </motion.div>
          </div>
        </div>

        {/* ================= DESKTOP BOTTOM ROW (CONTINUOUS TRAVEL TO NAVBAR ON SCROLL) ================= */}
        <div 
          className="hidden lg:flex fixed left-0 right-0 z-50 items-center justify-center pointer-events-none"
          style={{
            top: `${currentTop}px`,
            height: `${currentHeight}px`,
            transform: isNavHidden && isOtherSection ? 'translateY(-140px)' : 'none',
            opacity: isNavHidden && isOtherSection ? 0 : 1,
            transition: isOtherSection ? 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease' : 'none',
          }}
        >
          {/* Giant Typography / Name Vector Container */}
          <div 
            onClick={() => {
              if (t > 0.8) window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center justify-center transition-transform ${
              t > 0.8 
                ? 'pointer-events-auto cursor-pointer hover:scale-105' 
                : 'pointer-events-none'
            }`}
            style={{
              width: `${currentWidth}px`,
              height: `${currentHeight}px`,
              maxWidth: '100%',
            }}
          >
            <span 
              className="font-antonio font-bold tracking-tighter text-[#D3AF37] uppercase leading-none block select-none whitespace-nowrap text-center"
              style={{
                fontSize: `${Math.max(18, currentHeight * 0.7)}px`,
              }}
            >
              GLC Law Firm
            </span>
          </div>

          {/* Rotated CTA Button Floating Over the Name Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -160, rotate: -20, scale: 0.9 }}
            animate={{ 
              opacity: t > 0.12 ? 0 : 1,
              y: t > 0.12 ? -160 : 0,
              rotate: -20,
              scale: t > 0.12 ? 0.9 : 1,
            }}
            transition={{ 
              duration: 1.0, 
              delay: t > 0.12 ? 0 : 0.3, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={t < 0.12 ? { rotate: -15, scale: 1.05, y: -4 } : {}}
            whileTap={t < 0.12 ? { scale: 0.96 } : {}}
            drag={t < 0.12}
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            onClick={() => t < 0.12 && setIsBookingOpen(true)}
            className={`absolute top-1/2 -translate-y-1/2 z-20 flex flex-row items-center p-2 pr-5 gap-3 bg-[#030405] border border-white/10 shadow-[0px_10px_50px_rgba(0,0,0,0.8)] rounded-2xl group ${
              t < 0.12 ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
            }`}
            style={{ 
              transformOrigin: 'center center',
              display: t > 0.25 ? 'none' : 'flex',
            }}
          >
            {/* White Square Icon Box */}
            <div className="w-12 h-12 sm:w-[62px] sm:h-[62px] bg-white rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#D3AF37] transition-colors duration-300">
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#030405] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>

            {/* Button Label in Antonio Google Font */}
            <span className="font-antonio font-bold text-xl sm:text-3xl md:text-[36px] leading-tight tracking-[-0.04em] text-[#D3AF37] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
              Book a Consultation
            </span>
          </motion.div>

        </div>

      </div>


      {/* ================= FULLSCREEN MENU MODAL / DRAWER ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#0C0D0D]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="w-full max-w-[1420px] mx-auto flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#D3AF37]" />
                <span className="font-antonio font-bold text-2xl tracking-wider text-[#D3AF37]">
                  GLC LAW FIRM
                </span>
              </div>

              {/* Multi-language Selector & Close Button */}
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div className="flex items-center p-0.5 rounded-full border border-[#D3AF37]/30 bg-black/40 backdrop-blur-md">
                  {(['ENG', 'GEO', 'RUS', 'TUR'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSelectedLang(lang)}
                      className={`px-2 sm:px-3 py-1 text-xs font-semibold tracking-wider transition-all duration-200 rounded-full cursor-pointer ${
                        selectedLang === lang
                          ? 'bg-gradient-to-r from-[#FDE99A] via-[#E2C359] to-[#CDA12B] text-black shadow-[0_2px_10px_rgba(211,175,55,0.35)]'
                          : 'text-[#D3AF37]/80 hover:text-[#D3AF37] hover:bg-[#D3AF37]/10'
                      }`}
                      aria-label={`Switch to ${lang}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D3AF37]/30 flex items-center justify-center text-white hover:border-[#D3AF37] hover:text-[#D3AF37] transition-colors shrink-0"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            </div>

            {/* Menu Links */}
            <div className="w-full max-w-[1420px] mx-auto my-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
                {[
                  { name: 'HOME', href: '#' },
                  { name: 'ABOUT GLC LAW FIRM', href: '#about' },
                  { name: 'PRACTICE AREAS', href: '#services' },
                  { name: 'NOTABLE CASE RESULTS', href: '#cases' },
                  { name: 'TESTIMONIALS', href: '#testimonials' },
                  { name: 'OUR TEAM', href: '#team' },
                  { name: 'LATEST INSIGHTS', href: '#blogs' },
                  { name: 'CONTACT & LOCATION', href: '#contact' },
                ].map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx + 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-antonio font-bold text-3xl sm:text-5xl lg:text-6xl text-[#FAFAFB] hover:text-[#D3AF37] transition-colors flex items-center justify-between group py-1 border-b border-white/5"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-[#D3AF37] transition-all" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info Sidebar in Menu */}
              <div className="lg:col-span-5 bg-[#151415] border border-[#D3AF37]/20 rounded-2xl p-8 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-semibold tracking-widest text-[#D3AF37] uppercase font-inter-tight block mb-2">
                    OFFICE HEADQUARTERS
                  </span>
                  <h3 className="font-antonio text-2xl font-bold text-white mb-4">
                    GLC LAW FIRM
                  </h3>
                  <div className="space-y-4 text-sm text-gray-300 font-inter-tight">
                    <a
                      href="https://www.bing.com/maps/search?v=2&pc=FACEBK&mid=8100&name=Georgia%2C+Batumi%2C+Kutaisi+str%2C+office+%2331%2C+Batumi%2C+Georgia%2C+6000&mkt=en-US&FORM=FBKPL1&q=41.649%2C+41.6436&cp=41.648998%7E41.643600&lvl=4&style=r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 hover:text-[#D3AF37] transition-colors group/map"
                    >
                      <MapPin className="w-5 h-5 text-[#D3AF37] shrink-0 mt-0.5 group-hover/map:scale-110 transition-transform" />
                      <span>Georgia, Batumi, Kutaisi str, office #31, Batumi, Georgia, 6000</span>
                    </a>
                    <a
                      href="tel:+995599277794"
                      className="flex items-center gap-3 hover:text-[#D3AF37] transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[#D3AF37] shrink-0" />
                      <span>+995 599 27 77 94</span>
                    </a>
                    <a
                      href="mailto:lawyergiorgigubeladze@gmail.com"
                      className="flex items-center gap-3 hover:text-[#D3AF37] transition-colors"
                    >
                      <Mail className="w-5 h-5 text-[#D3AF37] shrink-0" />
                      <span>lawyergiorgigubeladze@gmail.com</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsBookingOpen(true);
                    }}
                    className="w-full py-4 bg-[#D3AF37] hover:bg-[#b9962e] text-black font-antonio font-bold text-xl uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span>SCHEDULE CONSULTATION</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Footer inside Menu */}
            <div className="w-full max-w-[1420px] mx-auto text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6 font-inter-tight">
              <p>© {new Date().getFullYear()} GLC Law Firm. All rights reserved.</p>
              <p className="text-gray-400">Attorney Advertising. Prior results do not guarantee a similar outcome.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= BOOK CONSULTATION MODAL ================= */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#0C0D0D] border border-[#D3AF37]/50 rounded-2xl p-6 sm:p-8 text-[#FAFAFB] shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close Booking Modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-[#D3AF37] font-antonio font-bold text-sm tracking-wider uppercase mb-1">
                  <Award className="w-4 h-4" />
                  <span>CONFIDENTIAL LEGAL SESSION</span>
                </div>
                <h2 className="font-antonio font-bold text-3xl sm:text-4xl text-white">
                  BOOK A CONSULTATION
                </h2>
                <p className="text-sm text-gray-400 font-inter-tight mt-1">
                  Schedule a direct strategy conference with Giorgi Gubeladze.
                </p>
              </div>

              {/* Form or Success State */}
              {isBookedSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#D3AF37]/20 border-2 border-[#D3AF37] text-[#D3AF37] flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-antonio font-bold text-3xl text-white">
                    REQUEST RECEIVED
                  </h3>
                  <p className="text-sm text-gray-300 font-inter-tight max-w-md">
                    Thank you, <strong className="text-[#D3AF37]">{bookingData.name || 'Valued Client'}</strong>. Our senior legal team will contact you within 2 business hours to finalize your consultation time.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 font-inter-tight">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jonathan Vance"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#171717] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D3AF37] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vance@corporation.com"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171717] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D3AF37] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171717] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D3AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                      Primary Practice Area
                    </label>
                    <select
                      value={bookingData.practiceArea}
                      onChange={(e) => setBookingData({ ...bookingData, practiceArea: e.target.value })}
                      className="w-full px-4 py-3 bg-[#171717] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D3AF37] transition-colors"
                    >
                      <option value="Corporate & Business Law">Corporate & Business Law</option>
                      <option value="Mergers & Acquisitions">Mergers & Acquisitions (M&A)</option>
                      <option value="Commercial Litigation">Commercial Litigation</option>
                      <option value="Intellectual Property">Intellectual Property Strategy</option>
                      <option value="Regulatory Compliance">Regulatory & Compliance</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D3AF37]" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171717] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D3AF37] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D3AF37]" />
                        <span>Preferred Time</span>
                      </label>
                      <select
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171717] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D3AF37] transition-colors"
                      >
                        <option value="09:00 AM">09:00 AM EST</option>
                        <option value="10:30 AM">10:30 AM EST</option>
                        <option value="01:30 PM">01:30 PM EST</option>
                        <option value="03:30 PM">03:30 PM EST</option>
                        <option value="05:00 PM">05:00 PM EST</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                      Brief Description of Legal Matter
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Provide key details regarding your business or legal inquiry..."
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#171717] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D3AF37] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-4 bg-[#D3AF37] hover:bg-[#c3a130] text-[#0C0D0D] font-antonio font-bold text-xl uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_5px_20px_rgba(211,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(211,175,55,0.5)] cursor-pointer"
                  >
                    CONFIRM CONSULTATION REQUEST
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </header>

      {/* Second Section: Brand Logos Marquee + Trusted Experienced Strategic */}
      <section className="relative w-full bg-[#0C0D0D] text-[#FAFAFB] pt-[64px] pb-[80px] overflow-hidden">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D3AF37]/[0.03] rounded-full blur-[140px] pointer-events-none" />

        {/* Top Running Brand Logos (Right to Left Marquee) */}
        <div className="relative w-full overflow-hidden mb-16 sm:mb-24">
          {/* Soft edge fade masks for high-end cinematic feel */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0C0D0D] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0C0D0D] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 28,
                ease: 'linear',
              },
            }}
            className="flex flex-row items-center gap-12 sm:gap-16 md:gap-24 w-max whitespace-nowrap will-change-transform"
          >
            {duplicatedLogos.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center gap-2.5 sm:gap-3 text-white/50 hover:text-[#D3AF37] transition-colors duration-300 group cursor-default select-none"
              >
                <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-white/60 group-hover:text-[#D3AF37]">
                  {brand.icon}
                </span>
                <span className="font-inter-tight font-medium text-base sm:text-lg md:text-xl tracking-tight text-white/60 group-hover:text-white transition-colors duration-300">
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center text-center">
          {/* Main Heading Text */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-antonio font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-[-0.01em] uppercase text-[#FFFEFE] leading-[1.1] mb-6 sm:mb-8"
          >
            TRUSTED. EXPERIENCED. STRATEGIC.
          </motion.h2>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter-tight font-normal text-base sm:text-lg md:text-xl text-[#FAFAFB]/70 max-w-[860px] leading-[1.65] sm:leading-[1.7] tracking-[-0.01em]"
          >
            With over 21 years of distinguished expertise in criminal, administrative, and civil litigation, Giorgi Gubeladze is a licensed advocate and recognized member of the Georgian Bar Association (GBA), delivering elite, results-driven legal strategy and uncompromised protection across Georgia and internationally.
          </motion.p>
        </div>
      </section>
    </>
  );
}

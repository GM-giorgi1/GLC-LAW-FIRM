'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  badge: string;
  titlePrefix: string;
  titleAccent: string;
  rating: string;
  quote: string;
  image: string;
  isBook?: boolean;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 0,
    name: 'David Mitchell',
    role: 'Corporate Litigation Client',
    badge: 'Business Dispute',
    titlePrefix: 'CASE WON WITH',
    titleAccent: 'CONFIDENCE',
    rating: '5.0',
    quote:
      'Giorgi listened carefully, explained everything clearly, and fought for the best outcome. I felt supported and informed throughout the entire legal process.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2001.png',
  },
  {
    id: 1,
    name: 'Marcus Sterling',
    role: 'Asset Protection Client',
    badge: 'Wealth & Asset Protection',
    titlePrefix: 'ASSETS SECURED',
    titleAccent: 'FLAWLESSLY',
    rating: '5.0',
    quote:
      'From the initial consultation to final resolution, the strategic depth and relentless execution exceeded every expectation. An invaluable legal partner.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2002.png',
  },
  {
    id: 2,
    name: 'Julian Vance',
    role: 'Commercial Property Client',
    badge: 'Real Estate & Zoning',
    titlePrefix: 'ZONING DISPUTE',
    titleAccent: 'RESOLVED',
    rating: '4.9',
    quote:
      'When municipal hurdles stalled our development, Giorgi stepped in with authoritative legal precision. We secured approvals in record time without compromising our vision.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2003.png',
  },
  {
    id: 3,
    name: 'Arthur Pendelton',
    role: 'Senior Advisory Client',
    badge: 'Contractual Rights',
    titlePrefix: 'JUSTICE & TRUST',
    titleAccent: 'ATTAINED',
    rating: '5.0',
    quote:
      'Decades in corporate leadership taught me how rare true legal mastery is. This firm embodies relentless advocacy, pristine ethics, and supreme courtroom prowess.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2004.png',
  },
  {
    id: 4,
    name: 'Robert Hayes',
    role: 'Family Estate Client',
    badge: 'Estate & Probate',
    titlePrefix: 'ESTATE PROBATE',
    titleAccent: 'CLARITY',
    rating: '5.0',
    quote:
      'Compassionate, razor-sharp, and remarkably responsive. In the most stressful season of my life, having Giorgi in our corner gave my family absolute peace of mind.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2005.png',
  },
  {
    id: 5,
    name: 'Eleanor Vance',
    role: 'Managing Partner, Apex Tech',
    badge: 'Tech & IP Counsel',
    titlePrefix: 'PATENTS & IP',
    titleAccent: 'DEFENDED',
    rating: '5.0',
    quote:
      'Navigating cross-border intellectual property disputes was overwhelming until Giorgi took command. The strategic insight saved our proprietary technology and millions in value.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2006.png',
  },
  {
    id: 6,
    name: 'Gregory Bennett',
    role: 'Chief Executive Officer',
    badge: 'M&A Advisory',
    titlePrefix: 'ACQUISITION CLOSED',
    titleAccent: 'SEAMLESSLY',
    rating: '5.0',
    quote:
      'Giorgi handled our multi-entity merger with absolute precision. Every contract covenant, regulatory compliance item, and closing milestone was flawless.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2007.png',
  },
  {
    id: 7,
    name: 'Sophia Laurent',
    role: 'Private Wealth Trustee',
    badge: 'Trust & Governance',
    titlePrefix: 'TRUST ASSETS',
    titleAccent: 'SAFEGUARDED',
    rating: '5.0',
    quote:
      'Unmatched integrity and discretion. Giorgi structured our multi-generational family estate plan with clarity and meticulous attention to detail.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2008.png',
  },
  {
    id: 8,
    name: 'Brandon Cole',
    role: 'Commercial Contractor',
    badge: 'Contract Arbitration',
    titlePrefix: 'DISPUTE WON',
    titleAccent: 'DECISIVELY',
    rating: '4.9',
    quote:
      'In a high-stakes subcontractor litigation, Giorgi dismantled opposing arguments systematically and achieved a favorable summary judgment.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2009.png',
  },
  {
    id: 9,
    name: 'Victoria Chen',
    role: 'Startup Co-Founder',
    badge: 'Seed & Equity Formation',
    titlePrefix: 'VENTURE EQUITY',
    titleAccent: 'STRUCTURED',
    rating: '5.0',
    quote:
      'From corporate incorporation to our Series A legal drafting, Giorgi has been an indispensable counselor whose advice we trust without hesitation.',
    image: 'https://cdn.jiro.build/Jahid/Extra/Img/avater%2010.png',
  },
];

// Screen width helper using useSyncExternalStore
function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return typeof window !== 'undefined' ? window.innerWidth : 1280;
}

function getServerSnapshot() {
  return 1280;
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });

  const windowWidth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDesktop = windowWidth >= 1200;
  const isTablet = windowWidth >= 768 && windowWidth < 1200;

  const [indices, setIndices] = useState({ current: 0, prev: 0, dir: 1 });
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const currentIndex = indices.current;
  const prevIndex = indices.prev;
  const direction = indices.dir;

  // Auto-slide loop: continuously loops every 5.2s unless paused
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      setIndices((p) => ({ prev: p.current, current: (p.current + 1) % total, dir: 1 }));
    }, 5200);
    return () => clearInterval(timer);
  }, [isPaused, isInView, total]);

  const handleNext = () => {
    setIndices((p) => ({ prev: p.current, current: (p.current + 1) % total, dir: 1 }));
  };

  const handlePrev = () => {
    setIndices((p) => ({ prev: p.current, current: (p.current - 1 + total) % total, dir: -1 }));
  };

  const handleSelect = (index: number) => {
    if (index === currentIndex) return;
    const dir = index > currentIndex ? 1 : -1;
    setIndices((p) => ({ prev: p.current, current: index, dir }));
  };

  // Helper to compute slot index: -2 (far-left), -1 (near-left), 0 (center), 1 (near-right), 2 (far-right)
  const getSlot = (id: number, baseIdx: number): number => {
    let diff = id - baseIdx;
    while (diff > 2) diff -= total;
    while (diff < -2) diff += total;
    return diff;
  };

  // Predefined slot configuration (fixed positions relative to container center)
  const tabletCardWidth = windowWidth >= 1024 ? 640 : Math.min(Math.max(480, windowWidth - 160), 560);
  const tabletSideX = (tabletCardWidth / 2) + 65;

  const getSlotStyles = (slot: number) => {
    if (!isDesktop && !isTablet) {
      // Mobile (< 768px)
      if (slot === 0) {
        return {
          x: 0,
          width: Math.min(windowWidth - 32, 460),
          height: 380,
          opacity: 1,
          scale: 1,
          zIndex: 30,
          visible: true,
        };
      }
      return {
        x: slot > 0 ? 320 : -320,
        width: 80,
        height: 240,
        opacity: 0,
        scale: 0.6,
        zIndex: 0,
        visible: false,
      };
    }

    if (isTablet) {
      // Tablet (768px to 1199px)
      if (slot === 0) {
        return {
          x: 0,
          width: tabletCardWidth,
          height: 390,
          opacity: 1,
          scale: 1,
          zIndex: 30,
          visible: true,
        };
      }
      if (slot === -1) {
        return {
          x: -tabletSideX,
          width: 85,
          height: 250,
          opacity: 0.72,
          scale: 1,
          zIndex: 20,
          visible: true,
        };
      }
      if (slot === 1) {
        return {
          x: tabletSideX,
          width: 85,
          height: 250,
          opacity: 0.72,
          scale: 1,
          zIndex: 20,
          visible: true,
        };
      }
      return {
        x: slot === -2 ? -tabletSideX - 80 : tabletSideX + 80,
        width: 60,
        height: 180,
        opacity: 0,
        scale: 0.7,
        zIndex: 0,
        visible: false,
      };
    }

    // Full Desktop (1200px+)
    if (slot === 0) {
      // Main Center Expanded Card
      return {
        x: 0,
        width: 760,
        height: 380,
        opacity: 1,
        scale: 1,
        zIndex: 30,
        visible: true,
      };
    }
    if (slot === -1) {
      // Near-Left
      return {
        x: -455,
        width: 105,
        height: 290,
        opacity: 0.75,
        scale: 1,
        zIndex: 20,
        visible: true,
      };
    }
    if (slot === 1) {
      // Near-Right
      return {
        x: 455,
        width: 105,
        height: 290,
        opacity: 0.75,
        scale: 1,
        zIndex: 20,
        visible: true,
      };
    }
    if (slot === -2) {
      // Far-Left
      return {
        x: -562,
        width: 70,
        height: 190,
        opacity: 0.5,
        scale: 1,
        zIndex: 10,
        visible: true,
      };
    }
    // slot === 2: Far-Right
    return {
      x: 562,
      width: 70,
      height: 190,
      opacity: 0.5,
      scale: 1,
      zIndex: 10,
      visible: true,
    };
  };

  const handleCardClick = (slot: number) => {
    if (slot === 1) handleNext();
    else if (slot === -1) handlePrev();
    else if (slot === 2) handleSelect((currentIndex + 2) % total);
    else if (slot === -2) handleSelect((currentIndex - 2 + total) % total);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full bg-[#0A0B0B] text-[#FAFAFB] py-[90px] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Background Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[480px] bg-[#D3AF37]/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-full px-6 md:px-12 lg:px-[90px] flex flex-col items-center">
        
        {/* ================= 1. HEADER: CLIENT STORIES ================= */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6"
        >
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D3AF37]/75" />
          <span className="text-xs sm:text-[13px] tracking-[0.28em] text-[#D3AF37] font-medium font-inter-tight uppercase">
            CLIENT STORIES
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D3AF37]/75" />
        </motion.div>

        {/* ================= 2. TITLE: REAL CLIENTS. REAL RESULTS. ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="font-['Antonio'] uppercase tracking-tight text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px] leading-[0.92]">
            <span className="text-white block">REAL CLIENTS.</span>
            <span className="bg-gradient-to-r from-[#FFF4CC] via-[#D3AF37] to-[#A38029] bg-clip-text text-transparent block">
              REAL RESULTS.
            </span>
          </h2>
        </motion.div>

        {/* ================= 3. COMPLETELY FIXED TESTIMONIAL ROW CONTAINER ================= */}
        {/* The overall carousel container position remains 100% fixed. No horizontal translation on the row. */}
        <div className="relative w-full max-w-[1300px] h-[430px] sm:h-[440px] md:h-[420px] mx-auto flex items-center justify-center">
          
          {/* Fixed Golden Connector Lines (Stay anchored at their exact physical positions) */}
          {isDesktop && (
            <>
              {/* Connector 1: Far-Left to Near-Left */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-15"
                style={{ left: 'calc(50% - 527px)', width: '20px', height: '4px' }}
              >
                <div className="w-full h-[2px] bg-[#D3AF37]/80 shadow-[0_0_8px_rgba(211,175,55,0.6)]" />
                <div className="absolute w-2 h-2 rounded-full bg-[#F5E297] border border-[#D3AF37] shadow-[0_0_6px_#D3AF37]" />
              </div>

              {/* Connector 2: Near-Left to Center */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-15"
                style={{ left: 'calc(50% - 402px)', width: '22px', height: '4px' }}
              >
                <div className="w-full h-[2.5px] bg-[#D3AF37] shadow-[0_0_10px_rgba(211,175,55,0.8)]" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#FFF4CC] border border-[#D3AF37] shadow-[0_0_8px_#D3AF37]" />
              </div>

              {/* Connector 3: Center to Near-Right */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-15"
                style={{ left: 'calc(50% + 380px)', width: '22px', height: '4px' }}
              >
                <div className="w-full h-[2.5px] bg-[#D3AF37] shadow-[0_0_10px_rgba(211,175,55,0.8)]" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#FFF4CC] border border-[#D3AF37] shadow-[0_0_8px_#D3AF37]" />
              </div>

              {/* Connector 4: Near-Right to Far-Right */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-15"
                style={{ left: 'calc(50% + 507px)', width: '20px', height: '4px' }}
              >
                <div className="w-full h-[2px] bg-[#D3AF37]/80 shadow-[0_0_8px_rgba(211,175,55,0.6)]" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#F5E297] border border-[#D3AF37] shadow-[0_0_6px_#D3AF37]" />
              </div>
            </>
          )}

          {isTablet && (
            <>
              {/* Tablet Connector Left */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-15"
                style={{ left: `calc(50% - ${(tabletCardWidth / 2) + 20}px)`, width: '18px', height: '4px' }}
              >
                <div className="w-full h-[2.5px] bg-[#D3AF37] shadow-[0_0_10px_rgba(211,175,55,0.8)]" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#FFF4CC] border border-[#D3AF37] shadow-[0_0_8px_#D3AF37]" />
              </div>

              {/* Tablet Connector Right */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-15"
                style={{ left: `calc(50% + ${(tabletCardWidth / 2) + 2}px)`, width: '18px', height: '4px' }}
              >
                <div className="w-full h-[2.5px] bg-[#D3AF37] shadow-[0_0_10px_rgba(211,175,55,0.8)]" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#FFF4CC] border border-[#D3AF37] shadow-[0_0_8px_#D3AF37]" />
              </div>
            </>
          )}

          {/* ================= 4. ALL 5 CARDS MOVE SIMULTANEOUSLY THROUGH PREDEFINED SLOTS ================= */}
          {TESTIMONIALS.map((item) => {
            const slot = getSlot(item.id, currentIndex);
            const prevSlot = getSlot(item.id, prevIndex);

            const isCenter = slot === 0;
            const wasCenter = prevSlot === 0 && slot !== 0;
            const isBecomingCenter = prevSlot !== 0 && slot === 0;

            const isWrappingForward = prevSlot === -2 && slot === 2;
            const isWrappingBackward = prevSlot === 2 && slot === -2;
            const isWrapping = isWrappingForward || isWrappingBackward;

            const currentStyles = getSlotStyles(slot);
            const prevStyles = getSlotStyles(prevSlot);

            // X-Coordinate Motion:
            // Non-wrapping cards interpolate directly from prevX to currentX.
            // Wrapping cards fade out at side, jump behind-the-scenes while invisible, and fade in at destination slot.
            let xTarget: number | number[] = currentStyles.x;
            let opacityTarget: number | number[] = currentStyles.opacity;

            if (isWrappingForward) {
              xTarget = [prevStyles.x, prevStyles.x - 45, currentStyles.x + 45, currentStyles.x];
              opacityTarget = [prevStyles.opacity, 0, 0, currentStyles.opacity];
            } else if (isWrappingBackward) {
              xTarget = [prevStyles.x, prevStyles.x + 45, currentStyles.x - 45, currentStyles.x];
              opacityTarget = [prevStyles.opacity, 0, 0, currentStyles.opacity];
            }

            // Determine z-index so incoming/center card is prioritized cleanly
            const zIndexVal = isCenter ? 30 : wasCenter ? 25 : Math.abs(slot) === 1 ? 20 : 10;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: xTarget,
                  width: currentStyles.width,
                  height: currentStyles.height,
                  opacity: opacityTarget,
                  scale: currentStyles.scale,
                  zIndex: zIndexVal,
                }}
                transition={{
                  x: isWrapping
                    ? { duration: 0.88, times: [0, 0.38, 0.42, 1], ease: 'linear' }
                    : { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
                  opacity: isWrapping
                    ? { duration: 0.88, times: [0, 0.36, 0.44, 1], ease: 'linear' }
                    : { duration: 0.45, ease: 'easeInOut' },
                  // Width & Height timing prevents collision between Center and Side Cards:
                  width: isBecomingCenter
                    ? { duration: 0.46, delay: 0.36, ease: [0.22, 1, 0.36, 1] }
                    : wasCenter
                    ? { duration: 0.36, ease: [0.32, 0, 0.67, 0] }
                    : { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
                  height: isBecomingCenter
                    ? { duration: 0.46, delay: 0.36, ease: [0.22, 1, 0.36, 1] }
                    : wasCenter
                    ? { duration: 0.36, ease: [0.32, 0, 0.67, 0] }
                    : { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
                }}
                onClick={() => handleCardClick(slot)}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden cursor-pointer ${
                  isCenter
                    ? 'rounded-[24px] sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#171616] via-[#111111] to-[#0A0B0B] border-2 border-[#D3AF37] shadow-[0_0_45px_rgba(211,175,55,0.32),0_24px_60px_rgba(0,0,0,0.9)] p-5 sm:p-6 md:p-8 lg:p-10'
                    : Math.abs(slot) === 1
                    ? 'rounded-[24px] sm:rounded-[28px] bg-[#131312] border-2 border-[#D3AF37]/70 shadow-[0_0_24px_rgba(211,175,55,0.22)] hover:opacity-100 hover:scale-[1.03] transition-all duration-300'
                    : 'rounded-[22px] bg-[#131312] border border-[#D3AF37]/40 shadow-[0_0_16px_rgba(211,175,55,0.12)] hover:opacity-90 hover:scale-105 transition-all duration-300'
                }`}
                style={{
                  pointerEvents: currentStyles.visible ? 'auto' : 'none',
                }}
              >
                {/* Sheen line on top of center card */}
                {isCenter && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFF4CC] to-transparent opacity-60 pointer-events-none" />
                )}

                {/* Mode 1: Main Selected Center Card Layout */}
                {isCenter ? (
                  <motion.div
                    key={`content-center-${item.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.38 }}
                    className="h-full w-full flex flex-col justify-between"
                  >
                    {/* MOBILE LAYOUT (< 768px): Avatar Header + Headline + Full Quote with Zero Truncation */}
                    <div className="flex md:hidden flex-col justify-between h-full py-0.5">
                      {/* Top Row: Avatar + Name, Role, Rating & Stars */}
                      <div className="flex items-center gap-3.5">
                        {/* Client Avatar Thumbnail */}
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#D3AF37]/60 shadow-[0_4px_16px_rgba(0,0,0,0.7)] bg-[#141514]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="70px"
                            className="object-cover object-top"
                            priority
                            referrerPolicy="no-referrer"
                          />
                          {item.isBook && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-center p-1">
                              <span className="font-['Antonio'] text-[9px] font-bold text-[#D3AF37] leading-tight">JUSTICE</span>
                            </div>
                          )}
                        </div>

                        {/* Client Info & Rating */}
                        <div className="flex flex-col justify-center min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-['Antonio'] text-xl font-bold tracking-wider text-[#E5C158] leading-none">
                              {item.rating}
                            </span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3.5 h-3.5 fill-[#E5C158] text-[#E5C158] drop-shadow-[0_0_4px_rgba(229,193,88,0.5)]"
                                />
                              ))}
                            </div>
                          </div>
                          <h4 className="font-['Antonio'] uppercase tracking-[0.03em] font-bold text-lg text-white leading-tight truncate">
                            {item.name}
                          </h4>
                          <p className="font-inter-tight text-xs text-white/50 truncate">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* Headline Title */}
                      <h3 className="font-['Antonio'] uppercase tracking-tight text-xl sm:text-2xl leading-[1.1] text-white my-2.5">
                        <span>{item.titlePrefix} </span>
                        <span className="bg-gradient-to-r from-[#FFF4CC] via-[#D3AF37] to-[#C99D2A] bg-clip-text text-transparent font-bold">
                          {item.titleAccent}
                        </span>
                      </h3>

                      {/* Testimonial Quote */}
                      <blockquote className="text-[13.5px] sm:text-sm text-white/80 font-inter-tight font-normal leading-relaxed line-clamp-4">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>

                      {/* Bottom Practice Area Badge */}
                      <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] mt-auto">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#D3AF37]/90 font-inter-tight">
                          {item.badge}
                        </span>
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-inter-tight">
                          Verified Case
                        </span>
                      </div>
                    </div>

                    {/* TABLET & DESKTOP LAYOUT (>= 768px) */}
                    <div className="hidden md:grid md:grid-cols-12 gap-5 lg:gap-7 items-center h-full w-full">
                      {/* Left Column: Text, Rating, Quote & Details */}
                      <div className="md:col-span-7 flex flex-col justify-between h-full py-1">
                        {/* Rating Number on Left (5.0 / 4.9) + 5 Gold Stars */}
                        <div className="flex items-center gap-3 mb-2 sm:mb-3">
                          <span className="font-['Antonio'] text-2xl sm:text-[28px] font-bold tracking-wider text-[#E5C158] leading-none drop-shadow-[0_0_8px_rgba(229,193,88,0.4)]">
                            {item.rating}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 sm:w-[18px] h-4 sm:h-[18px] fill-[#E5C158] text-[#E5C158] drop-shadow-[0_0_6px_rgba(229,193,88,0.5)]"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Headline Title */}
                        <h3 className="font-['Antonio'] uppercase tracking-tight text-2xl lg:text-[32px] leading-[1.05] text-white mb-2 sm:mb-3">
                          <span>{item.titlePrefix} </span>
                          <span className="bg-gradient-to-r from-[#FFF4CC] via-[#D3AF37] to-[#C99D2A] bg-clip-text text-transparent font-bold">
                            {item.titleAccent}
                          </span>
                        </h3>

                        {/* Testimonial Quote */}
                        <blockquote className="text-[14px] lg:text-[17px] text-white/80 font-inter-tight font-normal leading-relaxed mb-3 sm:mb-4">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>

                        {/* Client Name with Brand Heading Font ("Antonio") */}
                        <div>
                          <h4 className="font-['Antonio'] uppercase tracking-[0.04em] font-bold text-lg sm:text-xl lg:text-2xl text-white leading-tight">
                            {item.name}
                          </h4>
                          <p className="font-inter-tight text-xs sm:text-sm text-white/50 mt-0.5 tracking-normal">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* Right Column: Male Client Portrait / Law Book */}
                      <div className="md:col-span-5 flex justify-center h-full items-center">
                        <div className="relative w-full h-[250px] lg:h-[290px] max-w-[270px] rounded-[14px] sm:rounded-[18px] overflow-hidden border-none shadow-[0_12px_32px_rgba(0,0,0,0.7)] bg-[#141514]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 1024px) 260px, 320px"
                            className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
                            priority
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          {item.isBook && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-[1px] pointer-events-none text-center">
                              <span className="font-['Antonio'] text-lg sm:text-xl font-bold tracking-[0.25em] text-[#D3AF37] leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                                JUSTICE<br />TRUST<br />RESULTS
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Mode 2: Side Capsule Image View (Slot -2, -1, 1, 2) */
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="130px"
                      className={`object-cover object-top transition-all duration-500 ${
                        Math.abs(slot) === 2 ? 'grayscale contrast-110' : ''
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
                    
                    {item.isBook ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-1 pointer-events-none text-center bg-black/30">
                        <span className="font-['Antonio'] text-[10px] sm:text-xs font-bold tracking-[0.18em] text-[#D3AF37] leading-tight uppercase">
                          JUSTICE<br />TRUST<br />RESULTS
                        </span>
                      </div>
                    ) : Math.abs(slot) === 1 ? (
                      <div className="absolute bottom-3 inset-x-2 text-center pointer-events-none">
                        <p className="text-[11px] font-medium text-white/80 font-inter-tight truncate">
                          {item.name.split(' ')[0]}
                        </p>
                      </div>
                    ) : null}
                  </div>
                )}

              </motion.div>
            );
          })}

        </div>

        {/* ================= 5. BOTTOM INDICATOR PILLS & CONTROLS ================= */}
        <div className="mt-10 sm:mt-12 flex items-center gap-6">
          
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 hover:border-[#D3AF37]/50 hover:bg-[#D3AF37]/10 text-white/70 hover:text-[#D3AF37] flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Indicator Pills */}
          <div className="flex items-center gap-2.5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="transition-all duration-500 ease-out focus:outline-none cursor-pointer py-1"
              >
                {idx === currentIndex ? (
                  <motion.div
                    layoutId="activePill"
                    className="w-8 sm:w-10 h-2.5 rounded-full bg-gradient-to-r from-[#FFF4CC] via-[#E2C359] to-[#CDA12B] shadow-[0_0_12px_rgba(211,175,55,0.6)]"
                  />
                ) : (
                  <div className="w-5 sm:w-6 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors" />
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 hover:border-[#D3AF37]/50 hover:bg-[#D3AF37]/10 text-white/70 hover:text-[#D3AF37] flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

// Single Rolling Digit Component
// Left digits roll TOP-TO-BOTTOM, right digits roll BOTTOM-TO-TOP.
// Both start visibly from '0' and softly glide into position!
function RollingDigit({
  target,
  direction,
  isInView,
  delay = 0,
  loopIfZero = false,
}: {
  target: number;
  direction: 'top-to-bottom' | 'bottom-to-top';
  isInView: boolean;
  delay?: number;
  loopIfZero?: boolean;
}) {
  // Generate sequence so it starts at 0 and lands on target
  let sequence: number[] = [];

  if (direction === 'bottom-to-top') {
    // Array: [0, 1, 2, ..., target]
    // Starts at index 0 (value 0). Animates UPWARDS to show target at bottom of list.
    if (target === 0 && loopIfZero) {
      sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    } else {
      for (let i = 0; i <= target; i++) {
        sequence.push(i);
      }
    }
  } else {
    // Top-to-bottom:
    // Array: [target, ..., 1, 0]
    // Starts at the last index (value 0). Animates DOWNWARDS to show target at index 0.
    for (let i = target; i >= 0; i--) {
      sequence.push(i);
    }
  }

  const isBottomToTop = direction === 'bottom-to-top';
  const totalItems = sequence.length;

  // IMPORTANT FIX: In Framer Motion / CSS translateY, % is relative to the element's OWN height.
  // The element contains `totalItems` items, each taking (100 / totalItems)%.
  // To show index k, translateY must be -((k / totalItems) * 100)%.
  const lastIndex = totalItems - 1;
  const initialPercent = isBottomToTop ? 0 : -((lastIndex / totalItems) * 100);
  const targetPercent = isBottomToTop ? -((lastIndex / totalItems) * 100) : 0;

  const initialY = `${initialPercent}%`;
  const targetY = `${targetPercent}%`;

  return (
    <div className="relative inline-block h-[1.22em] overflow-hidden align-middle select-none">
      <motion.div
        initial={{ y: initialY }}
        animate={{ y: isInView ? targetY : initialY }}
        transition={{
          duration: 1.85, // Softer & slower luxury motion
          delay,
          ease: [0.16, 1, 0.3, 1], // Smooth, gradual cinematic ease-out
        }}
        className="flex flex-col"
      >
        {sequence.map((num, i) => (
          <span
            key={i}
            className="h-[1.22em] min-w-[0.58em] flex items-center justify-center leading-[1.22em] px-0.5 text-center bg-gradient-to-b from-[#FEF5CD] via-[#D2AE37] to-[#997723] bg-clip-text text-transparent font-['Antonio'] uppercase"
          >
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Letter-by-letter blurry wave reveal without breaking words
function BlurWaveText({
  text,
  className = '',
  delay = 0,
  highlightWord = '',
  highlightClass = 'text-[#D2AE37]',
}: {
  text: string;
  className?: string;
  delay?: number;
  highlightWord?: string;
  highlightClass?: string;
}) {
  const words = text.split(' ');
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.025,
            delayChildren: delay,
          },
        },
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, wordIndex) => {
        const isHighlighted = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <span
            key={wordIndex}
            className={`inline-block whitespace-nowrap mr-[0.25em] ${
              isHighlighted ? highlightClass : ''
            }`}
          >
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
        );
      })}
    </motion.span>
  );
}

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  // Triggers whenever user scrolls into or out of the section
  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false,
  });

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="relative w-full bg-[#0B0A0A] text-[#FBFAFB] py-[90px] pl-0 overflow-hidden select-none"
    >
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Warm Ambient Golden Center Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-[#D2AE37]/[0.05] rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
        
        {/* ================= 1. TOP TAG: ✧ JUSTICE IN ACTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-8 sm:mb-10 text-xs sm:text-sm tracking-wide font-inter-tight"
        >
          <span className="text-[#D2AE37] text-sm leading-none">✧</span>
          <span className="text-white/80 font-normal uppercase tracking-wider">
            <span className="text-[#D2AE37] font-medium">JUSTICE IN ACTION</span>
          </span>
        </motion.div>

        {/* ================= 2. BACKGROUND "JUSTICE" WATERMARK + OVERLAPPING PORTRAIT ================= */}
        <div className="relative w-full flex items-center justify-center -mb-2 sm:-mb-4 md:-mb-6 overflow-visible">
          
          {/* Giant "JUSTICE" Typography in Brand Heading Font (Antonio) - No Cropping */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible z-0"
          >
            <span className="font-['Antonio'] text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[170px] xl:text-[200px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.08em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D2AE37]/25 via-[#D2AE37]/10 to-[#D2AE37]/0 opacity-90 text-center whitespace-nowrap">
              JUSTICE
            </span>
          </motion.div>

          {/* Center Lawyer Portrait with REDUCED corner radius & linear fade at bottom (No border) */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.94 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[140px] h-[180px] sm:w-[170px] sm:h-[220px] md:w-[200px] md:h-[255px] rounded-t-[10px] sm:rounded-t-[14px] overflow-hidden bg-transparent group cursor-pointer"
          >
            {/* Portrait Image with linear bottom fade */}
            <Image
              src="/.tempmediaStorage/GUBE.jpeg"
              alt="Giorgi Gubeladze - Senior Legal Counsel"
              fill
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 220px"
              className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 98%)',
              }}
              referrerPolicy="no-referrer"
              priority
            />

            {/* Linear type gradient overlay at bottom to smoothly blend into dark background */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B0A0A] via-[#0B0A0A]/75 to-transparent pointer-events-none" />
          </motion.div>

        </div>

        {/* ================= 3. HEADLINE: "You deserve counsel that fights for you" ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 md:mt-10 text-center max-w-[820px]"
        >
          <h2 className="font-['Antonio'] uppercase tracking-tight font-normal text-[42px] sm:text-[54px] md:text-[66px] lg:text-[76px] leading-[0.96] text-white">
            <BlurWaveText
              text="You deserve counsel that fights for you"
              highlightWord="fights"
              highlightClass="text-[#D2AE37] bg-gradient-to-r from-[#F7E6A9] via-[#D2AE37] to-[#E3C262] bg-clip-text text-transparent"
              delay={0.15}
            />
          </h2>

          {/* Subheading / Description Paragraph */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-[17px] text-white/65 font-inter-tight leading-relaxed max-w-[620px] mx-auto">
            We believe every client, whether an individual or a business,
            deserves the same level of commitment, clear communication,
            and a results-driven approach.
          </p>
        </motion.div>

        {/* ================= 4. METRICS ROW: SPLIT MOTION STARTING AT 0 (NO CROPPING) ================= */}
        <div className="w-full mt-14 sm:mt-18 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-14 text-center">
          
          {/* Item 1: 21+ (Years of Experience) */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative inline-flex items-center justify-center font-['Antonio'] uppercase font-normal text-6xl sm:text-7xl lg:text-[88px] leading-[1.22em] tracking-tight select-none py-1">
              
              {/* Left Digit: 2 (Rolls Top to Bottom from 0) */}
              <RollingDigit
                target={2}
                direction="top-to-bottom"
                isInView={isInView}
                delay={0.25}
              />

              {/* Right Digit: 1 (Rolls Bottom to Top from 0) */}
              <RollingDigit
                target={1}
                direction="bottom-to-top"
                isInView={isInView}
                delay={0.25}
              />

              {/* Suffix: + (Slides up from bottom) */}
              <div className="relative inline-block h-[1.22em] overflow-hidden align-middle px-0.5">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.22em] flex items-center justify-center leading-[1.22em] bg-gradient-to-b from-[#FEF5CD] via-[#D2AE37] to-[#997723] bg-clip-text text-transparent"
                >
                  +
                </motion.span>
              </div>

            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3.5 text-sm sm:text-base text-white/70 font-inter-tight font-normal"
            >
              Years of Experience
            </motion.p>
          </div>

          {/* Item 2: 98% (Client Success Rate) */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative inline-flex items-center justify-center font-['Antonio'] uppercase font-normal text-6xl sm:text-7xl lg:text-[88px] leading-[1.22em] tracking-tight select-none py-1">
              
              {/* Left Digit: 9 (Rolls Top to Bottom from 0) */}
              <RollingDigit
                target={9}
                direction="top-to-bottom"
                isInView={isInView}
                delay={0.35}
              />

              {/* Right Digit: 8 (Rolls Bottom to Top from 0) */}
              <RollingDigit
                target={8}
                direction="bottom-to-top"
                isInView={isInView}
                delay={0.35}
              />

              {/* Suffix: % (Slides up from bottom) */}
              <div className="relative inline-block h-[1.22em] overflow-hidden align-middle px-0.5">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 1.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.22em] flex items-center justify-center leading-[1.22em] bg-gradient-to-b from-[#FEF5CD] via-[#D2AE37] to-[#997723] bg-clip-text text-transparent text-[0.8em]"
                >
                  %
                </motion.span>
              </div>

            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3.5 text-sm sm:text-base text-white/70 font-inter-tight font-normal"
            >
              Client Success Rate
            </motion.p>
          </div>

          {/* Item 3: $12M+ (In Client Recoveries) */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative inline-flex items-center justify-center font-['Antonio'] uppercase font-normal text-6xl sm:text-7xl lg:text-[88px] leading-[1.22em] tracking-tight select-none py-1">
              
              {/* Prefix: $ (Slides down from top) */}
              <div className="relative inline-block h-[1.22em] overflow-hidden align-middle px-0.5">
                <motion.span
                  initial={{ y: '-100%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : { y: '-100%', opacity: 0 }}
                  transition={{ duration: 1.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.22em] flex items-center justify-center leading-[1.22em] bg-gradient-to-b from-[#FEF5CD] via-[#D2AE37] to-[#997723] bg-clip-text text-transparent text-[0.85em]"
                >
                  $
                </motion.span>
              </div>

              {/* Left Digit: 1 (Rolls Top to Bottom from 0) */}
              <RollingDigit
                target={1}
                direction="top-to-bottom"
                isInView={isInView}
                delay={0.45}
              />

              {/* Right Digit: 2 (Rolls Bottom to Top from 0) */}
              <RollingDigit
                target={2}
                direction="bottom-to-top"
                isInView={isInView}
                delay={0.45}
              />

              {/* Suffix: M+ (Slides up from bottom) */}
              <div className="relative inline-block h-[1.22em] overflow-hidden align-middle px-0.5">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 1.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.22em] flex items-center justify-center leading-[1.22em] bg-gradient-to-b from-[#FEF5CD] via-[#D2AE37] to-[#997723] bg-clip-text text-transparent text-[0.8em]"
                >
                  M+
                </motion.span>
              </div>

            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3.5 text-sm sm:text-base text-white/70 font-inter-tight font-normal"
            >
              In Client Recoveries
            </motion.p>
          </div>

        </div>

      </div>
    </section>
  );
}

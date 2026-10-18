'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Scale, ArrowRight, ShieldCheck, Award, Globe2, Briefcase } from 'lucide-react';

// Letter-by-letter blurry wave reveal without breaking words
function BlurWaveText({
  text,
  className = '',
  delay = 0,
  highlightWord = '',
  highlightClass = 'text-[#D2AF37]',
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

export default function Price() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Reversible in-view trigger for Awwwards-style entry/exit
  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: false,
  });

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full bg-[#0A0A0B] text-[#FBFBFB] py-[90px] md:py-[110px] overflow-hidden select-none"
    >
      {/* Anchor for backward compatibility with existing links */}
      <div id="pricing" className="absolute -top-24 pointer-events-none" />

      {/* Self-contained Google Fonts & Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Ambient Luxury Golden Glow in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] bg-[#D2AF37]/[0.045] rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
        
        {/* ================= 1. TOP BADGE: (08) OUR TEAM ================= */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171616] border border-[#D2AF37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.5)] mb-8"
        >
          <Scale className="w-3.5 h-3.5 text-[#D2AF37]" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90 font-inter-tight uppercase">
            (08) OUR TEAM
          </span>
        </motion.div>

        {/* ================= 2. SECTION HEADER ================= */}
        <div className="text-center max-w-[820px] mx-auto">
          <h2 className="font-['Antonio'] uppercase tracking-tight text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] leading-[0.98] text-white">
            <BlurWaveText
              text="Meet the Architects of Justice"
              highlightWord="Architects"
              highlightClass="bg-gradient-to-r from-[#FFF4CD] via-[#D2AF37] to-[#A38029] bg-clip-text text-transparent"
              delay={0.1}
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-sm sm:text-base md:text-[17px] text-white/70 font-inter-tight leading-relaxed max-w-[640px] mx-auto"
          >
            A premier team of legal experts protecting your security with flawless reputation, deep expertise, and strategic vision.
          </motion.p>
        </div>

        {/* ================= 3. FOUNDER & MANAGING PARTNER SHOWCASE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.98 }}
          transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-12 sm:mt-16 md:mt-20 relative rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 lg:p-14 bg-gradient-to-br from-[#1A1813] via-[#121213] to-[#0D0D0E] border border-[#D2AF37]/50 shadow-[0_0_40px_rgba(211,175,55,0.12),0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Subtle Corner Gold Lighting Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D2AF37]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D2AF37]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left: Elite Founder Portrait with Refined Gold Border & Glass Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none aspect-[3/3.8] rounded-[24px] p-2 bg-[#171616]/80 backdrop-blur-md border border-[#D2AF37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(211,175,55,0.15)] group overflow-hidden">
                <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-[#0A0A0B]">
                  <Image
                    src="/.tempmediaStorage/GUBE1.jpeg"
                    alt="Giorgi Gubeladze — Founder & Managing Partner"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Shade at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/60 to-transparent pointer-events-none" />
                </div>

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="px-3.5 py-2 rounded-xl bg-[#0C0D0D]/85 backdrop-blur-md border border-[#D2AF37]/40 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2 text-[#D2AF37]">
                      <Award className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-semibold tracking-wider font-inter-tight uppercase text-white/90">
                        GBA Advocate #6156
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#D2AF37] font-inter-tight">
                      21+ Yrs Exp
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Founder Profile & Bio */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#D2AF37] uppercase bg-[#D2AF37]/10 border border-[#D2AF37]/30 mb-4 font-inter-tight">
                  <Briefcase className="w-3.5 h-3.5 text-[#D2AF37]" />
                  <span>Founder & Managing Partner</span>
                </div>

                {/* Name */}
                <h3 className="font-['Antonio'] uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-2">
                  Giorgi Gubeladze
                </h3>

                {/* Role Callout */}
                <p className="text-base sm:text-lg text-[#D2AF37] font-inter-tight font-medium tracking-wide mb-6">
                  Founder & Managing Partner · Licensed Advocate (GBA)
                </p>

                {/* Divider Line */}
                <div className="w-full h-px bg-gradient-to-r from-[#D2AF37]/40 via-white/10 to-transparent mb-6" />

                {/* Exact Bio Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-white/80 font-inter-tight leading-relaxed">
                  <p>
                    With over 21 years of distinguished expertise in criminal, administrative and civil litigation, Giorgi Gubeladze is a licensed advocate and a recognized member of the Georgian Bar Association (GBA).
                  </p>
                  <p>
                    As the founder of GLC, he delivers elite, results-driven legal strategy and uncompromised protection for local and international clients across Georgia. Offering bespoke representation in English, Georgian, Russian, and Turkish, he is the trusted counsel for complex legal challenges.
                  </p>
                </div>

                {/* Core Competencies Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7 pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-inter-tight text-white/80">
                    <span className="w-7 h-7 rounded-full bg-[#D2AF37]/15 border border-[#D2AF37]/30 flex items-center justify-center text-[#D2AF37] shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <span>Criminal, Administrative & Civil Defense</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm font-inter-tight text-white/80">
                    <span className="w-7 h-7 rounded-full bg-[#D2AF37]/15 border border-[#D2AF37]/30 flex items-center justify-center text-[#D2AF37] shrink-0">
                      <Globe2 className="w-4 h-4" />
                    </span>
                    <span>English · Georgian · Russian · Turkish</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#FDE99A] via-[#E2C359] to-[#CDA12B] text-black shadow-[0_4px_24px_rgba(211,175,55,0.35)] hover:scale-[1.02] hover:shadow-[0_6px_32px_rgba(211,175,55,0.5)] active:scale-95 group"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Letter-by-letter blurry wave reveal without breaking words
function BlurWaveText({
  text,
  className = '',
  delay = 0,
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
            staggerChildren: 0.025,
            delayChildren: delay,
          },
        },
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.24em]">
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

export default function AboutMe() {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven flat top-to-bottom soft reveal (0% -> 100% on scroll down, 100% -> 0% on scroll up)
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start 92%', 'center 45%'],
  });

  // Top-to-bottom progressive smooth reveal: 0% -> 100% on scroll down, 100% -> 0% on scroll back up (no tilt/kaat)
  const clipBottom = useTransform(imageProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipBottom, (val) => `inset(0% 0% ${val}% 0%)`);
  const opacity = useTransform(imageProgress, [0, 0.15, 1], [0.1, 0.6, 1]);

  // Main Heading word stagger container and item variants (reversible when leaving and returning)
  const headingContainerVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.025,
        staggerDirection: -1, // Reverse sequence: Right to Left (100% to 5%)
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.035,
        staggerDirection: 1, // Forward sequence: Left to Right (5% to 100%)
      },
    },
  };

  const headingWordVariants = {
    hidden: {
      opacity: 0.05,
      y: 4,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Main Heading split into words for 5% -> 100% left-to-right sequential reveal
  const headingWords = [
    { text: 'WE', highlight: false },
    { text: 'STAND', highlight: false },
    { text: 'FOR', highlight: false },
    { text: 'PEOPLE', highlight: false },
    { text: 'WHO', highlight: false },
    { text: 'REFUSE', highlight: true },
    { text: 'TO', highlight: false },
    { text: 'BACK', highlight: false },
    { text: 'DOWN.', highlight: false },
    { text: 'FEWER', highlight: false },
    { text: 'OBSTACLES,', highlight: false },
    { text: 'MORE', highlight: false },
    { text: 'CLARITY,', highlight: false },
    { text: 'AND', highlight: false },
    { text: 'A', highlight: false },
    { text: 'LAWYER', highlight: false },
    { text: 'WHO', highlight: false },
    { text: 'TREATS', highlight: false },
    { text: 'YOUR', highlight: false },
    { text: 'CASE', highlight: false },
    { text: 'LIKE', highlight: false },
    { text: 'IT', highlight: false },
    { text: 'TRULY', highlight: false },
    { text: 'MATTERS.', highlight: false },
  ];

  return (
    <section className="relative w-full bg-[#0C0D0D] text-[#FAFAFB] py-[90px] overflow-hidden">
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Ambient background gold glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#D3AF37]/[0.035] rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container matching Header's exact width and horizontal padding */}
      <div className="relative z-10 w-full max-w-full px-6 md:px-12 lg:px-[90px]">
        
        {/* ================= TOP SECTION: BADGE + MAIN HEADLINE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20 md:mb-28">
          
          {/* Left: (01) ABOUT US Badge */}
          <div className="lg:col-span-3 pt-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 font-inter-tight text-xs sm:text-sm font-semibold tracking-wider uppercase select-none"
            >
              <span className="text-[#D3AF37]">(01)</span>
              <span className="text-white/80">ABOUT US</span>
            </motion.div>
          </div>

          {/* Right: Giant Headline with Reversible Letter-by-Letter Blurry Wave */}
          <div className="lg:col-span-9">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.015,
                  },
                },
              }}
              className="font-antonio font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.12] sm:leading-[1.1] tracking-[-0.015em] uppercase"
            >
              {headingWords.map((item, index) => (
                <span
                  key={`${item.text}-${index}`}
                  className={`inline-block whitespace-nowrap mr-[0.24em] select-none ${
                    item.highlight ? 'text-[#D3AF37]' : 'text-white'
                  }`}
                >
                  {Array.from(item.text).map((char, charIndex) => (
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
            </motion.h2>
          </div>

        </div>


        {/* ================= BOTTOM SECTION: PORTRAIT CARD + PHILOSOPHY QUOTE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Card with Soft Top-to-Bottom Reveal (0% to 100%, without any tilt) */}
          <div className="lg:col-span-5 flex flex-col max-w-[430px]" ref={imageContainerRef}>
            
            {/* Image Card Container: No background color, no shadow, no border during reveal */}
            <div className="w-full relative aspect-[4/4.2] max-h-[430px] rounded-[14px] overflow-hidden bg-transparent shadow-none border-0">
              <motion.div
                style={{
                  clipPath,
                  opacity,
                }}
                className="w-full h-full relative will-change-[clip-path,opacity] rounded-[14px] overflow-hidden"
              >
                {/* Lawyer Image - exact same width & height as the div */}
                <Image
                  src="/.tempmediaStorage/GUBE1.jpeg"
                  alt="Giorgi Gubeladze - Legal Counsel"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-top brightness-[0.95] contrast-[1.05] w-full h-full rounded-[14px]"
                />

                {/* Overlaid Gold Handwritten Calligraphy Signature without drop-shadow */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none z-10">
                  <svg 
                    viewBox="0 0 260 90" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-36 sm:w-48 h-auto text-[#D3AF37]"
                  >
                    {/* Artistic Alex Carter Calligraphy Curves */}
                    <path 
                      d="M18 65C32 20 48 10 58 45C64 65 52 75 42 70C30 65 32 40 45 35C62 28 80 55 90 40C98 28 108 55 116 42C122 32 135 60 148 40" 
                      stroke="#D3AF37" 
                      strokeWidth="2.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <path 
                      d="M165 48C152 40 145 58 158 64C172 70 188 35 195 25C202 15 192 48 200 45C208 42 215 58 225 45C232 35 240 50 250 42" 
                      stroke="#D3AF37" 
                      strokeWidth="2.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <path 
                      d="M175 45H220" 
                      stroke="#D3AF37" 
                      strokeWidth="2.2" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Below Card: Name & Title */}
            <div className="w-full flex justify-between items-center mt-5 px-1 font-inter-tight">
              <span className="font-antonio font-bold text-lg sm:text-xl tracking-wider uppercase text-white">
                Giorgi Gubeladze
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-white/50">
                ATTORNEY AT LAW
              </span>
            </div>

          </div>


          {/* Right Column: Philosophy Tag, Quote, Body & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full pt-2 lg:pl-6">
            
            <div>
              {/* (MY PHILOSOPHY) Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/60 font-inter-tight mb-8"
              >
                (MY PHILOSOPHY)
              </motion.div>

              {/* Large Quote */}
              <blockquote className="font-antonio font-bold text-2xl sm:text-4xl lg:text-[42px] leading-[1.2] uppercase text-white mb-8 sm:mb-10 tracking-tight">
                <span className="text-[#D3AF37] mr-2">“</span>
                <BlurWaveText
                  text="WE BELIEVE EVERY CLIENT DESERVES A STRONG VOICE, A CLEAR PLAN, AND A LAWYER WHO TRULY LISTENS."
                  delay={0.1}
                />
                <span className="text-[#D3AF37] ml-2">”</span>
              </blockquote>

              {/* Explanatory Body Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-inter-tight font-normal text-base sm:text-lg text-white/65 max-w-[620px] leading-[1.7] mb-12 sm:mb-16"
              >
                The law isn’t just a <span className="underline decoration-white/40 underline-offset-4">profession</span> to me — it’s a commitment to people, their rights, and their future. Every case is personal, and every client deserves honest guidance, strategic advice, and unwavering support.
              </motion.p>
            </div>

            {/* Bottom-Right CTA: SEE MY STORY */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-start sm:justify-end items-center"
            >
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group flex items-center gap-3 cursor-pointer py-2 focus:outline-none"
              >
                <span className="font-antonio font-bold text-sm sm:text-base tracking-widest uppercase text-white group-hover:text-[#D3AF37] transition-colors">
                  SEE MY STORY
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#D3AF37] group-hover:bg-[#b9962e] flex items-center justify-center text-[#0C0D0D] transition-transform duration-300 group-hover:translate-x-1 shadow-[0_4px_15px_rgba(211,175,55,0.4)]">
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </button>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}

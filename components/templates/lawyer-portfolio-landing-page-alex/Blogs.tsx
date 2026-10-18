'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { CornerDownRight, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  date: string;
  title: string;
  image: string;
  alt: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    date: 'Sep 18, 2026',
    title: "What to Do When You're Served with a Lawsuit",
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Golden scales of justice on mahogany executive desk with law books',
  },
  {
    id: 2,
    date: 'Sep 12, 2026',
    title: '5 Legal Steps Every Small Business Should Take',
    image: '/.tempmediaStorage/lawwallpaper.jpg',
    alt: 'Attorney in tailored suit signing legal documents with fountain pen and gavel',
  },
  {
    id: 3,
    date: 'Sep 9, 2026',
    title: 'Understanding Your Rights during a Criminal Investigation',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop',
    alt: 'Bronze Lady Justice statue with balanced scales in dark law library',
  },
];

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
            staggerChildren: 0.02,
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

export default function Blogs() {
  const sectionRef = useRef<HTMLElement>(null);

  // Awwwards-style reversible in-view trigger:
  // When scrolled into view, it animates in with blur-to-sharp transition.
  // When leaving the section, it resets so it animates again upon return.
  const isInView = useInView(sectionRef, {
    amount: 0.18,
    once: false,
  });

  return (
    <section
      ref={sectionRef}
      id="blogs"
      className="relative w-full bg-[#0A0A0B] text-[#FBFBFB] py-24 sm:py-32 md:py-36 overflow-hidden select-none"
    >
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Ambient Luxury Warm Glow in Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-[#D2AF37]/[0.035] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-full px-6 md:px-12 lg:px-[90px]">
        
        {/* ================= 1. TOP ROW: HEADING, DESCRIPTION & CHECK OUT MORE BUTTON ================= */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          
          {/* Left: Heading "Latest Insights" */}
          <div className="flex-shrink-0">
            <h2 className="font-['Antonio'] uppercase tracking-tight text-[48px] sm:text-[64px] md:text-[76px] lg:text-[86px] leading-[0.94] text-white">
              <BlurWaveText
                text="Latest Insights"
                highlightWord="Insights"
                highlightClass="bg-gradient-to-r from-[#FFF4CC] via-[#D2AF37] to-[#C59827] bg-clip-text text-transparent"
                delay={0.1}
              />
            </h2>
          </div>

          {/* Center & Right container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full lg:w-auto lg:flex-1 lg:pl-8">
            
            {/* Middle Description */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 24, filter: 'blur(8px)' }
              }
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/70 text-sm sm:text-base font-inter-tight leading-relaxed max-w-sm"
            >
              Practical legal insights, expert advice, and resources to help you navigate life&apos;s legal challenges.
            </motion.p>

            {/* Right: Check out more Button / Link */}
            <motion.a
              href="#blogs"
              initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                  : { opacity: 0, x: 20, filter: 'blur(8px)' }
              }
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center gap-2.5 text-white/90 hover:text-[#D2AF37] transition-all duration-300 text-sm sm:text-[15px] font-medium font-inter-tight cursor-pointer py-1"
            >
              <CornerDownRight className="w-4 h-4 text-[#D2AF37] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-0.5" />
              <span className="tracking-wide">Check out more</span>
            </motion.a>

          </div>

        </div>

        {/* ================= 2. CARDS ROW WITH EXACT 24px GAP ================= */}
        {/* Left card (Card 1) and Right cards (Card 2 & Card 3) now have equal width.
            Desktop: Left is 6 cols (50%), Right Column is 6 cols (50%) containing Card 2 and Card 3 in equal columns or grid.
            Or grid-cols-1 md:grid-cols-2 lg:grid-cols-3 so all 3 cards have identical full width!
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] items-stretch">
          
          {/* ---------------- CARD 1: (EQUAL 1/3 WIDTH ON DESKTOP, MATCHING ALL CARDS) ---------------- */}
          <motion.article
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 40, filter: 'blur(12px)' }
            }
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col cursor-pointer"
          >
            {/* Image Box */}
            <div className="relative w-full aspect-[16/10.5] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#151415] border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.6)] group-hover:border-[#D2AF37]/40 group-hover:shadow-[0_16px_44px_rgba(211,175,55,0.12)] transition-all duration-500">
              <Image
                src={BLOG_POSTS[0].image}
                alt={BLOG_POSTS[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority
                referrerPolicy="no-referrer"
              />

              {/* Dark subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Signature Gold Corner Bracket Mark (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-[#D2AF37] shadow-[0_0_8px_#D2AF37]" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-[#D2AF37] shadow-[0_0_8px_#D2AF37]" />
              </div>
            </div>

            {/* Content below image */}
            <div className="pt-4 sm:pt-5 flex flex-col items-start flex-1 justify-between">
              <div>
                {/* Date */}
                <time className="text-white/50 text-xs sm:text-[13px] font-inter-tight font-normal tracking-wide">
                  {BLOG_POSTS[0].date}
                </time>

                {/* Card Title with Brand Heading Font ("Antonio") */}
                <h3 className="font-['Antonio'] uppercase tracking-tight text-xl sm:text-2xl lg:text-[25px] leading-[1.1] text-white group-hover:text-[#D2AF37] transition-colors duration-300 mt-2">
                  <BlurWaveText text={BLOG_POSTS[0].title} delay={0.15} />
                </h3>
              </div>

              {/* Pill Button: Read More */}
              <button
                type="button"
                className="mt-4 sm:mt-5 px-5 py-1.5 rounded-full border border-white/20 group-hover:border-[#D2AF37] bg-transparent group-hover:bg-[#D2AF37]/10 text-white/90 group-hover:text-[#D2AF37] text-xs sm:text-sm font-medium font-inter-tight transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>

          {/* ---------------- CARD 2: MIDDLE CARD (EQUAL WIDTH) ---------------- */}
          <motion.article
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 40, filter: 'blur(12px)' }
            }
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col cursor-pointer"
          >
            {/* Image Box */}
            <div className="relative w-full aspect-[16/10.5] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#151415] border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.6)] group-hover:border-[#D2AF37]/40 group-hover:shadow-[0_16px_44px_rgba(211,175,55,0.12)] transition-all duration-500">
              <Image
                src={BLOG_POSTS[1].image}
                alt={BLOG_POSTS[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
              />

              {/* Dark subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Signature Gold Corner Bracket Mark (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-[#D2AF37] shadow-[0_0_8px_#D2AF37]" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-[#D2AF37] shadow-[0_0_8px_#D2AF37]" />
              </div>
            </div>

            {/* Content below image */}
            <div className="pt-4 sm:pt-5 flex flex-col items-start flex-1 justify-between">
              <div>
                {/* Date */}
                <time className="text-white/50 text-xs sm:text-[13px] font-inter-tight font-normal tracking-wide">
                  {BLOG_POSTS[1].date}
                </time>

                {/* Card Title with Brand Heading Font ("Antonio") */}
                <h3 className="font-['Antonio'] uppercase tracking-tight text-xl sm:text-2xl lg:text-[25px] leading-[1.1] text-white group-hover:text-[#D2AF37] transition-colors duration-300 mt-2">
                  <BlurWaveText text={BLOG_POSTS[1].title} delay={0.2} />
                </h3>
              </div>

              {/* Pill Button: Read More */}
              <button
                type="button"
                className="mt-4 sm:mt-5 px-5 py-1.5 rounded-full border border-white/20 group-hover:border-[#D2AF37] bg-transparent group-hover:bg-[#D2AF37]/10 text-white/90 group-hover:text-[#D2AF37] text-xs sm:text-sm font-medium font-inter-tight transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>

          {/* ---------------- CARD 3: RIGHT END CARD (EQUAL WIDTH) ---------------- */}
          <motion.article
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 40, filter: 'blur(12px)' }
            }
            transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col cursor-pointer"
          >
            {/* Image Box */}
            <div className="relative w-full aspect-[16/10.5] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#151415] border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.6)] group-hover:border-[#D2AF37]/40 group-hover:shadow-[0_16px_44px_rgba(211,175,55,0.12)] transition-all duration-500">
              <Image
                src={BLOG_POSTS[2].image}
                alt={BLOG_POSTS[2].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
              />

              {/* Dark subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Signature Gold Corner Bracket Mark (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-[#D2AF37] shadow-[0_0_8px_#D2AF37]" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-[#D2AF37] shadow-[0_0_8px_#D2AF37]" />
              </div>
            </div>

            {/* Content below image */}
            <div className="pt-4 sm:pt-5 flex flex-col items-start">
              {/* Date */}
              <time className="text-white/50 text-xs sm:text-[13px] font-inter-tight font-normal tracking-wide">
                {BLOG_POSTS[2].date}
              </time>

              {/* Card Title with Brand Heading Font ("Antonio") */}
              <h3 className="font-['Antonio'] uppercase tracking-tight text-xl sm:text-2xl lg:text-[25px] leading-[1.1] text-white group-hover:text-[#D2AF37] transition-colors duration-300 mt-2">
                <BlurWaveText text={BLOG_POSTS[2].title} delay={0.25} />
              </h3>

              {/* Pill Button: Read More */}
              <button
                type="button"
                className="mt-4 sm:mt-5 px-5 py-1.5 rounded-full border border-white/20 group-hover:border-[#D2AF37] bg-transparent group-hover:bg-[#D2AF37]/10 text-white/90 group-hover:text-[#D2AF37] text-xs sm:text-sm font-medium font-inter-tight transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>

        </div>

      </div>
    </section>
  );
}

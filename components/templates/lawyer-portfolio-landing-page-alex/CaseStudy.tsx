'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionStyle } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CaseStudyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imageUrl: string;
  aspectClass: string;
}

const caseStudies: CaseStudyItem[] = [
  {
    id: 'case-1',
    title: 'Startup to Success',
    subtitle: 'Business Formation & Corporate Counsel',
    description:
      'Guided a growing tech company through incorporation, contract negotiation, and long-term legal strategy.',
    tags: ['Business Law', 'Corporate Counsel'],
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'case-2',
    title: 'Charges Dismissed',
    subtitle: 'Criminal Defense & Trial Advocacy',
    description:
      'Successfully defended a client against felony charges, securing a full dismissal and expungement.',
    tags: ['Criminal Defense', 'Case Dismissal'],
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'case-3',
    title: 'High-Asset Estate Preservation',
    subtitle: 'Family Enterprise & Private Mediation',
    description:
      'Protected multi-million family enterprise assets and negotiated amicable marital dissolution with total discretion.',
    tags: ['Family Law', 'Asset Protection'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'case-4',
    title: 'Commercial Trial Victory',
    subtitle: 'Civil Litigation & Partner Resolution',
    description:
      'Secured complete jury restitution and multi-million damages in a complex breach of fiduciary partnership dispute.',
    tags: ['Civil Litigation', 'Trial Verdict'],
    imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1200&auto=format&fit=crop',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'case-5',
    title: 'Zoning & Master Acquisition',
    subtitle: 'Real Estate Law & Development',
    description:
      'Secured municipal development approvals, zoning clearances, and closing for a premier 40-acre commercial logistics hub.',
    tags: ['Real Estate Law', 'Zoning Clearance'],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1200&auto=format&fit=crop',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'case-6',
    title: 'Intellectual Property Injunction',
    subtitle: 'Patent & Trade Secret Litigation',
    description:
      'Obtained emergency federal injunction halting willful trademark infringement and protected proprietary software code.',
    tags: ['IP Litigation', 'Trade Secrets'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'case-7',
    title: 'Cross-Border Arbitration',
    subtitle: 'International Trade & Contract Enforcement',
    description:
      'Represented multinational supplier in international dispute, recovering $14M in withheld milestone disbursements.',
    tags: ['International Law', 'Arbitration'],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    aspectClass: 'aspect-[16/10]',
  },
];

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

interface CardProps {
  item: CaseStudyItem;
  variant?: 'wide' | 'narrow' | 'center' | 'mobile';
  className?: string;
  style?: MotionStyle;
}

function CaseCard({ item, variant = 'wide', className = '', style }: CardProps) {
  const containerClass =
    variant === 'mobile'
      ? 'w-[82vw] sm:w-[65vw] md:w-[55vw] max-w-[480px] shrink-0 pointer-events-auto flex flex-col group cursor-pointer will-change-transform'
      : variant === 'wide'
      ? 'w-[58%] max-w-[720px] pointer-events-auto flex flex-col group cursor-pointer will-change-transform'
      : variant === 'narrow'
      ? 'w-[40%] max-w-[500px] pointer-events-auto flex flex-col group cursor-pointer will-change-transform'
      : 'w-[52%] max-w-[640px] pointer-events-auto flex flex-col group cursor-pointer will-change-transform';

  const imageSizes =
    variant === 'mobile'
      ? '(max-width: 768px) 85vw, 60vw'
      : variant === 'wide'
      ? '(max-width: 1024px) 60vw, 50vw'
      : variant === 'narrow'
      ? '(max-width: 1024px) 40vw, 35vw'
      : '(max-width: 1024px) 55vw, 45vw';

  const titleSize =
    variant === 'narrow' || variant === 'mobile'
      ? 'text-[19px] sm:text-[22px] md:text-[26px]'
      : 'text-[20px] sm:text-[24px] md:text-[28px]';

  const maxDescWidth =
    variant === 'narrow' || variant === 'mobile'
      ? 'max-w-[440px]'
      : variant === 'center'
      ? 'max-w-[500px]'
      : 'max-w-[540px]';

  return (
    <motion.a
      href="#contact"
      style={style}
      className={`${containerClass} ${className}`}
    >
      {/* Image Box: Clips rotation & zoom strictly inside its boundary */}
      <div className="relative w-full aspect-[16/10] h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] max-h-[480px] rounded-[18px] md:rounded-[24px] overflow-hidden border border-white/10 bg-[#161717] shadow-[0_24px_60px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-[#D2AE37]/50 group-hover:shadow-[0_24px_60px_rgba(211,175,55,0.15)]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes={imageSizes}
          className="object-cover object-center grayscale contrast-105 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-[10deg] group-hover:grayscale-0 will-change-transform"
          referrerPolicy="no-referrer"
          priority
        />
        {/* Subtle photo vignette & corner marker */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-4 right-4 md:top-5 md:right-5 text-[#D2AE37] text-lg font-mono leading-none select-none opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          ⌝
        </div>
      </div>

      {/* Card Content */}
      <div className="mt-3.5 md:mt-4 flex flex-col overflow-hidden">
        <h3
          className={`${titleSize} font-['Antonio'] uppercase tracking-tight text-white group-hover:text-[#D2AE37] transition-colors leading-tight`}
        >
          <BlurWaveText text={item.title} delay={0.05} />
        </h3>
        <p
          className={`mt-1 text-[13px] sm:text-[14px] md:text-[15px] text-white/65 font-['Inter_Tight'] leading-relaxed ${maxDescWidth} line-clamp-2`}
        >
          {item.description}
        </p>
        {/* Tags */}
        <div className="mt-2.5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-0.5 rounded-full text-[11px] md:text-[12px] font-medium font-['Inter_Tight'] border border-[#D2AE37]/40 text-[#D2AE37] bg-[#D2AE37]/5 backdrop-blur-xs transition-colors group-hover:border-[#D2AE37] group-hover:bg-[#D2AE37]/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function CaseStudy() {
  const scrollDriverRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const lastRowRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  // Desktop vertical travel positions
  const [verticalTravel, setVerticalTravel] = useState({ start: 360, end: -1900 });
  // Mobile/Tablet horizontal travel
  const [horizontalTravel, setHorizontalTravel] = useState({ start: 0, end: -2400 });

  const [trackHeight, setTrackHeight] = useState<number | null>(null);

  // Direct, scroll-linked progress for the sticky card viewport
  const { scrollYProgress } = useScroll({
    target: scrollDriverRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const calculateBounds = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const mobile = vw < 1024;

      if (mobile) {
        // Mobile / Tablet: Cards travel horizontally Right -> Left
        if (horizontalTrackRef.current) {
          const trackWidth = horizontalTrackRef.current.scrollWidth;
          const maxScrollX = Math.max(0, trackWidth - vw + 48);
          setHorizontalTravel({ start: 0, end: -maxScrollX });

          const scrollDistance = Math.round(maxScrollX * 1.1);
          setTrackHeight(vh + scrollDistance);
        } else {
          setTrackHeight(vh + 2600);
        }
      } else {
        // Desktop: Cards travel vertically Bottom -> Top with 64px stagger
        if (lastRowRef.current && compositionRef.current) {
          const lastRow = lastRowRef.current;
          const lastRowOffsetTop = lastRow.offsetTop;
          const lastRowHeight = lastRow.offsetHeight;
          const lastRowCenterInComp = lastRowOffsetTop + lastRowHeight / 2;

          const startY = Math.max(340, Math.round(vh * 0.44));
          const endY = Math.round(vh * 0.5 - lastRowCenterInComp);

          const totalTravel = Math.abs(endY - startY);
          setVerticalTravel({ start: startY, end: endY });

          const scrollDistance = Math.round(totalTravel * 1.25);
          setTrackHeight(vh + scrollDistance);
        }
      }
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);

    const timer1 = setTimeout(calculateBounds, 150);
    const timer2 = setTimeout(calculateBounds, 600);

    return () => {
      window.removeEventListener('resize', calculateBounds);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Desktop vertical travel directly linked to user scroll
  const compositionY = useTransform(
    scrollYProgress,
    (progress) => verticalTravel.start + progress * (verticalTravel.end - verticalTravel.start)
  );

  // Tablet & Mobile horizontal travel directly linked to user scroll (Right to Left on scroll down, Left to Right on reverse)
  const compositionX = useTransform(
    scrollYProgress,
    (progress) => horizontalTravel.start + progress * (horizontalTravel.end - horizontalTravel.start)
  );

  // Top heading row / background layer transitions: blur, opacity, scale, and subtle upward drift as cards scroll over it
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.94]);
  const headingBlurVal = useTransform(scrollYProgress, [0, 0.2], [0, 10]);
  const headingBlur = useTransform(headingBlurVal, (val) => `blur(${val}px)`);
  const headingY = useTransform(scrollYProgress, [0, 0.2], ['0px', '-30px']);

  // ================= 1 BY 1 BOTTOM-TO-TOP SOFT FOLDING MOTION ANIMATION =================
  // Each card gently folds and glides up from bottom to top sequentially. Reverse scrolling smoothly folds back down.
  // Card 1
  const card1RotateX = useTransform(scrollYProgress, [0.0, 0.14], [12, 0]);
  const card1Y = useTransform(scrollYProgress, [0.0, 0.14], [36, 0]);

  // Card 2
  const card2RotateX = useTransform(scrollYProgress, [0.10, 0.24], [12, 0]);
  const card2Y = useTransform(scrollYProgress, [0.10, 0.24], [36, 0]);

  // Card 3
  const card3RotateX = useTransform(scrollYProgress, [0.22, 0.36], [12, 0]);
  const card3Y = useTransform(scrollYProgress, [0.22, 0.36], [36, 0]);

  // Card 4
  const card4RotateX = useTransform(scrollYProgress, [0.34, 0.48], [12, 0]);
  const card4Y = useTransform(scrollYProgress, [0.34, 0.48], [36, 0]);

  // Card 5
  const card5RotateX = useTransform(scrollYProgress, [0.46, 0.60], [12, 0]);
  const card5Y = useTransform(scrollYProgress, [0.46, 0.60], [36, 0]);

  // Card 6
  const card6RotateX = useTransform(scrollYProgress, [0.58, 0.72], [12, 0]);
  const card6Y = useTransform(scrollYProgress, [0.58, 0.72], [36, 0]);

  // Card 7
  const card7RotateX = useTransform(scrollYProgress, [0.70, 0.84], [12, 0]);
  const card7Y = useTransform(scrollYProgress, [0.70, 0.84], [36, 0]);

  return (
    <section className="relative w-full bg-[#0D0D0D] text-[#FBFAFA]">
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Normal Section Content Anchor */}
      <div id="cases" className="w-full" />

      {/* Sticky Scroll Driver: controls the duration the card viewport stays pinned */}
      <div
        ref={scrollDriverRef}
        className="relative w-full"
        style={{
          height: trackHeight ? `${trackHeight}px` : '360vh',
          backgroundColor: '#0D0D0D',
        }}
      >
        {/* Sticky Card Viewport — 100vh pinned stage */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start bg-[#0D0D0D]"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            backgroundColor: '#0D0D0D',
          }}
        >
          {/* ================= 1. TOP HEADING ROW / BACKGROUND LAYER ================= */}
          <motion.div
            style={{
              opacity: headingOpacity,
              scale: headingScale,
              filter: headingBlur,
              y: headingY,
            }}
            className="absolute top-8 sm:top-10 md:top-12 inset-x-0 z-10 flex flex-col items-center text-center select-none pointer-events-none px-6 will-change-[transform,opacity,filter]"
          >
            {/* Tag / Badge with golden corner bracket */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D2AE37] font-mono text-sm leading-none select-none">⌜</span>
              <span className="text-[12px] md:text-[13px] tracking-[0.22em] uppercase font-semibold text-white/80 font-['Inter_Tight']">
                Selected Case Studies
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[40px] sm:text-[52px] md:text-[68px] lg:text-[76px] font-['Antonio'] uppercase tracking-tight leading-[0.95] text-white">
              Real results, <br />
              <span className="bg-gradient-to-r from-[#D2AE37] via-[#F3E4AB] to-[#D2AE37] bg-clip-text text-transparent">
                stronger futures
              </span>
            </h2>

            {/* Subtle case indicator badge */}
            <div className="mt-3 text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-white/40 font-mono">
              2K26 · Case Dossier
            </div>
          </motion.div>

          {/* ================= 2. CARDS LAYER / FOREGROUND LAYER ================= */}
          <div className="relative z-20 w-full h-full max-w-full overflow-hidden [perspective:1200px]">
            {/* DESKTOP LAYOUT (lg:flex, hidden on tablet/mobile): Vertical scroll with 64px top stagger between cards */}
            <motion.div
              ref={compositionRef}
              style={{
                y: compositionY,
              }}
              className="hidden lg:flex absolute inset-x-0 top-0 px-6 md:px-12 lg:px-[90px] flex-col space-y-16 will-change-transform pb-[90px] [perspective:1200px]"
            >
              {/* ====== ROW 1: CARDS 1 & 2 (Card 1 top to Card 2 top gap is 64px / mt-16) ====== */}
              <div className="flex items-start justify-between gap-8 lg:gap-10 pointer-events-auto [perspective:1200px]">
                <CaseCard
                  item={caseStudies[0]}
                  variant="wide"
                  style={{
                    rotateX: card1RotateX,
                    y: card1Y,
                    transformOrigin: 'bottom center',
                  }}
                />
                <CaseCard
                  item={caseStudies[1]}
                  variant="narrow"
                  className="mt-16"
                  style={{
                    rotateX: card2RotateX,
                    y: card2Y,
                    transformOrigin: 'bottom center',
                  }}
                />
              </div>

              {/* ====== ROW 2: CARD 3 (Centered 52%, 64px gap from Row 1) ====== */}
              <div className="flex items-center justify-center pointer-events-auto [perspective:1200px]">
                <CaseCard
                  item={caseStudies[2]}
                  variant="center"
                  style={{
                    rotateX: card3RotateX,
                    y: card3Y,
                    transformOrigin: 'bottom center',
                  }}
                />
              </div>

              {/* ====== ROW 3: CARDS 4 & 5 (Card 4 top to Card 5 top gap is 64px / mt-16) ====== */}
              <div className="flex items-start justify-between gap-8 lg:gap-10 pointer-events-auto [perspective:1200px]">
                <CaseCard
                  item={caseStudies[3]}
                  variant="wide"
                  style={{
                    rotateX: card4RotateX,
                    y: card4Y,
                    transformOrigin: 'bottom center',
                  }}
                />
                <CaseCard
                  item={caseStudies[4]}
                  variant="narrow"
                  className="mt-16"
                  style={{
                    rotateX: card5RotateX,
                    y: card5Y,
                    transformOrigin: 'bottom center',
                  }}
                />
              </div>

              {/* ====== ROW 4: CARDS 6 & 7 (Card 6 top to Card 7 top gap is 64px / mt-16) + CTA ====== */}
              <div
                ref={lastRowRef}
                className="flex flex-col pointer-events-auto [perspective:1200px]"
              >
                <div className="flex items-start justify-between gap-8 lg:gap-10 [perspective:1200px]">
                  <CaseCard
                    item={caseStudies[5]}
                    variant="wide"
                    style={{
                      rotateX: card6RotateX,
                      y: card6Y,
                      transformOrigin: 'bottom center',
                    }}
                  />
                  <CaseCard
                    item={caseStudies[6]}
                    variant="narrow"
                    className="mt-16"
                    style={{
                      rotateX: card7RotateX,
                      y: card7Y,
                      transformOrigin: 'bottom center',
                    }}
                  />
                </div>

                {/* Bottom Right CTA Link ("All cases (17)") */}
                <div className="w-full flex justify-end items-center mt-5 md:mt-6 pointer-events-auto">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 text-white hover:text-[#D2AE37] transition-colors duration-300"
                  >
                    <span className="w-9 h-9 rounded-full border border-white/20 group-hover:border-[#D2AE37] group-hover:bg-[#D2AE37]/10 flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="text-[24px] sm:text-[30px] md:text-[36px] font-['Antonio'] uppercase tracking-tight">
                      All cases
                    </span>
                    <span className="text-[#D2AE37] text-[15px] sm:text-[17px] font-semibold -mt-2">
                      (17)
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* TABLET & MOBILE LAYOUT (lg:hidden): Right-to-Left horizontal scroll on scroll DOWN, Left-to-Right on reverse scroll UP */}
            <div className="lg:hidden w-full h-full flex items-center pt-24 sm:pt-28">
              <motion.div
                ref={horizontalTrackRef}
                style={{ x: compositionX }}
                className="flex flex-row items-center gap-5 sm:gap-7 px-6 sm:px-10 will-change-transform pointer-events-auto"
              >
                {caseStudies.map((study, idx) => (
                  <CaseCard
                    key={study.id}
                    item={study}
                    variant="mobile"
                    className={idx % 2 === 1 ? 'mt-8 sm:mt-12' : ''}
                  />
                ))}

                {/* Mobile / Tablet Horizontal CTA Card */}
                <div className="shrink-0 flex items-center justify-center px-8 sm:px-12 py-10 rounded-[20px] border border-white/10 bg-[#151415] hover:border-[#D2AE37]/50 transition-all duration-300">
                  <a
                    href="#contact"
                    className="group flex flex-col items-center gap-4 text-center text-white hover:text-[#D2AE37] transition-colors duration-300"
                  >
                    <span className="w-12 h-12 rounded-full border border-white/20 group-hover:border-[#D2AE37] group-hover:bg-[#D2AE37]/10 flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="text-[28px] sm:text-[32px] font-['Antonio'] uppercase tracking-tight">
                      All cases
                    </span>
                    <span className="text-[#D2AE37] text-[16px] font-semibold">
                      (17)
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

interface ServiceItem {
  id: string;
  categoryNumber: string;
  categoryName: string;
  title: string;
  bullets: string[];
  tags: string[];
  detailedOverview: string;
  images: {
    url: string;
    caption: string;
  }[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'business-law',
    categoryNumber: '01.',
    categoryName: 'Business Law',
    title: 'Business Formation & Corporate Counsel',
    bullets: [
      'Start and structure your business with confidence',
      'Ongoing legal support as your company grows',
      'Contracts, compliance and risk management',
    ],
    tags: ['Business Formation', 'Contracts', 'Compliance', 'Intellectual Property'],
    detailedOverview:
      'From LLC and corporation formations to drafting high-stakes commercial agreements, we act as outside general counsel protecting entrepreneurs, founders, and established enterprises from liability and disputes.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
        caption: 'Corporate Strategy & Governance',
      },
      {
        url: '/.tempmediaStorage/LAW_PICTURE.jpg',
        caption: 'Contract Execution & Regulatory Advisory',
      },
    ],
  },
  {
    id: 'family-law',
    categoryNumber: '02.',
    categoryName: 'Family Law',
    title: 'Divorce & Family Matters',
    bullets: [
      'Compassionate guidance during difficult times',
      'Protecting your family and children’s best interests',
      'Clear, practical solutions for a brighter future',
    ],
    tags: ['Divorce', 'Child Custody', 'Spousal Support', 'Mediation'],
    detailedOverview:
      'We bring empathy and courtroom rigor to family legal disputes, focusing on equitable asset division, tailored parenting plans, and private mediation to protect your family’s well-being and privacy.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop',
        caption: 'Private Client Consultation & Mediation',
      },
      {
        url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop',
        caption: 'Protective Child & Spousal Agreements',
      },
    ],
  },
  {
    id: 'criminal-defense',
    categoryNumber: '03.',
    categoryName: 'Criminal Defense',
    title: 'Felony & Misdemeanor Defense',
    bullets: [
      'Strong defense for your rights and freedom',
      'Thorough case analysis and strategic planning',
      'Dedicated representation at every stage',
    ],
    tags: ['Felony Defense', 'Misdemeanors', 'DUI / DWI'],
    detailedOverview:
      'When your freedom and future are on the line, we deploy aggressive investigative strategies, challenge unlawful evidence, and fight tirelessly in courtrooms across state and federal jurisdictions.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop',
        caption: 'Courtroom Trial Advocacy & Defense',
      },
      {
        url: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=1000&auto=format&fit=crop',
        caption: 'Forensic Evidence & Case Investigation',
      },
    ],
  },
  {
    id: 'civil-litigation',
    categoryNumber: '04.',
    categoryName: 'Civil Litigation',
    title: 'Commercial Litigation & Dispute Resolution',
    bullets: [
      'Relentless courtroom representation in high-stakes disputes',
      'Tailored arbitration and settlement negotiation strategies',
      'Protecting commercial assets, reputation, and rights',
    ],
    tags: ['Commercial Litigation', 'Breach of Contract', 'Arbitration', 'Appeals'],
    detailedOverview:
      'Handling intricate commercial claims, fiduciary disputes, and breach of fiduciary duties. We combine rigorous legal research with tenacious trial advocacy to secure favorable judgments and settlements.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop',
        caption: 'Federal & State Appellate Litigation',
      },
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
        caption: 'Financial Audit & Deposition Prep',
      },
    ],
  },
  {
    id: 'real-estate-law',
    categoryNumber: '05.',
    categoryName: 'Real Estate Law',
    title: 'Property Transactions & Land Development',
    bullets: [
      'Comprehensive support for commercial and residential closings',
      'Title examinations, zoning, and municipal permit clearance',
      'Decisive resolution of boundary, lease, and land disputes',
    ],
    tags: ['Commercial Closings', 'Zoning & Land Use', 'Title Insurance'],
    detailedOverview:
      'Guiding developers, investors, and property owners through acquisitions, title clearances, environmental covenants, and complex municipal approvals to guarantee clean ownership and risk-free deals.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        caption: 'Commercial Land Development & Acquisitions',
      },
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
        caption: 'Title Examination & Closing Verification',
      },
    ],
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

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(servicesData[0].id);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const isManualClickRef = useRef<boolean>(false);
  const lastScrollYRef = useRef<number>(0);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle or expand card on click (works on entire card or buttons)
  const handleCardToggle = useCallback((id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    isManualClickRef.current = true;
    lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;

    setExpandedId((prev) => (prev === id ? null : id));

    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 1500);
  }, []);

  // Sequential scroll-driven accordion: expands cards 1 by 1 as user scrolls
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;

        // If user manually clicked, wait until they scroll > 70px before resuming auto-scroll expansion
        if (isManualClickRef.current) {
          if (Math.abs(window.scrollY - lastScrollYRef.current) > 70) {
            isManualClickRef.current = false;
          } else {
            return;
          }
        }

        if (!listContainerRef.current) return;
        const rect = listContainerRef.current.getBoundingClientRect();
        const vh = window.innerHeight;

        // Active reading focus window (from 68% down to 28% of viewport)
        const startTrigger = vh * 0.68;
        const endTrigger = vh * 0.28;
        const totalDistance = rect.height + (startTrigger - endTrigger);

        if (rect.top <= startTrigger && rect.bottom >= endTrigger) {
          const progress = (startTrigger - rect.top) / totalDistance;
          const clamped = Math.max(0, Math.min(0.999, progress));
          const targetIndex = Math.floor(clamped * servicesData.length);

          if (servicesData[targetIndex]) {
            const targetId = servicesData[targetIndex].id;
            setExpandedId((prev) => (prev !== targetId ? targetId : prev));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#0C0C0D] text-[#FBFBFB] py-16 sm:py-24 md:py-28 lg:py-[clamp(90px,8.5vh,170px)] overflow-hidden">
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Ambient background gold glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#D2AF37]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container matching Header & AboutMe width & padding, with proportional max-width for ultra-wide */}
      <div className="relative z-10 w-full max-w-[2400px] mx-auto px-6 md:px-12 lg:px-[clamp(48px,5vw,120px)]">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 sm:mb-18 md:mb-20 lg:mb-[clamp(56px,5.5vh,96px)] items-end">
          
          {/* Left Column: Badge + Giant Headline */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 mb-4 lg:mb-[clamp(16px,1.8vh,28px)]">
              <span className="w-6 h-6 rounded-full bg-[#D2AF37] text-[#0C0C0D] font-bold text-xs flex items-center justify-center font-inter-tight">
                03
              </span>
              <span className="text-white/80 font-inter-tight text-xs sm:text-sm font-semibold tracking-wider uppercase">
                Our Legal Services
              </span>
            </div>

            {/* Headline with fluid desktop scaling and CSS width: 700px */}
            <h2 
              style={{ maxWidth: '700px' }}
              className="w-full font-antonio font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[clamp(48px,3.8vw,78px)] leading-[1.12] sm:leading-[1.1] tracking-[-0.015em] uppercase text-white"
            >
              <BlurWaveText
                text="Trusted expertise across every area of law we practice"
                highlightWord="practice"
                highlightClass="text-[#D2AF37]"
                delay={0.1}
              />
            </h2>
          </div>

          {/* Right Column: Explanatory Subtitle with fluid scaling */}
          <div className="lg:col-span-4 lg:pl-6 pb-2">
            <p className="font-inter-tight text-base sm:text-lg lg:text-[clamp(17px,1.3vw,24px)] text-white/60 leading-[1.6]">
              We provide dedicated legal support with in-depth knowledge and a client-first approach across a wide range of practice areas.
            </p>
          </div>

        </div>


        {/* ================= SERVICES LIST (5 CARDS) ================= */}
        <div ref={listContainerRef} className="w-full flex flex-col border-t border-white/[0.08]">
          {servicesData.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className="w-full border-b border-white/[0.08]"
              >
                {/* Main Visible Row - Clicking anywhere expands/collapses */}
                <div
                  onClick={(e) => handleCardToggle(service.id, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardToggle(service.id);
                    }
                  }}
                  className={`cursor-pointer select-none py-7 sm:py-8 md:py-9 lg:py-[clamp(32px,3vh,54px)] transition-all duration-300 outline-none focus:outline-none ${
                    isExpanded
                      ? 'pr-0'
                      : 'pr-0 sm:pr-2 md:pr-4 lg:pr-6'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* Column 1: Left Row category tag - scales fluidly */}
                    <div className="lg:col-span-2 xl:col-span-2 flex items-center gap-2.5 font-inter-tight text-base sm:text-lg lg:text-[clamp(16px,1.18vw,22px)] font-semibold tracking-wider pt-1">
                      <span className="text-[#D2AF37] font-bold">{service.categoryNumber}</span>
                      <span className="text-white/40 uppercase group-hover:text-white/60 transition-colors">
                        {service.categoryName}
                      </span>
                    </div>

                    {/* Column 2 (Selected 2nd div): Service Title & Checkmark Bullets */}
                    <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
                      {/* h3 Title - scales fluidly */}
                      <h3 className="font-antonio font-bold text-2xl sm:text-3xl lg:text-[clamp(34px,2.75vw,54px)] uppercase text-white tracking-tight leading-[1.12] mb-4 lg:mb-[clamp(16px,1.8vh,26px)]">
                        <BlurWaveText text={service.title} delay={0.05} />
                      </h3>

                      {/* Bullets List - scales fluidly */}
                      <ul className="space-y-3 lg:space-y-[clamp(10px,1.1vh,16px)] font-inter-tight text-base sm:text-lg lg:text-[clamp(15px,1.18vw,22px)] text-white/70">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-[clamp(18px,1.2vw,22px)] h-[clamp(18px,1.2vw,22px)] text-[#D2AF37] shrink-0 mt-1 stroke-[2.2]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3 (Selected 1st div): Action Button & Tags - Width increased on desktop & height constrained */}
                    <div className="lg:col-span-4 xl:col-span-4 lg:pl-6 xl:pl-8 flex flex-col justify-start space-y-4 lg:space-y-[clamp(14px,1.6vh,22px)]">
                      
                      {/* Top Action Row: See Details Button - scales fluidly */}
                      <div>
                        <button
                          type="button"
                          onClick={(e) => handleCardToggle(service.id, e)}
                          className={`outline-none focus:outline-none focus:ring-0 group inline-flex items-center gap-3 px-[clamp(18px,1.35vw,26px)] py-[clamp(8px,0.85vh,14px)] rounded-md border text-sm sm:text-base lg:text-[clamp(15px,1.18vw,22px)] font-inter-tight font-semibold tracking-wider uppercase transition-all duration-400 cursor-pointer ${
                            isExpanded
                              ? 'bg-[#D2AF37] border-[#D2AF37] text-[#0C0C0D] font-bold shadow-[0_4px_20px_rgba(211,175,55,0.25)]'
                              : 'bg-transparent border-white/20 hover:border-[#D2AF37] text-white hover:bg-white/[0.03]'
                          }`}
                        >
                          <span className={isExpanded ? 'text-[#0C0C0D]' : 'text-white group-hover:text-[#D2AF37] transition-colors'}>
                            See Details
                          </span>
                          <ArrowRight
                            className={`w-[clamp(16px,1.15vw,22px)] h-[clamp(16px,1.15vw,22px)] transition-transform duration-300 group-hover:translate-x-1 ${
                              isExpanded ? 'text-[#0C0C0D]' : 'text-[#D2AF37]'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Bottom Row: Tags Pills (3-4 tags per card) - scales fluidly */}
                      <div className="flex flex-wrap gap-2 lg:gap-[clamp(8px,0.6vw,12px)] pt-1">
                        {service.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="bg-[#191818] text-white/70 border border-white/5 px-[clamp(10px,0.8vw,16px)] py-[clamp(4px,0.45vh,8px)] rounded text-xs sm:text-sm lg:text-[clamp(13px,1.05vw,19px)] font-inter-tight font-medium tracking-wide whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>

                {/* ================= EXPANDABLE DRAWER: AWWWARDS-STYLE SILKY SOFT MOTION ANIMATION ================= */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`expanded-${service.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.65, ease: [0.19, 1, 0.22, 1] },
                          opacity: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                          opacity: { duration: 0.25, ease: 'easeOut' },
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 sm:pb-10 lg:pb-[clamp(32px,3.5vh,60px)] pt-2">
                        {/* 12-Column Grid to align images perfectly with Column 2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                          
                          {/* Column 1 is empty on desktop, matching design alignment */}
                          <div className="hidden lg:block lg:col-span-2 xl:col-span-2" />

                          {/* Columns 2 & 3: 2 High-Quality Images scaling fluidly with viewport */}
                          <div className="lg:col-span-10 xl:col-span-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              {service.images.map((img, imgIdx) => (
                                <motion.div
                                  key={imgIdx}
                                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                                  animate={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    scale: 1,
                                    transition: {
                                      duration: 0.6,
                                      delay: 0.08 + imgIdx * 0.09,
                                      ease: [0.19, 1, 0.22, 1],
                                    }
                                  }}
                                  className="relative group rounded-xl overflow-hidden aspect-[16/9.5] max-h-[clamp(210px,16vw,360px)] w-full bg-[#151415] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                                >
                                  <Image
                                    src={img.url}
                                    alt={img.caption}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    referrerPolicy="no-referrer"
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[0.19,1,0.22,1] brightness-[0.92]"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                  
                                  {/* Image Caption - scales fluidly */}
                                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs font-inter-tight text-white/90">
                                    <span className="font-semibold tracking-wide uppercase text-[#D2AF37] text-xs sm:text-sm lg:text-[clamp(13px,1.05vw,19px)]">
                                      {img.caption}
                                    </span>
                                    <ExternalLink className="w-[clamp(14px,1vw,18px)] h-[clamp(14px,1vw,18px)] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

// Custom Facebook and TikTok icons matching brand aesthetic
function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.3 6.3 0 0 0 1.87-4.47V8.75a8.28 8.28 0 0 0 4.9 1.58V6.88a4.83 4.83 0 0 1-1-.19z" />
    </svg>
  );
}

const PHRASES = Array(8).fill(null);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: false });

  // Hover & mouse tracking states for cursor-following button
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    // Follow right at the cursor point (centered or close with the pointer)
    const targetX = Math.min(Math.max(10, rawX - 110), rect.width - 250);
    const targetY = Math.min(Math.max(10, rawY - 26), rect.height - 60);
    setMousePos({ x: targetX, y: targetY });
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#aboutme' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blogs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative w-full bg-[#080909] text-[#FAFAFB] pt-[85px] pb-[32px] overflow-hidden"
    >
      {/* Dynamic Keyframes for ultra-slow right-to-left marquee & Self-contained Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }

        @keyframes footerMarqueeAnim {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .footer-marquee-track {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: max-content;
          will-change: transform;
          animation: footerMarqueeAnim 220s linear infinite;
          transition: animation-duration 0.8s ease;
        }
        .footer-marquee-track.slowed {
          animation-duration: 420s;
        }
      `}</style>

      {/* Background Ambient Warm Golden Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-[#D3AF37]/[0.035] rounded-full blur-[220px] pointer-events-none" />

      {/* ================= 1. HERO AREA: MARQUEE & REDUCED HEIGHT ROTATED IMAGE ================= */}
      <motion.div
        ref={heroContainerRef}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 25, filter: 'blur(10px)' }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[290px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] flex items-center justify-center overflow-hidden select-none mb-12 sm:mb-16 md:mb-20 cursor-pointer"
      >
        {/* ================= 2ND DIV: RUNNING MARQUEE TEXT (STRICTLY 1 LINE WITH LETTER WAVE) ================= */}
        {/* Centered vertically across the image in 1 single continuous line. Cropping allowed as requested. */}
        <div
          className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none transition-opacity duration-700 whitespace-nowrap flex-nowrap ${
            isHovered ? 'opacity-25' : 'opacity-100'
          }`}
        >
          <div
            className={`footer-marquee-track flex-nowrap whitespace-nowrap ${isHovered ? 'slowed' : ''}`}
          >
            {/* Repeated twice for seamless 0% to -50% loop */}
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="flex flex-row items-center flex-nowrap shrink-0 whitespace-nowrap">
                {PHRASES.map((_, i) => {
                  const phraseWord1 = "LET'S TALK";
                  const phraseWord2 = "LAW";
                  return (
                    <div
                      key={`${copyIndex}-${i}`}
                      className="inline-flex flex-row items-center flex-nowrap shrink-0 whitespace-nowrap gap-5 sm:gap-7 md:gap-9 mx-5 sm:mx-7 md:mx-9"
                    >
                      {/* Word 1: LET'S TALK with individual letter wave */}
                      <span className="font-['Antonio'] text-[70px] sm:text-[105px] md:text-[145px] lg:text-[180px] xl:text-[215px] font-bold tracking-tight uppercase leading-none whitespace-nowrap shrink-0 inline-flex flex-row">
                        {phraseWord1.split('').map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            initial={{ y: 35, opacity: 0 }}
                            animate={
                              isInView
                                ? { y: [25, -12, 0], opacity: 1 }
                                : { y: 35, opacity: 0 }
                            }
                            transition={{
                              duration: 0.7,
                              delay: isInView ? (charIdx * 0.04) : 0,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block bg-gradient-to-b from-[#FFFEFE] via-[#E9E8E9] to-[#7B7A7B] bg-clip-text text-transparent"
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))}
                      </span>

                      {/* Word 2: LAW with continuing letter wave */}
                      <span className="font-['Antonio'] text-[70px] sm:text-[105px] md:text-[145px] lg:text-[180px] xl:text-[215px] font-bold tracking-tight uppercase leading-none whitespace-nowrap shrink-0 inline-flex flex-row">
                        {phraseWord2.split('').map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            initial={{ y: 35, opacity: 0 }}
                            animate={
                              isInView
                                ? { y: [25, -12, 0], opacity: 1 }
                                : { y: 35, opacity: 0 }
                            }
                            transition={{
                              duration: 0.7,
                              delay: isInView ? ((phraseWord1.length + charIdx) * 0.04) : 0,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block bg-gradient-to-r from-[#F5E08E] via-[#D3AF37] to-[#8D6D19] bg-clip-text text-transparent"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>

                      <span className="text-[#D3AF37] text-2xl sm:text-3xl md:text-4xl font-serif shrink-0 whitespace-nowrap">
                        •
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ================= 1ST DIV: GENTLY ROTATED IMAGE (SOFTS REVEAL FROM BOTTOM TO POSITION & RETREATS ON EXIT - SLOWER & SMOOTHER) ================= */}
        <motion.div 
          initial={{ y: 220, opacity: 0, scale: 0.92 }}
          animate={
            isInView
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: 220, opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative w-[185px] h-[245px] sm:w-[230px] sm:h-[300px] md:w-[265px] md:h-[345px] lg:w-[295px] lg:h-[385px] rounded-2xl overflow-hidden bg-[#080909] rotate-[3.5deg] border-0 outline-none transition-all duration-500 hover:rotate-[2deg]">
            <Image
              src="/.tempmediaStorage/GUBE1.jpeg"
              alt="Giorgi Gubeladze Legal Counsel"
              fill
              sizes="(max-width: 768px) 230px, 300px"
              className="object-cover object-center border-0 outline-none transition-transform duration-700 ease-out"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Top subtle shade */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

            {/* Bottom blurred gradient blend seamlessly matching the #080909 background */}
            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#080909] via-[#080909]/90 to-transparent backdrop-blur-[2px] pointer-events-none" />
          </div>
        </motion.div>

        {/* ================= FLOATING BUTTON (BRAND COLOR BG, DARK TEXT, DARK ICON BG, BRAND ICON) ================= */}
        <motion.a
          href="#contact"
          initial={false}
          animate={
            isHovered
              ? {
                  opacity: 1,
                  scale: 1,
                  x: mousePos.x,
                  y: mousePos.y,
                }
              : {
                  opacity: 0,
                  scale: 0.7,
                  x: mousePos.x,
                  y: mousePos.y,
                }
          }
          transition={{
            type: 'spring',
            damping: 22,
            stiffness: 240,
            mass: 0.5,
            opacity: { duration: 0.2 },
          }}
          className={`absolute top-0 left-0 z-30 flex flex-row items-center p-2 pr-5 sm:pr-6 gap-3 bg-[#D3AF37] border border-[#F5E08E]/50 shadow-[0px_14px_45px_rgba(211,175,55,0.35)] rounded-2xl transition-all duration-300 group cursor-pointer -rotate-12 ${
            isHovered ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Left Icon Box: Dark background */}
          <div className="w-10 h-10 sm:w-[48px] sm:h-[48px] bg-[#080909] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            {/* Icon: Brand Primary Golden Color */}
            <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#D3AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>

          {/* Button Text: Dark Color in Antonio Google Font */}
          <span className="font-['Antonio'] font-bold text-lg sm:text-xl md:text-[26px] leading-tight tracking-[-0.03em] text-[#080909] whitespace-nowrap">
            Book a Consultation
          </span>
        </motion.a>
      </motion.div>

      {/* ================= 2. MIDDLE NAVIGATION & SOCIALS BAR ================= */}
      <div className="relative z-10 w-full max-w-full px-6 md:px-12 lg:px-[90px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 sm:pb-16 border-b border-white/[0.08]">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm sm:text-base text-gray-400 hover:text-white font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons in brand gold */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61566775323850"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#D3AF37] hover:text-[#FFF3B2] transition-transform duration-200 hover:scale-110"
            >
              <div className="w-8 h-8 rounded border border-[#D3AF37]/70 flex items-center justify-center">
                <FacebookIcon className="w-4 h-4 fill-current" />
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@giorgi.gubeladze"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-[#D3AF37] hover:text-[#FFF3B2] transition-transform duration-200 hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <TikTokIcon className="w-4 h-4 fill-current" />
            </a>

            {/* Email */}
            <a
              href="mailto:lawyergiorgigubeladze@gmail.com"
              aria-label="Email GLC Law Firm"
              className="text-[#D3AF37] hover:text-[#FFF3B2] transition-transform duration-200 hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* ================= 3. BOTTOM COPYRIGHT & CREDITS BAR ================= */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Brand Name & Title */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm">
            <span className="font-['Antonio'] text-[#D3AF37] font-bold tracking-wider uppercase text-sm sm:text-base">
              GLC Law Firm
            </span>
            <span className="text-gray-500">—</span>
            <span className="text-gray-400 font-normal">
              Justice In Action
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            &copy; 2026 GLC Law Firm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

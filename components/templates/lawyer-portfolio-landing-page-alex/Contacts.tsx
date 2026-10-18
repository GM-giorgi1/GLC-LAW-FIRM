'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ArrowRight, CheckCircle2, ChevronDown, Check } from 'lucide-react';

const SERVICES_LIST = [
  'Criminal Law',
  'Corporate & Business Law',
  'Litigation & Dispute Resolution',
  'Administrative & Civil Litigation',
  'Intellectual Property',
  'Real Estate & Transactions',
  'Asset Protection & Estate Planning',
  'Other Legal Services',
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

export default function Contacts() {
  const sectionRef = useRef<HTMLElement>(null);
  // Viewport trigger: starts blurry with low opacity and transitions to 100% opacity and 0 blur upon reaching viewport;
  // returns/resets when leaving viewport.
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service) {
      setIsServiceOpen(true);
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0B] text-[#FBFBFB] py-[90px] overflow-hidden"
    >
      {/* Self-contained Google Fonts & Styling for standalone copy-paste */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif !important; }
        .font-inter-tight { font-family: 'Inter Tight', sans-serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
      `}</style>

      {/* Ambient Warm Golden Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-[#D2AF37]/[0.035] rounded-full blur-[200px] pointer-events-none" />

      {/* Main Container: Matching Testimonials carousel width (max-w-[1300px] mx-auto) */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Animated Container: Blurry & low opacity on load, becomes 100% sharp & opaque in viewport */}
        <motion.div
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 35, filter: 'blur(14px)' }
          }
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          {/* ================= LEFT COLUMN: CONSULTATION PHOTO & CONTACT INFO ================= */}
          <div className="lg:col-span-6 flex flex-col rounded-3xl overflow-hidden bg-[#0A0A0B]">
            {/* Top Photo Area: Smooth bottom blend matching section bg */}
            <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[460px] overflow-hidden bg-[#0A0A0B]">
              <Image
                src="/.tempmediaStorage/GUBE.jpeg"
                alt="Giorgi Gubeladze in a private consultation with a client"
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover object-center"
                priority
                referrerPolicy="no-referrer"
              />
              
              {/* Smooth Gradient Shade blending directly into the dark section background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent pointer-events-none" />
            </div>

            {/* Bottom Contact Details Bar: Cleanly matching section bg without borders */}
            <div className="pt-3 pb-4 sm:pt-4 sm:pb-6 px-2 sm:px-4 bg-[#0A0A0B] mt-auto">
              <div className="flex items-center justify-between gap-4">
                {/* Call Us */}
                <a
                  href="tel:+995599277794"
                  className="flex items-center gap-3 sm:gap-3.5 group/call transition-all"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D2AF37] bg-transparent flex items-center justify-center text-[#D2AF37] shrink-0 transition-transform group-hover/call:scale-105">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5BE4A]" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-400">
                      Call Us
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover/call:text-[#E5BE4A] transition-colors whitespace-nowrap">
                      +995 599 27 77 94
                    </span>
                  </div>
                </a>

                {/* Vertical Divider */}
                <div className="h-8 w-[1px] bg-white/15 shrink-0" />

                {/* Email me */}
                <a
                  href="mailto:lawyergiorgigubeladze@gmail.com"
                  className="flex items-center gap-3 sm:gap-3.5 group/mail transition-all"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D2AF37] bg-transparent flex items-center justify-center text-[#D2AF37] shrink-0 transition-transform group-hover/mail:scale-105">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5BE4A]" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-400">
                      Email me
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover/mail:text-[#E5BE4A] transition-colors whitespace-nowrap">
                      lawyergiorgigubeladze@gmail.com
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: BOOK A CONSULTATION FORM ================= */}
          <div className="lg:col-span-6 rounded-3xl bg-[#111011] border border-white/[0.08] p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            
            {/* Guarantee Response Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E5BE4A] shadow-[0_0_8px_#E5BE4A] animate-pulse" />
              <p className="text-xs sm:text-sm text-gray-300">
                Response guaranteed within{' '}
                <span className="text-[#E5BE4A] font-semibold">1 business day</span>
              </p>
            </div>

            {/* Brand Heading */}
            <h2 className="text-center font-['Antonio'] text-3xl sm:text-4xl md:text-[42px] uppercase tracking-tight font-bold leading-tight">
              <BlurWaveText
                text="BOOK A CONSULTATION"
                highlightWord="CONSULTATION"
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4D1] via-[#E5BE4A] to-[#D2AF37]"
                delay={0.1}
              />
            </h2>

            {/* Subtitle */}
            <p className="text-center text-xs sm:text-sm text-gray-400 mt-2 mb-7 max-w-md mx-auto leading-relaxed">
              Share your details and get expert legal guidance tailored to your situation.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 rounded-2xl bg-[#171616] border border-[#D2AF37]/30 text-center flex flex-col items-center justify-center my-auto"
              >
                <div className="w-14 h-14 rounded-full bg-[#D2AF37]/15 border border-[#D2AF37] flex items-center justify-center text-[#E5BE4A] mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-['Antonio'] text-2xl uppercase tracking-tight text-white mb-2">
                  CONSULTATION REQUEST RECEIVED
                </h3>
                <p className="text-gray-300 text-sm max-w-sm mb-6 leading-relaxed">
                  Thank you, <span className="text-[#E5BE4A] font-medium">{formData.fullName || 'there'}</span>. Giorgi Gubeladze and our executive legal team have received your inquiry and will reach out to you within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs text-white uppercase tracking-wider hover:border-[#D2AF37] hover:text-[#D2AF37] transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                {/* Row 1: Full name & Email address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                      Full name<span className="text-[#D2AF37] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full bg-[#191919] border border-white/[0.09] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D2AF37] focus:ring-1 focus:ring-[#D2AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                      Email address<span className="text-[#D2AF37] ml-0.5">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="lawyergiorgigubeladze@gmail.com"
                      className="w-full bg-[#191919] border border-white/[0.09] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D2AF37] focus:ring-1 focus:ring-[#D2AF37] transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Phone number */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your contact number"
                    className="w-full bg-[#191919] border border-white/[0.09] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D2AF37] focus:ring-1 focus:ring-[#D2AF37] transition-all"
                  />
                </div>

                {/* Row 3: Service needed (Custom dropdown that expands downward below the input) */}
                <div ref={serviceDropdownRef} className="relative z-30">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                    Service needed<span className="text-[#D2AF37] ml-0.5">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsServiceOpen((prev) => !prev)}
                    className={`w-full bg-[#191919] border rounded-xl px-4 py-3 sm:py-3.5 text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
                      isServiceOpen
                        ? 'border-[#D2AF37] ring-1 ring-[#D2AF37]'
                        : 'border-white/[0.09] hover:border-white/20'
                    }`}
                  >
                    <span className={formData.service ? 'text-white' : 'text-gray-500'}>
                      {formData.service || 'Select a Service'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D2AF37] transition-transform duration-200 ${
                        isServiceOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Downwards-expanding Dropdown Menu List */}
                  <AnimatePresence>
                    {isServiceOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#171616] border border-[#D2AF37]/35 rounded-xl py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.85)] z-50 overflow-hidden backdrop-blur-md"
                      >
                        {SERVICES_LIST.map((service) => {
                          const isSelected = formData.service === service;
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, service }));
                                setIsServiceOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#D2AF37]/15 text-[#E5BE4A] font-medium'
                                  : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'
                              }`}
                            >
                              <span>{service}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#D2AF37]" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full bg-[#191919] border border-white/[0.09] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D2AF37] focus:ring-1 focus:ring-[#D2AF37] transition-all resize-none"
                  />
                </div>

                {/* Row 5: Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group mt-2 bg-gradient-to-r from-[#F1CB56] via-[#E5BE4A] to-[#D2AF37] hover:from-[#FAD972] hover:via-[#F1CB56] hover:to-[#DFC14E] text-[#0A0A0B] font-semibold text-sm sm:text-base py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_24px_rgba(211,175,55,0.25)] hover:shadow-[0_6px_30px_rgba(211,175,55,0.4)] active:scale-[0.99] cursor-pointer"
                >
                  <span>{isSubmitting ? 'Sending inquiry...' : 'Send message'}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

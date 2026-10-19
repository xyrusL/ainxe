import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Sparkle,
  Plant,
  ArrowRight,
  X,
  PaperPlaneRight,
  CheckCircle,
  SpeakerHigh,
  SpeakerSlash,
  List,
  XLogo,
  InstagramLogo,
  FacebookLogo,
  RedditLogo,
} from '@phosphor-icons/react';
import { SITE_INFO } from './config/siteInfo';
import { AinxeIcon } from './components/AinxeLogo';
import { SeoHead } from './components/SeoHead';
import { sounds } from './utils/soundEffects';

type ActiveModal = 'none' | 'features' | 'about' | 'contact' | 'socialError';

interface WaterRipple {
  id: number;
  x: number;
  y: number;
}

export function App() {
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [inquiryType, setInquiryType] = useState<'App' | 'Website' | 'Software'>('App');
  const [clientEmail, setClientEmail] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [inquirySent, setInquirySent] = useState(false);
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const [musicOn, setMusicOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typewriter animation states
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const fullLine1 = 'Where Calm Meets';
  const fullLine2 = 'Code.';

  useEffect(() => {
    let index1 = 0;
    let index2 = 0;

    const timer1 = setInterval(() => {
      if (index1 <= fullLine1.length) {
        setDisplayedLine1(fullLine1.slice(0, index1));
        index1++;
      } else {
        clearInterval(timer1);
        const timer2 = setInterval(() => {
          if (index2 <= fullLine2.length) {
            setDisplayedLine2(fullLine2.slice(0, index2));
            index2++;
          } else {
            clearInterval(timer2);
            setIsTypingDone(true);
          }
        }, 85);
      }
    }, 65);

    return () => {
      clearInterval(timer1);
    };
  }, []);

  // Auto-start aesthetic lo-fi background music on user's first interaction
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!sounds.isMusicOn()) {
        sounds.startAestheticMusic();
        setMusicOn(true);
      }
    };
    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstUserInteraction);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal('none');
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWaterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    sounds.playWaterDrop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple: WaterRipple = { id: Date.now() + Math.random(), x, y };
    setRipples((prev) => [...prev.slice(-5), newRipple]);
  };

  const handleButtonClick = (action: () => void) => {
    sounds.playButtonTap();
    action();
  };

  const openFeaturesModal = () => {
    sounds.playBoop();
    setActiveModal('features');
    setMobileMenuOpen(false);
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playMarioDeath();
    setActiveModal('socialError');
  };

  const toggleMusic = () => {
    sounds.playButtonTap();
    const active = sounds.toggleMusic();
    setMusicOn(active);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playButtonTap();
    setInquirySent(true);
  };

  return (
    <div className="min-h-screen sm:h-screen w-screen overflow-x-hidden sm:overflow-hidden bg-[#070b14] text-[#d6e3f0] relative flex flex-col justify-between select-none font-['Space_Mono',monospace]">
      {/* Strict Tab Title: "AINXE Studio" */}
      <SeoHead
        title="AINXE Studio"
        description="In the rush of digital life, imagine a space that feels like a deep breath. AINXE crafts quiet software, serene websites, and neural apps."
        path="/"
      />

      {/* =====================================================================
          BACKGROUND SCENIC PIXEL ART (Clean dark sky top 65%, lake bottom 35%)
      ====================================================================== */}
      <div
        className="absolute inset-0 pointer-events-auto cursor-pointer z-0 overflow-hidden"
        onClick={handleWaterClick}
        title="Click on the water for sound & ripples"
      >
        <img
          src="/clean-night-bg.jpg"
          alt="Clean nocturnal pixel art background with deep starry sky and serene dock lake"
          className="w-full h-full object-cover object-bottom opacity-90 transition-opacity duration-700"
        />

        {/* Soft top gradient to ensure 100% dark seamless sky header */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#070b14] via-[#070b14]/60 to-transparent pointer-events-none" />

        {/* Lantern Breathing Ambient Glow */}
        <div
          className="absolute bottom-[23%] left-[73%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none animate-pulse-glow"
          aria-hidden="true"
        />

        {/* Drifting Fireflies */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${25 + i * 12}%`,
                y: `${68 + (i % 3) * 6}%`,
                opacity: 0.2,
                scale: 0.8,
              }}
              animate={{
                y: [
                  `${68 + (i % 3) * 6}%`,
                  `${62 + (i % 3) * 6}%`,
                  `${69 + (i % 3) * 6}%`,
                ],
                x: [
                  `${25 + i * 12}%`,
                  `${27 + i * 12}%`,
                  `${24 + i * 12}%`,
                ],
                opacity: [0.2, 0.9, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4.2 + i * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
            />
          ))}
        </div>

        {/* Expanding Water Ripples on Click */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0.1, opacity: 0.85 }}
              animate={{ scale: 3.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: ripple.x,
                top: ripple.y,
                width: 46,
                height: 22,
                transform: 'translate(-50%, -50%)',
              }}
              className="rounded-[50%] border-2 border-sky-300/80 pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              onAnimationComplete={() => {
                setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* =====================================================================
          TOP NAVIGATION BAR (Properly balanced, no tall button, AINXE Studios)
      ====================================================================== */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2 flex items-center justify-between">
        {/* Left: Brand Icon + Title (AINXE Studios) */}
        <button
          type="button"
          onClick={() => handleButtonClick(() => setActiveModal('none'))}
          className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors cursor-pointer group focus:outline-none"
        >
          <div className="p-1 rounded bg-white/5 border border-white/10 group-hover:border-sky-400/40 transition-colors">
            <AinxeIcon size={18} />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide text-white">
            AINXE Studios
          </span>
        </button>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm text-slate-300">
          <button
            type="button"
            onClick={openFeaturesModal}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => setActiveModal('about'))}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => setActiveModal('contact'))}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right: Balanced Action Button + Aesthetic Lo-Fi Music Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={toggleMusic}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer text-[10px]"
            title="Toggle lo-fi aesthetic background music"
          >
            {musicOn ? (
              <span className="flex items-center gap-1">
                <SpeakerHigh size={13} className="text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-emerald-400 font-bold">MUSIC: ON</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <SpeakerSlash size={13} className="text-slate-500" />
                <span className="hidden sm:inline text-slate-400">MUSIC: OFF</span>
              </span>
            )}
          </button>

          {/* Start Your Journey Button - Desktop only, removed on mobile to prevent crowding */}
          <button
            type="button"
            onClick={() => handleButtonClick(() => setActiveModal('contact'))}
            className="hidden md:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-md bg-[#ef5d52] hover:bg-[#df4f44] hover:shadow-[0_4px_14px_rgba(239,93,82,0.4)] transform hover:-translate-y-0.5"
          >
            <span>Start Your Journey</span>
            <ArrowRight size={12} weight="bold" />
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            onClick={() => handleButtonClick(() => setMobileMenuOpen(!mobileMenuOpen))}
            className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            <List size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden relative z-30 mx-4 p-4 rounded-2xl bg-[#0c121e]/95 border border-white/10 shadow-xl space-y-3 text-center text-xs"
          >
            <button
              type="button"
              onClick={openFeaturesModal}
              className="block w-full py-2 hover:text-sky-300 transition-colors"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleButtonClick(() => { setActiveModal('about'); setMobileMenuOpen(false); })}
              className="block w-full py-2 hover:text-sky-300 transition-colors"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleButtonClick(() => { setActiveModal('contact'); setMobileMenuOpen(false); })}
              className="block w-full py-2 hover:text-sky-300 transition-colors"
            >
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MAIN HERO TEXT & 3 PHOSPHOR ICONS (Clear high contrast in dark sky)
      ====================================================================== */}
      <main className="relative z-10 w-full max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6 text-center pt-1 sm:pt-4 my-auto">
        {/* Typing Headline with blinking cursor */}
        <h1 className="font-bold text-2xl sm:text-4xl md:text-[2.75rem] tracking-tight text-white leading-[1.25] min-h-[3rem] sm:min-h-[4rem]">
          <span>{displayedLine1}</span>
          <br />
          <span className="text-[#38bdf8]">{displayedLine2}</span>
          {!isTypingDone && (
            <span className="inline-block w-2 sm:w-2.5 h-6 sm:h-8 ml-1 bg-sky-400 animate-pulse align-middle" />
          )}
        </h1>

        {/* Grounding Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2.5 sm:mt-4 max-w-lg mx-auto text-[10px] sm:text-xs text-slate-300 leading-relaxed font-normal"
        >
          In the rush of digital life, imagine a space that feels like a deep breath
          — gentle and grounding. Here, you can reflect, create, or simply be,
          with tools to reconnect with your inner stillness.
        </motion.p>

        {/* 3 Floating Focus Points (3 neat balanced columns on mobile & desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 sm:mt-7 grid grid-cols-3 gap-2 sm:gap-6 max-w-xl mx-auto"
        >
          {/* Item 1: Mindful Tools */}
          <div
            onClick={openFeaturesModal}
            className="flex flex-col items-center text-center cursor-pointer group p-1 sm:p-0 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-amber-400/10 text-amber-400 mb-1 group-hover:scale-110 transition-transform">
              <Brain size={16} weight="duotone" className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <h3 className="font-bold text-[10px] sm:text-xs text-white group-hover:text-amber-300 transition-colors leading-tight">
              Mindful Tools
            </h3>
            <p className="mt-0.5 sm:mt-1 text-[9px] sm:text-[11px] text-slate-400 leading-tight sm:leading-normal">
              Habits for well-being.
            </p>
          </div>

          {/* Item 2: Creative Space */}
          <div
            onClick={openFeaturesModal}
            className="flex flex-col items-center text-center cursor-pointer group p-1 sm:p-0 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-sky-400/10 text-sky-400 mb-1 group-hover:scale-110 transition-transform">
              <Sparkle size={16} weight="duotone" className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <h3 className="font-bold text-[10px] sm:text-xs text-white group-hover:text-sky-300 transition-colors leading-tight">
              Creative Space
            </h3>
            <p className="mt-0.5 sm:mt-1 text-[9px] sm:text-[11px] text-slate-400 leading-tight sm:leading-normal">
              Private sanctuary.
            </p>
          </div>

          {/* Item 3: Gentle Reminders */}
          <div
            onClick={openFeaturesModal}
            className="flex flex-col items-center text-center cursor-pointer group p-1 sm:p-0 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-emerald-400/10 text-emerald-400 mb-1 group-hover:scale-110 transition-transform">
              <Plant size={16} weight="duotone" className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <h3 className="font-bold text-[10px] sm:text-xs text-white group-hover:text-emerald-300 transition-colors leading-tight">
              Gentle Reminders
            </h3>
            <p className="mt-0.5 sm:mt-1 text-[9px] sm:text-[11px] text-slate-400 leading-tight sm:leading-normal">
              Clarity every day.
            </p>
          </div>
        </motion.div>

        {/* Dual Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-5 sm:mt-7 flex items-center justify-center gap-2.5 sm:gap-3"
        >
          <button
            type="button"
            onClick={() => handleButtonClick(() => setActiveModal('contact'))}
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer bg-[#ef5d52] hover:bg-[#df4f44] hover:shadow-[0_6px_18px_rgba(239,93,82,0.45)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Your Journey</span>
            <ArrowRight size={13} weight="bold" />
          </button>

          <button
            type="button"
            onClick={openFeaturesModal}
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[#d6e3f0] hover:text-white font-bold text-xs sm:text-sm cursor-pointer bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Features</span>
          </button>
        </motion.div>
      </main>

      {/* =====================================================================
          BOTTOM FOOTER (Discreet copyright & social pills that trigger Mario Death)
      ====================================================================== */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
        <div>
          <span>© {new Date().getFullYear()} {SITE_INFO.fullName}</span>
        </div>

        {/* Social Icons (Trigger Super Mario death jingle + funny modal error) */}
        <div className="flex items-center gap-3">
          <a
            href="#social-x"
            onClick={handleSocialClick}
            aria-label="X (Twitter)"
            className="hover:text-white transition-colors cursor-pointer"
            title="X Profile"
          >
            <XLogo size={14} />
          </a>
          <a
            href="#social-instagram"
            onClick={handleSocialClick}
            aria-label="Instagram"
            className="hover:text-rose-400 transition-colors cursor-pointer"
            title="Instagram"
          >
            <InstagramLogo size={14} />
          </a>
          <a
            href="#social-facebook"
            onClick={handleSocialClick}
            aria-label="Facebook"
            className="hover:text-sky-400 transition-colors cursor-pointer"
            title="Facebook"
          >
            <FacebookLogo size={14} />
          </a>
          <a
            href="#social-reddit"
            onClick={handleSocialClick}
            aria-label="Reddit"
            className="hover:text-amber-400 transition-colors cursor-pointer"
            title="Reddit"
          >
            <RedditLogo size={14} />
          </a>
        </div>
      </footer>

      {/* =====================================================================
          MODAL OVERLAYS
      ====================================================================== */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md"
            onClick={() => handleButtonClick(() => setActiveModal('none'))}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-[#0c121e] border border-white/10 p-6 sm:p-7 shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => handleButtonClick(() => setActiveModal('none'))}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X size={15} />
              </button>

              {/* MODAL 1: FEATURES -> ( x _ x ) DEAD ERROR TEXT EMOJI STATE */}
              {activeModal === 'features' && (
                <div className="text-center py-4 space-y-4">
                  <div className="text-4xl sm:text-5xl font-mono text-rose-400 tracking-wider animate-pulse">
                    ( x _ x )
                  </div>

                  <div>
                    <h2 className="font-bold text-xl text-white">
                      Oops! No Features Yet
                    </h2>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      We don&rsquo;t actually have &ldquo;features&rdquo; built yet... It&rsquo;s just a cozy
                      aesthetic landing page for now! x_x
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-400 leading-relaxed text-left">
                    💡 <strong>Need an app or website built?</strong><br />
                    I can help you build your custom mobile app, website, or software project. Hit the button below and let&rsquo;s talk!
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleButtonClick(() => setActiveModal('contact'))}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-white font-bold text-xs bg-[#ef5d52] hover:bg-[#df4f44] transition-colors cursor-pointer shadow-md"
                    >
                      <span>Take Me To Contact</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleButtonClick(() => setActiveModal('none'))}
                      className="py-2.5 px-4 rounded-full text-slate-300 hover:text-white font-bold text-xs bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                    >
                      Close (x_x)
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL 2: ABOUT -> CASUAL PERSONAL MAKER TONE (NOT FORMAL BIG TECH) */}
              {activeModal === 'about' && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest">
                      Hey there! 👋
                    </span>
                    <h2 className="font-bold text-xl text-white mt-0.5">
                      About AINXE Studios
                    </h2>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    No formal big-tech corporate talk here! I&rsquo;m building <strong>AINXE</strong> as my personal project
                    playground to craft clean software, quiet websites, and focused apps.
                  </p>

                  <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-200 leading-relaxed">
                    ✨ <strong>Do you have a project, app, or website to build?</strong><br />
                    I can definitely help you design and build that (with money, hehe 😉).
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Whether you need a custom web platform, a mobile app, or backend tooling — let&rsquo;s connect and make it happen.
                  </p>

                  <button
                    type="button"
                    onClick={() => handleButtonClick(() => setActiveModal('contact'))}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-white font-bold text-xs bg-[#ef5d52] hover:bg-[#df4f44] transition-colors cursor-pointer shadow-md mt-2"
                  >
                    <span>Let&rsquo;s Build Something →</span>
                  </button>
                </div>
              )}

              {/* MODAL 3: CONTACT / INQUIRY */}
              {activeModal === 'contact' && (
                <div>
                  {inquirySent ? (
                    <div className="py-5 text-center space-y-3">
                      <CheckCircle size={36} weight="duotone" className="text-emerald-400 mx-auto" />
                      <h3 className="font-bold text-lg text-white">
                        Message Sent! 🎉
                      </h3>
                      <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                        Got your note! I&rsquo;ll review your {inquiryType} project and reply directly to{' '}
                        <strong className="text-white">{clientEmail}</strong> soon.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setInquirySent(false);
                          setClientEmail('');
                          setProjectBrief('');
                          setActiveModal('none');
                        }}
                        className="mt-3 px-5 py-2 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                      <div>
                        <span className="text-[10px] text-sky-400 uppercase tracking-widest">
                          Let&rsquo;s Talk
                        </span>
                        <h2 className="font-bold text-xl text-white mt-0.5">
                          Start Your Journey
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                          Have an app or site to build? Drop your brief below!
                        </p>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                          What are you building?
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['App', 'Website', 'Software'] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => { sounds.playButtonTap(); setInquiryType(t); }}
                              className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                inquiryType === t
                                  ? 'bg-[#ef5d52] text-white shadow-sm'
                                  : 'bg-white/5 text-slate-400 hover:text-white'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="your-email@gmail.com"
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                          Project Brief
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={projectBrief}
                          onChange={(e) => setProjectBrief(e.target.value)}
                          placeholder="Tell me what you're thinking, features, or timeline..."
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-sky-400 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-white font-bold text-xs bg-[#ef5d52] hover:bg-[#df4f44] transition-colors cursor-pointer shadow-md"
                      >
                        <PaperPlaneRight size={13} weight="fill" />
                        <span>Send Project Note</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* MODAL 4: SUPER MARIO GAME OVER SOCIAL ERROR */}
              {activeModal === 'socialError' && (
                <div className="text-center py-4 space-y-4">
                  {/* Retro 8-bit Banner */}
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl">💀 🍄 💀</div>
                    <div className="font-bold text-xl sm:text-2xl text-rose-400 tracking-widest font-mono uppercase">
                      GAME OVER!
                    </div>
                  </div>

                  <div className="text-3xl font-mono text-amber-300">
                    ( x _ x )
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-white">
                      Oops! Mario Lost a Life...
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                      Sorry! The developer doesn&rsquo;t actually use social media. Just coding in peace by the lake! hehe x_x
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 leading-relaxed text-left">
                    👾 <strong>Want to talk about your project?</strong><br />
                    No DMs or algorithms needed — just send a direct note through the Contact button!
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleButtonClick(() => setActiveModal('contact'))}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-white font-bold text-xs bg-[#ef5d52] hover:bg-[#df4f44] transition-colors cursor-pointer shadow-md"
                    >
                      <span>Go To Contact</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleButtonClick(() => setActiveModal('none'))}
                      className="py-2.5 px-4 rounded-full text-slate-300 hover:text-white font-bold text-xs bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                    >
                      Revive (🍄)
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

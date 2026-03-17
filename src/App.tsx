/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useVelocity,
} from 'framer-motion';
import {
  Trophy,
  Target,
  Leaf,
  Zap,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  Twitter,
  Linkedin,
  Instagram,
  Users,
  Award,
  Clock,
  Sparkles,
  Info,
  Code,
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import DisplayCards from '@/components/ui/display-cards';
import RadialOrbitalTimeline, { type TimelineItem } from '@/components/ui/radial-orbital-timeline';
import { cn } from '@/lib/utils';
import { ShinyButton } from '@/components/ui/shiny-button';

// ─── Constants ────────────────────────────────────────────────────────────────
const DEADLINE = new Date('2026-04-02T11:59:00+05:30');
const REGISTER_URL =
  'https://unstop.com/o/ofngWUm?lb=W667U8HG&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Rathash2878';
const NAV_LINKS = ['About', 'Tracks', 'Timeline', 'Sponsors'] as const;

export const TRACK_DETAILS = [
  {
    title: "TigerGraph Track",
    subtitle: "Build Cool Projects with Graphs!",
    icon: Trophy,
    color: "#22C55E",
    shortDesc: "Build solutions using TigerGraph MCP and related tech.",
    content: (
      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
        <p>Hey hackers! For this track, build your project using TigerGraph as the main database. It is a graph database, which means it is super good at finding connections between things fast. You can use the free Community Edition or TigerGraph Savanna to start right away without paying anything.</p>
        <p className="font-semibold text-accent p-3 bg-accent/10 rounded-lg border border-accent/20">Pro Tip: The best and easiest way is to connect TigerGraph MCP to your Cursor editor or any code editor you like, then you can try queries and build stuff super quick.</p>
        <p>Your project can be about AI projects, recommendation systems, fraud detection, cybersecurity, threat detection, or any other AI idea where graph databases help a lot. You have full freedom of ideas - just make sure TigerGraph is the key part that powers how your project finds patterns, links data, or makes smart decisions. Graphs shine for things like following money trails, matching people to products, or spotting dangers in networks.</p>
        <h4 className="text-text-primary font-bold mt-4 mb-2">Example Ideas:</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Fraud detection:</strong> Build a system that maps money transactions as a graph to find strange paths or groups of bad activity.</li>
          <li><strong>Recommendation systems:</strong> Connect users, their likes, friends, and items in a graph to suggest perfect next things.</li>
          <li><strong>Cybersecurity or threat detection:</strong> Create a tool that tracks weak spots, attacks, or hacker paths.</li>
          <li><strong>AI agents:</strong> Make smart AI that uses the graph for memory and thinking.</li>
          <li><strong>Open Innovation:</strong> Got your own crazy idea? Go for it! As long as you use TigerGraph as the core graph database.</li>
        </ul>
        <p>Focus on making something that works well, looks good in a demo, and uses graph databases smartly. Top projects win big prizes!</p>
      </div>
    )
  },
  {
    title: "Hack 'N' Solve",
    subtitle: "Open Innovation",
    icon: Target,
    color: "#3B82F6",
    shortDesc: "Solve real-world challenges across FinTech, HealthTech, AI, Web3, and more.",
    content: (
      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
        <h4 className="text-lg font-bold text-text-primary">Your Canvas, Your Rules</h4>
        <p>This track is designed for builders who want to tackle real problems without restrictive boundaries. Whether you are passionate about revolutionizing healthcare, optimizing finance, or pushing the limits of artificial intelligence, this is where your best ideas take shape. We are looking for functional prototypes that provide genuine value.</p>
        <h4 className="text-lg font-bold text-text-primary mt-6">Explore the Domains</h4>
        <ul className="space-y-3">
          <li><strong className="text-white">HealthTech:</strong> Build accessible solutions like assistive medical hardware, patient care platforms, or secure diagnostic tools.</li>
          <li><strong className="text-white">Artificial Intelligence:</strong> Go beyond basic API wrappers. Think about building local-first reasoning engines, advanced video intelligence platforms, or models that run privately on local devices.</li>
          <li><strong className="text-white">Web3 & Privacy:</strong> Create decentralized applications, zero-cloud architectures, or secure protocols that prioritize user ownership and data privacy.</li>
          <li><strong className="text-white">FinTech:</strong> Develop platforms for financial inclusion, smart budgeting algorithms, or transparent transaction systems.</li>
        </ul>
        <h4 className="text-lg font-bold text-text-primary mt-6">What the Judges Want</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Real-World Impact:</strong> Does this solve a pressing problem for a specific group of people?</li>
          <li><strong>Technical Depth:</strong> Is the backend architecture robust and well thought out?</li>
          <li><strong>Execution:</strong> Does the deployed demo actually work as intended during the pitch?</li>
          <li><strong>Business Viability:</strong> Could this project scale into a real startup venture?</li>
        </ul>
        <p className="mt-4 p-4 bg-surface rounded-xl border border-border"><strong>The Rewards:</strong> The competition is fierce. The top three teams that bring the most innovative and technically sound projects to the Grand Finale at IIT Delhi will take home the 1st, 2nd, and 3rd place cash prizes.</p>
      </div>
    )
  },
  {
    title: "Sustainability Track",
    subtitle: "Building for Impact",
    icon: Leaf,
    color: "#F59E0B",
    shortDesc: "Powered by Rotaract Club — build tech for environmental and social impact.",
    content: (
      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
        <p>Powered by the <strong>Rotaract Club IGDTUW</strong>, this track focuses on using technology to create tangible environmental and social change. We want to see projects that tackle climate, community, and resource challenges head on.</p>
        <h4 className="text-lg font-bold text-text-primary mt-6">Explore the Domains</h4>
        <p>Think about how your tech can serve the planet and its people.</p>
        <ul className="space-y-3">
          <li><strong className="text-white">Resource Optimization:</strong> Build systems that monitor energy consumption or manage water distribution efficiently.</li>
          <li><strong className="text-white">Future of Food:</strong> Develop computational models to map sustainable alternative ingredients or optimize agricultural supply chains to reduce waste.</li>
          <li><strong className="text-white">Social Equity:</strong> Create platforms that improve access to education, community resources, or disaster response networks.</li>
        </ul>
        <h4 className="text-lg font-bold text-text-primary mt-6">What the Judges Want</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Measurable Impact:</strong> Can you quantify how your solution helps the environment or society?</li>
          <li><strong>Practicality:</strong> Is the project feasible to deploy in the real world?</li>
          <li><strong>Innovative Approach:</strong> Are you using technology in a new way to solve an old problem?</li>
        </ul>
      </div>
    )
  },
  {
    title: "Duality Track",
    subtitle: "Bridging the Gap",
    icon: Zap,
    color: "#EC4899",
    shortDesc: "Combine two distinct fields of tech or science to build something entirely new.",
    content: (
      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
        <p>This track is all about interdisciplinary innovation. It challenges you to combine two distinct fields of technology or science to build something entirely new. We are looking for teams that can step outside traditional boundaries.</p>
        <h4 className="text-lg font-bold text-text-primary mt-6">Explore the Domains</h4>
        <p>Combine different disciplines to create a hybrid solution.</p>
        <ul className="space-y-3">
          <li><strong className="text-white">Hardware and Software:</strong> Bridge the physical and digital worlds. Try building custom hardware architectures or integrating physical sensors with local reasoning engines to process data securely.</li>
          <li><strong className="text-white">Biology and Computing:</strong> Develop bioinformatics tools or create software that models complex biological processes.</li>
          <li><strong className="text-white">Design and Data:</strong> Fuse creative arts with deep technical data analysis to build immersive, interactive experiences.</li>
        </ul>
        <h4 className="text-lg font-bold text-text-primary mt-6">What the Judges Want</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>True Integration:</strong> Does the project genuinely blend two disciplines, or is one just an afterthought?</li>
          <li><strong>Technical Complexity:</strong> How well did you execute the integration of different tech stacks or concepts?</li>
          <li><strong>Creativity:</strong> Is the idea novel and unexpected?</li>
        </ul>
        <p className="mt-4 p-4 bg-surface rounded-xl border border-border"><strong>The Next Steps:</strong> Just like the main open innovation track, the top teams from both Sustainability and Duality will secure their spot to pitch live at the Grand Finale at IIT Delhi on April 12.</p>
      </div>
    )
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: "Registration Deadline",
    date: "2 April 2026 · 11:59 AM IST",
    content: "Register at Unstop before the deadline to secure your spot.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 50,
  },
  {
    id: 2,
    title: "Hack 'N' Solve Round",
    date: "3–4 April 2026",
    content: "Teams submit their projects via Unstop — 36 hours of building.",
    category: "Development",
    icon: Code,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 20,
  },
  {
    id: 3,
    title: "Mentorship Round",
    date: "5–7 April 2026",
    content: "Shortlisted teams receive expert mentorship to polish their solutions.",
    category: "Mentorship",
    icon: Users,
    relatedIds: [2, 4],
    status: "pending",
    energy: 10,
  },
  {
    id: 4,
    title: "Grand Finale at IIT Delhi",
    date: "12 April 2026 · 11:00 AM – 6:00 PM IST",
    content: "The best teams pitch live on stage at IIT Delhi.",
    category: "Finals",
    icon: Trophy,
    relatedIds: [3, 5],
    status: "pending",
    energy: 1,
  },
  {
    id: 5,
    title: "Winners Announcement",
    date: "12 April 2026 · 6:00 PM IST",
    content: "The moment of glory — winners revealed and prizes distributed.",
    category: "Awards",
    icon: Award,
    relatedIds: [4],
    status: "pending",
    energy: 0,
  },
];

// ─── Scroll threshold: how many px to scroll before deer finishes shrinking ────
const SHRINK_DISTANCE = 500;

// ─── Countdown Timer ──────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
    };
  }, [target]);

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(id);
  }, [calc]);
  return time;
}

function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-tile">
      <span className="text-4xl md:text-5xl font-bold text-text-primary tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
}

// ─── Fullscreen Deer Intro + Scroll-shrink to Navbar ─────────────────────────
/**
 * Deer starts FULLSCREEN (fixed, covers entire viewport).
 * As scrollY goes 0 → SHRINK_DISTANCE:
 *  - Numeric width/top/left px values animate so framer-motion can interpolate
 *  - color image fades out, outline image fades in (for navbar logo)
 *  - background overlay fades from dark to transparent
 */
const DeerScrollLogo = () => {
  const { scrollY } = useScroll();

  // Viewport size measured on mount (for numeric interpolation)
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 900);

  useEffect(() => {
    const handleResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Largest square that fits in the viewport — lets the portrait deer show fully
  const startSize = Math.min(vw, vh) * 0.92;
  // Center the square in the viewport
  const startTop  = (vh - startSize) / 2;
  const startLeft = (vw - startSize) / 2;

  const LOGO_SIZE = 36;
  const LOGO_TOP  = 14;
  const LOGO_LEFT = 56;   // inside the floating navbar pill

  const smoothScrollY = useSpring(scrollY, { stiffness: 55, damping: 18 });

  // Start: centered square that fits the viewport. End: tiny navbar logo.
  const deerWidth  = useTransform(smoothScrollY, [0, SHRINK_DISTANCE], [startSize, LOGO_SIZE]);
  const deerHeight = useTransform(smoothScrollY, [0, SHRINK_DISTANCE], [startSize, LOGO_SIZE]);
  const deerTop    = useTransform(smoothScrollY, [0, SHRINK_DISTANCE], [startTop,  LOGO_TOP]);
  const deerLeft   = useTransform(smoothScrollY, [0, SHRINK_DISTANCE], [startLeft, LOGO_LEFT]);
  const deerRadius = useTransform(smoothScrollY, [0, SHRINK_DISTANCE], [16, 8]);

  // Color → outline crossfade
  const colorOpacity   = useTransform(smoothScrollY, [SHRINK_DISTANCE * 0.3, SHRINK_DISTANCE * 0.75], [1, 0]);
  const outlineOpacity = useTransform(smoothScrollY, [SHRINK_DISTANCE * 0.55, SHRINK_DISTANCE * 0.9], [0, 1]);

  // Dark background overlay fades away
  const overlayOpacity = useTransform(smoothScrollY, [0, SHRINK_DISTANCE * 0.7], [0.97, 0]);
  const overlayPointerEvents = useTransform(scrollY, (v) => (v > SHRINK_DISTANCE * 0.95 ? 'none' : 'all'));

  // Scroll hint
  const scrollHintOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <>
      {/* Full-page dark overlay — fades out revealing content */}
      <motion.div
        className="fixed inset-0 bg-background pointer-events-none"
        style={{ opacity: overlayOpacity, zIndex: 55 }}
      />

      {/* Deer container: starts fullscreen (100vw x 100vh), shrinks to navbar logo */}
      <motion.div
        className="fixed overflow-hidden pointer-events-none"
        style={{
          zIndex: 60,
          width: deerWidth,
          height: deerHeight,
          top: deerTop,
          left: deerLeft,
          borderRadius: deerRadius,
        }}
      >
        {/* Full-color mechanical deer — object-contain shows the FULL portrait
            deer (face + antlers + body). Container bg is dark so pillarbox
            areas blend with the dark overlay behind. */}
        <motion.img
          src="/deer-mechanical.png"
          alt="DevCation Mascot"
          draggable={false}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: colorOpacity,
            objectFit: 'contain',
            objectPosition: 'center center',
          }}
        />
        {/* Subtle vignette inside the container for depth */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: colorOpacity,
            background:
              'radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(5,5,5,0.6) 100%)',
          }}
        />
        {/* Geometric outline — inverted so lines are white, screen blend drops black background */}
        <motion.img
          src="/deer-outline.png"
          alt="DevCation Logo"
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity: outlineOpacity, filter: 'invert(1)', mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* "Scroll to explore" hint — z-65 so it's above everything */}
      <motion.div
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: scrollHintOpacity, zIndex: 65 }}
      >
        <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ${
        scrolled
          ? 'top-3 left-4 right-4 glass-nav rounded-2xl px-5 py-3'
          : 'top-0 left-0 right-0 bg-transparent px-6 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo area — deer outline lands here via DeerScrollLogo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          aria-label="DevCation home"
        >
          {/* Invisible placeholder — real deer logo is positioned here by DeerScrollLogo */}
          <div className="w-10 h-10 opacity-0 pointer-events-none" aria-hidden />
          <span className="text-xl font-bold font-heading tracking-tight text-text-primary group-hover:text-accent transition-colors duration-200">
            DEV<span className="text-accent">CATION</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex space-x-1 items-center">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.toLowerCase()
                  ? 'text-accent bg-accent/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
              }`}
            >
              {item}
            </a>
          ))}
          <ShinyButton
            onClick={() => window.open(REGISTER_URL, '_blank')}
            className="ml-4 py-2 bg-accent text-white text-sm font-semibold hover:bg-accent-dim cursor-pointer"
          >
            Register
          </ShinyButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-surface/50 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 glass-nav rounded-2xl flex flex-col p-4 space-y-1 md:hidden"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-all duration-200"
              >
                {item}
              </a>
            ))}
            <ShinyButton
              onClick={() => { setIsOpen(false); window.open(REGISTER_URL, '_blank'); }}
              className="mt-2 w-full py-3 bg-accent text-white hover:bg-accent-dim cursor-pointer"
            >
              Register
            </ShinyButton>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── Section Heading ──────────────────────────────────────────────────────────
const SectionHeading = ({
  children,
  centered = true,
  subtitle,
}: {
  children: React.ReactNode;
  centered?: boolean;
  subtitle?: string;
}) => (
  <div className={centered ? 'text-center' : ''}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-text-secondary text-lg mb-12"
      >
        {subtitle}
      </motion.p>
    )}
    {!subtitle && <div className="mb-12" />}
  </div>
);

// ─── Timeline Item ────────────────────────────────────────────────────────────
const TimelineItem = ({
  date,
  title,
  description,
  progress,
  index,
  step,
}: {
  date: string;
  title: string;
  description: string;
  progress: number;
  index: number;
  step: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-12 pb-12 last:pb-0"
  >
    {index < 4 && <div className="absolute left-[19px] top-8 bottom-0 w-px bg-border" />}
    <div
      className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-heading border-2 transition-colors duration-300"
      style={
        progress > 0
          ? { background: 'rgba(34,197,94,0.15)', borderColor: '#22C55E', color: '#22C55E' }
          : { background: 'rgba(30,41,59,0.8)', borderColor: '#334155', color: '#64748B' }
      }
    >
      {step}
    </div>
    <div className="glass-card p-6">
      <div className="text-accent font-mono text-xs font-semibold mb-2 uppercase tracking-wider">
        {date}
      </div>
      <h3 className="text-lg font-bold mb-2 font-heading">{title}</h3>
      <p className="text-text-secondary text-sm mb-4 leading-relaxed">{description}</p>
      {progress > 0 && (
        <>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-accent"
            />
          </div>
          <div className="text-right text-xs text-text-muted mt-1">{progress}% complete</div>
        </>
      )}
    </div>
  </motion.div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 list-none cursor-default group"
  >
    <GlowingEffect
      spread={40}
      glow={true}
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={3}
    />
    <div className="relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-[0.75px] bg-background/50 p-6 shadow-sm backdrop-blur-sm transition-colors duration-300 md:p-8">
      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <div className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-1">{value}</div>
      <div className="text-text-secondary text-sm font-medium">{label}</div>
    </div>
  </motion.div>
);

// ─── Back to Top ──────────────────────────────────────────────────────────────
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg hover:bg-accent-dim transition-all duration-200 cursor-pointer"
          style={{ boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ─── Track Modal ──────────────────────────────────────────────────────────────
const TrackModal = ({ trackIndex, onClose }: { trackIndex: number | null, onClose: () => void }) => {
  if (trackIndex === null) return null;
  const track = TRACK_DETAILS[trackIndex];
  const Icon = track.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card border-[0.75px] border-border shadow-2xl rounded-2xl md:rounded-[2rem] bg-background/95"
          style={{ boxShadow: `0 0 80px ${track.color}15` }}
        >
          <div className="sticky top-0 bg-background/90 backdrop-blur-xl border-b border-border p-6 md:px-8 z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
                style={{ background: `${track.color}15`, border: `1px solid ${track.color}30` }}
              >
                <Icon className="w-6 h-6" style={{ color: track.color }} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-text-primary leading-tight">{track.title}</h2>
                <div className="text-sm font-semibold mt-1" style={{ color: track.color }}>{track.subtitle}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface/80 transition-colors bg-surface/40 text-text-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 md:p-8">
            {track.content}
          </div>
          
          <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent p-6 md:px-8 border-t border-border/50 text-center">
             <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-semibold hover:border-accent/40 hover:text-white transition-all bg-surface/50">
               Close Details
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const countdown = useCountdown(DEADLINE);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  // Inject CSS directly into ElevenLabs Shadow DOM to force transparency
  useEffect(() => {
    const injectStyles = () => {
      const widget = document.querySelector('elevenlabs-convai');
      if (widget && widget.shadowRoot) {
        // If we haven't already injected our custom style block
        if (!widget.shadowRoot.querySelector('#devcation-widget-override')) {
          const style = document.createElement('style');
          style.id = 'devcation-widget-override';
          style.textContent = `
            [class*="_container_"], [class*="_wrapper_"] {
              background: transparent !important;
              box-shadow: none !important;
              border: none !important;
            }
            [class*="_text_"], [class*="_btn_"] {
              display: none !important;
            }
          `;
          widget.shadowRoot.appendChild(style);
        }
      }
    };

    // Poll for the widget shadow root to initialize (since it mounts asynchronously)
    const intervalId = setInterval(injectStyles, 500);
    // Cleanup interval after 10 seconds to save resources
    setTimeout(() => clearInterval(intervalId), 10000);

    return () => clearInterval(intervalId);
  }, []);

  // Page content fades in as deer shrinks
  const contentOpacity = useTransform(scrollY, [SHRINK_DISTANCE * 0.4, SHRINK_DISTANCE * 0.9], [0, 1]);
  const contentY = useTransform(scrollY, [SHRINK_DISTANCE * 0.4, SHRINK_DISTANCE * 0.9], [50, 0]);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[70] origin-left"
        style={{ scaleX }}
      />

      {/* Scroll-driven deer animation */}
      <DeerScrollLogo />

      <Navbar />
      <BackToTop />

      {/*
        Spacer = SHRINK_DISTANCE so the deer has room to animate before page content appears.
        This is the "scroll height" allocated to the deer intro transition.
      */}
      <div style={{ height: SHRINK_DISTANCE }} aria-hidden />

      {/* All real page content fades in as the deer shrinks */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }}>

        {/* ── Hero / Landing ────────────────────────────────────── */}
        <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-30 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] -z-10 bg-accent/5 blur-[120px] rounded-full" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <span className="stat-badge">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block" />
                Registrations open till 2 Apr
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-7xl md:text-9xl font-bold font-heading tracking-tight"
            >
              DEV<span className="text-gradient">CATION</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Empowering the next generation of innovators at IIT Delhi.
            </motion.p>

            {/* Stat badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {[
                { icon: Award,  text: '₹3,00,000 Prize Pool' },
                { icon: Target, text: '4 Tracks' },
                { icon: MapPin, text: 'IIT Delhi Finale' },
                { icon: Users,  text: 'IGDTUW × IIT Delhi' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="stat-badge">
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </span>
              ))}
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Registration closes in
              </p>
              <div className="flex items-center justify-center gap-3">
                <CountdownTile value={countdown.days}    label="Days" />
                <span className="text-3xl font-bold text-accent-dim pb-4">:</span>
                <CountdownTile value={countdown.hours}   label="Hours" />
                <span className="text-3xl font-bold text-accent-dim pb-4">:</span>
                <CountdownTile value={countdown.minutes} label="Mins" />
                <span className="text-3xl font-bold text-accent-dim pb-4">:</span>
                <CountdownTile value={countdown.seconds} label="Secs" />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center justify-center gap-6"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ShinyButton
                  onClick={() => window.open(REGISTER_URL, '_blank')}
                  className="px-8 py-4 bg-accent text-white font-bold text-base hover:bg-accent-dim"
                >
                  Register
                </ShinyButton>
                <a
                  href="#about"
                  className="px-8 py-4 rounded-xl border border-border text-text-secondary font-semibold text-base hover:border-accent/40 hover:text-text-primary hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  Learn More
                </a>
              </div>

              {/* Organiser logo */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/gdg-logo.png"
                  alt="GDG Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="text-text-muted text-xs font-semibold uppercase tracking-widest">
                  IGDTUW x IITD
                </span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── GDG / Organisers ──────────────────────────────────── */}
        <section className="py-12 border-y border-border bg-surface/20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
            >
              <img
                src="/gdg-logo.png"
                alt="GDG IGDTUW"
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://www.gstatic.com/devrel-devsite/prod/v20240321-01/developers/images/touchicon-180.png';
                }}
              />
                <img
                  src="/rotaract-logo.png"
                  alt="Rotaract Club IGDTUW"
                  className="h-12 object-contain bg-white rounded-md p-1 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <span className="text-border text-2xl font-light hidden sm:block">×</span>
                <img
                  src="/tigergraph-logo.png"
                  alt="TigerGraph"
                  className="h-12 object-contain bg-white rounded-md p-1 grayscale hover:grayscale-0 transition-all duration-300"
                />
            </motion.div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────────────────── */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] -z-10 opacity-15">
            <div className="absolute inset-0 bg-accent rounded-full blur-[120px]" />
          </div>
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <SectionHeading subtitle="Where ideas become impact.">DEVCATION 2026</SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl leading-relaxed text-text-secondary max-w-3xl mx-auto"
            >
              Devcation Delhi 2026 is the flagship hackathon organized by Google Developer Groups IGDTUW
              in collaboration with GDG IIT Delhi. Through talks, workshops, mentorship, and intense
              hacking, participants will build impactful solutions and showcase them at the Grand Finale
              at IIT Delhi.
            </motion.p>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard icon={Award}    value="₹3L+"   label="Total Prize Pool" delay={0.1} />
              <StatCard icon={Target}   value="4"      label="Hack Tracks"      delay={0.2} />
              <StatCard icon={Calendar} value="Apr 12" label="Grand Finale"     delay={0.3} />
            </div>
          </div>
        </section>

        {/* ── Tracks ────────────────────────────────────────────── */}
        <section id="tracks" className="py-32 bg-surface/20 relative overflow-hidden">
          {/* subtle glow behind tracks */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] -z-10 opacity-10">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-[140px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading subtitle="Click a track to explore the domains.">CHOOSE YOUR BATTLEGROUND</SectionHeading>
            
            <div className="flex w-full items-center justify-center py-10 md:py-20 min-h-[400px]">
              <DisplayCards
                cards={TRACK_DETAILS.map((track, i) => {
                  const offsets = [
                    "translate-x-[0%] translate-y-[0%]",
                    "translate-x-[35%] translate-y-[35%] sm:translate-x-[40%] sm:translate-y-[40%]",
                    "translate-x-[70%] translate-y-[70%] sm:translate-x-[80%] sm:translate-y-[80%]",
                    "translate-x-[105%] translate-y-[105%] sm:translate-x-[120%] sm:translate-y-[120%]"
                  ];
                  return {
                    title: track.title,
                    description: track.shortDesc,
                    date: "Click to Read Rules",
                    icon: <track.icon className="size-5" style={{ color: track.color }} />,
                    iconClassName: "bg-surface border border-border/50",
                    titleClassName: "text-text-primary",
                    className: `[grid-area:stack] ${offsets[i]} hover:scale-105 hover:z-50 border-[1px] dark:border-white/20 dark:bg-slate-900/90 shadow-2xl before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/20 grayscale-[30%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 h-40 w-[18rem] sm:h-44 sm:w-[24rem] transition-all duration-500 ease-out origin-top-left`,
                    onClick: () => setSelectedTrack(i)
                  }
                }).reverse()} // reverse so 1st item renders last and stays on top inherently
              />
            </div>
          </div>
        </section>

        <TrackModal trackIndex={selectedTrack} onClose={() => setSelectedTrack(null)} />

        {/* ── Timeline ──────────────────────────────────────────── */}
        <section id="timeline" className="py-24 relative overflow-hidden bg-black">
          {/* Timeline header */}
          <div className="max-w-7xl mx-auto px-6 mb-12 relative z-20">
            <SectionHeading subtitle="Click nodes to expand your journey.">ORBITAL TIMELINE</SectionHeading>
          </div>
          <RadialOrbitalTimeline timelineData={TIMELINE_DATA} />
        </section>

        {/* ── Prizes & Sponsors ─────────────────────────────────── */}
        <section id="sponsors" className="py-24 bg-surface/20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-4">Total Prize Pool</p>
              <h2 className="text-8xl md:text-[10rem] font-bold font-heading tracking-tight text-gradient leading-none">
                ₹3,00,000
              </h2>
              <p className="text-text-secondary mt-4 text-lg">in cash prizes and exclusive rewards</p>
            </motion.div>

            <SectionHeading subtitle="With the support of our partners.">OUR SPONSORS</SectionHeading>

            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-3 cursor-pointer">
                <img src="/gdg-logo.png" alt="GDG" className="h-16 grayscale hover:grayscale-0 transition-all duration-300" referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = 'https://www.gstatic.com/devrel-devsite/prod/v20240321-01/developers/images/touchicon-180.png'; }} />
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">GDG IGDTUW</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center overflow-hidden p-2">
                  <img src="/rotaract-logo.png" alt="Rotaract Club" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Rotaract Club IGDTUW</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-2" style={{ border: '1px solid rgba(51,65,85,0.8)' }}>
                  <img src="/tigergraph-logo.png" alt="TigerGraph" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">TigerGraph</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-20 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] -z-10 bg-accent/6 blur-[150px] rounded-full" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="stat-badge mb-6 inline-flex">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block" />
                Limited Spots Available
              </span>
              <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight mt-4">
                Join the biggest hackathon<br />
                <span className="text-gradient">Delhi has ever seen.</span>
              </h2>
              <p className="text-text-secondary text-lg mb-12 max-w-2xl mx-auto">
                Build, compete, and showcase your ideas at IIT Delhi alongside the best developers in the country.
              </p>
              <div className="border-beam rounded-2xl p-px inline-block">
                <ShinyButton
                  onClick={() => window.open(REGISTER_URL, '_blank')}
                  className="px-12 py-5 bg-accent text-white font-bold text-xl inline-flex items-center gap-3 hover:bg-accent-dim"
                >
                  Register
                </ShinyButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────── */}
        <footer className="py-16 border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-bold font-heading mb-4 tracking-tight">
                  DEV<span className="text-accent">CATION</span>
                </h2>
                <p className="text-text-secondary text-sm max-w-md mb-8 leading-relaxed">
                  The flagship hackathon by GDG IGDTUW × GDG IIT Delhi. Innovate, collaborate, and build the future — right here in Delhi.
                </p>
                <div className="flex space-x-3">
                  {[
                    { icon: Twitter,   label: 'Twitter',   href: 'https://x.com/GDG_IGDTUW' },
                    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/gdg_igdtuw/' },
                    { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/dscigdtuw/?originalSubdomain=in' },
                    { icon: Mail,      label: 'Email',     href: 'mailto:dscigdtuw@gmail.com' },
                  ].map(({ icon: Icon, label, href }) => (
                    <a key={label} href={href} aria-label={label}
                      className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-200 cursor-pointer">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-text-primary">Contact</h4>
                <ul className="space-y-4 text-text-secondary text-sm">
                  <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-accent flex-shrink-0" /><a href="mailto:dscigdtuw@gmail.com" className="hover:text-text-primary transition-colors duration-200">dscigdtuw@gmail.com</a></li>
                  <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-accent flex-shrink-0" /><a href="tel:+919625580383" className="hover:text-text-primary transition-colors duration-200">+91 9625580383</a></li>
                  <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent flex-shrink-0" /><span>IIT Delhi, New Delhi</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-text-primary">Quick Links</h4>
                <ul className="space-y-3 text-text-secondary text-sm">
                  {[
                    { label: 'About',    href: '#about' },
                    { label: 'Tracks',   href: '#tracks' },
                    { label: 'Timeline', href: '#timeline' },
                    { label: 'Sponsors', href: '#sponsors' },
                    { label: 'Register', href: REGISTER_URL },
                  ].map(({ label, href }) => (
                    <li key={label}><a href={href} className="hover:text-text-primary transition-colors duration-200">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
              <p>© 2026 Devcation Delhi. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-text-secondary transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-text-secondary transition-colors duration-200">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </motion.div>{/* end contentOpacity wrapper */}
    </div>
  );
}

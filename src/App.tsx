/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
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
  X
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold font-heading tracking-tighter">
          DEVCATION
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {['About', 'Tracks', 'Timeline', 'Sponsors'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://unstop.com/o/ofngWUm?lb=W667U8HG&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Rathash2878"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-accent text-white text-sm font-semibold hover:scale-105 transition-transform"
          >
            Register Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass md:hidden flex flex-col p-6 space-y-4"
          >
            {['About', 'Tracks', 'Timeline', 'Sponsors'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium"
              >
                {item}
              </a>
            ))}
            <a 
              href="https://unstop.com/o/ofngWUm?lb=W667U8HG&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Rathash2878"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-accent text-center font-bold"
            >
              Register Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, centered = true }: { children: React.ReactNode, centered?: boolean }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`text-4xl md:text-6xl font-bold font-heading mb-12 tracking-tighter ${centered ? 'text-center' : ''}`}
  >
    {children}
  </motion.h2>
);

const TrackCard = ({ title, content, icon: Icon, delay }: { title: string, content: string, icon: any, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="glass-card p-8 flex flex-col h-full group cursor-pointer"
  >
    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/40 transition-colors">
      <Icon className="text-accent w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-4 font-heading">{title}</h3>
    <p className="text-text-secondary leading-relaxed flex-grow">{content}</p>
    <div className="mt-6 flex items-center text-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
      Learn More <ChevronRight className="w-4 h-4 ml-1" />
    </div>
  </motion.div>
);

const TimelineItem = ({ date, title, description, progress, index }: { date: string, title: string, description: string, progress: number, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-12 border-l border-border last:pb-0"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background" />
    <div className="glass-card p-6">
      <div className="text-accent font-mono text-sm mb-2">{date}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-accent"
        />
      </div>
      <div className="text-right text-xs text-text-secondary mt-1">{progress}% Complete</div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="w-full h-full"
          >
            <img 
              src="/deer-mechanical.png" 
              alt="Hero Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/cyber/1920/1080";
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
          >
            <h1 className="text-7xl md:text-9xl font-bold font-heading tracking-tighter flex items-center">
              DEVC
              <span className="inline-block w-24 md:w-48 h-24 md:h-48 mx-4 overflow-hidden rounded-2xl glass">
                 <img 
                  src="/deer-mechanical.png" 
                  alt="Logo Part" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/cyber/400/400";
                  }}
                />
              </span>
              ATION
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium"
          >
            Empowering the next generation of innovators at IIT Delhi.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <a 
              href="#about"
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform inline-block"
            >
              Explore Event
            </a>
          </motion.div>
        </div>

        {/* Parallax elements */}
        <motion.div 
          style={{ y: useSpring(scrollYProgress, { damping: 50, stiffness: 400 }) }}
          className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div 
          style={{ y: useSpring(scrollYProgress, { damping: 50, stiffness: 200 }) }}
          className="absolute top-40 right-20 w-64 h-64 rounded-full bg-accent-green/5 blur-3xl"
        />
      </section>

      {/* GDG Logo Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <img 
              src="/gdg-logo.png" 
              alt="GDG Logo" 
              className="h-24 mx-auto"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://www.gstatic.com/devrel-devsite/prod/v20240321-01/developers/images/touchicon-180.png";
              }}
            />
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold font-heading text-text-secondary"
          >
            IGDTUW x IITD
          </motion.h3>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <SectionHeading>DEVCATION</SectionHeading>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl leading-relaxed text-text-secondary"
          >
            Devcation Delhi 2026 is the flagship hackathon organized by Google Developer Groups IGDTUW in collaboration with GDG IIT Delhi. Through talks, workshops, mentorship, and intense hacking, participants will build impactful solutions and showcase them at the Grand Finale at IIT Delhi.
          </motion.p>
        </div>
        
        {/* Background Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>TRACKS</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TrackCard 
              title="TigerGraph Track" 
              content="An open innovation track where participants build solutions using TigerGraph MCP, and related technologies, competing for exclusive cash prizes."
              icon={Trophy}
              delay={0.1}
            />
            <TrackCard 
              title="Hack ‘N’ Solve" 
              content="Solve real-world challenges across domains like FinTech, HealthTech, AI, Web3, and more, with three winning teams (1st, 2nd, and 3rd place)."
              icon={Target}
              delay={0.2}
            />
            <TrackCard 
              title="Sustainability Track" 
              content="Powered by Rotaract Club IGDTUW, focusing on technology-driven solutions for environmental and social impact."
              icon={Leaf}
              delay={0.3}
            />
            <TrackCard 
              title="Duality Track" 
              content="Encouraging interdisciplinary and innovative tech approaches."
              icon={Zap}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading>TIMELINE</SectionHeading>
          <div className="mt-16">
            <TimelineItem 
              date="2 April 2026, 11:59 AM IST"
              title="Registration Deadline"
              description="Register at Unstop!"
              progress={50}
              index={0}
            />
            <TimelineItem 
              date="3 April 26, 12:00 AM IST to 4 April 26, 11:59 AM IST"
              title="Hack 'N' Solve Round"
              description="Teams must submit their project via Unstop!"
              progress={0}
              index={1}
            />
            <TimelineItem 
              date="5 April 26, 12:00 PM IST to 7 April 26, 11:59 AM IST"
              title="Mentorship Round"
              description="Shortlisted teams will receive mentorship from experts!"
              progress={0}
              index={2}
            />
            <TimelineItem 
              date="12 April 26, 11:00 AM IST to 12 April 26, 06:00 PM IST"
              title="Grand Finale at IIT Delhi"
              description="The best teams make it to IIT Delhi to pitch their solutions live!"
              progress={0}
              index={3}
            />
            <TimelineItem 
              date="12 April 26, 06:00 PM IST"
              title="Winners Announcement"
              description="The moment of glory!"
              progress={0}
              index={4}
            />
          </div>
        </div>
      </section>

      {/* Prize & Sponsors Section */}
      <section id="sponsors" className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-8xl md:text-[12rem] font-bold font-heading tracking-tighter text-gradient">
              300₹000
            </h2>
            <p className="text-2xl font-bold text-text-secondary mt-4 uppercase tracking-widest">Total Prize Pool</p>
          </motion.div>

          <SectionHeading>OUR SPONSORS</SectionHeading>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mt-12">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <img src="/gdg-logo.png" alt="GDG" className="h-16 mb-4 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" 
                onError={(e) => {
                  e.currentTarget.src = "https://www.gstatic.com/devrel-devsite/prod/v20240321-01/developers/images/touchicon-180.png";
                }}
              />
              <span className="text-sm font-bold text-text-secondary">GDG</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-accent-green" />
              </div>
              <span className="text-sm font-bold text-text-secondary">Rotaract Club IGDTUW</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-heading mb-8 tracking-tighter"
          >
            Join the biggest hackathon Delhi has witnessed till date!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block border-beam rounded-2xl p-[2px]"
          >
            <a 
              href="https://unstop.com/o/ofngWUm?lb=W667U8HG&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Rathash2878"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 rounded-2xl bg-accent text-white font-bold text-2xl flex items-center gap-3 hover:bg-accent/90 transition-colors"
            >
              Register on Unstop <ExternalLink className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 bg-accent/10 blur-[150px] rounded-full" />
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-bold font-heading mb-6 tracking-tighter">DEVCATION</h2>
              <p className="text-text-secondary max-w-md mb-8">
                The ultimate platform for developers to innovate, collaborate, and build the future. Hosted by GDG IGDTUW & GDG IIT Delhi.
              </p>
              <div className="flex space-x-4">
                {/* Social links placeholder */}
                <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-text-secondary">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href="mailto:dscigdtuw@gmail.com" className="hover:text-text-primary transition-colors">dscigdtuw@gmail.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <a href="tel:+919625580383" className="hover:text-text-primary transition-colors">+91 9625580383</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>IIT Delhi, New Delhi</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-text-secondary">
                <li><a href="#about" className="hover:text-text-primary transition-colors">About</a></li>
                <li><a href="#tracks" className="hover:text-text-primary transition-colors">Tracks</a></li>
                <li><a href="#timeline" className="hover:text-text-primary transition-colors">Timeline</a></li>
                <li><a href="https://unstop.com" className="hover:text-text-primary transition-colors">Unstop</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
            <p>© 2026 Devcation Delhi. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

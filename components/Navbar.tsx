
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { View } from '../App';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(2, 4, 8, 0)', 'rgba(2, 4, 8, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: View }[] = [
    { label: 'Ecosystem', view: 'ecosystem' },
    { label: 'Capital', view: 'capital' },
    { label: 'Quantum', view: 'quantum' },
    { label: 'Advisory', view: 'advisory' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${isScrolled ? 'border-white/10 py-4 shadow-2xl' : 'border-transparent py-8'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          onClick={() => setView('home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-cyan-500 rounded-lg transform rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[135deg] duration-500">
            <div className="w-4 h-4 bg-black rounded-sm transform -rotate-45" />
          </div>
          <span className="group-hover:text-cyan-400 transition-colors">NEXUS<span className="text-cyan-500">PRIME</span></span>
        </motion.div>
        
        <div className="hidden md:flex gap-10 items-center text-xs font-bold tracking-[0.2em] uppercase">
          {navItems.map((item) => (
            <motion.button
              key={item.view}
              onClick={() => setView(item.view)}
              whileHover={{ scale: 1.1, color: '#22d3ee' }}
              className={`${currentView === item.view ? 'text-cyan-400' : 'text-slate-400'} hover:text-cyan-400 transition-colors cursor-pointer outline-none`}
            >
              {item.label}
              {currentView === item.view && (
                <motion.div layoutId="nav-underline" className="h-0.5 bg-cyan-500 mt-1" />
              )}
            </motion.button>
          ))}
          <motion.button
            onClick={() => setView('portal')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-3 rounded-full font-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
          >
            CLIENT PORTAL
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;


import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { View } from '../App';

interface HeroProps {
  onNavigate?: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div 
        style={{ y, opacity, rotateX: rotate }}
        className="container mx-auto px-6 text-center z-10 perspective-1000"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 text-cyan-400 text-xs tracking-widest uppercase mb-8 glass"
        >
          <Zap size={14} className="animate-pulse" /> NEXT-GEN CAPITAL MANAGEMENT
        </motion.div>
        
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-9xl font-display font-black leading-tight mb-8 tracking-tighter"
        >
          Wealth <br />
          <motion.span 
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: '100% 50%' }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-[length:200%_auto]"
          >
            Intelligently 
          </motion.span> Scaled.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Institutional-grade infrastructure for the modern investor. 
          Unlocking 24/7 liquidity and AI-driven alpha.
        </motion.p>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,211,238,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.('portal')}
            className="bg-cyan-500 text-black px-12 py-5 rounded-full font-black text-lg transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2 group"
          >
            OPEN ACCOUNT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.('ecosystem')}
            className="glass px-12 py-5 rounded-full font-bold text-lg transition-all"
          >
            EXPLORE ECOSYSTEM
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating UI Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/4 right-[10%] hidden xl:block"
        >
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass p-6 rounded-3xl w-64 shadow-2xl border-cyan-500/30"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-slate-500 uppercase">Yield Portfolio</span>
              <TrendingUp size={16} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-bold mb-1">+12.4%</div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 2 }} className="h-full bg-emerald-500" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-1/4 left-[10%] hidden xl:block"
        >
          <motion.div
            animate={{ y: [0, 40, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass p-6 rounded-3xl w-56 shadow-2xl border-blue-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <ShieldCheck className="text-blue-400" size={18} />
               </div>
               <span className="text-sm font-semibold">Security Level</span>
            </div>
            <div className="text-xs text-slate-400">Vault-grade cold storage active.</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, MessageSquare, PhoneCall, Calendar, Star } from 'lucide-react';

const Advisory: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 inline-block">HUMAN + AI SYNERGY</span>
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter">Bespoke <br />Guidance.</h1>
          <p className="text-slate-400 text-xl font-light">
            NexusPrime Advisory pairs you with world-class wealth managers and our most advanced AI strategist for a truly hybrid consulting experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 glass rounded-[3rem] border border-cyan-500/10"
          >
            <UserCheck className="text-cyan-400 mb-8" size={48} />
            <h3 className="text-3xl font-bold mb-4">Dedicated Partner</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Every Prime member is assigned a personal advisor who understands your long-term legacy goals and risk tolerance.
            </p>
            <button className="text-cyan-400 font-bold flex items-center gap-2 group">
              MEET THE TEAM <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 glass rounded-[3rem] border border-blue-500/10"
          >
            <Calendar className="text-blue-400 mb-8" size={48} />
            <h3 className="text-3xl font-bold mb-4">Strategic Reviews</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Quarterly deep-dives into your portfolio performance with predictive modeling for the next market cycle.
            </p>
            <button className="text-blue-400 font-bold flex items-center gap-2 group">
              SCHEDULE SESSION <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </motion.div>
        </div>

        <div className="bg-cyan-500/5 rounded-[4rem] border border-cyan-500/10 p-16 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} className="text-cyan-400 fill-current" size={24} />)}
          </div>
          <h2 className="text-4xl font-black mb-8">"The only platform that treats wealth like architecture."</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-full" />
            <div className="text-left">
              <div className="font-bold">Julian Vane</div>
              <div className="text-xs text-slate-500">CEO, Vane Global Holdings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advisory;

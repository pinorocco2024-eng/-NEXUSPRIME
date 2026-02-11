
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sprout, Zap, ArrowUpRight } from 'lucide-react';

const YieldFarming: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">Yield <span className="text-emerald-500">Farming.</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
            Hyper-optimized capital allocation across the decentralized finance landscape. Maximize returns through automated compounding and cross-chain routing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <Zap className="text-cyan-400" />, label: "Auto-Compounding", val: "Daily" },
            { icon: <Sprout className="text-emerald-400" />, label: "Target APY", val: "14.2%" },
            { icon: <TrendingUp className="text-blue-400" />, label: "Risk Score", val: "Low" },
          ].map((stat, i) => (
            <div key={i} className="glass p-10 rounded-[2.5rem] border border-white/5 text-center">
               <div className="mb-6 flex justify-center">{stat.icon}</div>
               <div className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">{stat.label}</div>
               <div className="text-4xl font-black">{stat.val}</div>
            </div>
          ))}
        </div>

        <div className="glass p-16 rounded-[4rem] border border-emerald-500/10 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
             <h2 className="text-4xl font-bold mb-6">Omnichain Strategy</h2>
             <p className="text-slate-500 text-lg leading-relaxed mb-8">
               Our engine monitors over 5,000 liquidity pools across Ethereum, L2s, and alternative chains, instantly rebalancing your position to capture peak efficiency.
             </p>
             <button className="flex items-center gap-2 text-emerald-400 font-bold group">
               VIEW REAL-TIME POOLS <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </button>
           </div>
           <div className="w-full md:w-1/3 aspect-square bg-emerald-500/10 rounded-[3rem] border border-emerald-500/20 flex items-center justify-center">
              <Sprout size={120} className="text-emerald-500 opacity-20" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default YieldFarming;

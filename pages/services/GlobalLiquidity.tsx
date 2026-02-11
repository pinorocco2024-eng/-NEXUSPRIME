
import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Map, Zap, Share2 } from 'lucide-react';

const GlobalLiquidity: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-20 text-center">
          <Globe2 size={64} className="text-blue-500 mx-auto mb-8" />
          <h1 className="text-6xl font-black mb-6">Global Liquidity</h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Instantly deploy capital across any market, anywhere on Earth. 
            Unified access to fragmented global order books through a single API.
          </p>
        </motion.div>

        <div className="relative h-[500px] mb-20 rounded-[4rem] overflow-hidden border border-white/5">
           <Map className="absolute inset-0 w-full h-full text-slate-900 opacity-20" />
           <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
              <div className="glass p-12 rounded-[3rem] border border-cyan-500/20 max-w-2xl">
                 <Share2 className="text-cyan-400 mx-auto mb-6" />
                 <h3 className="text-3xl font-bold mb-4">Dark Pool Access</h3>
                 <p className="text-slate-500 text-lg">Execute large blocks off-exchange to maintain price stability. Our network aggregates non-public liquidity sources worldwide.</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {['New York', 'London', 'Tokyo', 'Singapore'].map((city, i) => (
             <div key={i} className="glass p-8 rounded-3xl border border-white/5 text-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-4 animate-ping" />
                <div className="font-black text-xl">{city}</div>
                <div className="text-xs text-slate-500 uppercase mt-1 tracking-widest">NODE ONLINE</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalLiquidity;

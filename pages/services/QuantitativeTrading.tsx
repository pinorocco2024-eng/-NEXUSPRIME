
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Zap, Activity } from 'lucide-react';

const QuantitativeTrading: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-20 text-center">
          <BarChart3 size={64} className="text-cyan-400 mx-auto mb-8" />
          <h1 className="text-6xl font-black mb-6">Quantitative Trading</h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Proprietary algorithms capturing market inefficiencies in real-time. Our HFT infrastructure 
            bypasses traditional delays, delivering sub-millisecond execution across global pools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="glass p-12 rounded-[3rem] border border-cyan-500/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-cyan-400" /> Statistical Arbitrage
            </h3>
            <p className="text-slate-500 leading-relaxed">
              We leverage multi-factor models to exploit pricing discrepancies between correlated assets 
              across different jurisdictions and exchange types.
            </p>
          </div>
          <div className="glass p-12 rounded-[3rem] border border-emerald-500/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="text-emerald-400" /> Momentum Alpha
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Real-time sentiment analysis paired with technical breakout detection allows our 
              algorithms to ride macro-trends with institutional precision.
            </p>
          </div>
        </div>

        <div className="bg-white/5 p-16 rounded-[4rem] text-center border border-white/5">
          <Activity size={48} className="text-rose-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">Execution Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <div>
              <div className="text-5xl font-black">0.4ms</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest mt-2">AVG LATENCY</div>
            </div>
            <div>
              <div className="text-5xl font-black">14M+</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest mt-2">TRADES / DAY</div>
            </div>
            <div>
              <div className="text-5xl font-black">99.9%</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest mt-2">UPTIME</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantitativeTrading;

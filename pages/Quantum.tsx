
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Binary, BrainCircuit } from 'lucide-react';

const Quantum: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center mb-32"
        >
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-full mx-auto mb-12 flex items-center justify-center"
          >
            <BrainCircuit size={48} className="text-cyan-400" />
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-display font-black mb-8 tracking-tighter">Neural <br /><span className="text-cyan-500">Core.</span></h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            The heart of NexusPrime is our Quantum Neural Engine (QNE). It processes over 14 million data points per second, identifying micro-trends before they enter the mainstream.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { title: "Predictive Analytics", desc: "Modeling 10,000+ scenarios per trade.", icon: <Activity className="text-rose-400" /> },
            { title: "Ultra-Low Latency", desc: "0.4ms average execution speed.", icon: <Zap className="text-cyan-400" /> },
            { title: "Machine Learning", desc: "Evolving algorithms with every market cycle.", icon: <Binary className="text-emerald-400" /> },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-10 glass rounded-[3rem] border border-white/5 text-center"
            >
              <div className="mb-6 flex justify-center">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative p-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-[4rem]">
          <div className="bg-black rounded-[3.9rem] p-16 md:p-24 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
               <h2 className="text-5xl font-black mb-8">Quantum Edge</h2>
               <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                 Our proprietary technology bypasses traditional high-frequency trading limitations by utilizing quantum-resistant encryption and asynchronous data processing.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-black text-white">1.4B+</div>
                    <div className="text-xs text-slate-600 uppercase tracking-widest mt-1">Daily Requests</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">99.99%</div>
                    <div className="text-xs text-slate-600 uppercase tracking-widest mt-1">Core Uptime</div>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <Cpu size={200} className="text-cyan-500 opacity-20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantum;

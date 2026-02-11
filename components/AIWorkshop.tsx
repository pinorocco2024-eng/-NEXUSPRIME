
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Send, TrendingUp, PieChart } from 'lucide-react';
import { generateWealthStrategy } from '../services/geminiService';
import { AIWealthStrategy } from '../types';

const AIWorkshop: React.FC = () => {
  const [input, setInput] = useState('');
  const [strategy, setStrategy] = useState<AIWealthStrategy | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConsultation = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await generateWealthStrategy(input);
      setStrategy(result);
    } catch (error) {
      console.error("Wealth Strategy error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="vision" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-slate-900/40 border border-white/10 rounded-[4rem] p-16 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
          {/* Animated Glows */}
          <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Sparkles className="text-cyan-400" size={20} />
              </div>
              <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs">NEXUS AI ADVISOR</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-10 leading-tight">Your Financial <br />Architecture, Automated.</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-3xl leading-relaxed">
              Define your legacy. Describe your long-term goals and risk appetite, and our 
              quantum-powered engine will blueprint a personalized wealth strategy.
            </p>

            <div className="relative flex flex-col md:flex-row gap-4 mb-16">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Aggressive growth focused on tech and renewable energy..."
                className="flex-1 bg-black/50 border border-white/10 rounded-3xl px-8 py-6 focus:outline-none focus:border-cyan-500 transition-all text-white placeholder:text-slate-700 text-lg shadow-inner"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsultation}
                disabled={loading}
                className="bg-white text-black px-10 py-6 rounded-3xl font-black flex items-center justify-center gap-3 transition-all min-w-[240px] shadow-xl shadow-cyan-500/10"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> RUN QUANTUM SIM</>}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {strategy && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-black/60 border border-cyan-500/20 p-12 rounded-[3rem] shadow-3xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-4xl font-black text-white">{strategy.strategyName}</h3>
                        <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold border border-emerald-500/20">ACTIVE ALPHA</span>
                      </div>
                      {/* Fixed: Use strategy.projectedReturn instead of strategy.strategyReturn which does not exist */}
                      <p className="text-cyan-400 font-medium mb-8 text-xl tracking-tight italic">Targeted Return: {strategy.projectedReturn}</p>
                      
                      <div className="space-y-6 mb-10">
                        {strategy.allocation.map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-2 font-bold text-slate-300">
                              <span>{item.asset}</span>
                              <span className="text-cyan-400">{item.percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${item.percentage}%` }} 
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                className="h-full bg-gradient-to-r from-cyan-600 to-blue-400"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-slate-400 leading-relaxed text-lg border-l-2 border-cyan-500/30 pl-6 py-2">
                        {strategy.summary}
                      </p>
                    </div>

                    <div className="flex flex-col gap-6">
                       <div className="bg-white/5 rounded-3xl p-8 border border-white/5 text-center">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">Risk Probability</p>
                          <div className="text-5xl font-black text-white mb-2">{strategy.riskProfile}</div>
                          <div className="text-emerald-400 text-sm flex items-center justify-center gap-1">
                             <TrendingUp size={14} /> Low Volatility Detected
                          </div>
                       </div>
                       <button className="flex-1 bg-gradient-to-br from-cyan-500 to-blue-600 text-black font-black text-xl py-6 rounded-3xl shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all">
                          EXECUTE STRATEGY
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWorkshop;

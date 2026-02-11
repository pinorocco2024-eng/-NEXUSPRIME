
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, LineChart, Activity } from 'lucide-react';

const AIForecasting: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-20 text-center">
          <Cpu size={64} className="text-purple-500 mx-auto mb-8" />
          <h1 className="text-6xl font-black mb-6">AI Forecasting</h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Predictive modeling powered by advanced neural architectures. 
            We use transformer-based temporal models to forecast market regime shifts with high confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="glass p-12 rounded-[3rem] border border-purple-500/20">
            <Brain className="text-purple-400 mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-4">Neural Networks</h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              Our models ingest millions of data points, including alternative data like satellite imagery 
              and real-time supply chain signals, to anticipate price action.
            </p>
          </div>
          <div className="glass p-12 rounded-[3rem] border border-indigo-500/20">
            <LineChart className="text-indigo-400 mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-4">Sentiment Analysis</h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              Proprietary NLP engines process global news cycles and social signals to identify 
              retail and institutional positioning trends before they manifest.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-tr from-indigo-900/50 to-purple-900/50 p-20 rounded-[4rem] text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[100px]" />
           <Activity size={64} className="text-white mx-auto mb-8" />
           <h2 className="text-4xl font-black mb-6 tracking-tight">Probabilistic Intelligence.</h2>
           <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-10">
             NEXUS AI doesn't just predict price; it calculates risk probabilities and tail-event 
             likelihoods to ensure your portfolio remains resilient in any scenario.
           </p>
           <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg">
             ACCESS QUANTUM INSIGHTS
           </button>
        </div>
      </div>
    </div>
  );
};

export default AIForecasting;

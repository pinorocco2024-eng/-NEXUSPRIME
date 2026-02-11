
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Share2, Layers } from 'lucide-react';

const Whitepaper: React.FC = () => {
  const sections = [
    "Abstract: The Future of Distributed Capital",
    "Section 1: Neural Network Trading Architectures",
    "Section 2: Decentralized Liquidity Aggregation",
    "Section 3: Zero-Knowledge Proofs in Wealth Management",
    "Section 4: Tokenomics and Global Settlement",
    "Conclusion: Re-architecting 2030 Finance"
  ];

  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <div className="inline-block p-4 glass rounded-3xl mb-8"><FileText size={48} className="text-cyan-500" /></div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Protocol <br /><span className="text-cyan-500">Whitepaper.</span></h1>
            <p className="text-slate-500 text-xl font-light italic">Version 2.4 | October 2024</p>
          </motion.div>

          <div className="space-y-6 mb-24">
             {sections.map((section, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-8 glass border border-white/5 rounded-3xl flex items-center justify-between hover:border-cyan-500/30 transition-all cursor-pointer group"
               >
                 <span className="text-xl font-bold">{section}</span>
                 <ChevronRight className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
               </motion.div>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-12 glass bg-cyan-500/5 border border-cyan-500/20 rounded-[3rem] text-center">
                <Share2 className="text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Read Technical Paper</h3>
                <button className="bg-white text-black px-10 py-4 rounded-2xl font-bold">DOWNLOAD PDF</button>
             </div>
             <div className="p-12 glass bg-blue-500/5 border border-blue-500/20 rounded-[3rem] text-center">
                <Layers className="text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Core Ecosystem Map</h3>
                <button className="bg-white text-black px-10 py-4 rounded-2xl font-bold">VIEW ARCHITECTURE</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;

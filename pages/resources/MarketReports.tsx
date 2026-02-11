
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart, Download, Calendar } from 'lucide-react';

const MarketReports: React.FC = () => {
  const reports = [
    { title: "Q4 2024 Market Regime Shift", date: "Oct 28, 2024", type: "MACRO" },
    { title: "The Rise of Tokenized Real Estate", date: "Oct 15, 2024", type: "SECTOR" },
    { title: "Liquidity Deep-Dive: DEX vs CEX", date: "Oct 02, 2024", type: "QUANT" },
    { title: "AI in Finance: 2025 Outlook", date: "Sep 20, 2024", type: "VISION" },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-black mb-16 tracking-tighter">Market <span className="text-cyan-500">Reports.</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
           {reports.map((report, i) => (
             <motion.div 
               key={i} 
               whileHover={{ x: 10 }}
               className="p-10 glass rounded-[2.5rem] border border-white/5 flex items-center justify-between group cursor-pointer"
             >
                <div>
                   <div className="text-xs font-black text-cyan-500 tracking-[0.2em] mb-2">{report.type}</div>
                   <h3 className="text-2xl font-bold mb-2">{report.title}</h3>
                   <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Calendar size={14} /> {report.date}
                   </div>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                   <Download size={20} />
                </div>
             </motion.div>
           ))}
        </div>

        <div className="p-16 glass border border-white/5 rounded-[4rem] text-center">
           <LineChart className="mx-auto text-slate-500 mb-8" size={64} />
           <h2 className="text-3xl font-bold mb-6">Daily Alpha Pulse</h2>
           <p className="text-slate-400 max-w-xl mx-auto mb-10">Subscribe to our premium intelligence feed for sub-hourly updates on global liquidity trends and neural forecasting.</p>
           <div className="flex max-w-md mx-auto gap-4">
              <input type="email" placeholder="email@finance.nexus" className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 transition-all" />
              <button className="bg-cyan-500 text-black px-8 rounded-2xl font-bold">SIGN UP</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MarketReports;

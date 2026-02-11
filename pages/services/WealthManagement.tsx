
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, PieChart, Users } from 'lucide-react';

const WealthManagement: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-20 text-center">
          <Briefcase size={64} className="text-emerald-400 mx-auto mb-8" />
          <h1 className="text-6xl font-black mb-6">Wealth Management</h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Bespoke strategies tailored to ultra-high-net-worth preservation. 
            We protect your legacy through sophisticated asset allocation and tax-efficient structures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <ShieldCheck className="text-blue-400" />, title: "Capital Preservation", desc: "Focusing on asymmetric risk-reward to avoid drawdown in volatile cycles." },
            { icon: <PieChart className="text-purple-400" />, title: "Diversified Alpha", desc: "Access to private equity, credit markets, and digital alternatives." },
            { icon: <Users className="text-emerald-400" />, title: "Estate Planning", desc: "Generational wealth transfer through advanced legal and digital wrappers." },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="glass p-10 rounded-[2.5rem] border border-white/5">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-20 rounded-[4rem] flex flex-col items-center text-center">
          <h2 className="text-5xl font-black mb-8">Personalized Portfolios</h2>
          <p className="text-slate-400 max-w-2xl mb-10 text-lg">
            No two clients are the same. Our managers build one-of-one investment architectures 
            that reflect your specific values and long-term vision.
          </p>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-transform">
            REQUEST CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default WealthManagement;

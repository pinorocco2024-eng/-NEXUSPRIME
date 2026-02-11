
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, FileSearch, Info } from 'lucide-react';

const RiskDisclosure: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20">
          <div className="flex items-center gap-4 text-rose-500 mb-8">
             <AlertTriangle size={32} />
             <span className="font-bold tracking-widest text-xs uppercase">Important Notice</span>
          </div>
          <h1 className="text-6xl font-black mb-10 tracking-tighter">Risk <span className="text-rose-500">Disclosure.</span></h1>
          <p className="text-slate-400 text-xl leading-relaxed font-light mb-12">
            NEXUS Prime Capital Partners provides institutional-grade tools and access to complex financial markets. Participation in these markets involves significant risk.
          </p>
        </motion.div>

        <div className="space-y-16">
           <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><ShieldAlert className="text-rose-500" /> Market Volatility</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                Digital assets and quantitative strategies are subject to extreme market fluctuations. Historical performance is not indicative of future results. You should only invest capital that you are prepared to lose in its entirety.
              </p>
           </section>

           <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><FileSearch className="text-rose-500" /> Technological Risk</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                Our infrastructure utilizes decentralized protocols and smart contracts. While audited, these technologies carry inherent risks including software bugs, network congestion, and protocol failures.
              </p>
           </section>

           <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Info className="text-rose-500" /> Regulatory Environment</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                The global regulatory landscape for digital wealth is evolving rapidly. Changes in laws or tax regulations in your jurisdiction may impact your ability to hold or trade certain asset classes.
              </p>
           </section>
        </div>

        <div className="mt-32 p-12 glass border border-white/5 rounded-[3rem] text-sm text-slate-600 leading-relaxed">
           <p className="mb-4">This document does not constitute investment advice. NEXUS Prime Capital Partners is not a bank. Digital asset accounts are not FDIC insured. Please consult with your legal and financial advisors before initiating large-scale capital deployments.</p>
           <p>© 2025 NEXUS PRIME CAPITAL PARTNERS - ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </div>
  );
};

export default RiskDisclosure;

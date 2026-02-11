
import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, RefreshCw, Layers, Globe } from 'lucide-react';

const CryptoGateway: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-20 text-center">
          <Bitcoin size={64} className="text-amber-400 mx-auto mb-8" />
          <h1 className="text-6xl font-black mb-6">Crypto Gateway</h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Seamless bridge between fiat and the decentralized future. 
            Native integration with 20+ L1 and L2 blockchains for instant settlement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="glass p-12 rounded-[3rem] border border-white/5">
            <RefreshCw className="text-amber-400 mb-6 animate-spin-slow" />
            <h3 className="text-3xl font-bold mb-4">Instant On/Off Ramp</h3>
            <p className="text-slate-500 text-lg">Convert major fiat currencies (USD, EUR, GBP) into digital assets in under 30 seconds with zero slippage.</p>
          </div>
          <div className="glass p-12 rounded-[3rem] border border-white/5">
            <Layers className="text-cyan-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4">Cross-Chain Yield</h3>
            <p className="text-slate-500 text-lg">Automatically route your idle digital assets into the highest-performing audited DeFi protocols.</p>
          </div>
        </div>

        <div className="bg-white p-20 rounded-[4rem] text-black flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black mb-6">Global Liquidity Pool.</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our gateway connects directly to institutional-grade liquidity providers, ensuring 
              that even multi-million dollar trades execute with minimal market impact.
            </p>
          </div>
          <Globe size={180} className="text-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default CryptoGateway;

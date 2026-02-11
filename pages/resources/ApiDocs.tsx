
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, ShieldCheck } from 'lucide-react';

const ApiDocs: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-black mb-16 tracking-tighter">API <span className="text-blue-500">Docs.</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
           <div className="lg:col-span-2">
              <div className="p-1 glass border border-blue-500/20 rounded-3xl overflow-hidden mb-8">
                 <div className="bg-[#0a0c10] p-4 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                       <div className="w-3 h-3 bg-rose-500 rounded-full" />
                       <div className="w-3 h-3 bg-amber-500 rounded-full" />
                       <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                    </div>
                    <span className="text-xs text-slate-500 ml-4 font-mono">GET /v1/liquidity/depth</span>
                 </div>
                 <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                    <pre className="text-blue-400">
{`{
  "market": "BTC/USD",
  "exchange": "NEXUS_CORE",
  "data": {
    "bid": 68432.11,
    "ask": 68432.45,
    "spread": "0.34",
    "liquidity_score": 0.994,
    "last_update": "2025-10-24T14:32:01Z"
  }
}`}
                    </pre>
                 </div>
              </div>

              <div className="space-y-8">
                 <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Code className="text-blue-400" /> REST & WebSockets</h3>
                    <p className="text-slate-500 leading-relaxed">High-performance endpoints for order execution and real-time streaming of global order book depth.</p>
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Cpu className="text-emerald-400" /> SDK Integration</h3>
                    <p className="text-slate-500 leading-relaxed">Native libraries for Python, Rust, and Go to integrate NEXUS Prime liquidity into your own trading desks.</p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="p-8 glass border border-white/5 rounded-[2.5rem]">
                 <Terminal className="text-blue-400 mb-6" />
                 <h4 className="font-bold mb-2">API KEY REQUIRED</h4>
                 <p className="text-slate-500 text-sm mb-6">Institutional grade access requires Tier-2 KYC verification.</p>
                 <button className="w-full bg-blue-500 text-black py-4 rounded-2xl font-bold">GET KEY</button>
              </div>
              <div className="p-8 glass border border-emerald-500/20 rounded-[2.5rem]">
                 <ShieldCheck className="text-emerald-400 mb-6" />
                 <h4 className="font-bold mb-2">AUTH & SECURITY</h4>
                 <p className="text-slate-500 text-sm">Every request is signed using Ed25519 cryptography for zero-trust authorization.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;

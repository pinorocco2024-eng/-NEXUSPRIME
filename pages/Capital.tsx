
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, TrendingUp, Landmark, ShieldCheck, Briefcase, X, ChevronRight, PieChart, BarChart, Rocket, Loader2, CheckCircle2, ShieldAlert, Download, Activity, Server, Globe, Lock, Cpu, Database, Fingerprint, Award, Radio, FileText } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { jsPDF } from "https://esm.sh/jspdf";
import { View } from '../App';

type CapitalTab = 'none' | 'invest' | 'modeler' | 'vault_init' | 'vault_confirmed';

interface Tier {
  name: string;
  min: string;
  fee: string;
  color: string;
  features: string[];
}

interface CapitalProps {
  onNavigate?: (view: View) => void;
}

interface ModelData {
  allocation: { asset: string; pct: number }[];
  scenarios: { year: number; bull: number; base: number; bear: number }[];
  stocks: { name: string; ticker: string; weight: string }[];
}

const Capital: React.FC<CapitalProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<CapitalTab>('none');
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [risk, setRisk] = useState(50);
  const [capital, setCapital] = useState(100000);
  const [modeling, setModeling] = useState(false);
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [generatingTerms, setGeneratingTerms] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const tiers: Tier[] = [
    { name: "Core", min: "$10k", fee: "0.8%", color: "cyan", features: ["AI Strategy", "Cold Storage", "24/7 Support"] },
    { name: "Professional", min: "$250k", fee: "0.5%", color: "blue", features: ["Dedicated Advisor", "Tax Optimization", "Early Deal Access"] },
    { name: "Institutional", min: "$1M+", fee: "0.2%", color: "purple", features: ["Custom API", "White-glove Service", "Direct Liquidity Pool"] },
  ];

  const handleStartHandshake = async () => {
    setIsScanning(true);
    await new Promise(r => setTimeout(r, 3500));
    setIsScanning(false);
    setActiveTab('vault_confirmed');
  };

  const runModeler = async () => {
    setModeling(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a sophisticated investment strategy for $${capital} with a risk score of ${risk}/100. 
        Return: 
        1. Allocation (4 asset classes with percentages).
        2. Scenarios (Projected values for Year 0 to 5 for Bull, Base, and Bear cases starting from ${capital}).
        3. Stocks (A list of 6 specific high-performance stocks or assets consistent with the risk profile).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              allocation: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    asset: { type: Type.STRING },
                    pct: { type: Type.NUMBER }
                  },
                  required: ["asset", "pct"]
                }
              },
              scenarios: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    year: { type: Type.NUMBER },
                    bull: { type: Type.NUMBER },
                    base: { type: Type.NUMBER },
                    bear: { type: Type.NUMBER }
                  },
                  required: ["year", "bull", "base", "bear"]
                }
              },
              stocks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    ticker: { type: Type.STRING },
                    weight: { type: Type.STRING }
                  },
                  required: ["name", "ticker", "weight"]
                }
              }
            },
            required: ["allocation", "scenarios", "stocks"]
          }
        }
      });
      setModelData(JSON.parse(response.text || '{}') as ModelData);
    } catch (e) {
      console.error(e);
    } finally {
      setModeling(false);
    }
  };

  const generatePDFReport = async () => {
    if (!modelData) return;
    setGeneratingPDF(true);
    await new Promise(r => setTimeout(r, 2500));
    
    const doc = new jsPDF();
    const cyan = "#22d3ee";
    const bg = "#020408";
    
    // PAGE 1: ALLOCATION
    doc.setFillColor(2, 4, 8);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(cyan);
    doc.setFontSize(26);
    doc.text("NEXUS PRIME CAPITAL", 20, 30);
    doc.setFontSize(10);
    doc.text("QUANTUM PORTFOLIO SPECIFICATION | CONFIDENTIAL", 20, 40);
    doc.setDrawColor(34, 211, 238);
    doc.line(20, 45, 190, 45);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`Initial Deployment: $${capital.toLocaleString()}`, 20, 65);
    doc.text(`Risk Index: ${risk}/100`, 20, 75);

    doc.setTextColor(cyan);
    doc.setFontSize(18);
    doc.text("STRATEGIC ALLOCATION", 20, 100);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    modelData.allocation.forEach((item, i) => {
      const yPos = 115 + (i * 15);
      doc.text(`${item.asset}`, 30, yPos);
      doc.text(`${item.pct}%`, 160, yPos);
      doc.setFillColor(255, 255, 255, 0.1);
      doc.rect(30, yPos + 2, 140, 1, 'F');
      doc.setFillColor(34, 211, 238);
      doc.rect(30, yPos + 2, (item.pct / 100) * 140, 1, 'F');
    });

    // PAGE 2: SCENARIOS & CHARTS
    doc.addPage();
    doc.setFillColor(2, 4, 8);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(cyan);
    doc.setFontSize(22);
    doc.text("PROJECTION SCENARIOS", 20, 30);
    
    // Draw simple line chart
    const chartX = 30;
    const chartY = 150;
    const chartWidth = 150;
    const chartHeight = 80;
    
    doc.setDrawColor(100, 100, 100);
    doc.line(chartX, chartY, chartX + chartWidth, chartY); // X axis
    doc.line(chartX, chartY, chartX, chartY - chartHeight); // Y axis

    const maxVal = Math.max(...modelData.scenarios.map(s => s.bull));
    const minVal = capital;
    const scale = (val: number) => chartY - (((val - minVal) / (maxVal - minVal)) * chartHeight);

    // Bull Line (Emerald)
    doc.setDrawColor(16, 185, 129);
    for (let i = 0; i < modelData.scenarios.length - 1; i++) {
      const s1 = modelData.scenarios[i];
      const s2 = modelData.scenarios[i+1];
      doc.line(chartX + (i * 30), scale(s1.bull), chartX + ((i+1) * 30), scale(s2.bull));
    }
    // Base Line (Cyan)
    doc.setDrawColor(34, 211, 238);
    for (let i = 0; i < modelData.scenarios.length - 1; i++) {
      const s1 = modelData.scenarios[i];
      const s2 = modelData.scenarios[i+1];
      doc.line(chartX + (i * 30), scale(s1.base), chartX + ((i+1) * 30), scale(s2.base));
    }
    // Bear Line (Rose)
    doc.setDrawColor(244, 63, 94);
    for (let i = 0; i < modelData.scenarios.length - 1; i++) {
      const s1 = modelData.scenarios[i];
      const s2 = modelData.scenarios[i+1];
      doc.line(chartX + (i * 30), scale(s1.bear), chartX + ((i+1) * 30), scale(s2.bear));
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("Legend: Green (Bull) | Cyan (Base) | Red (Bear)", 30, 165);
    
    // Scenario Table
    doc.setFontSize(12);
    doc.text("Yearly Projection Data ($)", 20, 190);
    doc.setFontSize(10);
    doc.text("Year      Bull           Base           Bear", 20, 205);
    modelData.scenarios.forEach((s, i) => {
      const y = 215 + (i * 8);
      doc.text(`${s.year}        ${s.bull.toLocaleString()}    ${s.base.toLocaleString()}    ${s.bear.toLocaleString()}`, 20, y);
    });

    // PAGE 3: DETAILED ASSET SELECTION
    doc.addPage();
    doc.setFillColor(2, 4, 8);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(cyan);
    doc.setFontSize(22);
    doc.text("DETAILED ASSET LIST", 20, 30);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("ALGORITHMICALLY SELECTED FOR YOUR PROFILE", 20, 40);

    doc.setTextColor(255, 255, 255);
    modelData.stocks.forEach((stock, i) => {
      const y = 65 + (i * 25);
      doc.setFontSize(14);
      doc.setTextColor(cyan);
      doc.text(`${stock.name} (${stock.ticker})`, 25, y);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`Optimal Portfolio Weight: ${stock.weight}`, 25, y + 8);
      doc.setDrawColor(255, 255, 255, 0.05);
      doc.line(20, y + 15, 190, y + 15);
    });

    doc.save(`NEXUS_PREMIUM_STRATEGY_${Date.now()}.pdf`);
    setGeneratingPDF(false);
  };

  const generateTermsPDF = async () => {
    setGeneratingTerms(true);
    await new Promise(r => setTimeout(r, 1500));
    const doc = new jsPDF();
    const cyan = "#22d3ee";
    doc.setFillColor(2, 4, 8);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(cyan);
    doc.setFontSize(22);
    doc.text("NEXUS PRIME CAPITAL", 20, 30);
    doc.setFontSize(12);
    doc.text("VAULT TERMS & CUSTODY AGREEMENT", 20, 40);
    doc.setDrawColor(34, 211, 238);
    doc.line(20, 45, 190, 45);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("VAULT ID: NX-492-PA-99", 20, 65);
    doc.text(`PLAN: ${selectedTier?.name || 'Institutional'}`, 20, 75);
    doc.setFontSize(10);
    const terms = [
      "1. CUSTODY PROTOCOL: Assets are secured using Multi-Party Computation (MPC).",
      "2. GOVERNANCE: Transactions require 3-of-5 biometric signatures.",
      "3. LIQUIDITY: Instant settlement is guaranteed for Institutional tier.",
      "4. INSURANCE: Vault coverage provided for up to $250M.",
      "5. CONFIDENTIALITY: Zero-knowledge proofs (ZKP) are used for all reports.",
      "6. WITHDRAWAL: Subject to a 24-hour neural-freeze for security anomalies.",
      "7. JURISDICTION: This agreement is governed by the Digital Asset Act of Zürich.",
    ];
    terms.forEach((line, i) => {
      doc.text(line, 20, 100 + (i * 12));
    });
    doc.save(`NEXUS_TERMS_VAULT_NX492.pdf`);
    setGeneratingTerms(false);
  };

  useEffect(() => {
    if (activeTab === 'modeler') runModeler();
  }, [risk, activeTab]);

  const ScenariosChart = () => {
    const years = [0, 1, 2, 3, 4, 5];
    return (
      <div className="mt-12 p-8 glass rounded-3xl border border-white/5 h-64 relative overflow-hidden flex flex-col justify-end">
        <div className="absolute top-6 left-8 flex items-center gap-2">
           <Activity size={14} className="text-cyan-400" />
           <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">5-Year Projection Scenarios</span>
        </div>
        <div className="flex items-end justify-between h-32 gap-2">
           {years.map(y => (
             <div key={y} className="flex-1 flex flex-col justify-end gap-1 group relative">
                <motion.div initial={{ height: 0 }} animate={{ height: `${20 + y * 2}%` }} className="bg-rose-500/20 w-full rounded-t-sm border-t border-rose-500/50" />
                <motion.div initial={{ height: 0 }} animate={{ height: `${30 + y * 5}%` }} className="bg-cyan-500/30 w-full rounded-t-sm border-t border-cyan-500/50" />
                <motion.div initial={{ height: 0 }} animate={{ height: `${35 + y * 12}%` }} className="bg-emerald-500/40 w-full rounded-t-sm border-t border-emerald-500/50" />
                <span className="text-[8px] text-slate-600 font-bold text-center mt-2">YR {y}</span>
             </div>
           ))}
        </div>
        <div className="mt-4 flex gap-6 justify-center">
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /><span className="text-[8px] text-slate-500 uppercase tracking-widest">Bull</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-500 rounded-full" /><span className="text-[8px] text-slate-500 uppercase tracking-widest">Base</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full" /><span className="text-[8px] text-slate-500 uppercase tracking-widest">Bear</span></div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-32 pb-24 bg-[#020408] relative min-h-screen overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'none' ? (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* HERO SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
                <div className="max-w-xl">
                  <h1 className="text-6xl md:text-8xl font-display font-black mb-10 tracking-tighter">Capital <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Preserved.</span></h1>
                  <p className="text-slate-400 text-xl leading-relaxed mb-12 font-light">
                    Our investment philosophy combines timeless diversification principles with modern computational speed. Institutional-grade custody for the digital age.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <button onClick={() => setActiveTab('invest')} className="bg-cyan-500 text-black px-12 py-5 rounded-2xl font-black shadow-xl shadow-cyan-500/20 hover:scale-105 transition-transform">INVEST NOW</button>
                     <button onClick={() => setActiveTab('modeler')} className="glass px-12 py-5 rounded-2xl font-black hover:bg-white/5 transition-all">PORTFOLIO MODELER</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[{ name: "Liquid Assets", icon: <Wallet className="text-cyan-400" />, perf: "+12.4%" }, { name: "Equities", icon: <TrendingUp className="text-emerald-400" />, perf: "+28.1%" }, { name: "Real Estate", icon: <Landmark className="text-amber-400" />, perf: "+8.9%" }, { name: "Alternatives", icon: <Database className="text-purple-400" />, perf: "+19.2%" }].map((asset, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }} className="p-8 glass rounded-[2.5rem] border border-white/5 shadow-2xl">
                      <div className="mb-6">{asset.icon}</div>
                      <div className="text-slate-500 text-xs uppercase mb-2 font-black">{asset.name}</div>
                      <div className="text-3xl font-black text-white">{asset.perf}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* STRATEGIC OPPORTUNITIES */}
              <div className="mb-40">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                       <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Market Edge</span>
                       <h2 className="text-5xl md:text-6xl font-black tracking-tight italic">Prime Alpha <span className="text-white">Strategies.</span></h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-right font-light">Exclusive access to non-correlated asset classes and algorithmically optimized yields.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                       { title: "DeFi Yield v2", risk: "Medium", return: "14.2% APY", icon: <Rocket className="text-emerald-400" /> },
                       { title: "Tokenized Credit", risk: "Low", return: "8.5% Fixed", icon: <TrendingUp className="text-cyan-400" /> },
                       { title: "Global Carbon", risk: "High", return: "Target 22%", icon: <Globe className="text-purple-400" /> }
                    ].map((strat, idx) => (
                       <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-10 glass border border-white/5 rounded-[3rem] group">
                          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cyan-500/20 transition-colors">
                             {strat.icon}
                          </div>
                          <h3 className="text-2xl font-black mb-4">{strat.title}</h3>
                          <div className="flex justify-between items-center pt-6 border-t border-white/5">
                             <span className="text-xs font-bold text-slate-500 uppercase">Return Profile</span>
                             <span className="text-emerald-400 font-black">{strat.return}</span>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
              
              {/* FINAL CTA STRIP */}
              <div className="bg-white text-black p-16 md:p-24 rounded-[4rem] flex flex-col md:flex-row justify-between items-center gap-12">
                 <div className="max-w-2xl">
                    <h2 className="text-5xl font-black mb-6 tracking-tight italic leading-none">Ready to Scale <br />Your Legacy?</h2>
                    <p className="text-slate-600 text-lg font-light">Join the ranks of ultra-high-net-worth investors securing their future with NEXUS Prime.</p>
                 </div>
                 <button onClick={() => setActiveTab('invest')} className="bg-black text-white px-16 py-6 rounded-3xl font-black text-xl hover:scale-110 transition-transform shadow-2xl">
                    OPEN VAULT
                 </button>
              </div>
            </motion.div>
          ) : activeTab === 'invest' ? (
            <motion.div key="invest" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-16">
                 <h2 className="text-5xl font-black italic">Select your <span className="text-cyan-500">Tier.</span></h2>
                 <button onClick={() => setActiveTab('none')} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {tiers.map((tier, i) => (
                  <motion.div key={i} whileHover={{ y: -20 }} className={`p-10 glass border border-white/5 rounded-[3rem] relative overflow-hidden group hover:border-cyan-500/30`}>
                    <h3 className="text-3xl font-black mb-2">{tier.name}</h3>
                    <div className="text-slate-500 text-sm font-bold uppercase mb-8">ENTRY: {tier.min}</div>
                    <div className="space-y-4 mb-10">
                       {tier.features.map((f, fi) => <div key={fi} className="flex items-center gap-2 text-slate-300"><ChevronRight size={14} className="text-cyan-500" /><span className="text-sm">{f}</span></div>)}
                    </div>
                    <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                       <div><div className="text-[10px] text-slate-500 font-bold tracking-widest">MGMT FEE</div><div className="text-2xl font-black">{tier.fee}</div></div>
                       <button onClick={() => { setSelectedTier(tier); setActiveTab('vault_init'); }} className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-cyan-500 transition-colors">SELECT</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : activeTab === 'vault_init' ? (
            <motion.div key="vault" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
               <div className="glass p-20 rounded-[4rem] border border-cyan-500/20 text-center relative overflow-hidden">
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 glass flex flex-col items-center justify-center gap-8 bg-black/80">
                         <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-32 h-32 border-4 border-cyan-500 border-t-transparent rounded-full flex items-center justify-center">
                            <Fingerprint size={64} className="text-cyan-400" />
                         </motion.div>
                         <div className="text-2xl font-black italic tracking-tighter">Biometric Scansion <span className="animate-pulse">...</span></div>
                         <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} className="h-full bg-cyan-500" />
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <ShieldCheck size={80} className="text-cyan-500 mx-auto mb-10" />
                  <h2 className="text-5xl font-black mb-6 tracking-tighter italic">Vault <span className="text-white">Initialization.</span></h2>
                  <p className="text-slate-400 text-xl mb-12 font-light">
                    You have selected the <span className="text-cyan-400 font-bold">{selectedTier?.name}</span> infrastructure. 
                    We are ready to handshake with your biometric credentials.
                  </p>
                  <div className="flex gap-4">
                     <button onClick={() => setActiveTab('invest')} className="flex-1 glass py-6 rounded-2xl font-bold hover:bg-white/5">GO BACK</button>
                     <button onClick={handleStartHandshake} className="flex-1 bg-white text-black py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl">
                        CONFIRM & START HANDSHAKE <Rocket size={20} />
                     </button>
                  </div>
               </div>
            </motion.div>
          ) : activeTab === 'vault_confirmed' ? (
            <motion.div key="success" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
               <div className="glass p-20 rounded-[4rem] border border-emerald-500/20 text-center relative overflow-hidden bg-emerald-500/5">
                  <div className="w-24 h-24 bg-emerald-500 text-black rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                     <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-5xl font-black mb-6 tracking-tighter italic text-white">Vault <span className="text-emerald-500">Established.</span></h2>
                  <p className="text-slate-400 text-xl mb-12 font-light max-w-lg mx-auto leading-relaxed">
                    Your {selectedTier?.name} Vault has been successfully initialized. 
                    Your account ID is <span className="text-white font-mono font-bold tracking-widest px-2 py-1 bg-white/5 rounded">NX-492-PA-99</span>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
                     <div className="p-8 glass rounded-3xl border border-white/10 flex items-center justify-between">
                        <div>
                           <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">CONTRACT STATUS</div>
                           <div className="font-black text-emerald-400">DIGITALLY SIGNED</div>
                        </div>
                        <FileText className="text-slate-600" />
                     </div>
                     <div className="p-8 glass rounded-3xl border border-white/10 flex items-center justify-between">
                        <div>
                           <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">MPC NODES</div>
                           <div className="font-black text-white">ACTIVE / SYNCED</div>
                        </div>
                        <Activity className="text-emerald-400" />
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                     <button onClick={() => onNavigate?.('portal')} className="flex-1 bg-white text-black py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl">
                        ENTER CLIENT PORTAL <ChevronRight />
                     </button>
                     <button disabled={generatingTerms} onClick={generateTermsPDF} className="flex-1 glass py-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/5 disabled:opacity-50">
                        {generatingTerms ? <Loader2 className="animate-spin" /> : <><Download size={20} /> DOWNLOAD TERMS</>}
                     </button>
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div key="modeler" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-16">
                 <h2 className="text-5xl font-black italic">Portfolio <span className="text-emerald-500">Modeler.</span></h2>
                 <button onClick={() => setActiveTab('none')} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div className="glass p-12 rounded-[3rem] border border-white/5">
                    <div className="mb-12">
                       <div className="flex justify-between mb-4">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Initial Capital</label>
                          <span className="text-xl font-black text-cyan-400">${capital.toLocaleString()}</span>
                       </div>
                       <input type="range" min="10000" max="5000000" step="10000" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                    <div className="mb-12">
                       <div className="flex justify-between mb-4">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Risk Tolerance</label>
                          <span className="text-xl font-black text-emerald-400">{risk > 70 ? 'Aggressive' : risk > 30 ? 'Balanced' : 'Conservative'}</span>
                       </div>
                       <input type="range" min="1" max="100" value={risk} onChange={(e) => setRisk(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                    </div>
                    <ScenariosChart />
                 </div>
                 <div className="flex flex-col gap-8">
                    <div className="flex-1 glass p-12 rounded-[3rem] border border-white/5 relative overflow-hidden flex flex-col justify-center">
                       {modeling ? (
                         <div className="flex flex-col items-center gap-4 text-slate-500"><Loader2 className="animate-spin text-cyan-500" size={48} /><p className="text-xs font-bold tracking-widest uppercase">AI Rebalancing...</p></div>
                       ) : modelData ? (
                         <div className="space-y-8">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2"><PieChart size={14} /> AI Suggested Allocation</h4>
                            {modelData.allocation.map((item, idx) => (
                              <div key={idx}>
                                <div className="flex justify-between text-sm font-bold mb-2"><span>{item.asset}</span><span className="text-cyan-400">{item.pct}%</span></div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} className="h-full bg-cyan-500" /></div>
                              </div>
                            ))}
                         </div>
                       ) : <div className="text-center text-slate-600 font-bold uppercase tracking-widest text-xs">Adjust sliders to initiate model</div>}
                    </div>
                    <button 
                      disabled={!modelData || generatingPDF}
                      onClick={generatePDFReport}
                      className="bg-white text-black font-black py-6 rounded-3xl text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50"
                    >
                       {generatingPDF ? <Loader2 className="animate-spin" /> : <><Download size={24} /> GENERATE PREMIUM REPORT</>}
                    </button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Capital;

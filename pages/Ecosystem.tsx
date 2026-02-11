
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Server, Share2, Layers, Cpu, Database, X, Loader2, Activity, Globe } from 'lucide-react';
import { generateNetworkTopology, NetworkNode } from '../services/geminiService';

const Ecosystem: React.FC = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  const partners = [
    { name: "Global Liquidity Node", icon: <Share2 />, desc: "High-speed routing across 40+ exchanges." },
    { name: "Neural Backbone", icon: <Cpu />, desc: "Proprietary processing for real-time alpha." },
    { name: "Cold Storage Vault", icon: <Layers />, desc: "Distributed private key management." },
    { name: "Quantum Ledger", icon: <Database />, desc: "Immutable transaction history at scale." },
  ];

  const handleLaunchViewer = async () => {
    setIsLoading(true);
    setIsViewerOpen(true);
    try {
      const generatedNodes = await generateNetworkTopology();
      setNodes(generatedNodes);
    } catch (error) {
      console.error("Topology error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter">Connected <br /><span className="text-cyan-400">Intelligence.</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
            NexusPrime is not just an application. It's an entire web of interconnected financial services powered by distributed ledger technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {partners.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-12 glass rounded-[3rem] border border-white/5 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 mb-8 group-hover:bg-cyan-500/30 transition-all duration-500 transform group-hover:rotate-12">
                {p.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">{p.name}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative h-[600px] bg-cyan-500/5 rounded-[4rem] border border-cyan-500/10 overflow-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 opacity-10">
             <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent" />
          </div>
          <div className="text-center z-10 p-12">
            <Network size={120} className="text-cyan-500 mb-8 mx-auto animate-pulse" />
            <h2 className="text-4xl font-black mb-6">Interactive Network Map</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg mb-8">
              Explore the live topology of our global node network and see liquidity flow in real-time.
            </p>
            <button 
              onClick={handleLaunchViewer}
              className="bg-white text-black px-12 py-4 rounded-full font-bold hover:scale-110 transition-transform active:scale-95"
            >
              LAUNCH VIEWER
            </button>
          </div>
          
          {/* Animated Particles Background */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ x: Math.random() * 800 - 400, y: Math.random() * 600 - 300, opacity: 0 }}
              animate={{ 
                x: [Math.random() * 800 - 400, Math.random() * 800 - 400], 
                y: [Math.random() * 600 - 300, Math.random() * 600 - 300],
                opacity: [0, 1, 0] 
              }}
              transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* AI GENERATED VIEWER MODAL */}
        <AnimatePresence>
          {isViewerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
            >
              <button 
                onClick={() => setIsViewerOpen(false)}
                className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
              >
                <X size={40} />
              </button>

              <div className="w-full h-full max-w-7xl relative flex flex-col">
                <div className="mb-10">
                   <h2 className="text-4xl font-black tracking-tight flex items-center gap-4 italic">
                     <Activity className="text-cyan-500 animate-pulse" /> 
                     LIVE TOPOLOGY <span className="text-slate-700">/ V3.0 NEURAL CORE</span>
                   </h2>
                   <p className="text-slate-500 text-sm mt-2 font-mono">Initializing handshake with global quantum nodes...</p>
                </div>

                <div className="flex-1 glass rounded-[3rem] border border-white/5 relative overflow-hidden bg-black/20">
                  {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                      <Loader2 className="animate-spin text-cyan-500" size={64} />
                      <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">Synchronizing Neural Link...</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      {/* Connection Lines (Simulated SVG for organic feel) */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        {nodes.map((node, i) => {
                          const nextNode = nodes[(i + 1) % nodes.length];
                          return (
                            <motion.line
                              key={`line-${i}`}
                              x1={`${node.coordinates.x}%`}
                              y1={`${node.coordinates.y}%`}
                              x2={`${nextNode.coordinates.x}%`}
                              y2={`${nextNode.coordinates.y}%`}
                              stroke="#22d3ee"
                              strokeWidth="1"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, delay: i * 0.1 }}
                            />
                          );
                        })}
                      </svg>

                      {/* Nodes */}
                      {nodes.map((node) => (
                        <motion.div
                          key={node.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => setSelectedNode(node)}
                          className="absolute w-6 h-6 -ml-3 -mt-3 cursor-pointer group"
                          style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                        >
                           <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[10px] opacity-40 group-hover:opacity-100 transition-opacity" />
                           <div className="relative w-full h-full bg-cyan-500 rounded-full border-2 border-black flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                           </div>
                           
                           {/* Simple Label */}
                           <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              <span className="text-[10px] font-black tracking-widest bg-black/80 px-2 py-1 rounded-md border border-white/10 uppercase">
                                {node.location}
                              </span>
                           </div>
                        </motion.div>
                      ))}

                      {/* Info Panel Overlay */}
                      <AnimatePresence>
                        {selectedNode && (
                          <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className="absolute right-8 top-8 bottom-8 w-80 glass border-l border-white/10 rounded-[2.5rem] p-10 flex flex-col"
                          >
                             <button onClick={() => setSelectedNode(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={20} /></button>
                             <div className="mb-10">
                                <span className="text-cyan-500 text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">Node Specification</span>
                                <h3 className="text-3xl font-black">{selectedNode.location}</h3>
                             </div>

                             <div className="space-y-8">
                                <div>
                                   <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Current Status</div>
                                   <div className="flex items-center gap-2 text-emerald-400 font-black">
                                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                      {selectedNode.status}
                                   </div>
                                </div>
                                <div>
                                   <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Quantum Latency</div>
                                   <div className="text-2xl font-black">{selectedNode.latency}</div>
                                </div>
                                <div>
                                   <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Peak Throughput</div>
                                   <div className="text-2xl font-black">{selectedNode.throughput}</div>
                                </div>
                             </div>

                             <div className="mt-auto">
                                <button className="w-full bg-cyan-500 text-black font-black py-4 rounded-2xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                                   <Globe size={18} /> PING NODE
                                </button>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!selectedNode && (
                        <div className="absolute bottom-10 left-10 text-slate-500 font-mono text-[10px] animate-pulse">
                           SELECT A NODE TO ANALYZE REAL-TIME DATA FLOWS...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Ecosystem;

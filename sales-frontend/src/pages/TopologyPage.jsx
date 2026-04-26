import { motion } from "framer-motion"
import { Play, Mic, FileText, Database, ArrowRight, BrainCircuit, Activity, Cpu, Code2, Sparkles, Send, ShieldCheck, CheckCircle2, Zap } from "lucide-react"

export default function TopologyPage() {
  const nodeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, type: 'spring', damping: 20 }
    })
  }

  const packetVariants = {
    start: { x: -10, opacity: 0 },
    end: { x: '100%', opacity: [0, 1, 1, 0], transition: { duration: 2, repeat: Infinity, ease: 'linear' } }
  }

  return (
    <div className="relative min-h-[100vh] pb-32">
      {/* Background Particles / Topology Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 space-y-6 mb-16">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-2 font-mono">System Architecture</h2>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none shadow-indigo-500/50 text-glow">Intelligence Topology</h1>
        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest max-w-xl leading-relaxed">
          Live visualization of the Synthex Intelligence Pipeline. Processing unstructured voice/text data through a multi-agent RAG reasoning engine to extract deal-closing insights.
        </p>
      </div>

      {/* NODE GRAPH CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-12 mt-12">
        
        {/* ROW 1: Input -> Preprocessing -> Embedding */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative">
          
          <motion.div custom={0} initial="hidden" animate="visible" variants={nodeVariants} className="relative z-10 w-full lg:w-1/4">
            <div className="glass-card bg-[#0a0a0b]/80 border-white/5 glow-border p-6 rounded-2xl group hover:border-indigo-500/50 transition-colors">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                   <Mic className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">INPUT NODE</p>
                   <h3 className="text-sm font-black text-white uppercase tracking-tight italic">Raw Session Audio</h3>
                 </div>
               </div>
               <div className="text-[10px] text-zinc-400 font-mono">
                 [~] Ingesting WebRTC Stream<br/>
                 [~] 16kHz WAV Uncompressed
               </div>
            </div>
          </motion.div>

          <div className="hidden lg:flex w-24 h-1 bg-white/5 relative items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] absolute z-20 left-1/2 -translate-x-1/2" />
            <motion.div variants={packetVariants} initial="start" animate="end" className="absolute left-0 w-8 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent z-10" />
          </div>

          <motion.div custom={1} initial="hidden" animate="visible" variants={nodeVariants} className="relative z-10 w-full lg:w-1/4">
            <div className="glass-card bg-[#0a0a0b]/80 border-white/5 glow-border p-6 rounded-2xl group hover:border-emerald-500/50 transition-colors">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                   <Cpu className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">NODE 01</p>
                   <h3 className="text-sm font-black text-white uppercase tracking-tight italic">Preprocessing Agent</h3>
                 </div>
               </div>
               <div className="text-[10px] text-zinc-400 font-mono space-y-1">
                 <div className="flex items-center justify-between"><span>Diarization</span> <CheckCircle2 className="w-3 h-3 text-emerald-500"/></div>
                 <div className="flex items-center justify-between"><span>Noise Gate</span> <CheckCircle2 className="w-3 h-3 text-emerald-500"/></div>
               </div>
            </div>
          </motion.div>

          <div className="hidden lg:flex w-24 h-1 bg-white/5 relative items-center">
             <motion.div variants={packetVariants} initial="start" animate="end" transition={{ delay: 0.5 }} className="absolute left-0 w-8 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-10" />
          </div>

          <motion.div custom={2} initial="hidden" animate="visible" variants={nodeVariants} className="relative z-10 w-full lg:w-1/4">
             <div className="glass-card bg-[#0a0a0b]/80 border-white/5 glow-border p-6 rounded-2xl group hover:border-amber-500/50 transition-colors">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                   <Code2 className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">NODE 02</p>
                   <h3 className="text-sm font-black text-white uppercase tracking-tight italic">Embedding Engine</h3>
                 </div>
               </div>
               <div className="text-[10px] text-zinc-400 font-mono">
                 Vectorizing transcript chunks into 1536-dimensional semantic space.
               </div>
             </div>
          </motion.div>
        </div>

        {/* CONNECTION DOWN */}
        <div className="hidden lg:flex justify-end pr-[12.5%] relative h-16 w-full -my-8 z-0">
          <div className="w-1 h-full bg-white/5 relative right-12">
             <motion.div 
               animate={{ y: ['-10%', '100%'], opacity: [0, 1, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity, delay: 1 }}
               className="w-1 h-12 bg-gradient-to-b from-transparent via-amber-400 to-transparent absolute" 
             />
          </div>
        </div>

        {/* ROW 2: RAG Cluster */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={nodeVariants} className="w-full relative z-10">
          <div className="glass-card bg-indigo-950/20 border-indigo-500/20 glow-border p-10 rounded-3xl relative overflow-hidden backdrop-blur-3xl shadow-[0_0_100px_rgba(79,70,229,0.15)]">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
             
             <div className="flex items-start justify-between mb-10 border-b border-indigo-500/20 pb-6 relative z-10">
               <div>
                 <div className="flex items-center gap-3">
                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">NODE 03</p>
                   <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[8px] text-indigo-300 uppercase tracking-widest animate-pulse">Running</span>
                 </div>
                 <h2 className="text-3xl font-black text-white uppercase tracking-tight italic mt-2">RAG Retrieval Cluster</h2>
               </div>
               <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                 <Database className="w-8 h-8 text-indigo-400" />
               </div>
             </div>

             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {[
                  "Context Dilution Prevention", "Exact Chunk Pinpointing", "Historical Call Sync", "Cross-Transcript Lookup",
                  "Knowledge Base Lookup", "CRM Context Enrichment", "Pricing Policy Grounding", "Semantic Memory",
                  "Deterministic Evidence", "Low-Hallucination Matrix", "Persistent Accounts", "Cost-Efficient Routing"
                ].map((task, i) => (
                  <div key={i} className="bg-black/60 border border-white/5 rounded-xl p-4 flex items-center gap-3 hover:border-indigo-500/40 transition-colors group">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{task}</span>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* CONNECTION DOWN */}
        <div className="hidden lg:flex justify-center relative h-16 w-full -my-8 z-0">
          <div className="w-1 h-full bg-white/5 relative">
             <motion.div 
               animate={{ y: ['-10%', '100%'], opacity: [0, 1, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
               className="w-1 h-12 bg-gradient-to-b from-transparent via-indigo-500 to-transparent absolute" 
             />
          </div>
        </div>

        {/* ROW 3: LLM -> Output */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 relative">
          
          <motion.div custom={4} initial="hidden" animate="visible" variants={nodeVariants} className="relative z-10 w-full lg:w-1/3">
             <div className="glass-card bg-[#0a0a0b]/80 border-white/5 glow-border p-8 rounded-3xl group hover:border-rose-500/40 transition-colors shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-rose-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-2xl bg-rose-600 flex items-center justify-center border border-border group-hover:rotate-12 transition-transform shadow-[0_0_30px_rgba(225,29,72,0.4)] mb-4">
                   <BrainCircuit className="w-8 h-8 text-white" />
                 </div>
                 <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">NODE 04</p>
                 <h3 className="text-xl font-black text-white uppercase tracking-tight italic mt-1 mb-6">LLM Reasoning Engine</h3>
                 
                 <div className="grid grid-cols-2 gap-2 w-full text-left">
                   {[ "Intent Scoring", "Objection ID", "Deal Rating", "Next Action" ].map((cap, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3 text-rose-500" /> {cap}
                      </div>
                   ))}
                 </div>
               </div>
             </div>
          </motion.div>

          <div className="hidden lg:flex w-24 h-1 bg-white/5 relative items-center">
             <motion.div variants={packetVariants} initial="start" animate="end" transition={{ duration: 1.5 }} className="absolute left-0 w-12 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent z-10" />
          </div>

          <motion.div custom={5} initial="hidden" animate="visible" variants={nodeVariants} className="relative z-10 w-full lg:w-1/3">
             <div className="bg-white p-8 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6">
                   <FileText className="w-8 h-8 text-white" />
                 </div>
                 <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">NODE 05 - FINAL</p>
                 <h3 className="text-3xl font-black text-black uppercase tracking-tighter italic leading-none mb-1">Intelligence Deck</h3>
                 
                 <div className="mt-8 border-t border-black/10 pt-6 w-full flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-black">
                   <span>Render Ready</span>
                   <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Authorized</span>
                 </div>
               </div>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

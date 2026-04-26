import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Activity, Zap, TrendingUp, BarChart3, Users, Globe, Lock, ShieldCheck, Mail, Target, Database, Play, BrainCircuit, ShieldAlert } from "lucide-react"
import { Link } from "react-router-dom"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from "../lib/utils"

// --- INSTITUTIONAL DATA VISUALS (REAL PRODUCTION LOOK) ---

const REVENUE_DATA = [
  { name: 'Jan', revenue: 42000, projected: 45000 },
  { name: 'Feb', revenue: 51000, projected: 50000 },
  { name: 'Mar', revenue: 48000, projected: 55000 },
  { name: 'Apr', revenue: 62000, projected: 60000 },
  { name: 'May', revenue: 78000, projected: 75000 },
  { name: 'Jun', revenue: 84000, projected: 85000 },
]

const MetricToken = ({ label, value, trend }) => (
  <div className="flex flex-col gap-2 px-6 py-5 glass-card bg-[#0a0a0b]/60 border-white/5 rounded-2xl glow-border">
    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">{label}</span>
    <div className="flex items-baseline justify-between">
      <span className="text-2xl font-black text-white tracking-tighter italic">{value}</span>
      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">{trend}</span>
    </div>
  </div>
)

// --- MAIN PAGE ---

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen neural-bg text-zinc-400 selection:bg-indigo-500 selection:text-white antialiased overflow-x-hidden">
      
      {/* Professional Hero Section */}
      <section className="relative w-full pt-40 lg:pt-56 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 inset-x-0 h-[1000px] bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.2),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10 w-fit shadow-[0_0_20px_rgba(99,102,241,0.1)]"
            >
              <ShieldCheck className="w-4 h-4" /> Enterprise Revenue Intelligence Platform
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-10 italic uppercase"
            >
              The Revenue <br />
              <span className="text-zinc-400">Intelligence OS.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-zinc-400 max-w-lg mb-12 font-bold leading-relaxed tracking-tight uppercase"
            >
              Synthex extracts linguistic signals and Intent Vectors to deliver autonomous revenue forecasting and deal coaching.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link to="/upload" className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black text-xs rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4 relative overflow-hidden group uppercase tracking-[0.2em]">
                 <span className="relative z-10 flex items-center gap-2">Launch Analytics Hub <Zap className="w-4 h-4 fill-black" /></span>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-black text-xs rounded-2xl hover:bg-white/10 transition-all text-center uppercase tracking-widest">
                Get Started
              </Link>
            </motion.div>
            
            <div className="mt-20 flex items-center gap-12 opacity-20 grayscale brightness-200">
               {['Google', 'Goldman', 'Stripe', 'Mistral'].map(brand => (
                 <span key={brand} className="text-sm font-black tracking-tighter uppercase italic">{brand}</span>
               ))}
            </div>
          </div>

          {/* HIGH-FIDELITY PLATFORM PREVIEW */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="glass-card border-white/10 rounded-[2.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)] overflow-hidden glow-border p-1 bg-[#0a0a0b]/80">
               <div className="p-8 border-b border-white/[0.03] bg-black/40 flex items-center justify-between backdrop-blur-3xl">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        <Activity className="w-5 h-5 text-white" />
                     </div>
                     <div className="space-y-0.5">
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Revenue Intelligence Index</span>
                        <div className="flex items-center gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse" />
                           <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live Data Stream</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <div className="px-3 py-1 bg-white/10 rounded-lg text-[8px] font-black text-zinc-400 uppercase tracking-widest">SID: 82.4QX</div>
                  </div>
               </div>
               
               <div className="p-10 space-y-10">
                  <div className="grid grid-cols-2 gap-6">
                     <MetricToken label="Aggregate Managed Revenue" value="$42.9M" trend="+14.2%" />
                     <MetricToken label="Revenue Velocity Index" value="84.2%" trend="+5.6%" />
                  </div>
                  
                  <div className="h-[280px] w-full relative">
                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none rounded-3xl" />
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA}>
                        <defs>
                          <linearGradient id="landingChart" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(255,255,255,0.02)" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#landingChart)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Critical Deal Signals</p>
                     {[
                       { lead: "Initech Enterprise", status: "Risk High", amount: "$120k", color: "rose" },
                       { lead: "GlobalX Solutions", status: "Commit Status", amount: "$450k", color: "emerald" }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-5 glass-card bg-white/[0.02] border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-all">
                          <div className="flex items-center gap-4">
                             <div className={cn("w-2 h-2 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]", item.color === 'rose' ? 'bg-rose-500 shadow-rose-500/50' : 'bg-emerald-500 shadow-emerald-500/50')} />
                             <span className="text-[12px] font-black text-white uppercase tracking-widest italic">{item.lead}</span>
                          </div>
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.status} // <span className="text-indigo-400">{item.amount}</span></span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            
            {/* Absolute element to break grid */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-16 -left-20 p-8 glass-card bg-[#0a0a0b] border-white/10 rounded-[2rem] shadow-3xl space-y-6 glow-border"
            >
               <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-1">AI Coaching Sync</p>
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                     <BrainCircuit className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-sm font-black text-white uppercase tracking-widest italic">Strategic Objection</p>
                     <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Protocol: ROI Pivot v2</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ROI-DRIVEN USE CASE MATRIX */}
      <section className="w-full py-40 bg-black overflow-hidden relative border-y border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
              <div className="space-y-4">
                 <h2 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-4">Strategic Applications</h2>
                 <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">Built for the <br /> <span className="text-zinc-700">Revenue Stack.</span></h3>
              </div>
              <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest max-w-sm opacity-80">
                 Synthex provides deterministic intelligence for every persona in the modern enterprise revenue engine.
              </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  role: "For Sales Teams", 
                  roi: "18% Win Rate Uplift", 
                  icon: Target, 
                  desc: "Real-time objection handling blueprints and automated follow-up protocol generation based on buyer sentiment markers.",
                  tags: ["Objection Maps", "Auto-Emails", "Intent Scoring"]
                },
                { 
                  role: "For Revenue Managers", 
                  roi: "40% Pipeline Decay Prevention", 
                  icon: TrendingUp, 
                  desc: "Detect early deal slippage signals through forensic analysis of stakeholder alignment and pricing friction points.",
                  tags: ["Deal Health", "Risk Detection", "Call Audit"]
                },
                { 
                  role: "For Founders & CEOs", 
                  roi: "High-Fidelity Forecasting", 
                  icon: Activity, 
                  desc: "Remove the guesswork from quarterly projections with deterministic intent-data pulled directly from live sessions.",
                  tags: ["Revenue Vision", "Market Pulse", "Strategy Sync"]
                },
                { 
                  role: "For RevOps & Analytics", 
                  roi: "100% CRM Data Integrity", 
                  icon: Database, 
                  desc: "Synthex automatically captures and structures linguistic signal vectors into your CRM, eliminating manual entry drift.",
                  tags: ["Data Sync", "Signal Vectors", "API Access"]
                },
                { 
                  role: "For Enterprise Sales", 
                  roi: "Complex Stakeholder Mapping", 
                  icon: Users, 
                  desc: "Identify champions and blockers in complex multi-threaded deals by analyzing cross-session sentiment consistency.",
                  tags: ["Champion ID", "Blocker Logic", "Multi-Thread"]
                },
                { 
                  role: "For Security & IT", 
                  roi: "SOC2 Compliance / PII Redaction", 
                  icon: ShieldCheck, 
                  desc: "Autonomous PII scrubbing and forensic-grade encryption protocols ensure regional data sovereignty across the globe.",
                  tags: ["PII Scrub", "Encryption", "Sovereignty"]
                }
              ].map((useCase, i) => (
                <div key={i} className="flex flex-col gap-10 p-10 glass-card bg-[#0a0a0b]/60 border-white/5 rounded-[2.5rem] group hover:bg-indigo-500/[0.03] hover:border-indigo-500/20 transition-all duration-500 glow-border">
                   <div className="flex items-center justify-between">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center border border-white/5 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                         <useCase.icon className="w-7 h-7" />
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Expected ROI</p>
                         <p className="text-sm font-black text-white italic tracking-tighter uppercase">{useCase.roi}</p>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{useCase.role}</h3>
                        <p className="text-[12px] text-zinc-400 leading-relaxed font-bold uppercase tracking-widest opacity-80">{useCase.desc}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 pt-4">
                         {useCase.tags.map(tag => (
                           <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-zinc-200 transition-colors">
                              {tag}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Trust Wall - Corporate Standard */}
      <section className="w-full py-32 bg-[#020203] border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col items-center">
           <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-20 animate-pulse">Standardized by Elite Revenue Engines</p>
           <div className="flex flex-wrap justify-center items-center gap-x-24 gap-y-16 opacity-10 grayscale brightness-200">
              {['Amazon', 'NVIDIA', 'Vercel', 'Stripe', 'Mastercard', 'IBM'].map(p => (
                <span key={p} className="text-2xl font-black italic text-white uppercase tracking-tighter">{p}</span>
              ))}
           </div>
        </div>
      </section>

      {/* Strategic Outcome Section */}
      <section className="w-full py-56 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4f46e5]/[0.05] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-32 items-center">
           <div className="glass-card bg-[#0a0a0b] p-2 rounded-[3rem] border-white/5 shadow-3xl glow-border">
              <div className="bg-black p-12 rounded-[2.5rem] space-y-10">
                 <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-4">Revenue Health Index</h4>
                 <div className="space-y-6">
                    {[
                      { l: "Commit Propensity", v: 84, color: "bg-indigo-500" },
                      { l: "Stakeholder Alignment", v: 92, color: "bg-emerald-500" },
                      { l: "Friction Point Vector", v: 12, color: "bg-rose-500" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
                            <span className="text-zinc-400">{item.l}</span>
                            <span className="text-white">{item.v}%</span>
                         </div>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: `${item.v}%` }}
                               transition={{ duration: 1.5, delay: i * 0.1 }}
                               className={cn("h-full shadow-[0_0_15px_rgba(0,0,0,1)]", item.color)} 
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="space-y-10">
              <h2 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none italic uppercase">Signal <br /> to Logic.</h2>
              <p className="text-xl text-zinc-400 font-black leading-relaxed uppercase tracking-widest opacity-80">Synthex analyzes linguistic patterns and acoustic markers to extract the deterministic truth behind every enterprise deal.</p>
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                       <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    </div>
                    <span className="text-[12px] font-black text-white uppercase tracking-widest">Automated Strategic Gap Analysis</span>
                 </div>
                 <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-[12px] font-black text-white uppercase tracking-widest">Real-time objection mapping</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
      
      {/* PROFESSIONAL FINAL CTA */}
      <section className="w-full py-64 bg-[#020203] text-center border-t border-white/5 relative">
        <div className="absolute bottom-0 inset-x-0 h-[600px] bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-8 flex flex-col items-center relative z-10">
           <h3 className="text-6xl lg:text-9xl font-black text-white tracking-tighter mb-12 leading-[0.8] italic uppercase">Provision <br /> Intelligence.</h3>
           <p className="text-xl text-zinc-400 mb-16 font-black uppercase tracking-[0.2em] opacity-80">Join 2,000+ elite revenue engines transforming <br/> their pipeline with intelligence protocols.</p>
           <div className="flex flex-col sm:flex-row items-center gap-10">
              <Link to="/upload" className="px-16 py-6 bg-white text-black font-black text-xs rounded-2xl uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] group flex items-center gap-4 active:scale-95">
                 Launch Platform <Zap className="w-5 h-5 fill-black" />
              </Link>
              <Link to="/signup" className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors">Request Regional Access</Link>
           </div>
        </div>
      </section>

      {/* Footer Audit */}
      <footer className="w-full py-12 px-8 border-t border-white/5 flex items-center justify-between opacity-40">
         <div className="flex items-center gap-4">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Synthex Security Protocol v4.2 // SOC2 Type II Verified</span>
         </div>
         <span className="text-[10px] font-black uppercase tracking-widest">© 2026 Synthex Revenue Intelligence OS</span>
      </footer>
    </div>
  )
}

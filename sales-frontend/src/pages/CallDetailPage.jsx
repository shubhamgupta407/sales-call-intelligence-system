import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Link as LinkIcon, 
  MessageSquare, Clock, ShieldAlert, Zap, CheckCircle2, Bot, 
  Target, Users, Share2, MoreVertical, Search, Filter, Calendar,
  BarChart3, Mail, UserCheck, Quote, Activity, Briefcase, TrendingUp,
  Presentation, Clipboard, ClipboardCheck, ArrowRight
} from "lucide-react"
import { Card, CardContent } from "../components/ui/Card"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { useCallStore } from "../lib/callStore"

const highlightKeywords = (text) => {
  const keywords = ['pricing', 'urgent', 'proposal', 'budget', 'timeline', 'roi', 'security', 'maintenance'];
  const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  
  if (!text) return text;
  
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (keywords.some(k => k.toLowerCase() === part.toLowerCase())) {
      return <span key={i} className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-md font-bold">{part}</span>;
    }
    return part;
  });
};

export default function CallDetailPage() {
  const { id } = useParams()
  const { calls } = useCallStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("transcript")
  const [copied, setCopied] = useState(false)

  const call = calls.find(c => c.id === id)

  if (!call) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Users className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Session Unreachable</h2>
        <p className="text-xs text-zinc-500 font-medium max-w-[280px] text-center">The specific session data has been purged or does not exist in the current index.</p>
        <Link to="/dashboard" className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-xl shadow-indigo-500/20">Return to Index</Link>
      </div>
    )
  }

  const handleCopy = () => {
    if (!call.follow_up_email_draft) return
    navigator.clipboard.writeText(call.follow_up_email_draft)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fallbackTranscript = [
    { speaker: "John (Account Exec)", time: "00:03", text: "Hey Sarah, thanks for hopping on. How's your week going?", role: "internal" },
    { speaker: "Sarah (VP Eng)", time: "00:15", text: "Going well! Just wrapped up a sprint planning session. Ready to dive into this.", role: "external" },
    { speaker: "John (Account Exec)", time: "00:22", text: "Awesome. So, in our last sync, you mentioned that your team was struggling with manual QA processes taking up to 30% of their time.", role: "internal" },
    { speaker: "Sarah (VP Eng)", time: "00:45", text: "Yeah, exactly. The automation we have currently is brittle. We're looking for something that leverages AI to self-heal tests.", role: "external", highlight: "signal" },
    { speaker: "John (Account Exec)", time: "01:05", text: "That's perfectly aligned with Synthex. Let me show you how our self-healing module works...", role: "internal" },
    { speaker: "Sarah (VP Eng)", time: "05:12", text: "This looks great, but honestly the pricing tier seems a bit steep for a mid-sized team like ours compared to Selenium.", role: "external", highlight: "objection" },
    { speaker: "John (Account Exec)", time: "06:45", text: "I understand. Many of our Enterprise partners felt the same initially until they saw the 400% ROI in maintenance hours...", role: "internal" },
  ]

  return (
    <div className="relative space-y-8 pb-20 min-h-screen">
      {/* Cinematic Forensic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-4">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] relative group">
             <div className="absolute inset-0 bg-white/20 blur-xl rounded-full group-hover:scale-150 transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
             <Users className="w-10 h-10 text-white relative z-10" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">{call.prospect || "Unknown Account"}</h1>
              <div className={cn(
                "px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border-2 italic",
                call.intent?.toLowerCase() === 'high' ? "bg-emerald-500/10 text-emerald-400 border-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.2)]" :
                call.intent?.toLowerCase() === 'medium' ? "bg-amber-500/10 text-amber-400 border-amber-400/20" :
                "bg-rose-500/10 text-rose-400 border-rose-400/20"
              )}>
                 {call.intent || "Unknown"} Propensity
              </div>
            </div>
            <div className="flex items-center gap-6 text-[11px] text-zinc-500 font-black uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-indigo-500" /> {new Date(call.date || Date.now()).toLocaleDateString()}</span>
              <span className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-indigo-500" /> {call.duration || "00:00"}</span>
              <span className="flex items-center gap-2.5 opacity-40">System SID: {String(call.id).slice(-12).toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-3 px-8 py-4 glass-card bg-white/5 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:shadow-lg transition-all shadow-2xl active:scale-[0.98]">
            <Share2 className="w-4 h-4 text-indigo-400" /> Export Session Audit
          </button>
          <button className="p-4 bg-indigo-600 text-white rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:scale-105 transition-all active:scale-95">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Forensic Deck */}
        <div className="lg:col-span-3 space-y-8">
          {/* Neural Audio Console */}
          <Card className="glass-card bg-[#0a0a0b]/60 border-white/5 glow-border rounded-3xl overflow-hidden">
             <div className="p-8 border-b border-white/[0.03] flex items-center justify-between bg-black/40 backdrop-blur-3xl">
                <div className="flex items-center gap-6">
                   <button className="text-zinc-600 hover:text-white transition-colors"><SkipBack className="w-6 h-6" /></button>
                   <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-3xl hover:scale-110 active:scale-90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] group relative"
                   >
                      <div className="absolute inset-0 bg-white/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {isPlaying ? <Pause className="w-7 h-7 relative z-10" /> : <Play className="w-7 h-7 ml-1 relative z-10" />}
                   </button>
                   <button className="text-zinc-600 hover:text-white transition-colors"><SkipForward className="w-6 h-6" /></button>
                </div>
                <div className="flex-1 px-12 relative">
                   <div className="h-16 flex items-end gap-1 overflow-hidden">
                      {[...Array(100)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          animate={{ height: isPlaying ? [
                            `${Math.random() * 80 + 20}%`, 
                            `${Math.random() * 80 + 20}%`, 
                            `${Math.random() * 80 + 20}%`
                          ] : "20%" }}
                          transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                          className={cn(
                           "flex-1 rounded-full transition-all duration-700",
                           i < (isPlaying ? 45 : 35) ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-white/5'
                        )} />
                      ))}
                   </div>
                   <div className="absolute -top-6 left-12 text-[8px] font-black text-indigo-500 uppercase tracking-[0.4em] animate-pulse">Audio Stream Active</div>
                </div>
                <div className="text-[12px] font-black text-white tabular-nums uppercase tracking-[0.2em] font-mono pl-6">15:02 <span className="text-zinc-600">/ {call.duration || "45:12"}</span></div>
             </div>

             {/* Forensic Navigation Matrix */}
             <div className="flex border-b border-white/[0.03] bg-black/20">
                <button 
                  onClick={() => setActiveTab("transcript")}
                  className={cn(
                    "flex-1 py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative border-r border-white/[0.03]",
                    activeTab === "transcript" ? "text-white bg-white/[0.02]" : "text-zinc-600 hover:text-zinc-400"
                  )}
                >
                   Conversation Transcript
                  {activeTab === "transcript" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-white shadow-[0_-5px_15px_rgba(255,255,255,0.2)]" />}
                </button>
                <button 
                  onClick={() => setActiveTab("intel")}
                  className={cn(
                    "flex-1 py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative",
                    activeTab === "intel" ? "text-white bg-white/[0.02]" : "text-zinc-600 hover:text-zinc-400"
                  )}
                >
                   Intelligence Audit
                  {activeTab === "intel" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 shadow-[0_-5px_15px_rgba(99,102,241,0.4)]" />}
                </button>
             </div>

             {/* Deck Content */}
             <div className="h-[750px] overflow-y-auto custom-scrollbar bg-transparent">
                <AnimatePresence mode="wait">
                   {activeTab === "transcript" ? (
                     <motion.div 
                        key="transcript"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="divide-y divide-white/[0.03]"
                      >
                         {(call.transcript || fallbackTranscript).map((line, i) => (
                          <div key={i} className={cn(
                            "group flex gap-10 p-10 transition-all border-l-[6px] relative overflow-hidden",
                            line.highlight === 'objection' ? "border-rose-500 bg-rose-500/[0.02]" :
                            line.highlight === 'signal' ? "border-emerald-500 bg-emerald-500/[0.02]" :
                            "border-transparent hover:bg-white/[0.01]"
                          )}>
                             {line.highlight && (
                                <div className={cn(
                                   "absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10",
                                   line.highlight === 'objection' ? "bg-rose-500" : "bg-emerald-500"
                                )} />
                             )}
                            <div className="w-20 text-[11px] font-black text-zinc-700 font-mono pt-1 text-right tabular-nums tracking-widest">
                               {line.time}
                            </div>
                            <div className="flex-1 relative z-10">
                              <div className="flex items-center gap-4 mb-4">
                                <span className={cn(
                                  "text-[10px] font-black uppercase tracking-[0.3em]",
                                  line.role === 'internal' ? "text-indigo-400" : "text-white"
                                )}>
                                  {line.speaker}
                                </span>
                                {line.highlight && (
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-2xl",
                                    line.highlight === 'objection' ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
                                  )}>
                                     {line.highlight}
                                  </span>
                                )}
                              </div>
                              <p className="text-[15px] font-medium text-zinc-300 leading-[1.8] max-w-4xl tracking-tight">
                                {highlightKeywords(line.text)}
                              </p>
                            </div>
                          </div>
                        ))}
                     </motion.div>
                   ) : (
                     <motion.div 
                        key="intel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-12 space-y-12"
                      >
                         {/* Executive Intelligence Briefing */}
                         <div className="space-y-8">
                            <div className="flex items-center gap-4">
                               <div className="h-px flex-1 bg-white/[0.03]" />
                               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Executive Summary</h3>
                               <div className="h-px flex-1 bg-white/[0.03]" />
                            </div>
                            <Card className="p-12 glass-card border-white/5 bg-[#0a0a0b]/60 glow-border relative overflow-hidden group">
                               <Quote className="absolute -top-4 -right-4 w-32 h-32 text-indigo-500/5 group-hover:scale-125 transition-transform duration-1000" />
                               <p className="text-2xl font-black text-white leading-relaxed italic border-l-[6px] border-indigo-500 pl-10 tracking-tighter">
                                   "{call.call_summary || call.summary || "Summary generation in progress."}"
                                </p>
                            </Card>
                         </div>

                         {/* Metric Nodes */}
                         <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 glass-card bg-indigo-600/5 border-white/5 rounded-3xl glow-border space-y-6">
                               <div className="flex items-center justify-between">
                                  <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Intent Analysis</h4>
                                  <Zap className="w-5 h-5 text-indigo-500" />
                               </div>
                               <div className="inline-flex px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(79,70,229,0.3)] italic">
                                  {call.customer_intent?.level || call.intent} Profile
                               </div>
                               <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest leading-relaxed opacity-80 italic border-l-2 border-indigo-500/20 pl-6">
                                   {call.customer_intent?.reason || "Reasoning verified by analysis."}
                               </p>
                            </div>

                            <div className="p-8 glass-card bg-[#0a0a0b]/60 border-white/5 rounded-3xl glow-border space-y-8">
                               <div className="flex items-center justify-between">
                                  <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Sentiment Calibration</h4>
                                  <Activity className="w-5 h-5 text-emerald-400" />
                               </div>
                               <div className="flex gap-12">
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Macro Polarity</p>
                                     <p className="text-3xl font-black text-white uppercase italic tracking-tighter">{call.sentiment_analysis?.overall || "Neutral"}</p>
                                  </div>
                                  <div className="w-px h-12 bg-white/[0.05]" />
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Audit Confidence</p>
                                     <p className="text-3xl font-black text-indigo-500 italic tracking-tighter">{Math.floor((call.sentiment_analysis?.confidence || 0.85) * 100)}%</p>
                                  </div>
                               </div>
                            </div>

                            {/* Propensity Nodes */}
                            <div className="col-span-full space-y-6">
                               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-2">Verified Propensity Signals</h4>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {(call.buying_signals || ["Pricing Alignment", "Security Audit", "Technical Drift"]).map((sig, i) => (
                                     <motion.div 
                                      whileHover={{ y: -4 }}
                                      key={i} 
                                      className="p-6 glass-card bg-emerald-500/5 border-emerald-500/10 rounded-2xl flex justify-between items-center group transition-all"
                                     >
                                        <span className="text-[12px] font-black text-white uppercase tracking-widest">{sig.signal || sig}</span>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(52,211,153,1)]" />
                                     </motion.div>
                                  ))}
                               </div>
                            </div>

                            {/* Macro Findings */}
                            <div className="col-span-full space-y-6">
                               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-2">Intelligence Quotes Log</h4>
                               <div className="grid gap-6">
                                  {(call.key_quotes || ["We need to solve the manual overhead issue by Q3.", "Budget is fixed, but ROI is the primary driver for this project."]).map((q, i) => (
                                     <div key={i} className="p-8 glass-card bg-white/[0.01] border-white/5 rounded-3xl relative hover:bg-white/[0.02] transition-colors">
                                        <Quote className="w-6 h-6 text-indigo-500 opacity-20 absolute top-6 left-6" />
                                        <p className="text-[15px] text-zinc-400 font-bold italic pl-10 leading-relaxed tracking-tight">"{q}"</p>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         </div>

                         {/* Artifact Deck */}
                         <div className="space-y-8 pt-8">
                            <div className="flex items-center justify-between">
                              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-2">AI Artifact Generation</h3>
                              <button onClick={handleCopy} className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-200 hover:shadow-lg transition-all shadow-2xl active:scale-[0.98] flex items-center gap-3">
                                 {copied ? <>Copied Index <CheckCircle2 className="w-4 h-4" /></> : <>Optimize & Copy <Clipboard className="w-4 h-4" /></>}
                              </button>
                            </div>
                            <Card className="p-12 glass-card bg-black border-white/5 rounded-[2rem] glow-border shadow-3xl">
                               <div className="bg-[#050505] p-10 rounded-2xl text-[13px] text-indigo-400/80 font-mono leading-loose whitespace-pre-wrap border border-white/[0.02] opacity-80">
                                  {call.follow_up_email_draft || "// Secure protocol established. Draft pending extraction."}
                               </div>
                            </Card>
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </Card>
        </div>

        {/* Strategic Analysis Sidebar */}
        <div className="space-y-8">
          {/* Neural NBA Node */}
          <Card className="bg-indigo-600 p-10 text-white border-none shadow-[0_0_80px_rgba(79,70,229,0.3)] relative overflow-hidden group rounded-[2.5rem] flex flex-col justify-between min-h-[500px]">
             <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-125 transition-transform duration-1000" />
             <div className="relative z-10 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-3xl flex items-center justify-center mb-10 border border-white/20 shadow-inner group-hover:rotate-12 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase italic leading-tight">Next Best <br/> Action</h3>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Priority: {call.next_best_action?.priority || "High"}</p>
              
              <div className="p-8 glass-card bg-white text-indigo-600 rounded-3xl text-[15px] font-black shadow-2xl leading-relaxed italic mb-10">
                 {call.next_best_action?.action || "Execute strategic sync with DM regarding pricing drift."}
              </div>

              <div className="space-y-4">
                 {[
                   { label: "Pipeline Owner", val: call.next_best_action?.owner || "Master Account" },
                   { label: "Commit Propensity", val: `${call.lead_score || 72}%` },
                   { label: "Strategic Drift", val: "High" }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center px-5 py-3 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200 opacity-60">{stat.label}</span>
                      <span className="text-[11px] font-black uppercase text-white tracking-widest">{stat.val}</span>
                   </div>
                 ))}
              </div>
            </div>
          </Card>

          {/* Objection Matrix */}
          <div className="p-10 glass-card bg-[#0a0a0b]/60 border-white/5 rounded-[2.5rem] glow-border space-y-10 shadow-3xl">
            <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] flex items-center gap-3">
               <ShieldAlert className="w-5 h-5 text-rose-500" /> Objection Analysis
            </h4>
            <div className="space-y-6">
               {(call.objections || ["Pricing Sensitivity", "Technical Debt Risk"]).map((obj, i) => (
                  <div key={i} className="p-8 glass-card bg-rose-500/5 border-rose-500/10 rounded-3xl space-y-4 group hover:bg-rose-500/10 transition-all">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">{obj.type || obj}</span>
                        <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,1)]" />
                     </div>
                     <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest leading-relaxed italic opacity-80">
                        "{obj.quote || "Initial resistance regarding implementation velocity detected."}"
                     </p>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

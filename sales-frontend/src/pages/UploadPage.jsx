import { useState, useEffect } from "react"
import { 
  Mic,
  FileText, 
  Bot, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  ShieldAlert,
  Zap,
  RotateCcw,
  MessageSquare,
  BarChart3,
  Mail,
  Target,
  Activity,
  ShieldCheck,
  BrainCircuit,
  Download,
  Send,
  Database
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCallStore } from "../lib/callStore"
import { cn } from "../lib/utils"
import { api } from "../lib/api"

function LoadingStep({ step, index, total }) {
  const [status, setStatus] = useState('waiting'); // waiting, active, done
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('active');
      const doneTimer = setTimeout(() => {
        setStatus('done');
      }, 1500);
      return () => clearTimeout(doneTimer);
    }, index * 1500);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="space-y-3 flex flex-col items-center">
      <div className={cn(
        "w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500",
        status === 'waiting' && "bg-white/5 border-white/5 text-zinc-700",
        status === 'active' && "bg-indigo-500/20 border-indigo-500/50 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] animate-pulse",
        status === 'done' && "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
      )}>
        {status === 'done' ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
      </div>
      <p className={cn(
        "text-[8px] font-black uppercase tracking-widest transition-colors duration-500 text-center",
        status === 'waiting' && "text-zinc-700",
        status === 'active' && "text-indigo-400",
        status === 'done' && "text-emerald-400"
      )}>
        {step.label}
      </p>
    </div>
  );
}

// ─── Normalize raw backend response into a safe, predictable shape ───────────
function normalizeResult(raw) {
  return {
    deal_health:          typeof raw.deal_health === 'number'      ? raw.deal_health : (raw.lead_score ?? 72),
    summary_actionable:   raw.summary_actionable || raw.summary || "Strategic analysis complete. Review action directives.",
    email_draft:          raw.follow_up_email_draft || raw.email_draft || "No email draft generated.",
    intent:               raw.intent || "Medium",
    sentiment:            raw.sentiment || "Positive",
    next_best_action:     raw.next_best_action || { action: "Schedule follow-up sync with decision maker.", priority: "High" },

    closing_readiness: Array.isArray(raw.closing_readiness)
      ? raw.closing_readiness
      : [
          { metric: "Budget Alignment",   score: raw.lead_score ?? 70, status: "Verified" },
          { metric: "Timeline Clarity",   score: Math.max(0, (raw.lead_score ?? 70) - 10), status: "Pending" },
          { metric: "Decision Authority", score: Math.max(0, (raw.lead_score ?? 70) - 5),  status: "Confirmed" },
        ],

    action_items: Array.isArray(raw.action_items)
      ? raw.action_items
      : (raw.coaching_tips || []).map(tip => ({ action: tip })).concat([
          { action: "Schedule discovery call with economic buyer" },
          { action: "Send ROI summary to stakeholder group" },
        ]).slice(0, 4),

    objections: Array.isArray(raw.objections)
      ? raw.objections
      : (raw.objections_identified || []).map(o => ({ type: o, quote: "Resistance detected during session." })),

    transcript_log: Array.isArray(raw.transcript_log)
      ? raw.transcript_log
      : [],

    // pass through everything else
    ...raw,
  }
}

export default function UploadPage() {
  const [transcript, setTranscript] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const { addCall } = useCallStore()

  const handleAnalyze = async () => {
    if (!transcript.trim()) return
    
    setError(null)
    setAnalyzing(true)
    setAnalysisResult(null)

    try {
      const rawData = await api.calls.analyze(transcript)
      const data = normalizeResult(rawData)
      setAnalysisResult(data)
      
      await addCall(data, { 
        prospect: transcript.slice(0, 32).trim() + "...", 
        duration: data.duration || "04:12",
        revenue: data.lead_score ? data.lead_score * 1000 : 12000
      })
    } catch (err) {
      setError(err.message || "Analysis engine failure. Verify connection.")
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="relative space-y-8 min-h-screen pb-20">
      {/* Cinematic Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Revenue Intelligence Deck</h1>
        <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.3em] flex items-center gap-3">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Secure Connection Active // {analysisResult ? "Report Finalized" : "Ready for Analysis"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ── INPUT STATE ── */}
        {!analysisResult && !analyzing && (
           <motion.div 
            key="input-terminal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-4xl mx-auto mt-12"
           >
             <div className="glass-card border-white/5 glow-border p-10 bg-[#0a0a0b]/60 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col items-center text-center space-y-6 mb-10">
                   <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.4)] relative">
                      <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse" />
                      <BrainCircuit className="w-10 h-10 text-white relative z-10" />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Analyze Session Transcript</h2>
                      <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                         Synthex will execute multi-layered analysis to map <br/>
                         intent vectors and revenue opportunities.
                      </p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="relative group">
                      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                      <textarea
                        className="w-full h-64 bg-black/60 border border-white/5 rounded-2xl p-8 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all font-mono leading-relaxed relative z-10 resize-none"
                        placeholder="Paste enterprise session transcript here..."
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                      />
                      <div className="absolute bottom-4 right-6 text-[9px] font-black text-zinc-700 uppercase tracking-widest z-10">
                         {transcript.length.toLocaleString()} Symbols
                      </div>
                   </div>

                   {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-500 text-[10px] font-black uppercase tracking-widest"
                      >
                         <AlertCircle className="w-4 h-4 flex-shrink-0" /> Index Rejection: {error}
                      </motion.div>
                   )}

                   <button
                    onClick={handleAnalyze}
                    disabled={!transcript.trim() || analyzing}
                    className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
                   >
                     <>Analyze Conversation Data <Zap className="w-4 h-4 fill-black" /></>
                   </button>
                </div>
             </div>

             <div className="mt-10 grid grid-cols-3 gap-6 opacity-40">
                {[
                   { label: "Intent Analysis", detail: "Deep Pattern Detection" },
                   { label: "Sentiment Index", detail: "Emotional Calibration" },
                   { label: "Strategic Drift", detail: "Handling Calibration" }
                ].map((feat, i) => (
                   <div key={i} className="flex flex-col items-center text-center space-y-2">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                      <p className="text-[9px] font-black text-white uppercase tracking-widest">{feat.label}</p>
                      <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{feat.detail}</p>
                   </div>
                ))}
             </div>
           </motion.div>
        )}

        {/* ── ANALYZING STATE ── */}
        {analyzing && (
          <motion.div 
            key="analyzing-cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center text-center p-10 overflow-hidden"
          >
             {/* Dynamic background effects */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

             <div className="relative z-10 space-y-16 max-w-2xl w-full">
                <div className="relative flex justify-center">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="w-56 h-56 rounded-full border border-dashed border-indigo-500/20"
                   />
                   <motion.div 
                     animate={{ rotate: -360 }}
                     transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-4 rounded-full border border-indigo-500/30"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-[0_0_100px_rgba(79,70,229,0.5)] border border-white/20">
                         <motion.div
                           animate={{ scale: [1, 1.1, 1] }}
                           transition={{ duration: 2, repeat: Infinity }}
                         >
                            <BrainCircuit className="w-10 h-10 text-white" />
                         </motion.div>
                      </div>
                   </div>
                   
                   {/* Orbiting data particles */}
                   {[...Array(5)].map((_, i) => (
                     <motion.div
                        key={i}
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 3 + i, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                        className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-[2px]"
                        style={{ 
                          top: '50%', 
                          left: '50%',
                          marginTop: -1,
                          marginLeft: -1,
                          transformOrigin: `${120 + i * 20}px center` 
                        }}
                     />
                   ))}
                </div>

                <div className="space-y-10">
                   <div className="space-y-2">
                      <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Revenue intelligence pipeline</h2>
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.4em]">Executing Signal Analysis</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="grid grid-cols-5 gap-4">
                        {[
                          { label: "Analyzing acoustic markers...", icon: Mic },
                          { label: "Extracting semantic signals...", icon: Zap },
                          { label: "Generating intelligence deck...", icon: Database },
                          { label: "Scoring opportunity...", icon: Target },
                          { label: "Building action directives...", icon: FileText }
                        ].map((step, i) => (
                          <LoadingStep key={i} step={step} index={i} total={5} />
                        ))}
                      </div>
                      
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                         <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 8, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                         />
                      </div>
                   </div>
                </div>
             </div>

             {/* Terminal logs floating */}
             <div className="absolute bottom-10 left-10 text-left font-mono text-[8px] text-zinc-600 space-y-1 hidden lg:block">
                <p>&gt; INGEST_STREAM: 2048KB/S</p>
                <p>&gt; VECTOR_COMPUTE: 1536_DIM_SPACE</p>
                <p>&gt; CLUSTER_SYNC: SUCCESS</p>
                <p>&gt; LLM_REASONING_ENGINE: BOOTING...</p>
             </div>
          </motion.div>
        )}

        {/* ── RESULTS STATE ── */}
        {analysisResult && (
           <motion.div 
            key="analysis-results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="space-y-8"
           >
              {/* Sticky Action Bar */}
              <div className="sticky top-0 z-50 bg-[#020202]/80 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex items-center justify-between shadow-2xl">
                 <div className="flex items-center gap-4">
                    <div className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                       Draft v2.4
                    </div>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Report finalized // Encryption Verified</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 hover:shadow-md transition-all active:scale-[0.98]">
                       <Download className="w-3.5 h-3.5" /> Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 hover:shadow-md transition-all active:scale-[0.98]">
                       <Send className="w-3.5 h-3.5" /> Push to CRM
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-105 active:scale-95 transition-all">
                       Save Intelligence Session
                    </button>
                 </div>
              </div>

              {/* ── 3-Column Intelligence Deck ── */}
              <div className="grid grid-cols-12 gap-6 h-[calc(100vh-240px)] min-h-[700px]">

                {/* Col 1: Metrics */}
                <div className="col-span-12 lg:col-span-3 space-y-6 overflow-y-auto pr-1">
                  
                  {/* Deal Health Score */}
                  <div className="glass-card border-white/5 glow-border p-6 flex flex-col items-center justify-between min-h-[280px]">
                    <div className="text-center space-y-1">
                      <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Deal Score Index</h3>
                      <p className="text-lg font-black text-white tracking-tighter uppercase italic">Commit Score</p>
                    </div>
                    
                    <div className="relative py-4">
                       <svg className="w-36 h-36 transform -rotate-90 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                         <circle cx="68" cy="68" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                         <motion.circle 
                           cx="68" cy="68" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                           strokeDasharray={364}
                           strokeDashoffset={364 - (364 * Math.min(100, Math.max(0, analysisResult.deal_health))) / 100}
                           transition={{ duration: 2, ease: "easeOut" }}
                           className="text-indigo-500" 
                           strokeLinecap="round"
                         />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-3xl font-black text-white tracking-tighter">{analysisResult.deal_health}%</span>
                         <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mt-1">Propensity</span>
                       </div>
                    </div>

                    <div className="w-full space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                         <span>Intent Signal</span>
                         <span className="text-indigo-400">{analysisResult.intent || "Medium"}</span>
                      </div>
                      <div className="flex justify-between text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                         <span>Sentiment</span>
                         <span className="text-emerald-400">{analysisResult.sentiment || "Positive"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Closing Readiness */}
                  <div className="glass-card border-white/5 glow-border p-6 space-y-5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                       </div>
                       <h3 className="text-[10px] font-black text-white uppercase tracking-widest italic">Intent Analysis</h3>
                    </div>
                    
                    <div className="space-y-5">
                       {(analysisResult.closing_readiness || []).map((item, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center">
                               <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{item.metric}</span>
                               <span className={`text-[9px] font-black uppercase ${(item.score || 0) > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{item.status}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${Math.min(100, item.score || 0)}%` }}
                                 transition={{ duration: 1.5, delay: i * 0.1 }}
                                 className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Col 2: Briefing + Email */}
                <div className="col-span-12 lg:col-span-5 space-y-6 overflow-y-auto pr-1">
                   
                   {/* Intelligence Briefing */}
                   <div className="glass-card border-white/5 glow-border p-8 space-y-8 bg-[#0a0a0b]/80">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <FileText className="w-4 h-4 text-indigo-400" />
                           <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Intelligence Briefing</h3>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 via-indigo-500/10 to-transparent" />
                      </div>

                      <div className="space-y-6">
                         <div className="space-y-3">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Executive Summary</p>
                           <p className="text-zinc-300 text-sm leading-relaxed font-medium italic opacity-90 border-l-2 border-indigo-500/30 pl-6 py-2">
                             {analysisResult.summary_actionable}
                           </p>
                         </div>

                         {(analysisResult.action_items || []).length > 0 && (
                           <div className="space-y-4 pt-6 border-t border-white/5">
                              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Action Directives</p>
                              <div className="space-y-3">
                                 {(analysisResult.action_items || []).map((action, i) => (
                                   <motion.div 
                                      key={i} 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] hover:border-indigo-500/20 transition-all"
                                   >
                                      <div className="w-5 h-5 rounded-md bg-indigo-500/20 flex items-center justify-center mt-0.5 border border-indigo-500/20 group-hover:bg-indigo-500 transition-all flex-shrink-0">
                                         <ArrowRight className="w-3 h-3 text-white" />
                                      </div>
                                      <p className="text-xs font-black uppercase tracking-widest text-zinc-300 leading-tight pt-1">
                                        {action.action || action}
                                      </p>
                                   </motion.div>
                                 ))}
                              </div>
                           </div>
                         )}
                      </div>
                   </div>

                   {/* Email Draft */}
                   <div className="glass-card border-white/5 glow-border p-8 space-y-6 bg-[#0a0a0b]/40">
                      <div className="flex items-center justify-between">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Follow-up</p>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest italic">Email Draft v1.4</h4>
                         </div>
                         <button 
                           onClick={() => navigator.clipboard?.writeText(analysisResult.email_draft || "")}
                           className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all"
                         >
                            Copy
                         </button>
                      </div>
                      <div className="bg-black/60 border border-white/5 p-6 rounded-2xl text-[11px] font-mono leading-relaxed text-zinc-400 max-h-52 overflow-y-auto whitespace-pre-wrap">
                         {analysisResult.email_draft}
                      </div>
                   </div>
                </div>

                {/* Col 3: Transcript Log */}
                <div className="col-span-12 lg:col-span-4 flex flex-col h-full">
                   <div className="glass-card border-white/5 glow-border flex-1 flex flex-col bg-[#0a0a0b]/80 overflow-hidden">
                      <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 z-10 bg-[#0a0a0b]/95 backdrop-blur">
                         <div className="space-y-1">
                             <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Conversation Transcript</h3>
                             <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Speaker Decomposition</p>
                         </div>
                         <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse" />
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-6 space-y-5">
                        {(analysisResult.transcript_log || []).length > 0 ? (
                          (analysisResult.transcript_log).map((msg, i) => {
                            const isSelf = (msg.speaker || "").toLowerCase().includes('me') || (msg.speaker || "").toLowerCase().includes('agent')
                            return (
                              <div key={i} className={`flex flex-col ${isSelf ? 'items-start' : 'items-end'} space-y-1`}>
                                 <span className={`text-[8px] font-black uppercase tracking-widest ${isSelf ? 'text-indigo-400' : 'text-zinc-500'}`}>
                                   {msg.speaker}
                                 </span>
                                 <div className={`max-w-[90%] p-4 rounded-2xl text-[11px] leading-relaxed font-bold ${
                                   isSelf 
                                     ? 'bg-indigo-600/10 border border-indigo-500/20 text-zinc-300 text-left' 
                                     : 'bg-white/5 border border-white/10 text-white text-right italic'
                                 }`}>
                                   {msg.text}
                                 </div>
                              </div>
                            )
                          })
                        ) : (
                          // Show raw transcript if no structured log
                          <div className="text-zinc-500 text-[11px] font-mono leading-relaxed whitespace-pre-wrap opacity-60">
                            {transcript}
                          </div>
                        )}
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Reset Button */}
              <div className="flex justify-center pt-4">
                 <button 
                  onClick={() => { setAnalysisResult(null); setTranscript(""); }}
                  className="px-8 py-4 text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-[0.3em] transition-all border border-white/5 rounded-2xl hover:bg-white/5 group"
                 >
                    System Override // <span className="group-hover:text-rose-500 transition-colors">Clear Session</span>
                 </button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

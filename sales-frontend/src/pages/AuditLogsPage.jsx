import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Download, MoreHorizontal, FileText, Database, ArrowRight, ShieldCheck, Clock, CheckCircle2, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { useCallStore } from "../lib/callStore"
import { cn } from "../lib/utils"

// High-fidelity fallback data in case of empty states
const DEMO_LOGS = [
  { id: "SESS-892A", prospect: "Acme Corp (Enterprise)", date: new Date().toISOString(), duration: "45:12", intent: "High", sentiment: "Positive", risk: "Low", revenue: 120000, status: "Analyzed" },
  { id: "SESS-741B", prospect: "Global Logistics Inc", date: new Date(Date.now() - 86400000).toISOString(), duration: "32:05", intent: "Medium", sentiment: "Neutral", risk: "Elevated", revenue: 45000, status: "Analyzed" },
  { id: "SESS-632C", prospect: "Quantum Tech SMB", date: new Date(Date.now() - 172800000).toISOString(), duration: "18:22", intent: "Low", sentiment: "Negative", risk: "High", revenue: 12000, status: "Flagged" },
  { id: "SESS-519D", prospect: "Stark Industries", date: new Date(Date.now() - 259200000).toISOString(), duration: "55:40", intent: "High", sentiment: "Positive", risk: "Low", revenue: 250000, status: "Analyzed" },
  { id: "SESS-408E", prospect: "Wayne Enterprises", date: new Date(Date.now() - 345600000).toISOString(), duration: "22:15", intent: "Medium", sentiment: "Positive", risk: "Low", revenue: 85000, status: "Analyzed" },
]

export default function AuditLogsPage() {
  const { calls: storeCalls } = useCallStore()
  const calls = storeCalls.length > 0 ? storeCalls : DEMO_LOGS
  
  const [searchTerm, setSearchTerm] = useState("")
  const [filterIntent, setFilterIntent] = useState("All")

  const filteredLogs = useMemo(() => {
    return calls.filter(call => {
      const matchesSearch = (call.prospect || "").toLowerCase().includes(searchTerm.toLowerCase()) || String(call.id || "").toLowerCase().includes(searchTerm.toLowerCase())
      const matchesIntent = filterIntent === "All" || (call.intent || "Unknown") === filterIntent
      return matchesSearch && matchesIntent
    })
  }, [calls, searchTerm, filterIntent])

  return (
    <div className="relative space-y-6 pb-20 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Historical Record</h2>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">Audit Logs</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
            <Download className="w-3.5 h-3.5" /> Export DB
          </button>
        </div>
      </div>

      {/* Advanced Control Bar */}
      <div className="glass-card bg-[#0a0a0b]/80 border-white/5 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 sticky top-20 z-40 backdrop-blur-3xl shadow-2xl">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors group-focus-within:text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search session hash, firm, or agent ID..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={filterIntent}
            onChange={(e) => setFilterIntent(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 focus:outline-none cursor-pointer hover:bg-white/10 transition-colors w-full md:w-auto"
          >
             <option value="All">All Intents</option>
             <option value="High">High Propensity</option>
             <option value="Medium">Medium Propensity</option>
             <option value="Low">Low Propensity</option>
          </select>
          <button className="h-11 w-11 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* High-Fidelity Data Table */}
      <div className="glass-card border-white/5 overflow-hidden bg-[#0a0a0b]/40 backdrop-blur-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px]">Session ID</th>
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px]">Timestamp</th>
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px]">Customer / Account</th>
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px]">Intent Level</th>
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px]">Risk Profile</th>
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px]">Pipeline Value</th>
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px]">Status</th>
                <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest text-[9px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              <AnimatePresence>
                {filteredLogs.map((log, idx) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                    className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Database className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                        <span className="font-mono text-[10px] text-zinc-400">{(String(log.id).slice(-8) || "UNK").toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Clock className="w-3.5 h-3.5 opacity-50" />
                        <span className="text-[11px]">{new Date(log.date || Date.now()).toLocaleDateString([], { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-white uppercase tracking-tight text-[11px]">{log.prospect || "Unknown"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border transition-all",
                        (log.intent || "Medium").toLowerCase() === 'high' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                        (log.intent || "Medium").toLowerCase() === 'medium' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-zinc-800/20 text-zinc-500 border-zinc-700/50'
                      )}>
                        {log.intent || "Medium"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          log.risk === 'High' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' :
                          log.risk === 'Elevated' ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' :
                          'bg-zinc-600'
                        )} />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{log.risk || "Low"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] font-bold text-emerald-400">
                      ${((log.revenue || log.lead_score * 1000) || 12000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> {log.status || "Analyzed"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/call/${log.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredLogs.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
              <Search className="w-8 h-8 text-zinc-700 mx-auto" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">No logs match your filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

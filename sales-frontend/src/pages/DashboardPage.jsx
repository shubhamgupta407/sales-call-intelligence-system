import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Users, Timer, TrendingUp, AlertCircle, ArrowRight, Zap, Target, BarChart3, Clock, Calendar, Search, Filter, MoreHorizontal, Download, Phone, RotateCcw, Activity } from "lucide-react"
import { Link } from "react-router-dom"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useCallStore } from "../lib/callStore"
import { InfoTooltip } from "../components/ui/InfoTooltip"

// Chart data is computed dynamically using calls history

export default function DashboardPage() {
  const { calls, loading, error, getMetrics, exportToCSV, clearStore, fetchCalls } = useCallStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const metrics = getMetrics()

  const filteredCalls = useMemo(() => {
    return calls.filter(call => {
      const prospect = call.prospect || "Unknown Prospect"
      const id = String(call.id || "")
      const matchesSearch = prospect.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || call.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [calls, searchTerm, statusFilter])

  const chartData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayCalls = calls.filter(c => new Date(c.date).toDateString() === d.toDateString());
      const successCalls = dayCalls.filter(c => c.intent === 'High' || c.intent === 'Medium');
      data.push({
        name: days[d.getDay()],
        calls: dayCalls.length,
        success: successCalls.length
      });
    }
    return data;
  }, [calls])

  return (
    <div className="relative space-y-8 pb-12 min-h-screen">
      {loading && (
        <div className="absolute inset-x-0 -top-4 z-50 flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl animate-in fade-in duration-500">
           <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Synchronizing Revenue Data</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between">
           <div className="flex items-center gap-3 text-rose-500 text-xs font-bold">
              <AlertCircle className="w-4 h-4" /> Connectivity Error: {error}
           </div>
           <button onClick={fetchCalls} className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black rounded uppercase tracking-widest">Retry Sync</button>
        </div>
      )}

      {/* Header (Cinematic) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Revenue Overview</h1>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Activity className="w-3 h-3 text-indigo-500 animate-pulse" /> Live Analysis Stream // Sync Active
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={clearStore}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-zinc-600 hover:text-rose-500 transition-colors uppercase tracking-widest border border-white/5 rounded-xl hover:bg-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Index
          </button>
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/5 rounded-2xl">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-xl text-[10px] font-black shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-all active:scale-95 uppercase tracking-widest"
            >
              <Download className="w-4 h-4" />
              Export Audit
            </button>
            <button className="p-2 text-zinc-500 hover:text-white transition-colors">
               <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Neural Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* Primary Action Node */}
        <Link to="/upload" className="lg:col-span-1 min-h-[160px] bg-indigo-600 p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.3)] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 active:scale-[0.98] flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700" />
           <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 mb-3 group-hover:rotate-12 transition-transform duration-500">
                 <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-tighter leading-tight">Analyze New Session</h3>
           </div>
           <div className="relative z-10 flex items-center gap-2 text-[10px] font-black text-white/90 uppercase tracking-widest mt-4">
              Access Insights <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
           </div>
        </Link>

        {[
          { 
            label: "Revenue Analyzed", 
            value: `$${(metrics.totalRevenue / 1000).toFixed(1)}K`, 
            trend: "+12.5%", icon: TrendingUp, color: "text-indigo-400", bg: "bg-indigo-500/10",
            formula: [{text: "Sum of Lead Score * $1000", type: "equal"}, {text: "Across all indexed sessions", type: "plus"}]
          },
          { 
            label: "Live Sessions", 
            value: metrics.totalCalls, 
            trend: "+18.2%", icon: Phone, color: "text-zinc-400", bg: "bg-zinc-500/10",
            formula: [{text: "Total authenticated calls", type: "equal"}, {text: "Excludes bounced sessions", type: "minus"}]
          },
          { 
            label: "Commit Propensity", 
            value: `${metrics.intentRate}%`, 
            trend: "+5.1%", icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10",
            formula: [{text: "Timeline Urgency", type: "plus"}, {text: "Pricing Agreement", type: "plus"}, {text: "Competitor Mentions", type: "minus"}]
          },
          { 
            label: "Detected Risks", 
            value: metrics.objections, 
            trend: "-2.4%", icon: AlertCircle, color: "text-rose-400", bg: "bg-rose-500/10",
            formula: [{text: "Feature Gaps", type: "plus"}, {text: "Budget Constraints", type: "plus"}, {text: "Security Stalls", type: "plus"}]
          }
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-6 border-white/5 glow-border group flex flex-col justify-between h-[160px] relative">
            <div className="absolute top-4 right-4 z-20">
              <InfoTooltip title={kpi.label} formula={kpi.formula} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 ${kpi.bg} border-white/5`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg border tracking-widest uppercase transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] ${kpi.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' : 'bg-rose-500/10 text-rose-400 border-rose-500/10'}`}>
                {kpi.trend}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1.5 pr-8">{kpi.label}</p>
              <p className="text-3xl font-black text-white tracking-tighter">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Matrix */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-8 border-white/5 glow-border">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Revenue Propagation</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Volume distribution // Intent mapping</p>
            </div>
            <div className="flex gap-8">
               <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                Raw Flow
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                Success Vector
              </div>
            </div>
          </div>
          <div className="h-[340px] w-full pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#52525b', fontSize: 10, fontWeight: 900}} 
                  dy={15}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a0a0b', 
                    border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: '16px', 
                    padding: '16px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, marginBottom: '4px' }}
                  labelStyle={{ color: '#52525b', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, marginBottom: '12px' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="calls" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
                <Area type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} fill="transparent" strokeDasharray="8 6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0b] text-white p-8 rounded-2xl shadow-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between group glow-border">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.03] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-500/5 transition-all duration-1000" />
          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform duration-500">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Deal Intelligence</span>
                <h3 className="text-xl font-black tracking-tighter uppercase italic mt-1">Conversation Audit</h3>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-zinc-400 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                Detected handling drift in <span className="text-indigo-400">PRICING LOGIC</span> across last {calls.length} sessions. 
                <span className="text-white block mt-3 border-l-2 border-indigo-500/30 pl-4 py-1">Critical Playbook refresh pending synchronization.</span>
              </p>
            </div>
            
            <div className="space-y-5">
               {[
                 { label: "Revenue Confidence", val: 82, color: "bg-indigo-500" },
                 { label: "Audit Entropy", val: 14, color: "bg-rose-500" }
               ].map((item, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500">
                       <span>{item.label}</span>
                       <span className="text-zinc-300">{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
                       />
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          <button className="relative z-10 mt-12 w-full py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10">
            Execute Strategy Sync
          </button>
        </div>
      </div>

      {/* Forensic Intelligence Log */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
              Intelligence Log
              <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[9px] text-indigo-400 font-black">{filteredCalls.length} SESSIONS</span>
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 transition-colors group-focus-within:text-indigo-400" />
              <input 
                type="text" 
                placeholder="Search sessions..." 
                className="bg-[#0a0a0b] border border-white/5 rounded-xl py-2 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 w-64 transition-all" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-[#0a0a0b] rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 outline-none cursor-pointer hover:bg-white/5 transition-colors"
            >
              <option value="All">All Status</option>
              <option value="Analyzed">Analyzed</option>
              <option value="Processing">Processing</option>
            </select>
          </div>
        </div>

        <div className="glass-card border-white/5 glow-border overflow-hidden bg-transparent">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-3xl">
                   <th className="px-8 py-5 font-black text-zinc-500 uppercase tracking-[0.2em] text-[10px]">Session Account</th>
                   <th className="px-8 py-5 font-black text-zinc-500 uppercase tracking-[0.2em] text-[10px]">Primary Contact</th>
                   <th className="px-8 py-5 font-black text-zinc-500 uppercase tracking-[0.2em] text-[10px]">Net Impact</th>
                   <th className="px-8 py-5 font-black text-zinc-500 uppercase tracking-[0.2em] text-[10px]">Intent Density</th>
                   <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-[#0a0a0b]/40">
                {filteredCalls.map((call, idx) => (
                  <motion.tr 
                    key={call.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-all duration-500">
                          <Target className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <div>
                          <p className="font-black text-white uppercase tracking-tighter text-sm">{call.prospect || "Universal Account"}</p>
                          <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest opacity-60">ID: {String(call.id).slice(-12)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-zinc-200 transition-colors">
                          {call.first_name ? `${call.first_name} ${call.last_name || ''}` : "Index System"}
                       </span>
                    </td>
                    <td className="px-8 py-5">
                       <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors tracking-tighter">${(call.revenue || 0).toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${
                        call.intent?.toLowerCase() === 'high' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 
                        call.intent?.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 
                        'bg-zinc-800/10 text-zinc-600 border-zinc-800/30'
                      }`}>
                        {call.intent || "Void"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Link to={`/call/${call.id}`} className="w-10 h-10 inline-flex items-center justify-center bg-white/5 text-zinc-500 hover:text-white hover:bg-indigo-600 rounded-xl transition-all border border-white/5 hover:border-indigo-500 shadow-xl shadow-transparent hover:shadow-indigo-500/40">
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredCalls.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <Search className="w-8 h-8 text-zinc-700 mx-auto" />
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">No sessions match your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

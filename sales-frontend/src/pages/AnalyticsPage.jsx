import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { TrendingUp, Shield, Zap, Target, ArrowUpRight, ArrowDownRight, Filter, Download, Info, BarChart3, Activity } from "lucide-react"
import { cn } from "../lib/utils"
import { Card } from "../components/ui/Card"
import { InfoTooltip } from "../components/ui/InfoTooltip"

const objectionData = [
  { name: 'Mon', Pricing: 40, Competitor: 24, Feature: 24 },
  { name: 'Tue', Pricing: 30, Competitor: 13, Feature: 22 },
  { name: 'Wed', Pricing: 20, Competitor: 98, Feature: 22 },
  { name: 'Thu', Pricing: 27, Competitor: 39, Feature: 20 },
  { name: 'Fri', Pricing: 18, Competitor: 48, Feature: 21 },
  { name: 'Sat', Pricing: 23, Competitor: 38, Feature: 25 },
  { name: 'Sun', Pricing: 34, Competitor: 43, Feature: 21 },
]

const sentimentData = [
  { subject: 'Interest', A: 120, B: 110, fullMark: 150 },
  { subject: 'Skepticism', A: 98, B: 130, fullMark: 150 },
  { subject: 'Urgency', A: 86, B: 130, fullMark: 150 },
  { subject: 'Engagement', A: 99, B: 100, fullMark: 150 },
  { subject: 'Knowledge', A: 85, B: 90, fullMark: 150 },
  { subject: 'Trust', A: 65, B: 85, fullMark: 150 },
]

const shareData = [
  { name: 'Enterprise', value: 400 },
  { name: 'Mid-Market', value: 300 },
  { name: 'SMB', value: 300 },
  { name: 'Public', value: 200 },
]

export default function AnalyticsPage() {
  return (
    <div className="relative space-y-8 pb-16 min-h-screen">
      {/* Cinematic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-2 font-mono">Macro Signal Matrix</h2>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">Revenue Intelligence</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 shadow-2xl backdrop-blur-3xl">
            <button className="px-6 py-2 rounded-xl bg-white text-black font-black text-[10px] uppercase shadow-inner transition tracking-widest">Global Index</button>
            <button className="px-6 py-2 rounded-xl text-zinc-400 font-black text-[10px] hover:text-white transition tracking-widest uppercase">Agent Analytics</button>
          </div>
          <button className="h-12 w-12 flex items-center justify-center bg-[#0a0a0b] border border-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all hover:border-indigo-500/50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Performance Nodes */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { 
            label: "Aggregate Sentiment", 
            value: "8.4", 
            trend: "+1.2", sub: "Positive outlook index spike", icon: Activity, color: "text-indigo-400",
            formula: [{text: "Positive Cues", type: "plus"}, {text: "Engagement Length", type: "plus"}, {text: "Skepticism", type: "minus"}]
          },
          { 
            label: "Response Velocity", 
            value: "1.2s", 
            trend: "-0.4", sub: "Optimized AI objection handling", icon: Zap, color: "text-amber-400",
            formula: [{text: "Average Agent Silence", type: "equal"}, {text: "Threshold < 2.0s", type: "plus"}]
          },
          { 
            label: "Commit Propensity", 
            value: "72%", 
            trend: "+5.4", sub: "Verified forecast accuracy", icon: Target, color: "text-emerald-400",
            formula: [{text: "Pricing Mentions", type: "plus"}, {text: "Timeline Set", type: "plus"}, {text: "No Decision Maker", type: "minus"}]
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 border-white/5 glow-border relative overflow-hidden group"
          >
            <div className="absolute top-4 right-4 z-20">
              <InfoTooltip title={stat.label} formula={stat.formula} />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.02] blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-none">{stat.label}</p>
              <stat.icon className={`w-4 h-4 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div className="flex items-baseline gap-4 mb-3 relative z-10">
              <span className="text-5xl font-black text-white tracking-tighter italic">{stat.value}</span>
              <span className={cn(
                "text-[10px] font-black flex items-center px-2 py-1 rounded-lg border uppercase tracking-widest",
                stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' : 'bg-rose-500/10 text-rose-400 border-rose-500/10'
              )}>
                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest relative z-10">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Forensic Visualization Matrix */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Radar Chart */}
        <Card className="lg:col-span-3 glass-card bg-[#0a0a0b]/40 p-10 border-white/5 glow-border">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Perspective Heatmap</h3>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Linguistic Emotion Calibration</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-indigo-500 animate-pulse" />
            </div>
          </div>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={sentimentData}>
                <PolarGrid stroke="rgba(255,255,255,0.03)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#52525b', fontSize: 10, fontWeight: 900 }} />
                <PolarRadiusAxis hide />
                <Radar name="Active Session" dataKey="A" stroke="#7c4dff" strokeWidth={2} fill="#7c4dff" fillOpacity={0.4} />
                <Radar name="Strategy Baseline" dataKey="B" stroke="#ffffff10" strokeWidth={1} fill="#ffffff05" fillOpacity={0.1} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', fontSize: '10px', fontWeight: 900, padding: '16px', color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="lg:col-span-2 bg-indigo-600 p-10 rounded-3xl shadow-[0_0_80px_rgba(79,70,229,0.2)] relative overflow-hidden flex flex-col justify-between group border-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white leading-tight mb-2 tracking-tighter uppercase italic">Market Segment <br /> Penetration</h3>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Revenue Velocity Index</p>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={shareData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                    {shareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#fff', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0.1)'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '16px', padding: '12px', fontSize: '10px', fontWeight: 900, color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-6">
            {shareData.map((item, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">{item.name}</span>
                <span className="text-xl font-black text-white tracking-tighter italic">{(item.value / 1200 * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Bar Chart */}
        <Card className="lg:col-span-5 glass-card bg-[#0a0a0b]/40 p-10 border-white/5 glow-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] italic">Resilience Matrix</h3>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Macro Objection Trajectories</p>
            </div>
            <div className="flex gap-4">
              {[
                { label: "Pricing Index", color: "bg-rose-500" },
                { label: "Competitor Vector", color: "bg-amber-400" },
                { label: "Intelligence Gap", color: "bg-indigo-500" }
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 text-[9px] font-black uppercase tracking-widest">
                  <div className={`w-2 h-2 rounded-full ${c.color}`} /> {c.label}
                </div>
              ))}
            </div>
          </div>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={objectionData} margin={{ top: 10 }}>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 10, fontWeight: 900 }} dy={20} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.02)', radius: 12 }}
                  contentStyle={{ backgroundColor: '#0a0a0b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px' }}
                  itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                  labelStyle={{ color: '#52525b', fontSize: '10px', fontWeight: 900 }}
                />
                <Bar dataKey="Pricing" stackId="a" fill="#f43f5e" radius={[2, 2, 0, 0]} barSize={40} />
                <Bar dataKey="Competitor" stackId="a" fill="#fbbf24" barSize={40} />
                <Bar dataKey="Feature" stackId="a" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Strategic Hub */}
      <div className="grid md:grid-cols-2 gap-6 pb-10">
        <motion.div whileHover={{ y: -5 }} className="glass-card bg-indigo-600/5 border-indigo-500/20 p-8 flex items-center gap-8 group glow-border">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_40px_rgba(79,70,229,0.3)] group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-white uppercase tracking-widest italic group-hover:text-indigo-400 transition-colors">Efficiency Delta</h4>
            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed opacity-80">
              Agent rebuttal perf improved by <span className="text-white">42.1%</span> via intelligence injection.
            </p>
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="glass-card bg-[#0a0a0b] border-white/5 p-8 flex items-center gap-8 group glow-border">
          <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center flex-shrink-0 shadow-[0_0_40px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform">
            <Target className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-white uppercase tracking-widest italic group-hover:text-indigo-400 transition-colors">Target Calibration</h4>
            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed opacity-80">
              Predictive modelling suggests <span className="text-white">18% Revenue Upside</span> with SMB sync.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

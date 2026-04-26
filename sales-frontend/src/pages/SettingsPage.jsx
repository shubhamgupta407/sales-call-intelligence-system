import { motion } from "framer-motion"
import { User, Shield, Bell, Zap, Globe, Key, Users, Smartphone, CreditCard, HelpCircle, LogOut, ChevronRight, CheckCircle2, Lock, Activity } from "lucide-react"
import { Card, CardContent } from "../components/ui/Card"

export default function SettingsPage() {
  const sections = [
    {
      title: "Account Intelligence",
      items: [
        { icon: User, label: "Profile Metadata", desc: "Enterprise administrator settings", action: "Manage", color: "indigo" },
        { icon: Shield, label: "Security & Access", desc: "Multi-factor authentication & SSO", action: "Configure", color: "violet" },
        { icon: Bell, label: "Global Notifications", desc: "AI insight alerts and report scheduling", action: "Edit", color: "blue" },
      ]
    },
    {
      title: "System Integrations",
      items: [
        { icon: Zap, label: "Synthex API Keys", desc: "Production and Staging environment keys", action: "Revoke/Issue", color: "amber" },
        { icon: Globe, label: "Webhooks", desc: "Real-time event stream endpoints", action: "Set up", color: "emerald" },
        { icon: Users, label: "Team Management", desc: "Seat allocation and regional access controls", action: "Manage", color: "indigo" },
      ]
    }
  ]

  const colorMap = {
    indigo: "group-hover:bg-indigo-600 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]",
    violet: "group-hover:bg-violet-600 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]",
    blue: "group-hover:bg-blue-600 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]",
    amber: "group-hover:bg-amber-500 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]",
    emerald: "group-hover:bg-emerald-600 group-hover:shadow-[0_0_25px_rgba(5,150,105,0.5)]",
  }

  return (
    <div className="relative space-y-10 pb-20 min-h-screen">
      {/* Cinematic Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-4 border-b border-white/[0.04] pb-10"
      >
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 font-mono">Infrastructure Configuration</p>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none">System Settings</h1>
          <p className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em] opacity-80">Environment calibration &amp; team access protocols</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 glass-card bg-emerald-500/5 border-emerald-500/20 rounded-2xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">All Systems Nominal</span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-12">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 font-mono whitespace-nowrap">{section.title}</h3>
                <div className="h-px flex-1 bg-white/[0.03]" />
              </div>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className={`group flex items-center justify-between p-6 glass-card bg-[#0a0a0b]/60 border-white/[0.05] glow-border cursor-pointer transition-all duration-300 hover:bg-white/[0.02]`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-zinc-600 group-hover:text-white transition-all duration-500 ${colorMap[item.color]}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest group-hover:text-indigo-300 transition-colors">{item.label}</h4>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-300">{item.action}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 p-10 rounded-[2.5rem] bg-rose-500/[0.03] border border-rose-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,1)]" />
                <h4 className="text-xl font-black text-rose-500 uppercase italic tracking-tighter">Danger Zone</h4>
              </div>
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest leading-relaxed">
                Deactivate corporate environment and purge<br />all intelligence vectors immediately. Irreversible action.
              </p>
            </div>
            <button className="px-10 py-5 bg-rose-500/10 border-2 border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 shadow-xl active:scale-95 whitespace-nowrap">
              Terminate Workspace
            </button>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Enterprise Subscription Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-indigo-600 p-10 text-white border-none shadow-[0_0_100px_rgba(79,70,229,0.2)] relative overflow-hidden flex flex-col justify-between min-h-[520px] rounded-[2.5rem] group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/20 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">Enterprise<br />Protocol</h3>
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                    Currently on <span className="text-white">Synthex Pro</span><br />with unlimited intelligence vectors.
                  </p>
                </div>
                <div className="space-y-3">
                  {["Premium Enterprise Support", "99.9% Platform SLA", "Unlimited Intelligence Seats"].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" /> {feat}
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="relative z-10 w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:bg-zinc-100 active:scale-[0.98] transition-all duration-300 mt-8">
                Upgrade Protocol
              </button>
            </Card>
          </motion.div>

          {/* Master Account Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-10 glass-card bg-[#0a0a0b]/60 border-white/[0.05] glow-border rounded-[2.5rem] flex flex-col items-center text-center space-y-6"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/5 p-1 overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0a0a0b] shadow-[0_0_10px_rgba(52,211,153,1)]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-white tracking-tighter uppercase italic">Shubham Raj</h4>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Master Security Account</p>
            </div>
            <div className="w-full h-px bg-white/[0.04]" />
            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 shadow-xl active:scale-95 group w-full justify-center">
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Sign Out Protocol
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Phone, ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react"
import { cn } from "../lib/utils"

import { api } from "../lib/api"

export default function SignupPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [errorType, setErrorType] = useState("")
  const [isWakingUp, setIsWakingUp] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")
    setErrorType("")
    setLoading(true)
    setIsWakingUp(false)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    try {
      await api.auth.signup({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        company: data.company
      })
      navigate("/signin")
    } catch (err) {
      if (err.message === "BACKEND_SLEEPING" || err.message === "NETWORK_UNREACHABLE") {
        setIsWakingUp(true)
        setError("Establishing secure link. Backend is initializing (Render Free Tier cold start)...")
        setTimeout(() => handleSignup(e), 5000)
      } else if (err.message === "ENDPOINT_NOT_FOUND") {
        setErrorType("AUTH_UNAVAILABLE")
        setError("Authentication module not present on backend. Only /analyze is active.")
      } else {
        setError(err.message || "Registration failed")
      }
    } finally {
      if (!isWakingUp) setLoading(false)
    }
  }

  const handleDemoAccess = () => {
    localStorage.setItem('synthex_auth_token', 'demo_token_active')
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex overflow-hidden">
      
      {/* Left side: Premium branding & testimonials */}
      <div className="hidden lg:flex w-[45%] relative flex-col justify-between overflow-hidden bg-indigo-900 border-r border-indigo-500/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-transparent" />

        <div className="relative z-10 p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
              <Phone className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tighter text-2xl">Synthex</span>
          </Link>
        </div>

        <div className="relative z-10 p-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Enterprise Alpha</span>
            </div>
            <h2 className="text-4xl text-white font-bold leading-[1.1] tracking-tight mb-8">
              Unlock the Revenue <br/> <span className="text-indigo-400">Intelligence OS.</span>
            </h2>
            <div className="space-y-4">
               {[
                 "High-density linguistic sentiment analysis",
                 "Real-time CRM injection & objection intelligence",
                 "Autonomous competitor tracking matrices"
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    <p className="text-sm font-medium text-indigo-100 opacity-80">{item}</p>
                  </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="flex-1 flex flex-col relative justify-center px-6 sm:px-12 md:px-20 lg:px-24">
        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-2">Create an account</h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 italic">Provision your institutional workspace access.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={cn(
                  "p-4 rounded-xl border flex flex-col gap-3 transition-all",
                  isWakingUp ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" : "bg-rose-500/10 border-rose-500/20 text-rose-500"
                )}>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {isWakingUp ? <RotateCcw className="w-4 h-4 animate-spin" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                    {error}
                  </div>
                  
                  {errorType === "AUTH_UNAVAILABLE" && (
                     <button 
                      type="button"
                      onClick={handleDemoAccess}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 group"
                     >
                        Enter Analyze Platform Directly <ArrowRight className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
                     </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">First Name</label>
                 <input name="first_name" required type="text" placeholder="John" className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all font-semibold" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Last Name</label>
                 <input name="last_name" required type="text" placeholder="Doe" className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all font-semibold" />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Work Email</label>
              <input name="email" required type="email" placeholder="john@enterprise.com" className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all font-semibold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Company Name</label>
              <input name="company" required type="text" placeholder="Acme Corp" className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all font-semibold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Password</label>
              <input name="password" required type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all font-semibold" />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl mt-6 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 group shadow-2xl relative overflow-hidden active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                   <span className="text-[11px] uppercase tracking-widest">
                     {isWakingUp ? "Waking Up..." : "Processing..."}
                   </span>
                </div>
              ) : (
                <>
                  <span className="text-xs uppercase tracking-[0.2em] font-black">Initialize Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-indigo-500" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500 font-medium">
            Already have an account? <Link to="/signin" className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Phone, ArrowRight, CheckCircle2, ChevronLeft, RotateCcw, AlertCircle } from "lucide-react"
import { cn } from "../lib/utils"

import { api } from "../lib/api"

export default function SignInPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [errorType, setErrorType] = useState("")
  const [isWakingUp, setIsWakingUp] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError("")
    setErrorType("")
    setLoading(true)
    setIsWakingUp(false)

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      // First, try a quick ping or check if backend is up
      const response = await api.auth.login({ username: email, password })
      localStorage.setItem('synthex_auth_token', response.access_token)
      navigate("/dashboard")
    } catch (err) {
      if (err.message === "BACKEND_SLEEPING" || err.message === "NETWORK_UNREACHABLE") {
        setIsWakingUp(true)
        setError("Synchronizing Intelligence Engine. This usually takes 30-60s on Render Free Tier...")
        
        // Attempt a retry after 3 seconds for UX
        setTimeout(() => handleSignIn(e), 5000)
      } else if (err.message === "ENDPOINT_NOT_FOUND") {
        setErrorType("AUTH_UNAVAILABLE")
        setError("Your backend currently only hosts the /analyze endpoint. Auth logic is missing.")
      } else {
        setError(err.message || "Invalid credentials")
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
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Revenue Intelligence</span>
            </div>
            <h2 className="text-4xl text-white font-bold leading-[1.1] tracking-tight mb-8">
               Verified analytical data for <br/> <span className="text-indigo-400">Institutional Growth.</span>
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

      {/* Right side: Sign In Form */}
      <div className="flex-1 flex flex-col relative justify-center px-6 sm:px-12 md:px-20 lg:px-24">
        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-2">Workspace Access</h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 italic">Sign in to sync your forensic session analysis.</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
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
                        Access Dashboard via Demo Mode <ArrowRight className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
                     </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Corporate Identity</label>
              <input name="email" required type="email" placeholder="shubham@enterprise.com" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all font-semibold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Access Protocol</label>
              <input name="password" required type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all font-semibold" />
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
                     {isWakingUp ? "Waking Up Engine..." : "Authenticating..."}
                   </span>
                </div>
              ) : (
                <>
                  <span className="text-xs uppercase tracking-[0.2em] font-black">Initiate Index Sync</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-indigo-500" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Experimental Build v1.4.2 // Institutional Access Only
          </p>

          <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
             <div className="text-[10px] font-black">DEEPMIND G-4</div>
             <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />
             <div className="text-[10px] font-black">SENTIENCE V.9</div>
          </div>
        </div>
      </div>
    </div>
  )
}

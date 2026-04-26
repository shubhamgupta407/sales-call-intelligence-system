import { Outlet, Link } from "react-router-dom"
import { Github, Linkedin, Mail, ChevronDown, Menu, X, ArrowRight, Zap, Globe, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "../lib/utils"

const NAV_LINKS = [
  { name: 'Solutions', hasDropdown: true },
  { name: 'Intelligence', hasDropdown: true },
  { name: 'Pricing', hasDropdown: false },
  { name: 'Resources', hasDropdown: true },
]

export default function LandingLayout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#020203] text-zinc-400 flex flex-col antialiased selection:bg-indigo-500 selection:text-white font-sans">
      {/* Institutional Header */}
      <nav className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 border-b",
        isScrolled ? "bg-[#09090b]/80 backdrop-blur-xl border-white/5 py-3" : "bg-transparent border-transparent py-5"
      )}>
        <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2.5 transition-transform active:scale-95 group">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Synthex</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <button key={link.name} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-white transition-colors group tracking-tight">
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-xs font-semibold text-zinc-500 hover:text-white transition-colors">Log In</Link>
            <Link to="/signup" className="px-5 py-2 bg-white text-black text-xs font-bold rounded hover:bg-zinc-200 transition-all shadow-lg uppercase tracking-tight">
              Request Demo
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Professional) */}
      <div className={cn(
        "fixed inset-0 bg-[#09090b] z-[90] lg:hidden transition-all duration-300 pointer-events-none opacity-0 flex flex-col pt-24 px-8",
        mobileMenuOpen && "opacity-100 pointer-events-auto"
      )}>
        <nav className="flex flex-col gap-6 text-xl font-bold text-white tracking-tight">
          {NAV_LINKS.map(link => (
            <Link key={link.name} to="#" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-4">{link.name}</Link>
          ))}
          <div className="flex flex-col gap-4 pt-4">
             <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 rounded-lg bg-white/5 border border-white/10 text-center text-sm font-bold">Log In</Link>
             <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 rounded-lg bg-white text-black text-center text-sm font-bold">Request Demo</Link>
          </div>
        </nav>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Corporate Institutional Footer */}
      <footer className="w-full bg-[#050505] pt-24 pb-12 px-8 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                   <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Synthex</span>
              </div>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-sm">
                The leading revenue orchestration platform for high-growth enterprise sales teams. Capture every signal, predict every outcome.
              </p>
              <div className="flex items-center gap-4">
                 <Link to="https://github.com/shubhamraj407" target="_blank" className="p-2 text-zinc-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></Link>
                 <Link to="https://www.linkedin.com/in/shubham-gupta-lpu/" target="_blank" className="p-2 text-zinc-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                 <Link to="mailto:aarushjais407@gmail.com" className="p-2 text-zinc-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></Link>
              </div>
            </div>

            <FooterCol title="Solutions" links={['Revenue Intelligence', 'Forecasting', 'Coaching', 'Pipeline Management']} />
            <FooterCol title="Platform" links={['Security', 'Integrations', 'API Documentation', 'System Status']} />
            <FooterCol title="Company" links={['About Us', 'Careers', 'Privacy Policy', 'Terms of Service']} />
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-[11px] font-medium text-zinc-600">
               <p>© 2026 Synthex Intelligence Systems Inc.</p>
               <span className="hidden md:block w-px h-3 bg-white/10" />
               <p className="hover:text-indigo-500 transition-colors cursor-pointer">Built with precision for enterprise performance</p>
            </div>
            
            <div className="flex items-center gap-2 py-1.5 px-3 bg-zinc-900/50 border border-white/5 rounded-full">
               <ShieldCheck className="w-3 h-3 text-indigo-500" />
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">SOC 2 TYPE II COMPLIANT</span>
            </div>
          </div>
          
          <div className="mt-8 text-center md:text-left">
             <p className="text-[10px] font-semibold text-zinc-700 uppercase tracking-[0.2em]">Principal Engineering by <span className="text-zinc-500">Shubham Gupta</span></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FooterCol({ title, links }) {
  return (
    <div className="space-y-6">
      <h6 className="text-[11px] font-bold text-white uppercase tracking-widest">{title}</h6>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link} className="text-xs font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer">{link}</li>
        ))}
      </ul>
    </div>
  )
}

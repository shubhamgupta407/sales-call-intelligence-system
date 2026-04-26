import { Outlet } from "react-router-dom"
import { BarChart3, Upload, LayoutDashboard, Settings, Phone, Menu, Bell, Search, Sun, Moon, X, User, ChevronRight, LogOut, LayoutGrid, Database, Network } from "lucide-react"
import { useTheme } from "../components/theme-provider"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../lib/utils"

export default function DashboardLayout() {
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutGrid },
    { name: "Analyze Call", href: "/upload", icon: Upload },
    { name: "Intelligence", href: "/analytics", icon: BarChart3 },
    { name: "Audit Logs", href: "/logs", icon: Database },
    { name: "System Topology", href: "/topology", icon: Network },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950/50 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800/50">
      <div className="h-16 flex items-center px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center shadow-md">
            <Phone className="w-4.5 h-4.5 text-white dark:text-zinc-950" />
          </div>
          <div>
            <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">Synthex</span>
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-indigo-500">Enterprise</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Analytics
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link 
              key={item.name} 
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" 
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5 mr-3 transition-colors", isActive ? "text-indigo-500" : "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100")} />
              {item.name}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active" 
                  className="ml-auto w-1 h-3 rounded-full bg-indigo-500"
                />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800/50">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-3 flex items-center gap-3 border border-zinc-200/50 dark:border-zinc-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 shadow-inner"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">Shubham Raj</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">Administrator</p>
          </div>
          <Link to="/" className="text-zinc-400 hover:text-rose-500 transition-colors">
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex bg-zinc-50 dark:bg-[#020202] min-h-screen selection:bg-indigo-500/20 neural-bg">
      {/* Desktop Sidebar (Floating Glass) */}
      <aside className="hidden md:block w-72 sticky top-0 h-screen p-4 overflow-hidden z-50">
        <div className="h-full glass-card border-white/5 flex flex-col bg-[#0a0a0b]/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-72 z-[70] md:hidden p-4"
            >
              <div className="h-full glass-card border-white/5 flex flex-col bg-[#0a0a0b] shadow-2xl">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Topbar (Lustrous Glass) */}
        <header className="h-20 bg-transparent z-40 sticky top-0 flex items-center justify-between px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" />
          <div className="flex items-center gap-6 flex-1 relative z-10">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden p-2.5 text-zinc-400 hover:bg-white/5 rounded-xl transition-all border border-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center flex-1 max-w-md relative group">
              <Search className="absolute left-4 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search intelligence platform..." 
                className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 transition-all outline-none focus:ring-1 focus:ring-indigo-500/20" 
              />
              <div className="absolute right-3 px-2 py-0.5 bg-white/10 rounded-lg text-[9px] font-black text-zinc-400 uppercase tracking-widest border border-white/5">
                Audit Log
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="p-2.5 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl transition-all border border-white/5"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button className="p-2.5 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl transition-all relative border border-white/5">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 md:pt-4 overflow-y-auto relative z-10 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* Global Footer (Subtle Security style) */}
        <footer className="px-10 py-8 relative z-10">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
            <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-black" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Security Protocol v2.4</span>
            </div>
            <div className="flex gap-8 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-400 transition-colors">Data Sovereignty</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Index Terms</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Enterprise Security</a>
            </div>
            <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Synthex Revenue OS
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

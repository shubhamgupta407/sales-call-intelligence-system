import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info } from "lucide-react"

export function InfoTooltip({ title, formula, highlight }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-help hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all">
        <Info className="w-2.5 h-2.5 text-zinc-400" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 rounded-xl bg-[#0a0a0b]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${highlight || 'bg-indigo-500'}`} />
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{title}</h4>
              </div>
              
              <div className="space-y-1 pl-3">
                {formula.map((item, i) => (
                  <div key={i} className="flex gap-2 text-[10px] font-mono leading-relaxed">
                    <span className={item.type === 'plus' ? 'text-emerald-400' : item.type === 'minus' ? 'text-rose-400' : 'text-zinc-500'}>
                      {item.type === 'plus' ? '+' : item.type === 'minus' ? '-' : '='}
                    </span>
                    <span className="text-zinc-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

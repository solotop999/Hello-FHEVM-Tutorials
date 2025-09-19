import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SectionItem({ title, progress, lessons = [] }){
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-[#12163d] rounded-2xl p-4 shadow-md">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div className="h-2 rounded-full bg-black" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{progress}% completed</p>
        </div>
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-gray-300 text-sm space-y-2"
          >
            {lessons.length === 0 ? (
              <p>Lesson details and subtopics will appear here…</p>
            ) : (
              <ul className="space-y-2">
                {lessons.map((l, i) => (
                  <li key={i} className="flex items-center justify-between bg-[#0f1438] px-3 py-2 rounded-lg border border-white/5">
                    <span>{l}</span>
                    <span className="text-[11px] text-gray-400">video • 7m</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

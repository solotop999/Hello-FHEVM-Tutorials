import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";

export default function SectionItem({ title, lessons = [], courseId, sectionIndex }) {
  const [open, setOpen] = useState(false);
  const { progress } = useProgress();

  const percent = progress?.[courseId]?.[sectionIndex] ? 100 : 0;

  return (
    <div className="bg-[#12163d] rounded-2xl p-6 shadow-md border border-transparent
         hover:bg-[#0e1233] hover:border-white 
         hover:shadow-lg transform hover:scale-105 
         transition-colors transition-transform duration-300">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 text-left">
          <h3 className="font-semibold">{title}</h3>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{percent}% completed</p>
        </div>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-gray-300 text-sm space-y-4"
          >
            {lessons.length > 0 && (
              <ul className="space-y-2">
                {lessons.map((l, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-[#0f1438] px-3 py-2 rounded-lg border border-white/5"
                  >
                    <span>{l.title}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4">
              <Link
                to={`/courses/${courseId}/section/${sectionIndex}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Start Section
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

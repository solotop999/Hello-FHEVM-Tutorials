import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import sections from '../data/sections'

export default function CourseHeader(){
  const bullets = sections.map(s => s.title); // sync 1-1

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-indigo-300/90">
        <a className="hover:underline" href="#">FHEVM</a>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
        Hello FHEVM Tutorial: Build Your First Confidential dApp
      </h1>

      <p className="text-gray-400 mt-3">
        Step-by-step guide to create, deploy, and interact with a privacy-preserving smart contract on FHEVM.
      </p>

      <div className="relative bg-[#12163d] rounded-2xl mt-6 p-6 shadow-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">What you’ll learn:</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-200">
              <ul className="space-y-2">
                {bullets.slice(0, Math.ceil(bullets.length/2)).map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="min-w-5" size={18} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {bullets.slice(Math.ceil(bullets.length/2)).map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="min-w-5" size={18} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative justify-self-center"
          >
            <div className="rounded-2xl bg-[#0d1133] p-3 border border-white/10 shadow-card">
              <img src="/beginner.png" alt="FHEVM Hero" className="w-40 object-cover rounded-lg" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

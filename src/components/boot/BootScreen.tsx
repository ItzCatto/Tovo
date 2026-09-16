import { motion } from 'framer-motion'
import { TovoOwl } from '../icons/TovoOwl'

export function BootScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-tovo-bg flex flex-col items-center justify-center gap-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full bg-tovo-amber/15 blur-3xl" />
        <div className="relative text-tovo-amber animate-owl-float">
          <TovoOwl size={88} variant="brand" animateBlink />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl font-bold tracking-[0.2em] text-tovo-text">TOVO</span>
        <div className="w-24 h-[3px] rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-tovo-amber rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

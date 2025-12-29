import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const RotatingText = ({ 
  words = [], 
  duration = 3000,
  className 
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, duration)
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className={clsx("inline-flex h-[1.2em] overflow-hidden relative align-top", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center text-purple-400 font-bold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible spacer to maintain width */}
      <span className="opacity-0 pointer-events-none">{words.reduce((a, b) => a.length > b.length ? a : b, "")}</span>
    </div>
  )
}

export default RotatingText

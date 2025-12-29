import { useState } from 'react'
import { motion as _motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const Stepper = ({ steps = [], previousLabel = 'Previous', nextLabel = 'Next' }) => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Steps Indicator */}
      <div className="flex justify-between items-center mb-12 relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 -translate-y-1/2 rounded-full" />
        <_motion.div 
          className="absolute top-1/2 left-0 h-1 bg-purple-600 -z-10 -translate-y-1/2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(index)}
          >
            <_motion.div
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                activeStep >= index 
                  ? "bg-purple-900 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]" 
                  : "bg-gray-900 border-gray-700 text-gray-500"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {index + 1}
            </_motion.div>
            <span className={clsx(
              "text-xs font-medium uppercase tracking-wider transition-colors",
              activeStep >= index ? "text-purple-400" : "text-gray-600"
            )}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="relative min-h-[300px] bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <_motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 text-purple-400 mb-2">
               {/* Icon placeholder if available */}
               <div className="text-3xl">{steps[activeStep].icon || '✨'}</div>
               <h3 className="text-2xl font-bold text-white">{steps[activeStep].title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {steps[activeStep].description}
            </p>
          </_motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
          <button 
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-6 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {previousLabel}
          </button>
          <button 
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className="px-6 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Stepper

import { useState, useRef, useEffect } from 'react'
import { motion as _motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const Stepper = ({ steps, previousLabel = 'Previous', nextLabel = 'Next' }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const contentRef = useRef(null)
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight)
    }
  }, [activeStep])

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setDirection(1)
      setActiveStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setDirection(-1)
      setActiveStep(prev => prev - 1)
    }
  }
  
  // Check if current step is "Insight" (usually the last one or by id/title)
  // Assuming the last step is Insight based on context
  const isLastStep = activeStep === steps.length - 1

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="relative flex justify-between items-center mb-12">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full -z-10 transition-all duration-500"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeStep ? 1 : -1)
              setActiveStep(index)
            }}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              index <= activeStep
                ? 'bg-black border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-black border-white/10 text-gray-500 hover:border-white/30'
            }`}
          >
            <span className="text-lg md:text-xl">{step.icon}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative overflow-hidden min-h-[300px]" style={{ height }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <_motion.div
            key={activeStep}
            custom={direction}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? 50 : -50,
                opacity: 0
              }),
              center: {
                x: 0,
                opacity: 1
              },
              exit: (direction) => ({
                x: direction > 0 ? -50 : 50,
                opacity: 0
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute w-full"
            ref={contentRef}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">{steps[activeStep].title}</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
                {steps[activeStep].description}
              </p>
              
              {isLastStep ? (
                <_motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    to="/insights"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all hover:scale-105"
                  >
                    <span>进入洞察看板</span>
                    <span>→</span>
                  </Link>
                </_motion.div>
              ) : (
                <div className="w-full h-1 bg-transparent" /> 
              )}
            </div>
          </_motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={activeStep === 0}
          className={`px-6 py-2 rounded-lg border transition-colors ${
            activeStep === 0
              ? 'border-white/5 text-gray-600 cursor-not-allowed'
              : 'border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/30'
          }`}
        >
          {previousLabel}
        </button>
        
        {!isLastStep && (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export default Stepper

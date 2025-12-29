import { useState, useEffect, useRef, useMemo } from 'react'
import { motion as _motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useI18n } from '../../i18n'
import ShinyText from '../UI/TextEffects/ShinyText'

// Mini SVG Diagrams for each graph type
const MiniDiagram = ({ type }) => {
  const commonTransition = { duration: 2, repeat: Infinity, ease: "easeInOut" }

  switch (type) {
    case 'entity-event': // (Entity, Role, Event)
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
          {/* Event Node */}
          <_motion.circle cx="50" cy="30" r="8" fill="#9333ea" 
            animate={{ scale: [1, 1.2, 1] }} transition={commonTransition} 
          />
          {/* Entity Nodes */}
          <circle cx="20" cy="15" r="5" fill="#4b5563" />
          <circle cx="80" cy="15" r="5" fill="#4b5563" />
          <circle cx="50" cy="55" r="5" fill="#4b5563" />
          {/* Edges */}
          <_motion.path d="M25 18 L45 28" stroke="#6b7280" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={commonTransition}
          />
          <_motion.path d="M75 18 L55 28" stroke="#6b7280" strokeWidth="2"
             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...commonTransition, delay: 0.5 }}
          />
          <_motion.path d="M50 50 L50 38" stroke="#6b7280" strokeWidth="2"
             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...commonTransition, delay: 1 }}
          />
        </svg>
      )
    case 'entity-event-temporal': // Event1 -> Event2 -> Event3
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
          <line x1="10" y1="30" x2="90" y2="30" stroke="#374151" strokeWidth="2" />
          {[20, 50, 80].map((x, i) => (
            <_motion.g key={i}>
              <circle cx={x} cy="30" r="6" fill="#9333ea" />
              <_motion.circle cx={x} cy="30" r="10" stroke="#a855f7" strokeWidth="1" fill="none"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
              />
            </_motion.g>
          ))}
        </svg>
      )
    case 'entity-entity': // Head -> Rel -> Tail
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
          <circle cx="30" cy="30" r="8" fill="#3b82f6" />
          <circle cx="70" cy="30" r="8" fill="#ef4444" />
          <_motion.path d="M38 30 L62 30" stroke="#6b7280" strokeWidth="2" 
             animate={{ strokeDasharray: ["0,1", "1,0"] }} transition={commonTransition}
          />
          <text x="50" y="25" textAnchor="middle" fontSize="6" fill="#9ca3af">Rel</text>
        </svg>
      )
    case 'entity-entity-event': // Rel changes over time
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
           <circle cx="30" cy="30" r="8" fill="#3b82f6" />
           <circle cx="70" cy="30" r="8" fill="#ef4444" />
           <_motion.line x1="38" y1="30" x2="62" y2="30" strokeWidth="3"
             animate={{ stroke: ["#6b7280", "#10b981", "#f59e0b"] }}
             transition={{ duration: 3, repeat: Infinity }}
           />
           <_motion.circle cx="50" cy="10" r="4" fill="#fbbf24"
             animate={{ y: [0, 15, 0], opacity: [0, 1, 0] }}
             transition={{ duration: 3, repeat: Infinity }}
           />
        </svg>
      )
    case 'event-entity-impact': // Cascade
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
          <circle cx="20" cy="30" r="8" fill="#ef4444" />
          <_motion.g animate={{ x: [0, 10, 0] }} transition={commonTransition}>
            <circle cx="50" cy="15" r="5" fill="#4b5563" />
            <circle cx="50" cy="45" r="5" fill="#4b5563" />
          </_motion.g>
          <_motion.g animate={{ x: [0, 20, 0] }} transition={{...commonTransition, delay: 0.2}}>
             <circle cx="80" cy="30" r="5" fill="#4b5563" />
          </_motion.g>
          <_motion.path d="M28 30 L45 18 M28 30 L45 42" stroke="#ef4444" strokeWidth="1" 
             animate={{ opacity: [0.2, 1, 0.2] }} transition={commonTransition}
          />
        </svg>
      )
    case 'event-event-effect': // Causal
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
          <rect x="20" y="20" width="20" height="20" rx="4" fill="#8b5cf6" />
          <rect x="60" y="20" width="20" height="20" rx="4" fill="#ec4899" />
          <_motion.path d="M40 30 L60 30" stroke="#fff" strokeWidth="2" strokeDasharray="4 2"
             animate={{ strokeDashoffset: [10, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      )
    case 'community': // Cluster
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
          <_motion.g animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "35px 30px" }}>
            <circle cx="35" cy="30" r="15" fill="#3b82f6" opacity="0.2" />
            <circle cx="30" cy="25" r="4" fill="#3b82f6" />
            <circle cx="40" cy="35" r="4" fill="#3b82f6" />
            <circle cx="25" cy="35" r="3" fill="#3b82f6" />
          </_motion.g>
          <_motion.g animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "70px 30px" }}>
             <circle cx="70" cy="30" r="12" fill="#10b981" opacity="0.2" />
             <circle cx="70" cy="30" r="4" fill="#10b981" />
             <circle cx="65" cy="22" r="3" fill="#10b981" />
          </_motion.g>
        </svg>
      )
    case 'hybrid-simulation': // Stream -> Engine
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
          <line x1="10" y1="30" x2="40" y2="30" stroke="#6b7280" strokeWidth="1" />
          <_motion.circle cx="10" cy="30" r="3" fill="#fff" animate={{ cx: [10, 40] }} transition={{ duration: 1, repeat: Infinity }} />
          <rect x="40" y="15" width="30" height="30" stroke="#8b5cf6" fill="none" />
          <_motion.rect x="45" y="20" width="20" height="20" fill="#8b5cf6" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={commonTransition} />
          <path d="M70 30 L90 30" stroke="#6b7280" strokeWidth="1" />
        </svg>
      )
    case 'counterfactual': // Fork
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
           <path d="M10 30 L40 30" stroke="#fff" strokeWidth="2" />
           <_motion.path d="M40 30 Q 60 30 90 10" stroke="#3b82f6" strokeWidth="2" fill="none" 
             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={commonTransition}
           />
           <_motion.path d="M40 30 Q 60 30 90 50" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" fill="none" 
             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={commonTransition}
           />
        </svg>
      )
    default:
      return null
  }
}

const GraphTaxonomy = () => {
  const { t } = useI18n()

  const taxonomy = useMemo(() => t('taxonomy') || {}, [t])
  
  const allTypes = useMemo(() => {
    const types = Array.isArray(taxonomy.types) ? taxonomy.types : []
    return [
      {
        id: 'intro',
        title: taxonomy.introTitle || taxonomy.headline, 
        question: taxonomy.subheadline,
        definition: taxonomy.introDesc, 
        pattern: taxonomy.pattern,
        tags: taxonomy.tags || ['Intro', 'System']
      },
      ...types
    ]
  }, [taxonomy])
  
  const [activeId, setActiveId] = useState('intro')
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const timerRef = useRef(null)

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlay || !allTypes.length) return

    timerRef.current = setInterval(() => {
      setActiveId(prevId => {
        const currentIndex = allTypes.findIndex(t => t.id === prevId)
        const nextIndex = (currentIndex + 1) % allTypes.length
        return allTypes[nextIndex].id
      })
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timerRef.current)
  }, [isAutoPlay, allTypes])

  // Reset auto-play when user interacts
  const handleManualChange = (id) => {
    setActiveId(id)
    setIsAutoPlay(false)
  }

  if (!allTypes.length) return null

  const activeType = allTypes.find(t => t.id === activeId) || allTypes[0]

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header removed (integrated into list) */}
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Navigation */}
        <div className="lg:w-1/3 flex flex-col gap-2 h-[600px] overflow-y-auto pr-6 pl-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
           {/* Axis Line */}
           <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent pointer-events-none" />

          {allTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleManualChange(type.id)}
              className={clsx(
                "group relative text-left p-4 rounded-xl transition-all duration-300 border ml-8",
                activeId === type.id 
                  ? "bg-white/10 border-purple-500/50 shadow-[0_0_15px_rgba(147,51,234,0.2)] scale-[1.02]" 
                  : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 opacity-60 hover:opacity-100"
              )}
            >
              {/* Axis Node */}
              <div className={clsx(
                "absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10",
                activeId === type.id
                  ? "bg-purple-500 border-purple-300 shadow-[0_0_10px_#a855f7]"
                  : "bg-gray-900 border-gray-700 group-hover:border-gray-500"
              )}>
                 {activeId === type.id && (
                   <div className="absolute inset-0 rounded-full animate-ping bg-purple-500 opacity-75" />
                 )}
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className={clsx(
                  "font-bold transition-colors",
                  activeId === type.id ? "text-white" : "text-gray-300",
                  type.id === 'intro' ? "text-lg text-purple-300" : ""
                )}>
                  {type.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {type.tags?.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/20 text-gray-400 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
              {/* Progress bar for auto-play item */}
              {isAutoPlay && activeId === type.id && (
                <_motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-purple-500/50 rounded-b-xl"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="lg:w-2/3 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <_motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col relative"
            >
              {/* Top: Question & Diagram */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1 space-y-6">
                   <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-mono">
                      {activeType.pattern}
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                     <ShinyText text={activeType.question} className="text-white" />
                   </h3>
                </div>
                {activeType.id !== 'intro' && (
                  <div className="w-full md:w-48 h-32 bg-black/20 rounded-xl overflow-hidden border border-white/5">
                     <MiniDiagram type={activeType.id} />
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

              {/* Bottom: Definition */}
              <div className="flex-1">
                <p className="text-lg text-gray-300 leading-loose">
                  {activeType.definition}
                </p>
              </div>

              {/* Auto Play Control (Bottom Left) */}
              <div className="absolute bottom-8 left-8 z-20">
                 <button 
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="text-xs uppercase tracking-widest text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full border border-white/5 hover:border-purple-500/30"
                >
                  <span className={clsx("w-2 h-2 rounded-full", isAutoPlay ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                  {isAutoPlay ? taxonomy.autoPlay?.playing : taxonomy.autoPlay?.resume}
                </button>
              </div>

              {/* Index Number Background */}
              <div className="absolute bottom-4 right-8 text-9xl font-bold text-white/5 pointer-events-none select-none">
                {allTypes.findIndex(t => t.id === activeId) + 1}
              </div>
            </_motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default GraphTaxonomy

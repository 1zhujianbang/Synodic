import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../../../i18n.jsx'
import { AnimatePresence, motion } from 'framer-motion'

const PillNav = ({ items = [] }) => {
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const { locale, toggleLocale, t } = useI18n()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Update pill position to a specific target or hide it
  const updatePillPosition = (target) => {
    if (!pillRef.current) return
    
    if (target) {
      // Calculate relative position to the nav container
      const navRect = navRef.current.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      
      if (isMobile) {
        const y = targetRect.top - navRect.top - 2 // Small offset top
        const height = targetRect.height
        
        gsap.to(pillRef.current, {
          y,
          height,
          x: -4, 
          width: '75%',
          top: '3',
          left: '15%', 
          duration: 0.4,
          ease: 'elastic.out(1, 0.7)',
          opacity: 1
        })
      } else {
        const x = targetRect.left - navRect.left
        const width = targetRect.width

        gsap.to(pillRef.current, {
          x,
          width,
          y: 0,
          left: 0,
          height: 'auto', // Reset height control
          duration: 0.4,
          ease: 'elastic.out(1, 0.7)',
          opacity: 1
        })
      }
    } else {
      gsap.to(pillRef.current, { opacity: 0, duration: 0.3 })
    }
  }

  // Find active link element
  const getActiveElement = () => {
    if (!navRef.current) return null
    // Find the link that matches current path
    // We can look for 'active' class which NavLink adds by default
    const activeLink = navRef.current.querySelector('a.active.nav-item')
    return activeLink
  }

  // Effect to handle default positioning on load, route change, resize, locale change, or expansion
  useEffect(() => {
    // Small delay to ensure DOM layout is settled (esp. with framer-motion animation)
    const timer = setTimeout(() => {
      if (isExpanded) {
        const activeEl = getActiveElement()
        updatePillPosition(activeEl)
      } else {
        // If collapsed, hide the pill
        updatePillPosition(null)
      }
    }, 350) // Wait for expansion animation (300ms)

    return () => clearTimeout(timer)
  }, [location.pathname, locale, isExpanded, isMobile])

  useEffect(() => {
    // Initial animation
    gsap.fromTo(navRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  const handleMouseEnter = (e) => {
    if (!e.target.classList.contains('nav-item')) return
    updatePillPosition(e.target)
  }

  const handleMouseLeave = () => {
    // Return to active state
    if (isExpanded) {
      const activeEl = getActiveElement()
      updatePillPosition(activeEl)
    } else {
      updatePillPosition(null)
    }
  }

  return (
    <div className={`fixed top-6 left-6 z-50 max-w-[90vw] overflow-visible rounded-[2rem] synodic-scrollbar-hide`}>
      <nav 
        ref={navRef}
        className={`relative flex ${isMobile ? 'flex-col items-stretch' : 'items-center'} gap-2 p-2 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl min-w-max transition-all duration-300`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Pill Background */}
        <div 
          ref={pillRef}
          className={`absolute left-0 rounded-full bg-white/20 -z-10 pointer-events-none opacity-0 ${isMobile ? 'left-2 right-2' : 'top-2 bottom-2'}`}
        />

        {/* Logo/Icon */}
        <div 
          className={`pl-4 pr-2 font-bold text-white tracking-widest cursor-pointer hover:text-purple-400 transition-colors flex items-center gap-2 ${isMobile ? 'py-2 justify-between' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          SYNODIC
          <span className="text-xs text-white/50 transition-transform duration-300">
            {isExpanded ? (isMobile ? '▲' : '◀') : (isMobile ? '▼' : '▶')}
          </span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : { width: 0, opacity: 0 }}
              animate={isMobile ? { height: 'auto', opacity: 1 } : { width: 'auto', opacity: 1 }}
              exit={isMobile ? { height: 0, opacity: 0 } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`flex ${isMobile ? 'flex-col items-stretch w-full' : 'items-center'} gap-2 overflow-hidden whitespace-nowrap`}
            >
              {/* Divider */}
              <div className={`${isMobile ? 'w-full h-px my-2' : 'w-px h-6 mx-2'} bg-white/20 shrink-0`} />

              {/* Nav Items */}
              {items.map((item, index) => (
                item.onClick ? (
                  <button
                    key={index}
                    type="button"
                    className={`nav-item relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full ${isMobile ? 'text-center' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    key={index}
                    to={item.to || '/'}
                    className={`nav-item relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full ${isMobile ? 'text-center' : ''}`}
                    onMouseEnter={handleMouseEnter}
                  >
                    {item.label}
                  </NavLink>
                )
              ))}

              <button
                type="button"
                onClick={toggleLocale}
                className={`px-3 py-2 rounded-full bg-white/5 text-white/90 text-sm font-medium hover:bg-white/10 transition-colors ${isMobile ? 'mx-0 my-1' : 'ml-2'}`}
              >
                {locale === 'zh' ? 'EN' : '中文'}
              </button>

              {/* CTA Button */}
              <NavLink
                to="/"
                className={`px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-bold hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] ${isMobile ? 'mx-0 mt-2 text-center' : 'ml-2'}`}
                onMouseEnter={handleMouseEnter}
              >
                {t('cta.launch')}
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

export default PillNav

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { NavLink } from 'react-router-dom'
import { useI18n } from '../../../i18n.jsx'

const PillNav = ({ items = [] }) => {
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const { locale, toggleLocale, t } = useI18n()

  useEffect(() => {
    // Initial animation
    gsap.fromTo(navRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  const handleMouseEnter = (e) => {
    if (!e.target.classList.contains('nav-item')) return
    
    // Animate pill to the hovered item
    const { offsetLeft, offsetWidth } = e.target
    gsap.to(pillRef.current, {
      x: offsetLeft,
      width: offsetWidth,
      duration: 0.4,
      ease: 'elastic.out(1, 0.7)',
      opacity: 1
    })
  }

  const handleMouseLeave = () => {
    // Optional: Hide pill or return to active state
    // For now, we fade it out if no item is active
    // gsap.to(pillRef.current, { opacity: 0, duration: 0.3 })
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] overflow-x-auto rounded-full synodic-scrollbar-hide">
      <nav 
        ref={navRef}
        className="relative flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl min-w-max"
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Pill Background */}
        <div 
          ref={pillRef}
          className="absolute top-2 bottom-2 left-0 rounded-full bg-white/20 -z-10 pointer-events-none opacity-0"
        />

        {/* Logo/Icon */}
        <NavLink
          to="/"
          className="pl-4 pr-2 font-bold text-white tracking-widest cursor-pointer hover:text-purple-400 transition-colors"
          onMouseEnter={handleMouseEnter}
        >
          SYNODIC
        </NavLink>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20 mx-2" />

        {/* Nav Items */}
        {items.map((item, index) => (
          item.onClick ? (
            <button
              key={index}
              type="button"
              className="nav-item relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full"
              onMouseEnter={handleMouseEnter}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.to || '/'}
              className="nav-item relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full"
              onMouseEnter={handleMouseEnter}
            >
              {item.label}
            </NavLink>
          )
        ))}

        <button
          type="button"
          onClick={toggleLocale}
          className="ml-2 px-3 py-2 rounded-full bg-white/5 text-white/90 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          {locale === 'zh' ? 'EN' : '中文'}
        </button>

        {/* CTA Button */}
        <NavLink
          to="/"
          className="ml-2 px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-bold hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8)]"
          onMouseEnter={handleMouseEnter}
        >
          {t('cta.launch')}
        </NavLink>
      </nav>
    </div>
  )
}

export default PillNav

import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../../../i18n.jsx'
import { AnimatePresence, motion as _motion } from 'framer-motion'

const PillNav = ({ items = [] }) => {
  const { locale, toggleLocale, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const panelRef = useRef(null)

  const itemGroups = useMemo(() => {
    if (!Array.isArray(items)) return []
    return [items]
  }, [items])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const layerColors = useMemo(() => ['#5227FF', '#B19EEF'], [])

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="fixed top-6 left-6 z-50 w-12 h-12 flex items-center justify-center bg-white/5 border border-white/12 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.55)] hover:bg-white/8 transition-colors touch-none select-none"
        onClick={() => setIsOpen((v) => !v)}
      >
        <div className="relative w-6 h-5">
          <_motion.span
            className="absolute left-0 top-0 h-[2px] w-full bg-white"
            animate={isOpen ? { rotate: 45, top: 9 } : { rotate: 0, top: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
          <_motion.span
            className="absolute left-0 top-[9px] h-[2px] w-full bg-white"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
          />
          <_motion.span
            className="absolute left-0 bottom-0 h-[2px] w-full bg-white"
            animate={isOpen ? { rotate: -45, bottom: 9 } : { rotate: 0, bottom: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <_motion.div
            className="fixed inset-0 z-50"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <_motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute inset-0 pointer-events-none">
              {layerColors.map((c, idx) => (
                <_motion.div
                  key={c}
                  className="fixed top-0 left-0 bottom-0 pointer-events-none"
                  style={{
                    width: idx === 0 ? 'min(94vw, 460px)' : 'min(92vw, 440px)',
                    backgroundColor: c,
                    opacity: idx === 0 ? 0.26 : 0.22,
                    filter: 'blur(0px)',
                  }}
                  variants={{
                    open: { x: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: idx * 0.06 } },
                    closed: { x: '-110%', transition: { duration: 0.26, ease: 'easeIn', delay: (layerColors.length - idx - 1) * 0.03 } },
                  }}
                />
              ))}
            </div>

            <_motion.aside
              ref={panelRef}
              className="fixed top-0 left-0 bottom-0 w-[min(90vw,420px)] bg-[#07070A]/92 border-r border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.75)] pointer-events-auto"
              variants={{
                open: { x: 0, transition: { type: 'spring', stiffness: 240, damping: 28 } },
                closed: { x: '-105%', transition: { duration: 0.22, ease: 'easeInOut' } },
              }}
            >
              <div className="h-full flex flex-col px-6 pt-7 pb-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-white font-bold tracking-[0.32em] text-sm select-none">
                    SYNODIC
                  </div>
                  <button
                    type="button"
                    className="px-3 py-2 bg-white/5 border border-white/10 text-white/90 text-sm font-medium hover:bg-white/10 transition-colors"
                    onClick={toggleLocale}
                  >
                    {locale === 'zh' ? 'EN' : '中文'}
                  </button>
                </div>

                <div className="mt-8 flex-1 min-h-0 overflow-auto pr-2 synodic-scrollbar-hide">
                  {itemGroups.map((group, groupIndex) => (
                    <_motion.ul
                      key={groupIndex}
                      className="space-y-2"
                      variants={{
                        open: { transition: { staggerChildren: 0.06, delayChildren: 0.06 + groupIndex * 0.08 } },
                        closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                      }}
                    >
                      {group.map((item, index) => {
                        const key = `${groupIndex}-${index}-${item?.to || item?.label || 'item'}`
                        const itemClass =
                          'block w-full text-left px-4 py-3 border border-white/10 bg-white/0 hover:bg-white/5 text-white/90 hover:text-white transition-colors'

                        if (item?.onClick) {
                          return (
                            <_motion.li
                              key={key}
                              variants={{
                                open: { opacity: 1, x: 0, transition: { duration: 0.24, ease: 'easeOut' } },
                                closed: { opacity: 0, x: -18, transition: { duration: 0.14, ease: 'easeIn' } },
                              }}
                            >
                              <button
                                type="button"
                                className={itemClass}
                                onClick={() => {
                                  setIsOpen(false)
                                  item.onClick()
                                }}
                              >
                                <span className="text-lg font-semibold">{item.label}</span>
                              </button>
                            </_motion.li>
                          )
                        }

                        return (
                          <_motion.li
                            key={key}
                            variants={{
                              open: { opacity: 1, x: 0, transition: { duration: 0.24, ease: 'easeOut' } },
                              closed: { opacity: 0, x: -18, transition: { duration: 0.14, ease: 'easeIn' } },
                            }}
                          >
                            <NavLink
                              to={item?.to || '/'}
                              className={({ isActive }) =>
                                [
                                  itemClass,
                                  isActive || (item?.to === '/' && location.pathname === '/')
                                    ? 'bg-white/6 border-white/18'
                                    : '',
                                ].join(' ')
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-lg font-semibold">{item.label}</span>
                                <span className="text-white/40">→</span>
                              </div>
                            </NavLink>
                          </_motion.li>
                        )
                      })}
                    </_motion.ul>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <NavLink
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-3 bg-white text-black font-bold text-sm tracking-wide hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.18)] text-center"
                  >
                    {t('cta.launch')}
                  </NavLink>
                  <button
                    type="button"
                    className="px-5 py-3 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </_motion.aside>
          </_motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default PillNav

import { Outlet, useLocation } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Silk from '../components/Backgrounds/Silk'
import PillNav from '../components/UI/PillNav'
import { useI18n } from '../i18n.jsx'
import { ScrollContainerProvider } from '../scrollContainer.jsx'
 
const MainLayout = () => {
  const { t } = useI18n()
  const location = useLocation()
  const scrollRef = useRef(null)
  const rafRef = useRef(0)
  const dragRef = useRef({ startY: 0, startScrollTop: 0 })
  const [thumb, setThumb] = useState({ height: 0, top: 0, show: false })
  const [isDragging, setIsDragging] = useState(false)

  const navItems = useMemo(() => [
    { label: t('nav.atlas'), to: '/' },
    { label: t('nav.insights'), to: '/insights' },
    { label: t('nav.docs'), to: '/docs' },
    { label: t('nav.api'), to: '/api' },
  ], [t])

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollHeight <= clientHeight) {
      setThumb({ height: 0, top: 0, show: false })
      return
    }

    const minThumb = 36
    const track = clientHeight
    const height = Math.max(minThumb, (clientHeight / scrollHeight) * track)
    const maxTop = Math.max(0, track - height)
    const top = maxTop === 0 ? 0 : (scrollTop / (scrollHeight - clientHeight)) * maxTop
    setThumb({ height, top, show: true })
  }, [])

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0
      updateThumb()
    })
  }, [updateThumb])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    scheduleUpdate()
    el.addEventListener('scroll', scheduleUpdate, { passive: true })

    const ro = new ResizeObserver(scheduleUpdate)
    ro.observe(el)

    return () => {
      el.removeEventListener('scroll', scheduleUpdate)
      ro.disconnect()
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [scheduleUpdate])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  const handleThumbPointerDown = (e) => {
    const el = scrollRef.current
    if (!el || !thumb.show) return
    setIsDragging(true)
    dragRef.current = { startY: e.clientY, startScrollTop: el.scrollTop }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handleThumbPointerMove = (e) => {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return

    const { scrollHeight, clientHeight } = el
    const maxScrollTop = scrollHeight - clientHeight
    if (maxScrollTop <= 0) return

    const track = clientHeight
    const maxTop = Math.max(0, track - thumb.height)
    if (maxTop <= 0) return

    const deltaY = e.clientY - dragRef.current.startY
    const nextTop = Math.min(maxTop, Math.max(0, thumb.top + deltaY))
    const nextScrollTop = (nextTop / maxTop) * maxScrollTop
    el.scrollTop = nextScrollTop
  }

  const endDrag = () => setIsDragging(false)

  return (
    <div className="relative h-screen text-white overflow-hidden font-sans">
      <Silk />
      <ScrollContainerProvider value={scrollRef}>
        <div ref={scrollRef} className="relative z-10 flex flex-col h-screen overflow-y-auto overflow-x-hidden synodic-overlay-scroll">
          <main className="flex flex-col min-h-screen">
            <Outlet />
          </main>
        </div>
      </ScrollContainerProvider>
      {thumb.show && (
        <div className="fixed right-3 top-3 bottom-3 z-50 pointer-events-none">
          <div className="relative h-full w-2">
            <div
              role="presentation"
              className="absolute left-0 right-0 rounded-full bg-white/10 backdrop-blur-md border border-white/10 pointer-events-auto touch-none select-none"
              style={{ height: `${thumb.height}px`, transform: `translateY(${thumb.top}px)` }}
              onPointerDown={handleThumbPointerDown}
              onPointerMove={handleThumbPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onLostPointerCapture={endDrag}
            />
          </div>
        </div>
      )}
      <PillNav key={location.pathname} items={navItems} />
    </div>
  )
}

export default MainLayout

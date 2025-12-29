import { Outlet } from 'react-router-dom'
import Silk from '../components/Backgrounds/Silk'
import PillNav from '../components/UI/PillNav'
import { useI18n } from '../i18n.jsx'

const MainLayout = () => {
  const { t } = useI18n()

  const navItems = [
    { label: t('nav.atlas'), to: '/' },
    { label: t('nav.insights'), to: '/insights' },
    { label: t('nav.docs'), to: '/docs' },
    { label: t('nav.api'), to: '/api' },
  ]

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans">
      {/* Global Background */}
      <Silk />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col min-h-screen">
        <Outlet />
      </main>

      {/* Floating Navigation */}
      <PillNav items={navItems} />
    </div>
  )
}

export default MainLayout

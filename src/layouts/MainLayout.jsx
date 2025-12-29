import React from 'react'
import Silk from '../components/Backgrounds/Silk'
import PillNav from '../components/UI/PillNav'

const navItems = [
  { label: 'Atlas', href: '#' },
  { label: 'Insights', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'API', href: '#' },
]

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans">
      {/* Global Background */}
      <Silk />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col min-h-screen">
        {children}
      </main>

      {/* Floating Navigation */}
      <PillNav items={navItems} />
    </div>
  )
}

export default MainLayout

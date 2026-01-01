import { useMemo } from 'react'
import { useI18n } from '../i18n.jsx'
import { ShinyText } from '../components/UI/TextEffects'
import UseCasesShowcase from '../components/UseCasesShowcase.jsx'

export default function UseCases() {
  const { t, locale } = useI18n()

  const useCases = useMemo(() => t('home.useCases') || {}, [t])
  const ctaLabel = locale === 'zh' ? '查看场景' : 'View Use Cases'

  return (
    <div className="relative">
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-10 relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide mb-4 backdrop-blur-md">
              {t('home.badge')}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              {useCases.title || (locale === 'zh' ? '应用场景' : 'Use Cases')}
            </h1>

            {useCases.subtitle ? (
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {useCases.subtitle}
              </p>
            ) : null}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('use-cases-showcase')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <ShinyText text={ctaLabel} className="text-black" style={{ color: '#F4C542' }} />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div id="use-cases-showcase" />
      <UseCasesShowcase />
    </div>
  )
}

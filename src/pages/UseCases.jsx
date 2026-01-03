import { useMemo } from 'react'
import { useI18n } from '../i18n.jsx'
import { ShinyText } from '../components/UI/TextEffects'
import UseCasesShowcase from '../components/UseCasesShowcase.jsx'

export default function UseCases() {
  const { t, locale } = useI18n()

  const useCases = useMemo(() => t('home.useCases') || {}, [t])
  const targetAudience = useMemo(() => useCases.targetAudience || [], [useCases])
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

      {/* Target Audience Section */}
      <section className="min-h-screen flex items-center justify-center py-24 relative z-10 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <ShinyText text={useCases.targetAudienceTitle} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((group, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 mb-6 group-hover:bg-purple-500/30 transition-colors">
                  <span className="text-xl font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.items && group.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-3 group-hover:border-purple-500/50 transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import { useMemo } from 'react'
import { RotatingText, ShinyText } from '../components/UI/TextEffects'
import Stepper from '../components/UI/Stepper'
import { useI18n } from '../i18n.jsx'
import Squares from '../components/Backgrounds/Squares'
import TiltedCard from '../components/UI/TiltedCard'

const Home = () => {
  const { t } = useI18n()

  const steps = useMemo(() => {
    const v = t('home.steps')
    return Array.isArray(v) ? v : []
  }, [t])

  const rotating = useMemo(() => {
    const v = t('home.rotating')
    return Array.isArray(v) ? v : []
  }, [t])

  const coreValues = useMemo(() => {
    const v = t('home.coreValues')
    return Array.isArray(v) ? v : []
  }, [t])

  const coreCapabilities = useMemo(() => {
    const v = t('home.coreCapabilities')
    return Array.isArray(v) ? v : []
  }, [t])

  const dataSources = useMemo(() => {
    const v = t('home.dataSources')
    return Array.isArray(v) ? v : []
  }, [t])

  const architecture = useMemo(() => {
    const v = t('home.architecture')
    return Array.isArray(v) ? v : []
  }, [t])
  
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide mb-4 backdrop-blur-md">
            {t('home.badge')}
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            {t('home.headlinePrefix')} <br />
            <RotatingText 
              words={rotating} 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            /> <br />
            {t('home.headlineSuffix')}
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('home.subheadline')}
          </p>

          {/* CTA */}
          <div className="pt-8">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('pipeline')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <ShinyText text={t('cta.explore')} className="text-black" style={{ color: '#F4C542' }}/>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </div>
        </div>
      </section>

      {/* Features / Stepper Section */}
      <div className="relative">
        <section id="pipeline" className="min-h-[120vh] flex flex-col items-center justify-center py-20 relative overflow-hidden">
          {/* Background Container */}
          <div className="absolute inset-0 w-full h-full -z-20 bg-[#080808]"></div>
          <div className="absolute inset-0 w-full h-full -z-10">
            {/* Squares Background */}
            <Squares 
              speed={0.5} 
              squareSize={60} 
              direction="diagonal" 
              borderColor="rgba(255,255,255,0.1)" 
              hoverFillColor="rgba(147,51,234,0.2)"
            />
            {/* Soft White Overlay Mask */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{t('home.pipelineTitle')}</h2>
              <p className="text-gray-400">{t('home.pipelineSubtitle')}</p>
            </div>

            <Stepper steps={steps} previousLabel={t('common.previous')} nextLabel={t('common.next')} />
          </div>
        </section>

      {/* Core Values Section */}
      <section className="min-h-screen flex items-center justify-center py-20  relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <ShinyText text={t('home.coreValuesTitle')} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div key={idx} className="h-full">
                <TiltedCard containerHeight="100%" containerWidth="100%" scaleOnHover={1.05} rotateAmplitude={10} showTooltip={false}>
                  <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-start text-left">
                    <div className="w-12 h-12 mb-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-300 font-bold text-xl">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-purple-300 mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section - Bento Grid */}
      <section className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <ShinyText text={t('home.coreCapabilitiesTitle')} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            {coreCapabilities.map((cap, idx) => (
              <div key={idx} className={`${idx === 0 || idx === 3 ? 'md:col-span-2' : 'md:col-span-1'} h-full`}>
                <TiltedCard containerHeight="100%" containerWidth="100%" scaleOnHover={1.02} rotateAmplitude={8}>
                  <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between text-left">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm text-purple-300">{idx + 1}</span>
                        {cap.title}
                      </h3>
                      <ul className="space-y-4">
                        {cap.items && cap.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 h-2 w-full bg-gradient-to-r from-purple-500/20 to-transparent rounded-full" />
                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources Section - Stacked/Parallax */}
      <section className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <ShinyText text={t('home.dataSourcesTitle')} />
            </h2>
            <p className="text-gray-400">{t('home.dataSourcesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataSources.map((source, idx) => (
              <div key={idx} className="h-full">
                <TiltedCard containerHeight="400px" containerWidth="100%" scaleOnHover={1.1} rotateAmplitude={15}>
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-lg flex flex-col">
                    <div className="mb-6 pb-4 border-b border-white/10">
                      <h3 className="text-xl font-bold text-white">{source.title}</h3>
                    </div>
                    <ul className="space-y-4 flex-1">
                      {source.items && source.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-3 text-left">
                           <span className="text-purple-500 font-bold opacity-80 mt-0.5">▹</span> 
                           <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs text-gray-500 text-right uppercase tracking-wider">Source Type {idx + 1}</div>
                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section - Dock Style */}
      <section className="py-20 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-300">
            {t('home.architectureTitle')}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {architecture.map((layer, idx) => (
              <div key={idx}>
                <TiltedCard containerHeight="auto" containerWidth="auto" scaleOnHover={1.1} rotateAmplitude={20}>
                  <a 
                    href={layer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg min-w-[240px]"
                  >
                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-2">{layer.title}</span>
                    <span className="block text-lg font-bold text-purple-300">{layer.name}</span>
                  </a>
                </TiltedCard>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default Home

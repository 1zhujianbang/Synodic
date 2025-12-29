import { RotatingText, ShinyText } from '../components/UI/TextEffects'
import Stepper from '../components/UI/Stepper'
import { useI18n } from '../i18n.jsx'

const Home = () => {
  const { t } = useI18n()
  const steps = Array.isArray(t('home.steps')) ? t('home.steps') : []
  const rotating = Array.isArray(t('home.rotating')) ? t('home.rotating') : []

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
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
      <section id="pipeline" className="min-h-screen flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.pipelineTitle')}</h2>
            <p className="text-gray-400">{t('home.pipelineSubtitle')}</p>
          </div>
          
          <Stepper steps={steps} previousLabel={t('common.previous')} nextLabel={t('common.next')} />
        </div>
      </section>
    </>
  )
}

export default Home

import { RotatingText, ShinyText } from '../components/UI/TextEffects'
import Stepper from '../components/UI/Stepper'
import { useI18n } from '../i18n.jsx'
import { motion as _motion } from 'framer-motion'
import TiltedCard from '../components/UI/TiltedCard'
import Squares from '../components/Backgrounds/Squares'
import Threads from '../components/Backgrounds/Threads'
import ScrollStack, { ScrollStackItem } from '../components/UI/ScrollStack'

const UseCaseCard = ({ title, desc, delay }) => (
  <_motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    <TiltedCard
      containerHeight="100%"
      containerWidth="100%"
      scaleOnHover={1.02}
      rotateAmplitude={8}
      displayOverlayContent={true}
      overlayContent={
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none" />
      }
    >
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between hover:bg-white/10 transition-colors shadow-xl">
        <div>
          <h4 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{title}</h4>
          <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-purple-400 text-xs">↗</span>
          </div>
        </div>
      </div>
    </TiltedCard>
  </_motion.div>
)

const UseCaseLevel = ({ level, desc, items, index }) => (
  <div className="h-full flex flex-col">
    <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-8 border-b border-white/10 pb-4">
      <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        {level}
      </h3>
      <p className="text-gray-400 pb-1">{desc}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <div key={i} className="h-full min-h-[200px]">
          <UseCaseCard title={item.title} desc={item.desc} delay={index * 0.1 + i * 0.05} />
        </div>
      ))}
    </div>
  </div>
)

const Home = () => {
  const { t } = useI18n()
  const steps = Array.isArray(t('home.steps')) ? t('home.steps') : []
  const rotating = Array.isArray(t('home.rotating')) ? t('home.rotating') : []
  const useCases = t('home.useCases') || {}
  const levels = Array.isArray(useCases.levels) ? useCases.levels : []
  
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

        {/* Use Cases Section */}
        <section className="h-screen flex flex-col relative overflow-hidden">
          {/* Background Container */}
          <div className="absolute inset-0 w-full h-full -z-20 bg-[#080808]"></div>
          <div className="absolute inset-0 w-full h-full -z-10">
             <Threads amplitude={20} distance={-6} color={[0.7, 0.4, 1.0]} />
             {/* Soft White Overlay Mask */}
             <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="text-center pt-16 pb-8 px-4 shrink-0">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <ShinyText text={useCases.title} />
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {useCases.subtitle}
              </p>
            </div>

            <div className="flex-1 min-h-0">
              <ScrollStack className="w-full h-full" itemDistance={40} stackPosition="5%" scaleEndPosition="5%">
                {levels.map((level, index) => (
                  <ScrollStackItem 
                    key={index} 
                    itemClassName="bg-[#0a0a0a] border border-white/10 !h-auto min-h-[500px] !p-8 !rounded-3xl backdrop-blur-xl"
                  >
                    <UseCaseLevel 
                      index={index}
                      level={level.level} 
                      desc={level.desc} 
                      items={level.items} 
                    />
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home

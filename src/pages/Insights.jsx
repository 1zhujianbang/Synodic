import { motion as _motion } from 'framer-motion'
import { useI18n } from '../i18n'
import ShinyText from '../components/UI/TextEffects/ShinyText'

const InsightCard = ({ insight, t }) => (
  <_motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
        insight.severity === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
        insight.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
        'bg-blue-500/20 text-blue-300 border border-blue-500/30'
      }`}>
        {insight.severity} {t('insights.cards.risk')}
      </div>
      <span className="text-xs text-gray-500">{insight.date}</span>
    </div>
    
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
      {insight.title}
    </h3>
    
    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
      {insight.summary}
    </p>

    <div className="flex items-center justify-between border-t border-white/5 pt-4">
      <div className="flex -space-x-2">
         {insight.entities.map((ent, i) => (
           <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-xs font-bold text-gray-300" title={ent}>
             {ent[0]}
           </div>
         ))}
      </div>
      <button className="text-sm text-purple-400 font-medium hover:text-white transition-colors flex items-center gap-1">
        {t('insights.cards.viewAnalysis')} <span>→</span>
      </button>
    </div>
  </_motion.div>
)

export default function Insights() {
  const { t } = useI18n()
  const insightsData = t('insights.data') || []
  
  // Ensure insightsData is an array
  const insights = Array.isArray(insightsData) ? insightsData : []

  return (
    <section className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <ShinyText text={t('insights.headline')} />
          </h1>
          <p className="text-gray-400 max-w-xl">
            {t('insights.subheadline')}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
            {t('insights.filters.date')}
          </button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20">
            {t('insights.filters.report')}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map(insight => (
          <InsightCard key={insight.id} insight={insight} t={t} />
        ))}
        
        {/* Placeholder for 'Load More' or 'Add New' */}
        <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500/30 hover:text-purple-400 transition-colors cursor-pointer min-h-[250px]">
          <span className="text-4xl mb-2">+</span>
          <span className="text-sm font-medium">{t('insights.cards.connectSource')}</span>
        </div>
      </div>
    </section>
  )
}

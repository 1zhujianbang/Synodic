import { useState } from 'react'
import { AnimatePresence, motion as _motion } from 'framer-motion'
import { useI18n } from '../i18n'
import ShinyText from '../components/UI/TextEffects/ShinyText'

const CodeBlock = ({ code, language = 'json' }) => (
  <div className="relative rounded-xl overflow-hidden bg-[#1E1E2E] border border-white/10 font-mono text-sm shadow-xl my-4">
    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <span className="text-xs text-gray-500 uppercase">{language}</span>
    </div>
    <div className="p-4 overflow-x-auto text-gray-300 leading-relaxed synodic-scrollbar">
      <pre>{code}</pre>
    </div>
  </div>
)

const Endpoint = ({ method, path, description, example }) => (
  <div className="mb-12 border-b border-white/5 pb-12 last:border-0">
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
      <span className={`px-3 py-1 rounded-md text-sm font-bold w-fit ${
        method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
        method === 'POST' ? 'bg-green-500/20 text-green-400' :
        'bg-yellow-500/20 text-yellow-400'
      }`}>
        {method}
      </span>
      <code className="text-lg text-white font-mono">{path}</code>
    </div>
    <p className="text-gray-400 mb-6">{description}</p>
    <CodeBlock code={example} />
  </div>
)

export default function Api() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState('overview')

  const apiContent = t('api') || {}
  const sidebar = apiContent.sidebar || {}
  const content = apiContent.content || {}

  return (
    <section className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Sidebar Navigation - 简化 */}
      <aside className="md:w-64 flex-shrink-0">
        <div className="space-y-8 pr-2">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{sidebar.intro}</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`text-sm transition-colors text-left w-full ${activeTab === 'overview' ? 'text-purple-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  {sidebar.overview}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('auth')}
                  className={`text-sm transition-colors text-left w-full ${activeTab === 'auth' ? 'text-purple-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  {sidebar.auth}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{sidebar.endpoints}</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab('entities')}
                  className={`text-sm transition-colors text-left w-full ${activeTab === 'entities' ? 'text-purple-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  {sidebar.entities}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('graph')}
                  className={`text-sm transition-colors text-left w-full ${activeTab === 'graph' ? 'text-purple-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  {sidebar.graph}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('insights')}
                  className={`text-sm transition-colors text-left w-full ${activeTab === 'insights' ? 'text-purple-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  {sidebar.insights}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content - 关键修复 */}
      <div className="flex-1 min-w-0">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <ShinyText text={apiContent.headline} />
          </h1>
          <p className="text-lg text-gray-400">
            {apiContent.subheadline}
          </p>
        </header>

        {/* 固定高度容器 */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <_motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <h2 className="text-2xl font-bold text-white mb-4">{content.overview?.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {content.overview?.desc}
                </p>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
                  <h4 className="text-purple-300 font-bold mb-2">{content.overview?.baseUrl}</h4>
                  <code className="text-white">https://api.synodic-org.com/v1</code>
                </div>
              </_motion.div>
            )}

            {activeTab === 'auth' && (
              <_motion.div 
                key="auth"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <h2 className="text-2xl font-bold text-white mb-4">{content.auth?.title}</h2>
                <p className="text-gray-400 mb-6">
                  {content.auth?.desc} <code className="bg-white/10 px-1 rounded text-gray-200">Authorization</code> header.
                </p>
                <CodeBlock 
                  code={`Authorization: Bearer sk_live_...`} 
                  language="http"
                />
              </_motion.div>
            )}

            {activeTab === 'entities' && (
              <_motion.div 
                key="entities"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 overflow-y-auto synodic-scrollbar pr-2"
              >
                <h2 className="text-2xl font-bold text-white mb-8">{content.entities?.title}</h2>
                <Endpoint 
                  method="GET" 
                  path="/entities/search" 
                  description={content.entities?.searchDesc}
                  example={`// GET /v1/entities/search?q=Nvidia\n\n{\n  "data": [\n    {\n      "id": "ent_12345",\n      "name": "Nvidia Corporation",\n      "ticker": "NVDA",\n      "type": "Company",\n      "confidence": 0.98\n    }\n  ]\n}`}
                />
                <Endpoint 
                  method="GET" 
                  path="/entities/{id}" 
                  description={content.entities?.detailDesc}
                  example={`// GET /v1/entities/ent_12345\n\n{\n  "id": "ent_12345",\n  "name": "Nvidia Corporation",\n  "risk_score": 12,\n  "market_cap": "2.1T",\n  "sector": "Semiconductors"\n}`}
                />
              </_motion.div>
            )}

            {activeTab === 'graph' && (
              <_motion.div 
                key="graph"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <h2 className="text-2xl font-bold text-white mb-8">{content.graph?.title}</h2>
                <Endpoint 
                  method="GET" 
                  path="/graph/neighbors" 
                  description={content.graph?.neighborsDesc}
                  example={`// GET /v1/graph/neighbors?entity_id=ent_12345\n\n{\n  "nodes": [...],\n  "edges": [\n    { "source": "ent_12345", "target": "ent_67890", "type": "SUPPLIER_OF" }\n  ]\n}`}
                />
              </_motion.div>
            )}

            {activeTab === 'insights' && (
              <_motion.div 
                key="insights"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <h2 className="text-2xl font-bold text-white mb-8">{content.insights?.title}</h2>
                 <Endpoint 
                  method="GET" 
                  path="/insights/latest" 
                  description={content.insights?.latestDesc}
                  example={`// GET /v1/insights/latest\n\n{\n  "data": [\n    {\n      "id": "ins_9988",\n      "type": "supply_chain_risk",\n      "severity": "high",\n      "description": "Potential disruption in rare earth supply..."\n    }\n  ]\n}`}
                />
              </_motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

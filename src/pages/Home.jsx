import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { RotatingText, ShinyText } from '../components/UI/TextEffects'
import Stepper from '../components/UI/Stepper'

const steps = [
  {
    title: 'Ingestion',
    description: 'Aggregating multi-source heterogenous data from global markets, news feeds, and corporate filings into a unified data lake.',
    icon: '🌪️'
  },
  {
    title: 'Resolution',
    description: 'Entity Identity & Relation Mapping using advanced NLP and graph algorithms to resolve disambiguities and link entities.',
    icon: '🔗'
  },
  {
    title: 'Analysis',
    description: 'Graph Neural Network Inference to detect hidden patterns, community structures, and anomaly propagation risks.',
    icon: '🧠'
  },
  {
    title: 'Insight',
    description: 'Delivering actionable Market Intelligence through interactive dashboards and real-time API alerts.',
    icon: '✨'
  }
]

const Home = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide mb-4 backdrop-blur-md">
            Synodic Macro Entity Atlas v1.0
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Mapping the Hidden <br />
            <RotatingText 
              words={['Connections', 'Risks', 'Opportunities']} 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            /> <br />
            of the Global Economy.
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Synodic reveals the invisible gravitational pulls between corporate entities, transforming raw data into a navigable universe of economic intelligence.
          </p>

          {/* CTA */}
          <div className="pt-8">
            <button className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <ShinyText text="Explore the Atlas" className="text-black" />
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </div>
        </div>
      </section>

      {/* Features / Stepper Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Data Pipeline</h2>
            <p className="text-gray-400">From raw signals to high-fidelity intelligence.</p>
          </div>
          
          <Stepper steps={steps} />
        </div>
      </section>
    </MainLayout>
  )
}

export default Home

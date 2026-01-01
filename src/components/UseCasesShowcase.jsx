import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion as _motion } from 'framer-motion'
import Threads from './Backgrounds/Threads'
import { useI18n } from '../i18n.jsx'

function toSvgDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function caseVariantNameByIndex(i) {
  return ['geo', 'industry', 'risk', 'region', 'sentiment', 'resilience', 'competitor', 'supply', 'more'][i] ?? 'more'
}

function buildUseCaseSvg({ hue, variant }) {
  const h1 = hue % 360
  const h2 = (hue + 55) % 360
  const h3 = (hue + 20) % 360
  const h4 = (hue + 95) % 360

  const layer = (() => {
    if (variant === 'geo') {
      return `
        <defs>
          <radialGradient id="geoSphere" cx="38%" cy="30%" r="70%">
            <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
            <stop offset="0.35" stop-color="hsl(${h2}, 90%, 70%)" stop-opacity="0.12"/>
            <stop offset="1" stop-color="#000000" stop-opacity="0.55"/>
          </radialGradient>
          <radialGradient id="geoAtmos" cx="45%" cy="35%" r="70%">
            <stop offset="0" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0.12"/>
            <stop offset="1" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0"/>
          </radialGradient>
          <clipPath id="geoClip">
            <circle cx="560" cy="500" r="240"/>
          </clipPath>
          <linearGradient id="geoPanel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffffff" stop-opacity="0.06"/>
            <stop offset="1" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0.06"/>
          </linearGradient>
        </defs>

        <g opacity="0.9">
          <circle cx="560" cy="500" r="272" fill="url(#geoAtmos)"/>
          <circle cx="560" cy="500" r="244" fill="url(#geoSphere)"/>
          <circle cx="560" cy="500" r="244" fill="#000000" opacity="0.10"/>
          <circle cx="560" cy="500" r="244" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
          <circle cx="560" cy="500" r="258" fill="none" stroke="hsl(${h4}, 90%, 70%)" stroke-opacity="0.10" stroke-width="2"/>
        </g>

        <g clip-path="url(#geoClip)" opacity="0.95" fill="none" stroke="#ffffff">
          <path d="M320 500 C 420 420, 520 420, 800 500 C 520 580, 420 580, 320 500" stroke-width="2" stroke-opacity="0.06"/>
          <path d="M340 430 C 460 380, 560 390, 780 450" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M360 570 C 510 610, 650 590, 790 540" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M380 500 C 460 450, 520 440, 740 500 C 520 560, 460 550, 380 500" stroke-width="2" stroke-opacity="0.045"/>

          <path d="M560 265 C 520 320, 520 360, 560 405 C 600 360, 600 320, 560 265" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M560 595 C 520 640, 520 680, 560 725 C 600 680, 600 640, 560 595" stroke-width="2" stroke-opacity="0.05"/>
        </g>
      `.trim()
    }

    if (variant === 'industry') {
      return `
        <defs>
          <linearGradient id="indGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0.14"/>
            <stop offset="1" stop-color="hsl(${h1}, 90%, 70%)" stop-opacity="0.06"/>
          </linearGradient>
        </defs>

        <g opacity="0.95">
          <rect x="300" y="270" width="880" height="460" fill="#000000" opacity="0.20"/>
          <rect x="330" y="300" width="820" height="400" fill="url(#indGlow)" opacity="0.9"/>
          <rect x="330" y="300" width="820" height="400" fill="#ffffff" opacity="0.02"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <path d="M360 640 H1120" stroke-opacity="0.06" stroke-width="2"/>
          <path d="M360 600 H1120" stroke-opacity="0.045" stroke-width="2"/>
          <path d="M360 560 H1120" stroke-opacity="0.04" stroke-width="2"/>
          <path d="M360 520 H1120" stroke-opacity="0.035" stroke-width="2"/>
          <path d="M360 480 H1120" stroke-opacity="0.03" stroke-width="2"/>
          <path d="M360 440 H1120" stroke-opacity="0.025" stroke-width="2"/>
          <path d="M360 400 H1120" stroke-opacity="0.02" stroke-width="2"/>
        </g>

        <g opacity="0.95">
          <rect x="420" y="370" width="120" height="270" fill="hsl(${h4}, 90%, 70%)" opacity="0.08"/>
          <rect x="590" y="430" width="120" height="210" fill="hsl(${h1}, 90%, 70%)" opacity="0.07"/>
          <rect x="760" y="470" width="120" height="170" fill="hsl(${h2}, 90%, 70%)" opacity="0.07"/>
          <rect x="930" y="520" width="120" height="120" fill="#ffffff" opacity="0.04"/>
        </g>
      `.trim()
    }

    if (variant === 'risk') {
      return `
        <defs>
          <radialGradient id="riskCore" cx="30%" cy="30%" r="70%">
            <stop offset="0" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0.20"/>
            <stop offset="1" stop-color="#0b0b10" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <g opacity="0.95">
          <circle cx="700" cy="450" r="290" fill="url(#riskCore)"/>
          <circle cx="700" cy="450" r="210" fill="hsl(${h2}, 90%, 70%)" opacity="0.05"/>
          <circle cx="700" cy="450" r="140" fill="#ffffff" opacity="0.03"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <path d="M420 450 H980" stroke-width="2" stroke-opacity="0.06"/>
          <path d="M700 170 V730" stroke-width="2" stroke-opacity="0.05"/>
          <circle cx="700" cy="450" r="260" stroke-width="2" stroke-opacity="0.05"/>
          <circle cx="700" cy="450" r="190" stroke-width="2" stroke-opacity="0.04"/>
          <circle cx="700" cy="450" r="120" stroke-width="2" stroke-opacity="0.03"/>
        </g>

        <g opacity="0.95">
          <path d="M700 270 L740 350 L830 360 L760 420 L780 510 L700 460 L620 510 L640 420 L570 360 L660 350 Z" fill="hsl(${h4}, 90%, 70%)" opacity="0.10"/>
          <circle cx="700" cy="450" r="46" fill="#000000" opacity="0.35"/>
          <circle cx="700" cy="450" r="46" fill="#ffffff" opacity="0.03"/>
          <path d="M700 410 L732 470 H668 Z" fill="#ffffff" opacity="0.15"/>
        </g>
      `.trim()
    }

    if (variant === 'region') {
      return `
        <defs>
          <linearGradient id="regGrid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffffff" stop-opacity="0.05"/>
            <stop offset="1" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0.06"/>
          </linearGradient>
        </defs>

        <g opacity="0.95">
          <rect x="300" y="240" width="1040" height="520" fill="#000000" opacity="0.18"/>
          <rect x="320" y="260" width="1000" height="480" fill="url(#regGrid)" opacity="0.95"/>
          <rect x="320" y="260" width="1000" height="480" fill="#ffffff" opacity="0.015"/>
        </g>

        <g opacity="0.85" fill="none" stroke="#ffffff">
          ${Array.from({ length: 10 }).map((_, i) => `<path d="M${340 + i * 98} 260 V740" stroke-opacity="0.035" stroke-width="1.5"/>`).join('')}
          ${Array.from({ length: 6 }).map((_, i) => `<path d="M320 ${300 + i * 80} H1320" stroke-opacity="0.03" stroke-width="1.5"/>`).join('')}
        </g>

        <g opacity="0.95">
          <circle cx="520" cy="420" r="44" fill="hsl(${h4}, 90%, 70%)" opacity="0.10"/>
          <circle cx="790" cy="510" r="36" fill="hsl(${h2}, 90%, 70%)" opacity="0.09"/>
          <circle cx="1040" cy="380" r="32" fill="#ffffff" opacity="0.05"/>
          <path d="M520 420 C 620 380, 700 420, 790 510" stroke="hsl(${h4}, 90%, 70%)" stroke-opacity="0.14" stroke-width="3" fill="none"/>
          <path d="M790 510 C 900 560, 980 510, 1040 380" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2.5" fill="none"/>
        </g>
      `.trim()
    }

    if (variant === 'sentiment') {
      return `
        <defs>
          <linearGradient id="emoRing" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0.16"/>
            <stop offset="1" stop-color="hsl(${h2}, 90%, 70%)" stop-opacity="0.12"/>
          </linearGradient>
        </defs>

        <g opacity="0.95">
          <circle cx="820" cy="500" r="280" fill="hsl(${h1}, 90%, 70%)" opacity="0.05"/>
          <circle cx="820" cy="500" r="210" fill="hsl(${h2}, 90%, 70%)" opacity="0.06"/>
          <circle cx="820" cy="500" r="140" fill="hsl(${h3}, 90%, 70%)" opacity="0.06"/>
          <circle cx="820" cy="500" r="78" fill="#ffffff" opacity="0.04"/>
        </g>

        <g opacity="0.85" fill="none" stroke="#ffffff">
          <circle cx="820" cy="500" r="330" stroke-width="3" stroke-opacity="0.04"/>
          <circle cx="820" cy="500" r="260" stroke-width="3" stroke-opacity="0.05"/>
          <circle cx="820" cy="500" r="190" stroke-width="3" stroke-opacity="0.06"/>
          <circle cx="820" cy="500" r="120" stroke-width="3" stroke-opacity="0.07"/>
        </g>

        <g opacity="0.9" fill="none" stroke="hsl(${h4}, 90%, 68%)">
          <path d="M360 650 C 520 540, 640 710, 800 620 S 1100 450, 1260 540" stroke-width="4" stroke-opacity="0.11"/>
          <path d="M420 380 C 560 320, 650 460, 780 400 S 1050 290, 1220 350" stroke-width="3" stroke-opacity="0.09"/>
        </g>

        <g opacity="0.95">
          <path d="M760 470 Q820 420 880 470" stroke="#ffffff" stroke-opacity="0.14" stroke-width="4" fill="none"/>
          <path d="M740 560 Q820 610 900 560" stroke="url(#emoRing)" stroke-opacity="0.9" stroke-width="6" fill="none" stroke-linecap="round"/>
          <circle cx="770" cy="520" r="10" fill="#ffffff" opacity="0.12"/>
          <circle cx="870" cy="520" r="10" fill="#ffffff" opacity="0.12"/>
        </g>
      `.trim()
    }

    if (variant === 'resilience') {
      return `
        <g opacity="0.95">
          <rect x="320" y="260" width="980" height="480" fill="#000000" opacity="0.18"/>
          <rect x="340" y="280" width="940" height="440" fill="#ffffff" opacity="0.012"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <path d="M420 640 C 520 520, 640 660, 740 540 S 980 520, 1100 420" stroke-width="4" stroke-opacity="0.06"/>
          <path d="M420 640 C 520 520, 640 660, 740 540 S 980 520, 1100 420" stroke="hsl(${h4}, 90%, 70%)" stroke-width="3" stroke-opacity="0.12"/>
          <path d="M420 520 H1120" stroke-width="2" stroke-opacity="0.03"/>
          <path d="M420 600 H1120" stroke-width="2" stroke-opacity="0.03"/>
          <path d="M420 440 H1120" stroke-width="2" stroke-opacity="0.03"/>
        </g>

        <g opacity="0.95">
          <circle cx="420" cy="640" r="12" fill="hsl(${h2}, 90%, 70%)" opacity="0.10"/>
          <circle cx="640" cy="660" r="12" fill="#ffffff" opacity="0.06"/>
          <circle cx="740" cy="540" r="12" fill="hsl(${h4}, 90%, 70%)" opacity="0.10"/>
          <circle cx="980" cy="520" r="12" fill="hsl(${h1}, 90%, 70%)" opacity="0.09"/>
          <circle cx="1100" cy="420" r="12" fill="#ffffff" opacity="0.06"/>
        </g>
      `.trim()
    }

    if (variant === 'competitor') {
      return `
        <g opacity="0.95">
          <circle cx="760" cy="500" r="320" fill="hsl(${h4}, 90%, 70%)" opacity="0.05"/>
          <circle cx="520" cy="450" r="220" fill="#ffffff" opacity="0.03"/>
          <circle cx="980" cy="560" r="260" fill="hsl(${h1}, 90%, 70%)" opacity="0.04"/>
        </g>

        <g opacity="0.85" fill="none" stroke="#ffffff">
          <path d="M520 450 L760 500" stroke-opacity="0.06" stroke-width="3"/>
          <path d="M760 500 L980 560" stroke-opacity="0.06" stroke-width="3"/>
          <path d="M520 450 L980 560" stroke-opacity="0.04" stroke-width="2"/>
          <circle cx="520" cy="450" r="160" stroke-opacity="0.03" stroke-width="2"/>
          <circle cx="760" cy="500" r="200" stroke-opacity="0.03" stroke-width="2"/>
          <circle cx="980" cy="560" r="180" stroke-opacity="0.03" stroke-width="2"/>
        </g>

        <g opacity="0.95">
          <circle cx="520" cy="450" r="20" fill="#ffffff" opacity="0.08"/>
          <circle cx="760" cy="500" r="22" fill="hsl(${h4}, 90%, 70%)" opacity="0.12"/>
          <circle cx="980" cy="560" r="20" fill="hsl(${h2}, 90%, 70%)" opacity="0.10"/>
        </g>
      `.trim()
    }

    if (variant === 'supply') {
      return `
        <g opacity="0.95">
          <rect x="320" y="280" width="980" height="440" fill="#000000" opacity="0.18"/>
          <rect x="350" y="310" width="920" height="380" fill="#ffffff" opacity="0.012"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <path d="M420 380 H1120" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M420 500 H1120" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M420 620 H1120" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M520 340 V660" stroke-width="2" stroke-opacity="0.03"/>
          <path d="M820 340 V660" stroke-width="2" stroke-opacity="0.03"/>
        </g>

        <g opacity="0.95">
          <rect x="460" y="552" width="100" height="14" fill="#ffffff" opacity="0.04"/>
          <rect x="856" y="534" width="110" height="14" fill="#ffffff" opacity="0.04"/>
          <rect x="472" y="576" width="120" height="10" fill="#ffffff" opacity="0.03"/>
          <rect x="868" y="558" width="132" height="10" fill="#ffffff" opacity="0.03"/>
        </g>

        <g opacity="0.95">
          <rect x="1180" y="270" width="320" height="410" fill="#000000" opacity="0.22"/>
          <rect x="1204" y="300" width="200" height="20" fill="#ffffff" opacity="0.05"/>
          <rect x="1204" y="336" width="260" height="12" fill="#ffffff" opacity="0.035"/>
          <rect x="1204" y="380" width="260" height="40" fill="#ffffff" opacity="0.03"/>
          <rect x="1222" y="394" width="180" height="12" fill="#ffffff" opacity="0.04"/>

          <rect x="1204" y="448" width="260" height="10" fill="#ffffff" opacity="0.035"/>
          <rect x="1204" y="448" width="210" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.10"/>
          <rect x="1204" y="476" width="260" height="10" fill="#ffffff" opacity="0.03"/>
          <rect x="1204" y="476" width="160" height="10" fill="hsl(${h2}, 90%, 70%)" opacity="0.09"/>
          <rect x="1204" y="504" width="260" height="10" fill="#ffffff" opacity="0.025"/>
          <rect x="1204" y="504" width="120" height="10" fill="hsl(${h1}, 90%, 70%)" opacity="0.08"/>
        </g>
      `.trim()
    }

    return `
      <g opacity="0.95">
        <rect x="260" y="240" width="980" height="500" fill="#ffffff" opacity="0.02"/>
        <g opacity="0.95">
          <rect x="280" y="260" width="300" height="140" fill="#ffffff" opacity="0.03"/>
          <rect x="600" y="260" width="300" height="140" fill="#ffffff" opacity="0.02"/>
          <rect x="920" y="260" width="300" height="140" fill="#ffffff" opacity="0.02"/>

          <rect x="280" y="420" width="300" height="140" fill="#ffffff" opacity="0.02"/>
          <rect x="600" y="420" width="300" height="140" fill="hsl(${h2}, 90%, 66%)" opacity="0.06"/>
          <rect x="920" y="420" width="300" height="140" fill="#ffffff" opacity="0.02"/>

          <rect x="280" y="580" width="300" height="140" fill="hsl(${h1}, 90%, 66%)" opacity="0.06"/>
          <rect x="600" y="580" width="300" height="140" fill="#ffffff" opacity="0.02"/>
          <rect x="920" y="580" width="300" height="140" fill="hsl(${h4}, 90%, 66%)" opacity="0.05"/>
        </g>

        <g opacity="0.95">
          <rect x="1260" y="240" width="240" height="500" fill="#000000" opacity="0.20"/>
          <rect x="1280" y="272" width="180" height="20" fill="#ffffff" opacity="0.05"/>
          <rect x="1280" y="310" width="200" height="12" fill="#ffffff" opacity="0.035"/>
          <rect x="1280" y="356" width="200" height="10" fill="#ffffff" opacity="0.03"/>
          <rect x="1280" y="356" width="140" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.08"/>
          <rect x="1280" y="384" width="200" height="10" fill="#ffffff" opacity="0.024"/>
          <rect x="1280" y="384" width="110" height="10" fill="hsl(${h2}, 90%, 70%)" opacity="0.07"/>
        </g>

        <g opacity="0.9">
          <rect x="660" y="320" width="420" height="340" fill="#000000" opacity="0.16"/>
          <rect x="680" y="340" width="240" height="18" fill="#ffffff" opacity="0.05"/>
          <rect x="680" y="370" width="320" height="12" fill="#ffffff" opacity="0.03"/>
          <rect x="680" y="412" width="380" height="190" fill="#ffffff" opacity="0.02"/>
          <rect x="698" y="430" width="190" height="14" fill="#ffffff" opacity="0.035"/>
          <rect x="698" y="456" width="150" height="10" fill="#ffffff" opacity="0.025"/>
          <rect x="698" y="492" width="210" height="14" fill="#ffffff" opacity="0.03"/>
          <rect x="698" y="518" width="170" height="10" fill="#ffffff" opacity="0.022"/>
        </g>
      </g>
    `.trim()
  })()

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="hsl(${h1}, 85%, 60%)" stop-opacity="0.26"/>
          <stop offset="1" stop-color="hsl(${h2}, 90%, 65%)" stop-opacity="0.06"/>
        </linearGradient>
        <radialGradient id="r" cx="22%" cy="18%" r="70%">
          <stop offset="0" stop-color="hsl(${h3}, 90%, 70%)" stop-opacity="0.20"/>
          <stop offset="1" stop-color="#0b0b10" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="#07070a"/>
      <rect width="1600" height="900" fill="url(#g)"/>
      <rect width="1600" height="900" fill="url(#r)"/>
      <g opacity="0.65" fill="none" stroke="#ffffff">
        <path d="M-80 640 C 240 520, 420 760, 780 620 S 1320 460, 1680 590" stroke-width="2" stroke-opacity="0.07"/>
        <path d="M-120 740 C 220 610, 520 890, 860 710 S 1360 520, 1760 680" stroke-width="2" stroke-opacity="0.05"/>
        <path d="M-60 520 C 300 380, 520 590, 900 470 S 1320 320, 1700 420" stroke-width="2" stroke-opacity="0.045"/>
      </g>
      <g opacity="0.9">
        <circle cx="1260" cy="220" r="160" fill="hsl(${h4}, 85%, 65%)" opacity="0.08"/>
        <circle cx="1320" cy="260" r="240" fill="#ffffff" opacity="0.03"/>
        <circle cx="360" cy="700" r="220" fill="hsl(${h1}, 90%, 65%)" opacity="0.06"/>
      </g>
      <g opacity="0.7">
        <rect x="120" y="130" width="1360" height="640" fill="#000000" opacity="0.14"/>
        <rect x="150" y="160" width="1300" height="580" fill="#000000" opacity="0.08"/>
        <rect x="150" y="160" width="1300" height="580" fill="#ffffff" opacity="0.015"/>
      </g>
      <g opacity="0.9">
        <rect x="190" y="190" width="220" height="26" fill="#ffffff" opacity="0.04"/>
        <rect x="420" y="190" width="140" height="26" fill="#ffffff" opacity="0.02"/>
        <rect x="1250" y="190" width="70" height="26" fill="#ffffff" opacity="0.03"/>
        <rect x="1330" y="190" width="70" height="26" fill="#ffffff" opacity="0.02"/>
        <rect x="1410" y="190" width="40" height="26" fill="#ffffff" opacity="0.02"/>

        <rect x="1230" y="720" width="220" height="10" fill="#ffffff" opacity="0.02"/>
        <rect x="1230" y="720" width="150" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.07"/>
        <rect x="1230" y="738" width="160" height="10" fill="#ffffff" opacity="0.018"/>
      </g>
      ${layer}
    </svg>
  `.trim()
}

export default function UseCasesShowcase() {
  const { t, locale } = useI18n()

  const useCases = useMemo(() => t('home.useCases') || {}, [t])
  const levels = useMemo(() => (Array.isArray(useCases.levels) ? useCases.levels : []), [useCases])

  const allSlides = useMemo(() => {
    const flattened = []
    for (const level of levels) {
      const items = Array.isArray(level?.items) ? level.items : []
      for (const item of items) {
        if (!item) continue
        flattened.push({
          level: level.level,
          title: item.title,
          desc: item.desc,
        })
      }
    }
    return flattened
  }, [levels])

  const headerLabels = useMemo(() => {
    const zh = ['地缘推演', '产业情报', '金融预警', '区域监测', '舆情感知', '韧性评估', '竞对分析', '供应审计', '更多']
    const en = ['Geo Sim', 'Industry', 'Risk', 'Region', 'Sentiment', 'Resilience', 'Competitor', 'Supply', 'More']
    return locale === 'zh' ? zh : en
  }, [locale])

  const slides = useMemo(() => {
    const picked = allSlides.slice(0, 8)
    const moreSlide = locale === 'zh'
      ? { level: '更多', title: '更多场景', desc: '定制化拓展至全领域，实现个性化需求与多场景应用。' }
      : { level: 'More', title: 'More Use Cases', desc: 'Customization extends to all fields, enabling personalized solutions and multi-scenario applications.' }

    const merged = [...picked, moreSlide]
    const hues = [285, 250, 320, 210, 300, 260, 330, 235, 290]

    return merged.map((s, i) => {
      const hue = hues[i % hues.length]
      const variant = caseVariantNameByIndex(i)
      const svg = buildUseCaseSvg({ hue, variant })

      return {
        ...s,
        id: `${i}-${String(s.title ?? '')}`,
        headerLabel: headerLabels[i] ?? String(s.title ?? ''),
        image: toSvgDataUri(svg),
      }
    })
  }, [allSlides, headerLabels, locale])

  const [activeIndex, setActiveIndex] = useState(0)

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  return (
    <section className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-20 bg-[#080808]" />
      <div className="absolute inset-0 w-full h-full -z-10">
        <Threads amplitude={3} distance={-12} color={[0.7, 0.4, 1.0]} />
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      </div>

      <div className="w-full relative z-10 h-full flex flex-col">
        <div
          className="shrink-0 flex items-center justify-center"
          style={{ height: 'clamp(96px, 20vh, 160px)' }}
        >
          <div className="w-full px-4 md:px-6">
            <div className="grid grid-cols-9 w-full border border-white/10 divide-x divide-white/10 bg-black/10 backdrop-blur-md">
              {slides.map((s, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={[
                      'relative h-[52px] md:h-[72px] transition-colors',
                      isActive ? 'bg-white/10' : 'bg-white/0 hover:bg-white/5',
                    ].join(' ')}
                  >
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-70" />
                    <div className="relative h-full w-full flex items-center justify-center px-1">
                      <div className="text-[11px] sm:text-[12px] md:text-[14px] font-semibold tracking-[0.06em] md:tracking-[0.22em] text-white/90 leading-[1.08] text-center break-all md:break-normal md:whitespace-nowrap max-h-[2.2em] overflow-hidden">
                        {s.headerLabel}
                      </div>
                    </div>
                    {isActive ? (
                      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/20" />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 pb-5">
          <div className="relative h-full w-full overflow-hidden border-y border-white/10 bg-[#0a0a0a]/60 shadow-[0_24px_120px_rgba(0,0,0,0.6)]">
            <AnimatePresence mode="wait">
              <_motion.div
                key={slides[activeIndex]?.id}
                className="absolute inset-0"
                initial={{ opacity: 0.3, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2, scale: 0.99 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  backgroundImage: `url("${slides[activeIndex]?.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/15 to-black/55" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.14),transparent_50%),radial-gradient(circle_at_75%_55%,rgba(168,85,247,0.12),transparent_55%)]" />

            <div className="absolute top-5 left-5 md:top-7 md:left-7 max-w-[min(620px,calc(100%-3rem))]">
              <div className="p-[1px] bg-gradient-to-br from-white/15 via-white/8 to-purple-500/18">
                <div className="bg-black/35 backdrop-blur-xl border border-white/10 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] tracking-[0.32em] text-white/65">
                      {useCases.title || (locale === 'zh' ? '应用场景' : 'Use Cases')}
                    </div>
                    <div className="text-[10px] tracking-[0.32em] text-white/45">
                      {slides[activeIndex]?.level}
                    </div>
                  </div>
                  <div className="mt-4 text-2xl md:text-4xl font-bold text-white leading-tight">
                    {slides[activeIndex]?.title}
                  </div>
                  <div className="mt-3 text-sm md:text-lg text-white/70 leading-relaxed">
                    {slides[activeIndex]?.desc}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label={locale === 'zh' ? '上一个' : 'Previous'}
              onClick={goPrev}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
            >
              <span className="text-lg leading-none">◀</span>
            </button>
            <button
              type="button"
              aria-label={locale === 'zh' ? '下一个' : 'Next'}
              onClick={goNext}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
            >
              <span className="text-lg leading-none">▶</span>
            </button>

            <div className="absolute right-5 bottom-5 md:right-7 md:bottom-7 flex items-center gap-3">
              <div className="text-xs tracking-[0.25em] text-white/55">
                {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
              <div className="w-28 h-1 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400/70 to-blue-400/60"
                  style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


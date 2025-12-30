import { useCallback, useMemo, useState } from 'react'
import { RotatingText, ShinyText } from '../components/UI/TextEffects'
import Stepper from '../components/UI/Stepper'
import { useI18n } from '../i18n.jsx'
import { AnimatePresence, motion as _motion } from 'framer-motion'
import Squares from '../components/Backgrounds/Squares'
import Threads from '../components/Backgrounds/Threads'

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
          <path d="M320 500 C 420 470, 520 455, 560 455 C 600 455, 700 470, 800 500" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M320 500 C 420 530, 520 545, 560 545 C 600 545, 700 530, 800 500" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M320 500 C 420 440, 520 415, 560 415 C 600 415, 700 440, 800 500" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M320 500 C 420 560, 520 585, 560 585 C 600 585, 700 560, 800 500" stroke-width="2" stroke-opacity="0.04"/>
        </g>

        <g clip-path="url(#geoClip)" opacity="0.85">
          <path d="M430 450 C 470 430, 520 420, 560 430 C 520 460, 500 500, 460 520 C 420 500, 410 470, 430 450" fill="hsl(${h2}, 90%, 70%)" opacity="0.10"/>
          <path d="M610 470 C 660 450, 720 470, 740 520 C 710 560, 650 570, 610 545 C 590 520, 590 490, 610 470" fill="hsl(${h4}, 90%, 70%)" opacity="0.09"/>
          <path d="M500 560 C 550 540, 600 550, 620 590 C 590 620, 540 630, 500 610 C 480 590, 480 575, 500 560" fill="#ffffff" opacity="0.04"/>
        </g>

        <g opacity="0.9" fill="none" stroke="hsl(${h4}, 90%, 70%)">
          <path d="M420 330 C 520 270, 650 290, 720 360" stroke-width="4" stroke-opacity="0.12"/>
          <path d="M360 640 C 520 520, 680 620, 820 500" stroke-width="4" stroke-opacity="0.10"/>
          <path d="M640 690 C 740 630, 900 640, 1020 560" stroke-width="3" stroke-opacity="0.08"/>
        </g>

        <g opacity="0.95">
          <circle cx="420" cy="330" r="10" fill="#ffffff" opacity="0.16"/>
          <circle cx="720" cy="360" r="10" fill="#ffffff" opacity="0.14"/>
          <circle cx="360" cy="640" r="10" fill="#ffffff" opacity="0.14"/>
          <circle cx="820" cy="500" r="10" fill="#ffffff" opacity="0.12"/>
          <circle cx="1020" cy="560" r="9" fill="#ffffff" opacity="0.10"/>
        </g>

        <g opacity="0.95">
          <rect x="940" y="250" width="420" height="430" fill="#000000" opacity="0.22"/>
          <rect x="940" y="250" width="420" height="430" fill="url(#geoPanel)" opacity="0.95"/>
          <rect x="970" y="286" width="220" height="20" fill="#ffffff" opacity="0.06"/>
          <rect x="1200" y="286" width="130" height="20" fill="#ffffff" opacity="0.04"/>

          <rect x="970" y="332" width="360" height="10" fill="#ffffff" opacity="0.05"/>
          <rect x="970" y="332" width="220" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.10"/>
          <rect x="1190" y="324" width="6" height="26" fill="#ffffff" opacity="0.10"/>

          <rect x="970" y="378" width="380" height="86" fill="#ffffff" opacity="0.04"/>
          <rect x="986" y="396" width="240" height="16" fill="#ffffff" opacity="0.06"/>
          <rect x="986" y="422" width="190" height="12" fill="#ffffff" opacity="0.045"/>

          <rect x="970" y="478" width="380" height="86" fill="#ffffff" opacity="0.035"/>
          <rect x="986" y="496" width="260" height="16" fill="#ffffff" opacity="0.055"/>
          <rect x="986" y="522" width="170" height="12" fill="#ffffff" opacity="0.04"/>

          <rect x="970" y="578" width="380" height="86" fill="#ffffff" opacity="0.03"/>
          <rect x="986" y="596" width="230" height="16" fill="#ffffff" opacity="0.05"/>
          <rect x="986" y="622" width="210" height="12" fill="#ffffff" opacity="0.035"/>

          <rect x="1210" y="382" width="140" height="282" fill="#000000" opacity="0.12"/>
          <g opacity="0.9">
            <rect x="1226" y="404" width="108" height="18" fill="#ffffff" opacity="0.05"/>
            <rect x="1226" y="434" width="108" height="18" fill="#ffffff" opacity="0.04"/>
            <rect x="1226" y="464" width="108" height="18" fill="#ffffff" opacity="0.035"/>
            <rect x="1226" y="506" width="108" height="10" fill="#ffffff" opacity="0.04"/>
            <rect x="1226" y="506" width="72" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.09"/>
            <rect x="1226" y="532" width="108" height="10" fill="#ffffff" opacity="0.035"/>
            <rect x="1226" y="532" width="58" height="10" fill="hsl(${h2}, 90%, 70%)" opacity="0.08"/>
            <rect x="1226" y="558" width="108" height="10" fill="#ffffff" opacity="0.03"/>
            <rect x="1226" y="558" width="86" height="10" fill="hsl(${h1}, 90%, 70%)" opacity="0.07"/>
          </g>
        </g>
      `.trim()
    }

    if (variant === 'industry') {
      return `
        <defs>
          <linearGradient id="indWedge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0.16"/>
            <stop offset="1" stop-color="hsl(${h4}, 90%, 70%)" stop-opacity="0"/>
          </linearGradient>
        </defs>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <rect x="280" y="240" width="880" height="500" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M280 365 H1160" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M280 490 H1160" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M280 615 H1160" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M500 240 V740" stroke-width="2" stroke-opacity="0.03"/>
          <path d="M720 240 V740" stroke-width="2" stroke-opacity="0.03"/>
          <path d="M940 240 V740" stroke-width="2" stroke-opacity="0.03"/>
        </g>

        <g opacity="0.95">
          <rect x="304" y="262" width="176" height="86" fill="hsl(${h1}, 86%, 64%)" opacity="0.10"/>
          <rect x="524" y="262" width="176" height="86" fill="hsl(${h2}, 86%, 64%)" opacity="0.09"/>
          <rect x="744" y="262" width="176" height="86" fill="#ffffff" opacity="0.05"/>
          <rect x="964" y="262" width="176" height="86" fill="hsl(${h3}, 86%, 64%)" opacity="0.08"/>

          <rect x="304" y="387" width="176" height="86" fill="hsl(${h2}, 90%, 66%)" opacity="0.09"/>
          <rect x="524" y="387" width="176" height="86" fill="#ffffff" opacity="0.045"/>
          <rect x="744" y="387" width="176" height="86" fill="hsl(${h4}, 90%, 66%)" opacity="0.08"/>
          <rect x="964" y="387" width="176" height="86" fill="#ffffff" opacity="0.04"/>

          <rect x="304" y="512" width="176" height="86" fill="#ffffff" opacity="0.035"/>
          <rect x="524" y="512" width="176" height="86" fill="hsl(${h1}, 90%, 66%)" opacity="0.08"/>
          <rect x="744" y="512" width="176" height="86" fill="hsl(${h2}, 90%, 66%)" opacity="0.07"/>
          <rect x="964" y="512" width="176" height="86" fill="hsl(${h4}, 90%, 66%)" opacity="0.06"/>

          <rect x="304" y="637" width="176" height="86" fill="hsl(${h3}, 90%, 66%)" opacity="0.06"/>
          <rect x="524" y="637" width="176" height="86" fill="#ffffff" opacity="0.04"/>
          <rect x="744" y="637" width="176" height="86" fill="hsl(${h1}, 90%, 66%)" opacity="0.06"/>
          <rect x="964" y="637" width="176" height="86" fill="#ffffff" opacity="0.03"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <circle cx="392" cy="305" r="9" stroke-opacity="0.10" stroke-width="2"/>
          <circle cx="612" cy="305" r="9" stroke-opacity="0.10" stroke-width="2"/>
          <circle cx="832" cy="305" r="9" stroke-opacity="0.10" stroke-width="2"/>
          <circle cx="1052" cy="305" r="9" stroke-opacity="0.10" stroke-width="2"/>
          <path d="M392 305 L612 305 L832 305 L1052 305" stroke-opacity="0.06" stroke-width="2"/>
        </g>

        <g opacity="0.85">
          <path d="M1260 220 A 280 280 0 0 1 1040 440 L1260 440 Z" fill="url(#indWedge)"/>
          <circle cx="1260" cy="220" r="10" fill="#ffffff" opacity="0.10"/>
          <circle cx="1260" cy="220" r="260" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="3"/>
        </g>

        <g opacity="0.95">
          <rect x="260" y="708" width="250" height="24" fill="#ffffff" opacity="0.04"/>
          <rect x="260" y="740" width="220" height="12" fill="#ffffff" opacity="0.03"/>
        </g>

        <g opacity="0.9" fill="none" stroke="hsl(${h4}, 90%, 70%)">
          <path d="M720 490 C 980 450, 1120 420, 1340 360" stroke-width="4" stroke-opacity="0.10"/>
          <path d="M720 615 C 980 590, 1160 560, 1360 520" stroke-width="3" stroke-opacity="0.08"/>
        </g>

        <g opacity="0.95">
          <rect x="1184" y="470" width="320" height="220" fill="#000000" opacity="0.18"/>
          <rect x="1200" y="488" width="220" height="18" fill="#ffffff" opacity="0.05"/>
          <rect x="1200" y="518" width="260" height="12" fill="#ffffff" opacity="0.035"/>
          <rect x="1200" y="554" width="280" height="80" fill="#ffffff" opacity="0.03"/>
          <rect x="1216" y="572" width="200" height="14" fill="#ffffff" opacity="0.04"/>
          <rect x="1216" y="596" width="150" height="10" fill="#ffffff" opacity="0.03"/>
        </g>
      `.trim()
    }

    if (variant === 'risk') {
      return `
        <g opacity="0.95">
          <rect x="260" y="250" width="880" height="430" fill="#ffffff" opacity="0.02"/>
          <rect x="300" y="290" width="260" height="160" fill="hsl(${h1}, 92%, 68%)" opacity="0.08"/>
          <rect x="560" y="320" width="260" height="160" fill="hsl(${h2}, 92%, 68%)" opacity="0.06"/>
          <rect x="820" y="270" width="280" height="220" fill="hsl(${h4}, 92%, 68%)" opacity="0.06"/>
          <rect x="340" y="520" width="340" height="140" fill="#ffffff" opacity="0.03"/>
          <rect x="710" y="510" width="390" height="150" fill="#ffffff" opacity="0.025"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <path d="M280 650 H1160" stroke-width="3" stroke-opacity="0.05"/>
          <path d="M280 620 H1160" stroke-width="2" stroke-opacity="0.03"/>
        </g>

        <g opacity="0.92" fill="none" stroke="hsl(${h3}, 90%, 70%)">
          <path d="M320 640 C 460 610, 560 560, 680 590 S 900 690, 1140 520" stroke-width="5" stroke-opacity="0.13"/>
          <path d="M320 620 C 460 540, 560 520, 680 550 S 900 640, 1140 420" stroke-width="3" stroke-opacity="0.10"/>
        </g>

        <g opacity="0.95">
          <rect x="450" y="540" width="160" height="120" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
          <rect x="845" y="520" width="170" height="130" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="2"/>
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

          <rect x="1204" y="548" width="260" height="86" fill="#ffffff" opacity="0.02"/>
          <rect x="1222" y="566" width="170" height="14" fill="#ffffff" opacity="0.035"/>
          <rect x="1222" y="592" width="210" height="10" fill="#ffffff" opacity="0.025"/>
        </g>
      `.trim()
    }

    if (variant === 'region') {
      return `
        <g opacity="0.95">
          <path d="M310 320 L560 260 L820 320 L740 520 L520 560 L330 480 Z" fill="hsl(${h2}, 90%, 66%)" opacity="0.08"/>
          <path d="M560 260 L870 250 L1120 360 L980 520 L740 520 L820 320 Z" fill="hsl(${h1}, 90%, 66%)" opacity="0.08"/>
          <path d="M330 480 L520 560 L480 710 L300 660 L260 540 Z" fill="#ffffff" opacity="0.04"/>
          <path d="M740 520 L980 520 L1120 680 L910 720 L760 640 Z" fill="hsl(${h4}, 90%, 66%)" opacity="0.06"/>
          <path d="M980 520 L1200 470 L1360 560 L1270 710 L1120 680 Z" fill="#ffffff" opacity="0.03"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <path d="M310 320 L560 260 L870 250 L1120 360 L1200 470 L1360 560 L1270 710 L910 720 L480 710 L300 660 L260 540 Z" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M520 560 L760 640" stroke-width="3" stroke-opacity="0.05"/>
          <path d="M980 520 L1270 710" stroke-width="3" stroke-opacity="0.04"/>
        </g>

        <g opacity="0.95">
          <path d="M540 420 L540 460" stroke="#ffffff" stroke-opacity="0.14" stroke-width="3"/>
          <circle cx="540" cy="410" r="10" fill="hsl(${h3}, 92%, 70%)" opacity="0.14"/>
          <circle cx="540" cy="410" r="4" fill="#ffffff" opacity="0.20"/>

          <path d="M860 360 L860 400" stroke="#ffffff" stroke-opacity="0.14" stroke-width="3"/>
          <circle cx="860" cy="350" r="10" fill="hsl(${h1}, 92%, 70%)" opacity="0.13"/>
          <circle cx="860" cy="350" r="4" fill="#ffffff" opacity="0.20"/>

          <path d="M1220 520 L1220 560" stroke="#ffffff" stroke-opacity="0.14" stroke-width="3"/>
          <circle cx="1220" cy="510" r="10" fill="hsl(${h2}, 92%, 70%)" opacity="0.12"/>
          <circle cx="1220" cy="510" r="4" fill="#ffffff" opacity="0.20"/>
        </g>

        <g opacity="0.9" fill="none" stroke="hsl(${h4}, 90%, 70%)">
          <path d="M620 590 C 720 560, 820 600, 940 560" stroke-width="4" stroke-opacity="0.10"/>
          <path d="M980 560 C 1100 530, 1180 510, 1300 520" stroke-width="3" stroke-opacity="0.08"/>
        </g>

        <g opacity="0.95">
          <rect x="1180" y="260" width="320" height="250" fill="#000000" opacity="0.20"/>
          <rect x="1204" y="290" width="200" height="18" fill="#ffffff" opacity="0.05"/>
          <rect x="1204" y="322" width="260" height="12" fill="#ffffff" opacity="0.035"/>
          <rect x="1204" y="360" width="260" height="10" fill="#ffffff" opacity="0.03"/>
          <rect x="1204" y="360" width="180" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.09"/>
          <rect x="1204" y="386" width="260" height="10" fill="#ffffff" opacity="0.026"/>
          <rect x="1204" y="386" width="140" height="10" fill="hsl(${h2}, 90%, 70%)" opacity="0.08"/>
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
          <circle cx="820" cy="500" r="10" fill="#ffffff" opacity="0.22"/>
          <circle cx="500" cy="600" r="8" fill="#ffffff" opacity="0.14"/>
          <circle cx="1140" cy="470" r="8" fill="#ffffff" opacity="0.14"/>
          <circle cx="650" cy="390" r="7" fill="#ffffff" opacity="0.12"/>
          <circle cx="1030" cy="320" r="7" fill="#ffffff" opacity="0.12"/>
        </g>

        <g opacity="0.92" fill="none" stroke="#ffffff">
          <path d="M330 520 L420 480 L510 510 L590 470 L680 520 L760 480" stroke-width="3" stroke-opacity="0.06"/>
          <circle cx="330" cy="520" r="8" fill="#ffffff" opacity="0.08" stroke="none"/>
          <circle cx="420" cy="480" r="8" fill="#ffffff" opacity="0.06" stroke="none"/>
          <circle cx="510" cy="510" r="8" fill="#ffffff" opacity="0.06" stroke="none"/>
          <circle cx="590" cy="470" r="10" fill="hsl(${h2}, 90%, 70%)" opacity="0.10" stroke="none"/>
          <circle cx="680" cy="520" r="8" fill="#ffffff" opacity="0.05" stroke="none"/>
          <circle cx="760" cy="480" r="8" fill="#ffffff" opacity="0.05" stroke="none"/>
        </g>

        <g opacity="0.95">
          <path d="M1260 300 A 120 120 0 0 1 1390 430" stroke="url(#emoRing)" stroke-width="18" fill="none" opacity="0.9"/>
          <path d="M1390 430 A 120 120 0 0 1 1270 560" stroke="#ffffff" stroke-width="18" fill="none" opacity="0.10"/>
          <path d="M1270 560 A 120 120 0 0 1 1260 300" stroke="hsl(${h3}, 90%, 70%)" stroke-width="18" fill="none" opacity="0.08"/>

          <rect x="1200" y="590" width="220" height="18" fill="#ffffff" opacity="0.05"/>
          <rect x="1200" y="620" width="260" height="12" fill="#ffffff" opacity="0.03"/>
        </g>
      `.trim()
    }

    if (variant === 'resilience') {
      return `
        <g opacity="0.92" fill="none" stroke="#ffffff">
          <path d="M420 690 H1180" stroke-width="3" stroke-opacity="0.05"/>
          <path d="M800 690 V300" stroke-width="4" stroke-opacity="0.09"/>

          <path d="M800 560 C 700 560, 650 520, 600 480" stroke-width="4" stroke-opacity="0.08"/>
          <path d="M800 560 C 900 560, 950 520, 1000 480" stroke-width="4" stroke-opacity="0.08"/>

          <path d="M600 480 C 540 440, 510 410, 470 380" stroke-width="3" stroke-opacity="0.07"/>
          <path d="M1000 480 C 1060 440, 1090 410, 1130 380" stroke-width="3" stroke-opacity="0.07"/>

          <path d="M800 430 C 740 400, 700 380, 660 350" stroke-width="3" stroke-opacity="0.06"/>
          <path d="M800 430 C 860 400, 900 380, 940 350" stroke-width="3" stroke-opacity="0.06"/>
        </g>

        <g opacity="0.95">
          <circle cx="800" cy="690" r="10" fill="#ffffff" opacity="0.14"/>
          <circle cx="600" cy="480" r="9" fill="#ffffff" opacity="0.12"/>
          <circle cx="1000" cy="480" r="9" fill="#ffffff" opacity="0.12"/>
          <circle cx="470" cy="380" r="8" fill="#ffffff" opacity="0.10"/>
          <circle cx="660" cy="350" r="8" fill="#ffffff" opacity="0.10"/>
          <circle cx="940" cy="350" r="8" fill="#ffffff" opacity="0.10"/>
          <circle cx="1130" cy="380" r="8" fill="#ffffff" opacity="0.10"/>
        </g>

        <g opacity="0.95">
          <circle cx="660" cy="350" r="18" fill="hsl(${h2}, 90%, 70%)" opacity="0.10"/>
          <path d="M650 342 L670 358" stroke="#ffffff" stroke-opacity="0.18" stroke-width="3"/>
          <path d="M670 342 L650 358" stroke="#ffffff" stroke-opacity="0.18" stroke-width="3"/>

          <path d="M600 480 C 700 520, 820 520, 1000 480" stroke="hsl(${h4}, 90%, 70%)" stroke-opacity="0.10" stroke-width="4" fill="none" stroke-dasharray="8 10"/>
        </g>

        <g opacity="0.92">
          <rect x="1180" y="580" width="320" height="120" fill="#000000" opacity="0.20"/>
          <rect x="1204" y="606" width="180" height="18" fill="#ffffff" opacity="0.05"/>
          <rect x="1204" y="640" width="260" height="10" fill="#ffffff" opacity="0.03"/>
          <rect x="1204" y="640" width="190" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.09"/>
          <rect x="1204" y="664" width="260" height="10" fill="#ffffff" opacity="0.024"/>
          <rect x="1204" y="664" width="150" height="10" fill="hsl(${h2}, 90%, 70%)" opacity="0.08"/>
        </g>
      `.trim()
    }

    if (variant === 'competitor') {
      return `
        <g opacity="0.95">
          <rect x="260" y="300" width="260" height="320" fill="#000000" opacity="0.20"/>
          <rect x="268" y="312" width="244" height="90" fill="#ffffff" opacity="0.03"/>
          <rect x="268" y="410" width="244" height="90" fill="#ffffff" opacity="0.025"/>
          <rect x="268" y="508" width="244" height="90" fill="#ffffff" opacity="0.02"/>

          <rect x="1080" y="300" width="260" height="320" fill="#000000" opacity="0.20"/>
          <rect x="1088" y="312" width="244" height="90" fill="#ffffff" opacity="0.03"/>
          <rect x="1088" y="410" width="244" height="90" fill="#ffffff" opacity="0.025"/>
          <rect x="1088" y="508" width="244" height="90" fill="#ffffff" opacity="0.02"/>
        </g>

        <g opacity="0.95">
          <rect x="260" y="250" width="520" height="14" fill="#ffffff" opacity="0.03"/>
          <rect x="260" y="250" width="340" height="14" fill="hsl(${h4}, 90%, 70%)" opacity="0.08"/>
          <rect x="820" y="250" width="520" height="14" fill="#ffffff" opacity="0.03"/>
          <rect x="820" y="250" width="290" height="14" fill="hsl(${h2}, 90%, 70%)" opacity="0.07"/>
        </g>

        <g opacity="0.9" fill="none" stroke="#ffffff">
          <rect x="560" y="300" width="520" height="320" stroke-width="2" stroke-opacity="0.05"/>
          <path d="M560 460 H1080" stroke-width="2" stroke-opacity="0.04"/>
          <path d="M720 300 V620" stroke-width="2" stroke-opacity="0.03"/>
          <path d="M920 300 V620" stroke-width="2" stroke-opacity="0.03"/>
        </g>

        <g opacity="0.92" fill="none" stroke="hsl(${h2}, 92%, 68%)">
          <path d="M620 560 C 720 520, 780 600, 880 560 S 1040 480, 1080 500" stroke-width="4" stroke-opacity="0.10"/>
          <path d="M620 380 C 740 340, 820 440, 930 400 S 1040 320, 1080 350" stroke-width="3" stroke-opacity="0.08"/>
          <path d="M600 500 L1080 420" stroke-width="3" stroke-opacity="0.07"/>
        </g>

        <g opacity="0.95">
          <circle cx="640" cy="560" r="16" fill="hsl(${h1}, 90%, 70%)" opacity="0.10"/>
          <circle cx="740" cy="520" r="12" fill="#ffffff" opacity="0.08"/>
          <circle cx="840" cy="590" r="12" fill="hsl(${h3}, 90%, 70%)" opacity="0.08"/>
          <circle cx="960" cy="520" r="14" fill="hsl(${h4}, 90%, 70%)" opacity="0.08"/>
          <circle cx="1040" cy="480" r="12" fill="#ffffff" opacity="0.07"/>

          <circle cx="650" cy="380" r="12" fill="#ffffff" opacity="0.06"/>
          <circle cx="780" cy="450" r="14" fill="hsl(${h2}, 90%, 70%)" opacity="0.08"/>
          <circle cx="910" cy="410" r="12" fill="hsl(${h1}, 90%, 70%)" opacity="0.07"/>
          <circle cx="1040" cy="330" r="12" fill="hsl(${h3}, 90%, 70%)" opacity="0.07"/>
        </g>
      `.trim()
    }

    if (variant === 'supply') {
      return `
        <g opacity="0.95" fill="none" stroke="#ffffff">
          <path d="M360 310 H520" stroke-width="16" stroke-opacity="0.06"/>
          <path d="M360 470 H520" stroke-width="16" stroke-opacity="0.055"/>
          <path d="M360 630 H520" stroke-width="16" stroke-opacity="0.05"/>

          <path d="M520 310 C 720 310, 760 380, 940 380" stroke-width="16" stroke="hsl(${h1}, 92%, 70%)" stroke-opacity="0.10"/>
          <path d="M520 470 C 720 470, 760 430, 940 430" stroke-width="14" stroke="hsl(${h2}, 92%, 70%)" stroke-opacity="0.09"/>
          <path d="M520 630 C 720 630, 760 520, 940 520" stroke-width="12" stroke="hsl(${h4}, 92%, 70%)" stroke-opacity="0.08"/>

          <path d="M940 380 C 1120 380, 1180 330, 1280 330" stroke-width="14" stroke="hsl(${h3}, 92%, 70%)" stroke-opacity="0.09"/>
          <path d="M940 430 C 1120 430, 1180 450, 1280 450" stroke-width="12" stroke="#ffffff" stroke-opacity="0.06"/>
          <path d="M940 520 C 1120 520, 1180 570, 1280 570" stroke-width="10" stroke="hsl(${h2}, 92%, 70%)" stroke-opacity="0.08"/>
        </g>
        <g opacity="0.95">
          <rect x="300" y="260" width="120" height="100" fill="#ffffff" opacity="0.05"/>
          <rect x="300" y="420" width="120" height="100" fill="#ffffff" opacity="0.05"/>
          <rect x="300" y="580" width="120" height="100" fill="#ffffff" opacity="0.05"/>

          <rect x="1260" y="280" width="120" height="100" fill="hsl(${h4}, 90%, 66%)" opacity="0.08"/>
          <rect x="1260" y="400" width="120" height="100" fill="hsl(${h1}, 90%, 66%)" opacity="0.07"/>
          <rect x="1260" y="520" width="120" height="100" fill="hsl(${h2}, 90%, 66%)" opacity="0.07"/>
        </g>
        <g opacity="0.8" fill="none" stroke="#ffffff">
          <path d="M520 310 H540" stroke-width="3" stroke-opacity="0.12"/>
          <path d="M940 380 H960" stroke-width="3" stroke-opacity="0.12"/>
          <path d="M520 470 H540" stroke-width="3" stroke-opacity="0.10"/>
          <path d="M940 430 H960" stroke-width="3" stroke-opacity="0.10"/>
          <path d="M520 630 H540" stroke-width="3" stroke-opacity="0.08"/>
          <path d="M940 520 H960" stroke-width="3" stroke-opacity="0.08"/>
        </g>

        <g opacity="0.95">
          <rect x="980" y="240" width="160" height="26" fill="#ffffff" opacity="0.04"/>
          <rect x="1150" y="240" width="120" height="26" fill="hsl(${h4}, 90%, 70%)" opacity="0.07"/>
          <rect x="1280" y="240" width="120" height="26" fill="#ffffff" opacity="0.03"/>
        </g>

        <g opacity="0.95">
          <rect x="1260" y="400" width="120" height="100" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="3"/>
          <rect x="300" y="780" width="980" height="10" fill="#ffffff" opacity="0.02"/>
          <rect x="300" y="780" width="740" height="10" fill="hsl(${h4}, 90%, 70%)" opacity="0.07"/>
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

const Home = () => {
  const { t, locale } = useI18n()
  const steps = useMemo(() => {
    const v = t('home.steps')
    return Array.isArray(v) ? v : []
  }, [t])

  const rotating = useMemo(() => {
    const v = t('home.rotating')
    return Array.isArray(v) ? v : []
  }, [t])

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
      ? { level: '更多', title: '更多场景', desc: '定制化所有领域' }
      : { level: 'More', title: 'More Use Cases', desc: 'Expand with industry templates and workflows. Updates ongoing.' }

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
        <section className="h-screen relative overflow-hidden">
          {/* Background Container */}
          <div className="absolute inset-0 w-full h-full -z-20 bg-[#080808]"></div>
          <div className="absolute inset-0 w-full h-full -z-10">
             <Threads amplitude={3} distance={-12} color={[0.7, 0.4, 1.0]} />
             {/* Soft White Overlay Mask */}
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
                          <div className="text-[12px] md:text-[14px] font-semibold tracking-[0.22em] text-white/90 leading-none text-center whitespace-nowrap">
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
      </div>
    </>
  )
}

export default Home

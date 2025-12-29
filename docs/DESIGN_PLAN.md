# Synodic Frontend Design Plan

This document outlines the design and implementation plan for the **Synodic Web Interface**, focusing on visualizing the "Macro Entity Atlas" concept using [React Bits](https://www.reactbits.dev/) components.

## 1. Design Philosophy
- **Core Metaphor**: "The Economic Universe" — Dark, deep space aesthetics with ethereal connections.
- **Visual Style**: High contrast, glassmorphism, fluid motion, data-driven elegance.
- **Color Palette**:
  - Background: Deep Cosmic Grey/Black (`#060010` / `#242424`)
  - Accents: Nebula Purple, Starlight White, Data Blue.

## 2. Component Integration Strategy

### A. Global Atmosphere: Silk Background
- **Component**: [Silk](https://www.reactbits.dev/backgrounds/silk)
- **Role**: Represents the "fabric of the economy" or "gravitational waves" between entities.
- **Configuration**:
  - **Color**: `#2A2A35` (Deep muted slate/purple) to ensure text readability.
  - **Interaction**: High sensitivity to mouse movement to simulate "ripples" in the market.
  - **Z-Index**: Fixed at `-1`.

### B. Navigation: Pill Nav
- **Component**: [Pill Nav](https://www.reactbits.dev/components/pill-nav)
- **Role**: Primary exploration tool.
- **Structure**:
  - **Logo**: Synodic Icon (Star/Node).
  - **Items**:
    - `Atlas` (Main Graph View)
    - `Insights` (Analysis Dashboard)
    - `Docs` (Documentation)
    - `API` (Developer Access)
  - **CTA**: "Launch App" (Active/Highlight).
- **Styling**: Frosted glass effect (`backdrop-filter: blur`) to float above the "Silk" universe.

### C. Hero Section: The "Macro" View
- **Component**: [Rotating Text](https://www.reactbits.dev/text-animations/rotating-text) + [Shiny Text](https://www.reactbits.dev/text-animations/shiny-text)
- **Content Strategy**:
  - **Headline**:
    "Mapping the Hidden <RotatingText words=['Connections', 'Risks', 'Opportunities'] /> of the Global Economy."
  - **Sub-headline**:
    "Synodic reveals the invisible gravitational pulls between corporate entities."
  - **CTA**: <ShinyText text="Explore the Atlas" />
- **Animation**: Slow, deliberate rotation to match the "macro" timeframe.

### D. Onboarding/Process: The Data Pipeline
- **Component**: [Stepper](https://www.reactbits.dev/components/stepper)
- **Role**: Explaining how Synodic turns raw data into insight.
- **Steps**:
  1.  **Ingestion**: "Aggregating multi-source heterogenous data" (Icon: Black Hole/Funnel)
  2.  **Resolution**: "Entity Identity & Relation Mapping" (Icon: Constellation)
  3.  **Analysis**: "Graph Neural Network Inference" (Icon: Brain/Network)
  4.  **Insight**: "Actionable Market Intelligence" (Icon: Star/Light)
- **Visuals**: Vertical or Horizontal flow with glowing connectors.

## 3. Technical Implementation Roadmap

### Phase 1: Foundation (Completed)
- [x] Project Initialization (Vite + React).
- [x] Tailwind CSS Configuration.
- [x] Dependency Installation (GSAP, Framer Motion, Three.js).
- [x] Directory Structure Setup.

### Phase 2: Component Development (Next Steps)
1.  **`src/components/Backgrounds/Silk/`**:
    - Implement `SilkCanvas` wrapping the `Silk` component.
    - Ensure performance optimization (dpr scaling).
2.  **`src/components/UI/PillNav/`**:
    - Create responsive navigation with `gsap` animations.
    - Implement mobile menu toggle.
3.  **`src/components/UI/TextEffects/`**:
    - Build `RotatingText` for the Hero headline.
    - Build `ShinyText` for buttons/highlights.
4.  **`src/components/UI/Stepper/`**:
    - Implement the "Data Pipeline" visualization.

### Phase 3: Page Assembly
- **`src/layouts/MainLayout.jsx`**: Combine `SilkCanvas` (Background) and `PillNav` (Header).
- **`src/pages/Home.jsx`**: Assemble Hero (TextEffects) and Features (Stepper) sections.

## 4. File Structure Plan

```text
src/
├── components/
│   ├── Backgrounds/
│   │   └── Silk/
│   │       ├── Silk.jsx         # Core Three.js effect
│   │       └── index.js
│   ├── UI/
│   │   ├── PillNav/
│   │   │   ├── PillNav.jsx      # Navigation container
│   │   │   └── index.js
│   │   ├── TextEffects/
│   │   │   ├── RotatingText.jsx # Hero animation
│   │   │   ├── ShinyText.jsx    # CTA animation
│   │   │   └── index.js
│   │   └── Stepper/
│   │       ├── Stepper.jsx      # Process flow
│   │       └── index.js
├── layouts/
│   └── MainLayout.jsx           # Background + Nav wrapper
└── pages/
    └── Home.jsx                 # Landing page assembly
```

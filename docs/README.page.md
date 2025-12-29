# Synodic Web Interface (Frontend)

The visualization layer for the Synodic Macro Entity Atlas, built with modern web technologies to deliver immersive data exploration experiences.

## ✨ UI/UX Features

- **Immersive Environment**: Interactive Silk background powered by [React Bits](https://www.reactbits.dev/) & Three.js.
- **Navigation**: Floating Pill Navigation with glassmorphism effects for seamless exploration.
- **Dynamic Content**:
  - **Rotating Text**: For engaging hero sections and key metric highlights.
  - **Shiny Text**: For emphasizing call-to-actions and critical alerts.
- **Onboarding**: Smooth stepper components to guide users through complex data workflows.

## 🛠 Frontend Tech Stack

- **Core**: React 19, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animation**: GSAP (Navigation), Framer Motion (Transitions)
- **3D Graphics**: Three.js, React Three Fiber (Backgrounds)
- **State Management**: (Add state management if applicable, e.g., Zustand/Context)
- **Deployment**: Optimized for Page Workers (Cloudflare Pages, Vercel)

## 📂 Directory Structure

```
src/
├── components/
│   ├── Backgrounds/   # Canvas/WebGL backgrounds (e.g., Silk)
│   ├── UI/            # Interactive UI components
│   │   ├── PillNav/       # Navigation system
│   │   ├── Stepper/       # Workflow guides
│   │   └── TextEffects/   # Typography animations
│   └── Visualizations/ # D3/ECharts data components (Planned)
├── layouts/           # Page layouts (Main, Dashboard)
└── pages/             # Route components
```

## 🚀 Development Guide

### Prerequisites
- Node.js v20+
- npm

### Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Dev Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 📦 Deployment

This frontend is designed to be deployed independently on Edge networks.

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Routes**: Handled via client-side routing (React Router recommended).

## 🎨 Design System

Refer to the [Design Plan](DESIGN_PLAN.md) for detailed component specifications and visual guidelines.

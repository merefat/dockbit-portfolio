# Dockbit Landing Page

A modern, interactive landing page built with React, Vite, and Three.js featuring stunning 3D animations and a responsive design.

## Features

- **3D Visual Effects**: Interactive 3D scenes powered by Three.js and React Three Fiber
- **Smooth Animations**: Framer Motion and GSAP for fluid, performant animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Multiple Sections**: Hero, Pain Points, Bento Grid, How It Works, Deep Dive, Comparison Matrix, Testimonials, FAQ, and Contact
- **Privacy Policy**: Dedicated privacy policy page with routing
- **Modern UI**: Clean, contemporary design with Lucide React icons

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.0
- **Styling**: Tailwind CSS 3.4.7 with PostCSS
- **3D Graphics**: Three.js 0.160.1, @react-three/fiber 8.18.0, @react-three/drei 9.122.0
- **Animations**: Framer Motion 12.42.2, GSAP 3.15.0
- **Icons**: Lucide React 0.424.0

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

The optimized build will be in the `dist` directory.

## Preview

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── animations/     # Animation components
│   ├── BentoGrid.tsx   # Bento grid layout
│   ├── ComparisonMatrix.tsx
│   ├── ComparisonStrip.tsx
│   ├── Hero.tsx        # Hero section
│   ├── PainSection.tsx
│   ├── HowItWorks.tsx
│   ├── DeepDiveTabs.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── TopHeader.tsx
│   └── PrivacyPolicy.tsx
├── context/            # React context
│   └── ThemeContext.tsx
├── data/               # Static data
│   └── comparisonData.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Routing

The application uses simple client-side routing based on `window.location.pathname`:
- `/` - Main landing page
- `/privacy` - Privacy policy page

## License

Private

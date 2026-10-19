export interface DivisionSpec {
  id: 'software' | 'websites' | 'apps';
  path: '/software' | '/websites' | '/apps';
  code: string;
  shortLabel: string;
  title: string;
  sitelinkTitle: string;
  subtitle: string;
  accentColor: 'cyan' | 'rose' | 'amber';
  description: string;
  stack: string[];
  deliverables: string[];
  highlight: string;
}

export interface SitelinkItem {
  path: string;
  title: string;
  description: string;
  breadcrumbs: string[];
}

export const SITE_INFO = {
  shortName: 'AINXE',
  fullName: 'AINXE Studios',
  siteTitle: 'AINXE Studios — Where Calm Meets Code',
  siteUrl: 'https://ainxe.com',
  ogImage: '/og-preview.jpg',
  tagline: 'Deliberate Software, Serene Web & Tactile Native Apps',
  heroHeadline: 'Where Calm Meets Code.',
  heroSubheadline:
    'In a world of noise and disposable apps, AINXE builds digital sanctuaries — deliberate software architectures, tranquil web spaces, and tactile native apps engineered with precision and soul.',
  description:
    'AINXE Studios is an independent digital foundry crafting custom software backends, aesthetic web presences, and focused mobile applications.',
  socials: {
    x: 'https://x.com/ainxestudios',
    instagram: 'https://instagram.com/ainxestudios',
    facebook: 'https://facebook.com/ainxestudios',
    reddit: 'https://reddit.com/r/ainxe',
    handle: '@ainxestudios',
  },
  details: {
    origin: 'Independent Foundry',
    approach: 'Direct Engineer-to-Client',
    focus: 'Software · Web · Mobile',
    availability: 'Accepting Select Projects',
  },
  pillars: [
    {
      id: 'software',
      icon: 'Cpu',
      title: 'Mindful Software',
      shortDesc: 'Resilient backend engines, clean automation, and distributed systems crafted for longevity.',
      tag: 'Core Systems',
    },
    {
      id: 'websites',
      icon: 'Sparkles',
      title: 'Creative Space',
      shortDesc: 'Subtle, dark-mode web experiences with fluid motion, tactile typography, and zero clutter.',
      tag: 'Web Presence',
    },
    {
      id: 'apps',
      icon: 'Smartphone',
      title: 'Tactile Apps',
      shortDesc: 'Focused iOS, Android, and desktop applications engineered to feel natural in your hands.',
      tag: 'Native Craft',
    },
  ],
  sitelinks: [
    {
      path: '/software',
      title: 'Custom Software Engineering',
      description:
        'Resilient backend services, autonomous data pipelines, and desktop tools built with precision.',
      breadcrumbs: ['Backend Services', 'Automation', 'APIs', 'Desktop Tools'],
    },
    {
      path: '/websites',
      title: 'Aesthetic Web Presences',
      description:
        'Subtle, serene web spaces and interactive digital experiences crafted with modern frontend craft.',
      breadcrumbs: ['Brand Spaces', 'Fluid Frontends', 'Interactive Motion', 'Design Systems'],
    },
    {
      path: '/apps',
      title: 'Tactile Mobile & Native Apps',
      description:
        'Focused iOS, Android, and native applications with intuitive gestures, smooth offline sync, and calm UX.',
      breadcrumbs: ['iOS & Android', 'Offline-First', 'Tactile Motion', 'Native Feel'],
    },
    {
      path: '/about',
      title: 'Studio Philosophy & Craft',
      description:
        'Discover the principles and intentional engineering ethos behind AINXE Studios.',
      breadcrumbs: ['Foundry Ethos', 'Direct Craft', 'Tech Standards', 'Philosophy'],
    },
    {
      path: '/contact',
      title: 'Start a Project',
      description:
        'Connect directly with the AINXE Studios founders to discuss your software, web, or mobile vision.',
      breadcrumbs: ['Direct Uplink', 'Project Brief', 'Consultation', 'Collaboration'],
    },
  ] satisfies SitelinkItem[],
  divisions: [
    {
      id: 'software',
      path: '/software',
      code: '01 // SYSTEMS',
      shortLabel: 'Software',
      title: 'Custom Software',
      sitelinkTitle: 'Custom Software Engineering — AINXE Studios',
      subtitle: 'Resilient Backends, Automation & Clean APIs',
      accentColor: 'cyan',
      description:
        'We engineer reliable backend systems and thoughtful automation engines that run without drama. No convoluted over-engineering — just clear architectures, resilient data flows, and clean codebases built to stand the test of time.',
      stack: ['TypeScript', 'Node.js', 'Go', 'Rust', 'PostgreSQL', 'Docker'],
      highlight: 'Engineered for peace of mind and enduring reliability.',
      deliverables: [
        'Custom SaaS & Internal Tooling Platforms',
        'Automation Pipelines & Microservice Workflows',
        'Clean REST & GraphQL APIs with Solid Docs',
        'Cross-Platform Desktop Apps (Tauri / Electron)',
      ],
    },
    {
      id: 'websites',
      path: '/websites',
      code: '02 // WEB',
      shortLabel: 'Websites',
      title: 'Aesthetic Websites',
      sitelinkTitle: 'High-Velocity Websites — AINXE Studios',
      subtitle: 'Serene Frontends, Fluid Motion & Dark Aesthetics',
      accentColor: 'rose',
      description:
        'A website should feel like a breath of fresh air. We build calm, beautifully choreographed web presences that communicate authority without shouting. Fluid transitions, pixel-perfect dark typography, and lightweight performance.',
      stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
      highlight: 'Sub-second loads with unforgettable atmospheric polish.',
      deliverables: [
        'Editorial Brand & Studio Showcase Sites',
        'Interactive Canvas & Motion-Rich Experiences',
        'Lightweight, Clean Web Applications & Portals',
        'Custom Design Systems & Micro-Interactions',
      ],
    },
    {
      id: 'apps',
      path: '/apps',
      code: '03 // APPS',
      shortLabel: 'Apps',
      title: 'Tactile Native Apps',
      sitelinkTitle: 'Mobile & Native Apps — AINXE Studios',
      subtitle: 'iOS, Android & Fluid Desktop Experiences',
      accentColor: 'amber',
      description:
        'Applications that respect the user’s attention. We craft native mobile and desktop experiences with buttery gestures, offline-first reliability, and considerate user interactions that make everyday workflows feel effortless.',
      stack: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'SQLite', 'WebSockets'],
      highlight: 'Fluid 120fps motion and offline-first peace of mind.',
      deliverables: [
        'Flagship iOS & Android Native Applications',
        'Focus-Oriented Productivity & Creator Tools',
        'Real-Time Offline-Sync Mobile Architectures',
        'App Store Preparation, Release & Polish',
      ],
    },
  ] satisfies DivisionSpec[],
} as const;

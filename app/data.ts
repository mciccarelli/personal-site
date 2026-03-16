export interface Project {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const projects: Project[] = [
  {
    title: 'bankroll.fyi',
    role: 'Design & Development',
    url: 'https://bankroll.fyi',
    description:
      'Bet tracker for logging wagers, reviewing performance, and digging into your history.',
    technologies: 'Next.js, Tailwind, Supabase',
    image: '/projects/bankrollfyi.png',
  },
  {
    title: 'Legend.xyz',
    role: 'Frontend Development',
    url: 'https://legend.xyz',
    description:
      'Marketing site for Legend, an embedded smart contract wallet built as a UI/UX layer on top of existing open DeFi protocols.',
    technologies: 'Next.js, Tailwind, WebGL',
    image: '/projects/legend.jpg',
  },
  {
    title: 'Amazon: The Bar',
    role: 'Frontend Development',
    url: 'https://amazonthe.bar',
    description:
      'Portfolio for creative collective featuring custom animations and dynamic layouts.',
    technologies: 'Next.js, Sanity, Tailwind, Motion',
    image: '/projects/the-bar.jpg',
  },
  {
    title: 'One/Of',
    role: 'Design & Development',
    url: 'https://shoponeof.com',
    description: 'E-commerce platform with custom booking system and Shopify checkout.',
    technologies: 'Shopify (Headless), Next.js, Sanity, Cal.com',
    image: '/projects/one-of.jpg',
  },
  {
    title: 'Modern Treasury',
    role: 'Frontend Development',
    url: 'https://moderntreasury.com',
    description:
      'Marketing site for fintech platform that processes $1 billion in instant payments annually.',
    technologies: 'Next.js, Sanity, Tailwind',
    image: '/projects/mt.jpg',
  },
  {
    title: 'elara.world',
    role: 'Fullstack Development',
    url: 'https://elara.world',
    description: 'Community hub combining content publishing with integrated merchandise store.',
    technologies: 'Next.js, Sanity, Shopify',
    image: '/projects/elara.jpg',
  },
  {
    title: 'Revolve Law',
    role: 'Fullstack Development',
    url: 'https://revolvelawgroup.com',
    description: 'Professional services site with subtle animations and streamlined contact flows.',
    technologies: 'Next.js, Tailwind, Sanity',
    image: '/projects/revolve.jpg',
  },
  {
    title: 'Kelvon Agee',
    role: 'Design & Development',
    url: 'https://kelvonagee.com',
    description:
      'Photography portfolio with optimized image delivery and immersive viewing experience.',
    technologies: 'Next.js, Cloudinary',
    image: '/projects/kelvon.jpg',
  },
  {
    title: 'The Well',
    role: 'Fullstack Development',
    url: 'https://the-well.com',
    description:
      'Wellness platform merging e-commerce with appointment booking and member management.',
    technologies: 'Vue.js, Sanity, Shopify',
    image: '/projects/the-well.jpg',
  },
  {
    title: 'El Dorado',
    role: 'Frontend Development',
    url: 'https://eldo.us/',
    description:
      'Minimalist architecture portfolio emphasizing visual storytelling and project narratives.',
    technologies: 'Next.js, Contentful',
    image: '/projects/eldo.jpg',
  },
  {
    title: 'VICE',
    role: 'Lead Frontend Development',
    url: 'https://vice.com',
    description:
      'High-traffic editorial platform serving millions of readers with real-time content delivery.',
    technologies: 'React.js, Redux, Node.js',
    image: '/projects/vice.jpg',
  },
];

export const faqs: FAQ[] = [
  {
    question: 'What kind of work do you take on?',
    answer:
      "Frontend architecture, design engineering, technical consulting, and hands-on build work. I'm most useful on projects where design quality and engineering rigor need to coexist — product interfaces, design systems, complex interactive builds.",
  },
  {
    question: 'How do engagements typically work?',
    answer:
      'It depends on what you need. Embedded with your team as a principal-level IC, fractional technical leadership, or scoped project work. I adapt to your workflow and tools.',
  },
  {
    question: "What's your stack?",
    answer:
      "Next.js, React, TypeScript. Node.js, PostgreSQL, Supabase. Tailwind, Framer Motion, GSAP. Stripe, Sanity, Shopify headless. Figma, Claude Code, Cursor, Midjourney. Stack is flexible — I pick what fits.",
  },
  {
    question: 'Do you work with agencies?',
    answer:
      'Yes. I partner with agencies and studios as a senior dev resource, and work directly with founders and product teams. I plug into whatever process you already have running.',
  },
  {
    question: 'Can you work within an existing codebase?',
    answer:
      "That's a lot of what I do — inheriting projects, improving architecture, shipping features inside established systems. I audit first, then get to work.",
  },
];

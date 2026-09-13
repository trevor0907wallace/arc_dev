// Single source of truth for the portfolio's content.
// Edit this file to update copy — the sections read from here.

export const profile = {
  name: 'Trevor Wallace',
  title: 'Senior Full-Stack Engineer',
  location: 'New York City, NY',
  email: 'trev.wal@outlook.com',
  tagline:
    'I take web applications from architecture to production — the interface, the services behind it, and the infrastructure it runs on.',
  summary:
    "Senior full-stack engineer with ten years of experience shipping production software end to end. I design and build AI-powered systems on the Claude and OpenAI APIs — including retrieval-augmented assistants that pair Python and FastAPI backends with vector search and React frontends. My strength is genuine depth across the stack: React and TypeScript up front; Python, Java, and Node services behind them; PostgreSQL, Docker, and AWS underneath. I've led projects as technical lead — owning architecture, mentoring engineers, and solving the problems others get stuck on, from performance bottlenecks and scaling limits to complex third-party integrations. I write code that's tested, readable, and built to hold up under real load.",
} as const

export const stats = [
  { value: '10+', label: 'Years shipping to production' },
  { value: 'End to end', label: 'Architecture through delivery' },
  { value: 'Full stack', label: 'Frontend, services, infra' },
  { value: 'AI native', label: 'Claude & OpenAI systems' },
] as const

export type Expertise = {
  title: string
  blurb: string
}

export const expertise: Expertise[] = [
  {
    title: 'AI & LLM Engineering',
    blurb:
      'Retrieval-augmented assistants on the Claude and OpenAI APIs — vector search, semantic retrieval, and conversational interfaces that let people query internal knowledge in plain language.',
  },
  {
    title: 'Full-Stack Product Delivery',
    blurb:
      'Features that span React and Next.js frontends through Python, FastAPI, and Node services — including the API design, authentication, and data models underneath them.',
  },
  {
    title: 'Design Systems & Architecture',
    blurb:
      'Shared component libraries, Storybook workflows, and standardized service patterns that give teams a consistent, scalable foundation to build on.',
  },
  {
    title: 'DevOps & Reliability',
    blurb:
      'Automated testing and CI/CD with GitHub Actions and Docker, plus the performance work — profiling bottlenecks and scaling limits — that keeps systems fast under real load.',
  },
]

export type Role = {
  company: string
  title: string
  period: string
  location: string
  highlights: string[]
}

export const experience: Role[] = [
  {
    company: 'Savas Labs',
    title: 'Senior Full-Stack Engineer',
    period: '2022 — 2026',
    location: 'Raleigh, NC',
    highlights: [
      'Owned client engagements end to end as technical lead and project manager — scoping, architecture, delivery, and support — and stayed the point of contact for stakeholders.',
      'Built AI-powered features into customer-facing products: a retrieval-augmented assistant with a Python/FastAPI backend, a vector database for semantic search, and a React interface that cut support lookup time noticeably.',
      'Delivered across the full stack — React and Next.js on the frontend, Python, FastAPI, and Node services behind them — along with the API design, authentication, and data models underneath.',
      'Established a shared component library and Storybook workflow and standardized backend service patterns, giving the team a consistent foundation.',
      'Set up automated testing and CI/CD pipelines with GitHub Actions and Docker, and mentored engineers through code review and pairing.',
    ],
  },
  {
    company: 'Cognizant',
    title: 'Senior Full-Stack Developer',
    period: '2018 — 2022',
    location: 'Teaneck, NJ',
    highlights: [
      'Drove development on enterprise products for large clients — breaking down ambiguous requirements, proposing the technical approach, and setting the pace for how features got built.',
      'Delivered major features across the stack: React, Angular, and TypeScript frontends alongside Java, Spring Boot, and Python backend services and the databases behind them.',
      'Introduced reusable components and service patterns the wider team adopted, bringing consistency to codebases that had grown in different directions.',
      'Took on the harder, less-defined problems — performance bottlenecks, third-party integrations, features with no clear starting point — and saw them through to production.',
    ],
  },
  {
    company: 'YAASH Tech LLC',
    title: 'Full-Stack Developer',
    period: '2016 — 2018',
    location: 'Dallas, TX',
    highlights: [
      'Grew from a small-team contributor into someone who could carry a project end to end, and eventually led the ones assigned to me.',
      'Built responsive interfaces and reusable UI components with React, Angular, and TypeScript, with real attention to layout, usability, and how the product felt to use.',
      'Expanded from frontend into backend work — building RESTful APIs and service-layer logic in Python and Java against SQL databases.',
      'Took part in Agile ceremonies, sprint planning, code reviews, and debugging alongside cross-functional teammates.',
    ],
  },
]

export type SkillGroup = {
  title: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript (ES6+)', 'Java', 'C#', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Redux Toolkit',
      'React Query',
      'Vue.js',
      'Angular',
      'Tailwind CSS',
      'SCSS',
      'Material UI',
      'Accessibility (WCAG 2.2)',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Python (Django, FastAPI, Flask)',
      'Node.js (Express)',
      'Java / Spring Boot',
      '.NET',
      'REST APIs',
      'GraphQL',
      'WebSockets',
      'Microservices',
    ],
  },
  {
    title: 'AI & LLM',
    items: [
      'OpenAI API',
      'Claude API',
      'LangChain',
      'RAG Applications',
      'Prompt Engineering',
      'Vector DBs (Pinecone, pgvector)',
      'Conversational AI',
    ],
  },
  {
    title: 'Data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Terraform', 'Vercel', 'Netlify', 'Git'],
  },
  {
    title: 'Testing',
    items: ['Jest', 'React Testing Library', 'Playwright', 'Cypress', 'Pytest'],
  },
  {
    title: 'Practices',
    items: ['System Design', 'Design Systems', 'State Management', 'Agile / Scrum', 'Code Review', 'Technical Mentorship'],
  },
]

export const education = {
  degree: "Bachelor's Degree in Computer Science",
  school: 'Clarkson University',
  period: '2012 — 2016',
  location: 'Potsdam, NY',
} as const

export const social = {
  // Fill these in with real profiles when available.
  github: '',
  linkedin: '',
} as const

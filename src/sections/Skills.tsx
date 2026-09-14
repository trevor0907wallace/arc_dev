import type { IconType } from 'react-icons'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiHtml5,
  SiCss,
  SiRedux,
  SiReactquery,
  SiVuedotjs,
  SiAngular,
  SiTailwindcss,
  SiSass,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiSpringboot,
  SiDotnet,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiClaude,
  SiLangchain,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiTerraform,
  SiVercel,
  SiNetlify,
  SiGit,
  SiJest,
  SiCypress,
  SiPytest,
} from 'react-icons/si'
import { LuHash, LuDatabase, LuCloud, LuSparkles } from 'react-icons/lu'
import Reveal from '../components/Reveal'

type Tech = { name: string; Icon: IconType }
type Group = { title: string; items: Tech[] }

// Grouped technology logos. Icons are monochrome and inherit the theme color,
// so they stay legible in both light and dark. A few technologies (C#, SQL,
// AWS, OpenAI) have no official brand glyph, so a fitting generic icon is used.
const groups: Group[] = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', Icon: SiPython },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'Java', Icon: SiOpenjdk },
      { name: 'C#', Icon: LuHash },
      { name: 'SQL', Icon: LuDatabase },
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS', Icon: SiCss },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'Redux', Icon: SiRedux },
      { name: 'React Query', Icon: SiReactquery },
      { name: 'Vue.js', Icon: SiVuedotjs },
      { name: 'Angular', Icon: SiAngular },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Sass', Icon: SiSass },
      { name: 'Material UI', Icon: SiMui },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express', Icon: SiExpress },
      { name: 'Django', Icon: SiDjango },
      { name: 'FastAPI', Icon: SiFastapi },
      { name: 'Flask', Icon: SiFlask },
      { name: 'Spring Boot', Icon: SiSpringboot },
      { name: '.NET', Icon: SiDotnet },
      { name: 'GraphQL', Icon: SiGraphql },
    ],
  },
  {
    title: 'Data',
    items: [
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'Redis', Icon: SiRedis },
    ],
  },
  {
    title: 'AI and LLM',
    items: [
      { name: 'Claude', Icon: SiClaude },
      { name: 'OpenAI', Icon: LuSparkles },
      { name: 'LangChain', Icon: SiLangchain },
    ],
  },
  {
    title: 'Cloud and DevOps',
    items: [
      { name: 'AWS', Icon: LuCloud },
      { name: 'Docker', Icon: SiDocker },
      { name: 'Kubernetes', Icon: SiKubernetes },
      { name: 'GitHub Actions', Icon: SiGithubactions },
      { name: 'Terraform', Icon: SiTerraform },
      { name: 'Vercel', Icon: SiVercel },
      { name: 'Netlify', Icon: SiNetlify },
      { name: 'Git', Icon: SiGit },
    ],
  },
  {
    title: 'Testing',
    items: [
      { name: 'Jest', Icon: SiJest },
      { name: 'Cypress', Icon: SiCypress },
      { name: 'Pytest', Icon: SiPytest },
    ],
  },
]

function TechTile({ name, Icon }: Tech) {
  return (
    <li className="group/tile flex flex-col items-center justify-center gap-2.5 rounded-xl border border-hair/10 bg-hair/[0.02] px-2 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-nebula-cyan/40 hover:bg-hair/[0.04]">
      <Icon
        aria-hidden="true"
        className="h-8 w-8 text-ink-muted transition-colors duration-200 group-hover/tile:text-nebula-cyan"
      />
      <span className="text-xs font-medium leading-tight text-ink-faint transition-colors duration-200 group-hover/tile:text-ink">
        {name}
      </span>
    </li>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4">Toolkit</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            The stack I reach for.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-10">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={Math.min(gi * 0.05, 0.2)}>
              <div>
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-nebula-cyan">
                  {group.title}
                </h3>
                <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {group.items.map((tech) => (
                    <TechTile key={tech.name} {...tech} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

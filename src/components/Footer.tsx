import { profile, education, social } from '../data/resume'

export default function Footer() {
  const year = new Date().getFullYear()
  const hasSocial = social.github || social.linkedin

  return (
    <footer className="relative border-t border-hair/10 py-12">
      <div className="container-content">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{profile.title}</p>
            <p className="mt-4 text-sm text-ink-faint">
              {education.degree}, {education.school}, {education.period}
            </p>
          </div>

          <ul className="flex flex-wrap gap-5 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline text-ink-muted hover:text-ink"
              >
                {profile.email}
              </a>
            </li>
            {hasSocial && (
              <>
                {social.github && (
                  <li>
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline text-ink-muted hover:text-ink"
                    >
                      GitHub
                    </a>
                  </li>
                )}
                {social.linkedin && (
                  <li>
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline text-ink-muted hover:text-ink"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-hair/10 pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {year} {profile.name}. All rights reserved.</p>
          <p>Built with React, TypeScript, and a little bit of the cosmos.</p>
        </div>
      </div>
    </footer>
  )
}

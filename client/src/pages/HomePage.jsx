import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import SectionShell from '../components/layout/SectionShell';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import { portfolio } from '../data/portfolio';

const skillGroups = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'cloudAndDevOps', label: 'Cloud & DevOps' },
];

function HomePage() {
  return (
    <main
      id="home"
      className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6"
    >
      <Navbar />

      <SectionShell className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur">
        <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available for impactful full-stack engineering opportunities
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-400">
                {portfolio.title}
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Building scalable digital products with modern MERN architecture.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {portfolio.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              >
                Explore Projects
              </a>
              <a
                href={`mailto:${portfolio.email}`}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-300 hover:text-sky-200"
              >
                Contact Me
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {portfolio.highlights.map((item) => (
                <Card key={item} className="p-4">
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="relative overflow-hidden p-0">
              <div className="border-b border-white/10 px-5 py-4 text-sm text-slate-400">
                <span className="font-medium text-slate-200">amit-profile.js</span>
              </div>
              <div className="space-y-4 px-5 py-5 font-mono text-sm leading-7 text-slate-300">
                <p>
                  <span className="text-fuchsia-400">const</span>{' '}
                  <span className="text-sky-300">developer</span> = {'{'}
                </p>
                <p className="pl-4">
                  name: <span className="text-emerald-300">'{portfolio.name}'</span>,
                </p>
                <p className="pl-4">
                  role: <span className="text-emerald-300">'{portfolio.title}'</span>,
                </p>
                <p className="pl-4">
                  focus: <span className="text-emerald-300">'MERN, AWS, Payment Systems'</span>,
                </p>
                <p className="pl-4">
                  location: <span className="text-emerald-300">'{portfolio.location}'</span>,
                </p>
                <p className="pl-4">
                  email: <span className="text-emerald-300">'{portfolio.email}'</span>,
                </p>
                <p>{'}'}</p>
              </div>
            </Card>

            <Card>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Current focus</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <p>
                  Designing secure backend services and intuitive frontend dashboards for
                  real-world business workflows.
                </p>
                <p>
                  Building a stronger public engineering presence through a portfolio that
                  feels polished, original, and production-ready.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="about" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <SectionHeading
            eyebrow="About"
            title="Professional engineering with product thinking"
            description="I focus on building reliable, secure, and user-friendly applications that connect clean frontend experiences with scalable backend systems."
          />
        </Card>

        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            {portfolio.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-sky-300/40 hover:bg-sky-400/10"
              >
                <p className="text-sm text-slate-400">{link.label}</p>
                <p className="mt-2 text-lg font-medium text-slate-100">Visit profile</p>
              </a>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-sm text-slate-400">Phone</p>
              <p className="mt-2 text-lg font-medium text-slate-100">{portfolio.phone}</p>
            </div>
          </div>
        </Card>
      </SectionShell>

      <SectionShell id="experience" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <SectionHeading
            eyebrow="Experience"
            title="Industry work across backend systems and frontend delivery"
            description="Hands-on experience building dashboards, APIs, secure flows, and production-oriented features in real business environments."
          />
        </Card>

        <div className="space-y-6">
          {portfolio.experience.map((item) => (
            <Card key={item.company}>
              <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                  <p className="text-slate-300">{item.role}</p>
                </div>
                <p className="text-sm text-sky-300">{item.period}</p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="skills" className="space-y-6">
        <Card>
          <SectionHeading
            eyebrow="Skills"
            title="A full-stack toolkit for shipping modern web products"
            description="Core technologies and engineering areas I use across frontend, backend, databases, cloud services, and delivery workflows."
          />
        </Card>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group.key}>
              <h3 className="text-lg font-semibold text-white">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {portfolio.skills[group.key].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm text-sky-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="projects" className="space-y-6">
        <Card>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work that reflects backend depth and product focus"
            description="Each project highlights practical engineering decisions, product thinking, and clean full-stack execution grounded in real implementation experience."
          />
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          {portfolio.projects.map((project) => (
            <Card key={project.name} className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
                  </div>
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                    {project.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
                <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300">
                  {project.impact}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300">
                  Repo link pending
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300">
                  Live demo pending
                </span>
              </div>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="achievements" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <SectionHeading
            eyebrow="Coding Achievements"
            title="Problem-solving depth that supports production engineering"
            description={portfolio.codingAchievements.summary}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {portfolio.codingAchievements.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          {portfolio.codingAchievements.platforms.map((platform) => {
            const isLinkAvailable = Boolean(platform.href);

            return (
              <Card key={platform.label}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{platform.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{platform.description}</p>
                  </div>
                  {isLinkAvailable ? (
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
                    >
                      View Profile
                    </a>
                  ) : (
                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-400">
                      Link pending
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <SectionHeading
            eyebrow="Education"
            title={portfolio.education.degree}
            description={`${portfolio.education.institution} · ${portfolio.education.period}`}
          />
          <p className="mt-4 text-sm text-slate-300">{portfolio.education.score}</p>
        </Card>

        <Card>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something impactful"
            description="I’m open to meaningful engineering opportunities, freelance projects, and product-focused collaborations."
          />
          <div id="contact" className="mt-6 flex flex-wrap gap-4">
            <a
              href={`mailto:${portfolio.email}`}
              className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              {portfolio.email}
            </a>
            <a
              href={portfolio.socialLinks[1].href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-300 hover:text-sky-200"
            >
              Connect on LinkedIn
            </a>
          </div>
        </Card>
      </SectionShell>

      <Footer />
    </main>
  );
}

export default HomePage;

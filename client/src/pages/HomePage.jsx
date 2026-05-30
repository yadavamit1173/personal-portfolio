import { useEffect, useMemo, useRef, useState } from 'react';

const initialHeroCardInteraction = {
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  glowX: 50,
  glowY: 50,
  shineX: -120,
  shineOpacity: 0,
  lineShiftX: 0,
  lineShiftY: 0,
  glowOpacity: 0.18,
  badgeGlow: 0.22,
};

import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import SectionShell from '../components/layout/SectionShell';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import { portfolio as fallbackPortfolio } from '../data/portfolio';
import { submitContactMessage } from '../services/contactApi';
import { fetchPortfolioContent } from '../services/portfolioApi';

const skillGroups = [
  {
    key: 'frontend',
    label: 'Frontend Systems',
    eyebrow: 'Experience Layer',
    description:
      'Responsive dashboards, reusable UI primitives, and polished interaction patterns for product-facing interfaces.',
    accent: 'UI Architecture',
  },
  {
    key: 'backend',
    label: 'Backend Services',
    eyebrow: 'Application Layer',
    description:
      'Secure business workflows, auth-first APIs, and maintainable service logic built for real production use.',
    accent: 'Service Design',
  },
  {
    key: 'database',
    label: 'Data & Persistence',
    eyebrow: 'Storage Layer',
    description:
      'Operational data models and persistence strategies spanning document, key-value, and relational systems.',
    accent: 'Data Reliability',
  },
  {
    key: 'cloudAndDevOps',
    label: 'Cloud & Delivery',
    eyebrow: 'Runtime Layer',
    description:
      'Cloud-backed deployment, container workflows, and delivery practices that support scalable engineering.',
    accent: 'Deployment Flow',
  },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 2C6.48 2 2 6.58 2 12.12c0 4.43 2.87 8.18 6.84 9.5.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.18-3.37-1.18-.45-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.9 1.55 2.35 1.1 2.92.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.12-4.56-5a3.92 3.92 0 0 1 1.03-2.72c-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 6.84c.85 0 1.7.11 2.5.34 1.9-1.31 2.74-1.04 2.74-1.04.55 1.43.2 2.48.1 2.74a3.92 3.92 0 0 1 1.03 2.72c0 3.89-2.34 4.73-4.57 4.99.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.12C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.4a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.01c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.37 1.88V8.5H9.37c.04.86 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.67.88-1.37 1.9-1.37 1.34 0 1.88 1.03 1.88 2.54V20H20V13l.44.01Z" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      <path d="M15.5 5 21 10.5" />
      <path d="M9 7.5 4.5 12 9 16.5" />
      <path d="M20 12H8.5" />
      <path d="M13.5 3.5 7 10" />
      <path d="M13.5 20.5 7 14" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6.27 6.27l1.29-1.29a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

const socialCardIcons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  LeetCode: LeetCodeIcon,
  Phone: PhoneIcon,
};

const heatmapIntensityClasses = [
  'bg-slate-900/80 border-white/6',
  'bg-emerald-950/70 border-emerald-500/12',
  'bg-emerald-800/55 border-emerald-400/18',
  'bg-cyan-700/55 border-cyan-400/24',
  'bg-cyan-400/80 border-cyan-200/35 shadow-[0_0_18px_rgba(34,211,238,0.16)]',
];

function getHeatmapCellClass(level) {
  return heatmapIntensityClasses[level] || heatmapIntensityClasses[0];
}

const skillLogoClassName = 'h-[18px] w-[18px] sm:h-5 sm:w-5';

function ReactSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true" className={skillLogoClassName}>
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="7.9" ry="3.15" />
      <ellipse cx="12" cy="12" rx="7.9" ry="3.15" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="7.9" ry="3.15" transform="rotate(120 12 12)" />
    </svg>
  );
}

function ReduxSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M8.5 8.2c1.8-1.5 4-2 6.1-1.1 1.6.6 2.8 1.9 3.3 3.6" />
      <path d="M6.4 14.8c-.8-2-.4-4.5 1.1-6.2" />
      <path d="M10.5 18c2 .8 4.4.6 6.1-.8" />
      <circle cx="7.6" cy="16.1" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="9.1" cy="7.6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17.7" cy="12.9" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TailwindSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M7.2 9.1C8.4 6.9 10 6 12.1 6c3 0 3.5 2.3 5 3 1 .4 2 .2 3.3-.6-1.2 2.2-2.8 3.1-5 3.1-3 0-3.5-2.3-5-3-1-.4-2-.2-3.2.6Z" />
      <path d="M3.7 15.1C4.9 12.9 6.5 12 8.6 12c3 0 3.5 2.3 5 3 1 .4 2 .2 3.3-.6-1.2 2.2-2.8 3.1-5 3.1-3 0-3.5-2.3-5-3-1-.4-2-.2-3.2.6Z" />
    </svg>
  );
}

function ScssSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M16.3 7.4c0-1.8-1.5-3-3.7-3-2.8 0-5 1.7-5 4 0 2.9 4.7 3.2 4.7 5.8 0 1.1-.9 2-2.5 2-1.3 0-2.4-.5-3.4-1.5" />
      <path d="M14.1 11.9c1.9.1 3.7 1 3.7 2.8 0 1.9-1.7 3.2-4.1 3.2" />
    </svg>
  );
}

function JavaScriptSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={skillLogoClassName}>
      <path d="M3 3h18v18H3V3Zm10.4 13.6c.5.8 1.3 1.3 2.7 1.3 1.5 0 2.8-.8 2.8-2.3 0-1.3-.8-2-2.4-2.6l-.5-.2c-.7-.3-1-.5-1-.9 0-.4.3-.7.9-.7.6 0 1 .2 1.4.9l1.5-1c-.6-1-1.6-1.6-2.9-1.6-1.8 0-3 1-3 2.4 0 1.5.9 2.1 2.4 2.7l.5.2c.8.4 1.1.6 1.1 1.1 0 .5-.5.8-1.2.8-.8 0-1.3-.4-1.8-1.1l-1.5 1ZM5.9 16.6c.4.7 1.1 1.3 2.4 1.3 1.6 0 2.6-.8 2.6-2.8V9.7H8.8v5.3c0 .8-.3 1.1-.8 1.1-.5 0-.8-.3-1.1-.8l-1 .7Z" />
    </svg>
  );
}

function HtmlSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="m7 8-4 4 4 4" />
      <path d="m17 8 4 4-4 4" />
      <path d="M14 5 10 19" />
    </svg>
  );
}

function NodeSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="m12 2.4 7 4v11.2l-7 4-7-4V6.4l7-4Z" />
      <path d="M12 6.5v11" />
      <path d="m7.6 8.9 4.4 2.5 4.4-2.5" />
    </svg>
  );
}

function ExpressSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M4 8h9" />
      <path d="M4 12h13" />
      <path d="M4 16h9" />
      <path d="m16 8 4 4-4 4" />
    </svg>
  );
}

function RestApiSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M7 9h3" />
      <path d="M7 12h5" />
      <path d="M7 15h4" />
      <path d="m15.5 10.2 1.8 1.8 1.8-1.8" />
      <path d="m19.1 12-1.8 1.8" />
    </svg>
  );
}

function JwtSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <circle cx="12" cy="6" r="2" />
      <circle cx="6.5" cy="12" r="2" />
      <circle cx="17.5" cy="12" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M12 8v8" />
      <path d="m8.2 10.8 7.6 2.4" />
      <path d="m15.8 10.8-7.6 2.4" />
    </svg>
  );
}

function OAuthSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M8.4 11.6a3.6 3.6 0 1 1 0-7.2h4" />
      <path d="M15.6 12.4a3.6 3.6 0 1 1 0 7.2h-4" />
      <path d="M9.8 12h4.4" />
      <path d="m14 6 1.5-1.5L17 6" />
      <path d="m10 18-1.5 1.5L7 18" />
    </svg>
  );
}

function MongoSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M12 3.2c2.2 2.1 3.5 4.8 3.5 8 0 3.6-1.6 6.7-3.5 9.4-1.9-2.7-3.5-5.8-3.5-9.4 0-3.2 1.3-5.9 3.5-8Z" />
      <path d="M12 6v11" />
    </svg>
  );
}

function DynamoSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <ellipse cx="12" cy="6" rx="6" ry="2.7" />
      <path d="M6 6v8c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7V6" />
      <path d="M6 10.1c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7" />
      <path d="M6 14.2c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7" />
    </svg>
  );
}

function SqlSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </svg>
  );
}

function AwsSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M4.5 15.4c4.5 2.8 10.5 2.8 15 0" />
      <path d="M8.1 12.4 9.8 7h1.6l1.7 5.4" />
      <path d="M8.7 10.6h3.6" />
      <path d="M15.1 12.4V7l3.8 5.4V7" />
      <path d="m17.8 17.2 1.7-.8-.8 1.7" />
    </svg>
  );
}

function DockerSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <rect x="4" y="10" width="3" height="3" />
      <rect x="7.5" y="10" width="3" height="3" />
      <rect x="11" y="10" width="3" height="3" />
      <rect x="7.5" y="6.5" width="3" height="3" />
      <rect x="11" y="6.5" width="3" height="3" />
      <path d="M4 14.5h10.4c2.8 0 4.9-1.3 5.6-4 .8.3 1.3 1 1.5 1.8-1 3.8-3.8 5.7-7.4 5.7H8.4c-2.1 0-3.8-1.2-4.4-3.5Z" />
    </svg>
  );
}

function CicdSkillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={skillLogoClassName}>
      <path d="M7 7h10" />
      <path d="m13 4 4 3-4 3" />
      <path d="M17 17H7" />
      <path d="m11 20-4-3 4-3" />
      <circle cx="7" cy="7" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

const skillPillMeta = {
  'React.js': { Icon: ReactSkillIcon, colorClass: 'text-cyan-300/90' },
  Redux: { Icon: ReduxSkillIcon, colorClass: 'text-violet-300/90' },
  'Tailwind CSS': { Icon: TailwindSkillIcon, colorClass: 'text-sky-300/90' },
  SCSS: { Icon: ScssSkillIcon, colorClass: 'text-pink-300/85' },
  JavaScript: { Icon: JavaScriptSkillIcon, colorClass: 'text-amber-200/90' },
  HTML: { Icon: HtmlSkillIcon, colorClass: 'text-orange-300/90' },
  'Node.js': { Icon: NodeSkillIcon, colorClass: 'text-emerald-300/90' },
  'Express.js': { Icon: ExpressSkillIcon, colorClass: 'text-slate-200/85' },
  'REST APIs': { Icon: RestApiSkillIcon, colorClass: 'text-cyan-200/85' },
  JWT: { Icon: JwtSkillIcon, colorClass: 'text-fuchsia-200/85' },
  OAuth2: { Icon: OAuthSkillIcon, colorClass: 'text-indigo-200/85' },
  MongoDB: { Icon: MongoSkillIcon, colorClass: 'text-emerald-300/90' },
  DynamoDB: { Icon: DynamoSkillIcon, colorClass: 'text-sky-200/85' },
  SQL: { Icon: SqlSkillIcon, colorClass: 'text-slate-200/85' },
  'AWS EC2': { Icon: AwsSkillIcon, colorClass: 'text-amber-200/85' },
  'AWS Lambda': { Icon: AwsSkillIcon, colorClass: 'text-amber-200/85' },
  'AWS S3': { Icon: AwsSkillIcon, colorClass: 'text-amber-200/85' },
  Docker: { Icon: DockerSkillIcon, colorClass: 'text-sky-300/90' },
  'CI/CD': { Icon: CicdSkillIcon, colorClass: 'text-violet-200/85' },
};

function SkillPill({ skill }) {
  const meta = skillPillMeta[skill] || {};
  const Icon = meta.Icon;
  const colorClass = meta.colorClass || 'text-slate-200/85';

  return (
    <span className="group inline-flex translate-y-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-sm text-slate-100 shadow-[0_10px_30px_rgba(2,6,23,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/35 hover:bg-sky-400/[0.08] hover:text-white hover:shadow-[0_16px_36px_rgba(2,6,23,0.24),0_0_24px_rgba(34,211,238,0.12)]">
      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-slate-950/80 ${colorClass} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[8deg]`}>
        {Icon ? <Icon /> : <span className="h-2 w-2 rounded-full bg-current opacity-80" />}
      </span>
      <span className="leading-none">{skill}</span>
    </span>
  );
}


function buildPortfolioViewModel(content) {
  return {
    ...fallbackPortfolio,
    ...content,
    education: Array.isArray(content.education)
      ? content.education[0] || fallbackPortfolio.education
      : content.education || fallbackPortfolio.education,
    codingAchievements: {
      ...fallbackPortfolio.codingAchievements,
      ...content.codingAchievements,
    },
    skills: {
      ...fallbackPortfolio.skills,
      ...content.skills,
    },
  };
}

function HomePage() {
  const [portfolioData, setPortfolioData] = useState(fallbackPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [heroCardInteraction, setHeroCardInteraction] = useState(initialHeroCardInteraction);
  const [isHeroCardHovered, setIsHeroCardHovered] = useState(false);
  const heroCardFrameRef = useRef(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState({});
  const [contactStatus, setContactStatus] = useState({
    type: '',
    message: '',
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPortfolioContent() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const content = await fetchPortfolioContent(controller.signal);
        setPortfolioData(buildPortfolioViewModel(content));
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        setErrorMessage('Live content API unavailable. Showing local portfolio snapshot.');
        setPortfolioData(fallbackPortfolio);
      } finally {
        setIsLoading(false);
      }
    }

    loadPortfolioContent();

    return () => controller.abort();
  }, []);

  const portfolio = useMemo(() => portfolioData, [portfolioData]);

  function handleContactChange(event) {
    const { name, value } = event.target;

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));

    setContactErrors((current) => ({
      ...current,
      [name]: '',
    }));

    if (contactStatus.type) {
      setContactStatus({ type: '', message: '' });
    }
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    setIsSubmittingContact(true);
    setContactErrors({});
    setContactStatus({ type: '', message: '' });

    try {
      const response = await submitContactMessage(contactForm);

      setContactStatus({
        type: 'success',
        message: response.message || 'Message submitted successfully.',
      });
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      const fieldErrors = Object.fromEntries(
        (error.details || []).map((item) => [item.field, item.message]),
      );

      if (Object.keys(fieldErrors).length > 0) {
        setContactErrors(fieldErrors);
      }

      setContactStatus({
        type: 'error',
        message: error.message || 'Failed to submit contact message.',
      });
    } finally {
      setIsSubmittingContact(false);
    }
  }

  function handleHeroCardMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;
    const nextInteraction = {
      rotateX,
      rotateY,
      scale: 1.04,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
      shineX: (x / rect.width) * 140 - 20,
      shineOpacity: 0.82,
      lineShiftX: ((x - centerX) / centerX) * 20,
      lineShiftY: ((y - centerY) / centerY) * 15,
      glowOpacity: 1,
      badgeGlow: 0.9,
    };

    if (heroCardFrameRef.current) {
      cancelAnimationFrame(heroCardFrameRef.current);
    }

    heroCardFrameRef.current = requestAnimationFrame(() => {
      setHeroCardInteraction(nextInteraction);
    });
  }

  function handleHeroCardMouseEnter() {
    setIsHeroCardHovered(true);
  }

  function handleHeroCardMouseLeave() {
    if (heroCardFrameRef.current) {
      cancelAnimationFrame(heroCardFrameRef.current);
      heroCardFrameRef.current = null;
    }

    setIsHeroCardHovered(false);
    setHeroCardInteraction(initialHeroCardInteraction);
  }

  useEffect(() => {
    return () => {
      if (heroCardFrameRef.current) {
        cancelAnimationFrame(heroCardFrameRef.current);
      }
    };
  }, []);

  return (
    <main
      id="home"
      className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:gap-8 lg:py-6"
    >
      <Navbar />

      {errorMessage ? (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          {errorMessage}
        </div>
      ) : null}

      <SectionShell className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_28%),radial-gradient(circle_at_left,rgba(168,85,247,0.12),transparent_22%)]" />
        <div className="relative grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-12 lg:py-12">
          <div className="space-y-8">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {portfolio.availability}
              {isLoading ? (
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                  Loading
                </span>
              ) : null}
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
              <a
                href="/Amit_Yadav_Resume.pdf"
                download="Amit_Yadav_Resume.pdf"
                className="rounded-full border border-sky-400/25 bg-sky-400/10 px-6 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
              >
                Download Resume
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {portfolio.highlights.map((item) => (
                <Card key={item} className="border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {portfolio.heroMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card
              className={`group relative overflow-hidden border-sky-400/15 bg-slate-950/70 p-0 ${
                isHeroCardHovered ? 'hero-card-active' : 'hero-card-idle'
              }`}
              onMouseEnter={handleHeroCardMouseEnter}
              onMouseMove={handleHeroCardMouseMove}
              onMouseLeave={handleHeroCardMouseLeave}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[1.5rem] transition-opacity duration-300"
                style={{
                  opacity: heroCardInteraction.glowOpacity,
                  background: `radial-gradient(circle at ${heroCardInteraction.glowX}% ${heroCardInteraction.glowY}%, rgba(34, 211, 238, 0.46), transparent 27%), radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.26), transparent 24%), linear-gradient(135deg, rgba(8, 47, 73, 0.18), transparent 52%)`,
                  filter: 'saturate(1.25)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-[10%] top-[-28%] h-32 rounded-full bg-cyan-300/12 blur-3xl transition-opacity duration-300"
                style={{ opacity: heroCardInteraction.badgeGlow }}
              />
              <div
                className="pointer-events-none absolute inset-y-[-14%] left-[-55%] w-[62%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/24 to-transparent blur-[1.5px] transition-[opacity,transform] duration-700 ease-out"
                style={{
                  opacity: heroCardInteraction.shineOpacity,
                  transform: `translate3d(${heroCardInteraction.shineX}%, 0, 0)`,
                }}
              />
              <div
                className="relative transform-gpu will-change-transform transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(1400px) rotateX(${heroCardInteraction.rotateX}deg) rotateY(${heroCardInteraction.rotateY}deg) scale(${heroCardInteraction.scale}) translateZ(0)`,
                  transformStyle: 'preserve-3d',
                  boxShadow:
                    '0 28px 90px rgba(2, 6, 23, 0.5), 0 0 0 1px rgba(56, 189, 248, 0.1), 0 0 72px rgba(34, 211, 238, 0.28), 0 0 120px rgba(6, 182, 212, 0.12)',
                }}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-sm text-slate-400 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90 shadow-[0_0_12px_rgba(251,113,133,0.45)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90 shadow-[0_0_12px_rgba(252,211,77,0.45)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90 shadow-[0_0_12px_rgba(74,222,128,0.45)]" />
                    </div>
                    <span className="font-medium text-slate-200">amit-profile.js</span>
                  </div>
                  <span
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200 transition-all duration-300"
                    style={{ boxShadow: `0 0 0 1px rgba(74, 222, 128, 0.06), 0 0 ${14 + heroCardInteraction.badgeGlow * 18}px rgba(16, 185, 129, 0.22)` }}
                  >
                    available
                  </span>
                </div>
                <div className="space-y-4 px-5 py-5 font-mono text-sm leading-7 text-slate-300">
                  {[
                    <>
                      <span className="text-fuchsia-400">const</span>{' '}
                      <span className="text-sky-300">developer</span> = {'{'}
                    </>,
                    <>
                      name: <span className="text-emerald-300">'{portfolio.name}'</span>,
                    </>,
                    <>
                      role: <span className="text-emerald-300">'{portfolio.title}'</span>,
                    </>,
                    <>
                      focus: <span className="text-emerald-300">'MERN, AWS, Payment Systems'</span>,
                    </>,
                    <>
                      location: <span className="text-emerald-300">'{portfolio.location}'</span>,
                    </>,
                    <>
                      email: <span className="text-emerald-300">'{portfolio.email}'</span>,
                    </>,
                    <>{'}'}</>,
                  ].map((line, index) => (
                    <p
                      key={index}
                      className={index > 0 && index < 6 ? 'pl-4' : ''}
                      style={{
                        opacity: isHeroCardHovered ? 1 : 0.94,
                        transform: `translate3d(${heroCardInteraction.lineShiftX * (index + 1) * 0.24}px, ${(isHeroCardHovered ? -2 : 0) + heroCardInteraction.lineShiftY * (index + 1) * 0.18}px, ${(index + 1) * 2}px)`,
                        transition: `transform 180ms ease-out ${index * 22}ms, opacity 220ms ease ${index * 22}ms`,
                        textShadow: isHeroCardHovered ? '0 0 18px rgba(56, 189, 248, 0.08)' : 'none',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Core strengths</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {portfolio.strengths.map((strength) => (
                  <div key={strength} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                    <p>{strength}</p>
                  </div>
                ))}
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
            {portfolio.socialLinks.map((link) => {
              const Icon = socialCardIcons[link.label];

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.05] px-5 py-4 shadow-[0_18px_45px_rgba(2,6,23,0.28)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-300/45 hover:bg-sky-400/[0.09] hover:shadow-[0_24px_60px_rgba(2,6,23,0.34),0_0_32px_rgba(34,211,238,0.12)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-slate-950/75 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_0_24px_rgba(34,211,238,0.08)] transition duration-300 group-hover:border-sky-300/45 group-hover:bg-sky-400/10 group-hover:text-sky-100 group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.14),0_0_30px_rgba(34,211,238,0.18)]">
                    {Icon ? <Icon /> : null}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-400 transition group-hover:text-sky-100/80">{link.label}</p>
                    <p className="mt-1 text-lg font-medium text-slate-100">Visit profile</p>
                  </div>
                </a>
              );
            })}
            <div className="group flex items-center gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.05] px-5 py-4 shadow-[0_18px_45px_rgba(2,6,23,0.28)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-300/45 hover:bg-sky-400/[0.09] hover:shadow-[0_24px_60px_rgba(2,6,23,0.34),0_0_32px_rgba(34,211,238,0.12)]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-slate-950/75 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_0_24px_rgba(34,211,238,0.08)] transition duration-300 group-hover:border-sky-300/45 group-hover:bg-sky-400/10 group-hover:text-sky-100 group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.14),0_0_30px_rgba(34,211,238,0.18)]">
                <PhoneIcon />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-400 transition group-hover:text-sky-100/80">Phone</p>
                <p className="mt-1 text-lg font-medium text-slate-100">{portfolio.phone}</p>
              </div>
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
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                  <p className="text-slate-300">{item.role}</p>
                </div>
                <p className="text-sm text-sky-300">{item.period}</p>
              </div>

              {item.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs text-sky-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

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
        <Card className="relative overflow-hidden border-white/10 bg-slate-950/80">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_50%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionHeading
              eyebrow="Technical Ecosystem"
              title="A layered engineering stack designed like a product system"
              description="Inspired by premium ecosystem-style portfolios, this section frames my stack as interconnected capability layers across interface systems, backend services, persistence, and delivery infrastructure."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Operating Style</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">Full-stack, API-first, product-aware engineering.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Core Themes</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">Payments, secure workflows, dashboards, cloud-backed delivery.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Mindset</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">Build systems that feel polished for users and reliable for teams.</p>
              </div>
            </div>
          </div>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Card
              key={group.key}
              className="group relative overflow-hidden border-white/10 bg-white/[0.035] shadow-[0_18px_60px_rgba(2,6,23,0.28)] transition duration-300 hover:-translate-y-1 hover:border-sky-300/25 hover:bg-sky-400/[0.04] hover:shadow-[0_26px_72px_rgba(2,6,23,0.34),0_0_34px_rgba(34,211,238,0.08)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent opacity-70" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_42%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300/80">
                      {group.eyebrow}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{group.label}</h3>
                  </div>
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/85 px-3 text-xs font-medium text-slate-300 shadow-[0_10px_30px_rgba(2,6,23,0.22)]">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300">{group.description}</p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Focus</p>
                  <p className="mt-2 text-sm text-slate-200">{group.accent}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {portfolio.skills[group.key].map((skill) => (
                    <SkillPill key={skill} skill={skill} />
                  ))}
                </div>
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
            description="Initial project content is seeded from CV data and is structured to move into backend-driven models in the next phase."
          />
        </Card>
        <div className="grid gap-6 xl:grid-cols-2">
          {portfolio.projects.map((project) => {
            const hasRepo = Boolean(project.repoUrl);
            const hasDemo = Boolean(project.liveUrl);

            return (
              <Card key={project.name} className="h-full">
                <div className="flex h-full flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
                        {project.category}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                    </div>
                    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-5">
                    <p className="text-sm leading-7 text-slate-300">{project.description}</p>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Impact</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.impact}</p>
                    </div>
                    <div className="space-y-3">
                      {project.highlights.map((item) => (
                        <div key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                          <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {hasRepo ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-xs font-medium text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
                        >
                          View Repository
                        </a>
                      ) : (
                        <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300">
                          Repo link pending
                        </span>
                      )}

                      {hasDemo ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-xs font-medium text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
                        >
                          View Live Demo
                        </a>
                      ) : (
                        <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300">
                          Live demo pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
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

          <Card className="overflow-hidden border-cyan-400/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.92))]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">LeetCode Activity</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Daily Problem Solving Activity</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
                    A compact visual snapshot of consistency, showing steady problem-solving discipline across recent active days.
                  </p>
                </div>
                <a
                  href={portfolio.codingAchievements.platforms[0]?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/15"
                >
                  Open LeetCode
                </a>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{portfolio.codingAchievements.leetCodeActivity.label}</p>
                    <div className="mt-4 grid grid-cols-12 gap-1.5 sm:gap-2">
                      {portfolio.codingAchievements.leetCodeActivity.weeks.map((week, weekIndex) => (
                        <div key={`week-${weekIndex}`} className="grid gap-1.5 sm:gap-2">
                          {week.map((level, dayIndex) => (
                            <div
                              key={`cell-${weekIndex}-${dayIndex}`}
                              className={`h-3.5 w-3.5 rounded-[4px] border transition duration-200 hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_0_14px_rgba(34,211,238,0.16)] sm:h-4 sm:w-4 ${getHeatmapCellClass(level)}`}
                              title={`Activity intensity ${level}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 xl:w-[260px] xl:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Current Streak</p>
                      <p className="mt-2 text-lg font-semibold text-white">{portfolio.codingAchievements.leetCodeActivity.currentStreak}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Active Days</p>
                      <p className="mt-2 text-lg font-semibold text-white">{portfolio.codingAchievements.leetCodeActivity.totalActiveDays}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:col-span-2">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Problems Solved</p>
                      <p className="mt-2 text-lg font-semibold text-white">{portfolio.codingAchievements.leetCodeActivity.problemsSolved}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-emerald-400/12 bg-emerald-500/[0.06] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/75">Easy</p>
                    <p className="mt-2 text-base font-semibold text-white">{portfolio.codingAchievements.leetCodeActivity.breakdown.easy}</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/12 bg-cyan-400/[0.06] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/80">Medium</p>
                    <p className="mt-2 text-base font-semibold text-white">{portfolio.codingAchievements.leetCodeActivity.breakdown.medium}</p>
                  </div>
                  <div className="rounded-2xl border border-fuchsia-400/12 bg-fuchsia-400/[0.06] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-fuchsia-200/80">Hard</p>
                    <p className="mt-2 text-base font-semibold text-white">{portfolio.codingAchievements.leetCodeActivity.breakdown.hard}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
          <div id="contact" className="mt-6 grid gap-6">
            <div className="flex flex-wrap gap-4">
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
              <a
                href="/Amit_Yadav_Resume.pdf"
                download="Amit_Yadav_Resume.pdf"
                className="rounded-full border border-sky-400/25 bg-sky-400/10 px-6 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
              >
                Download Resume
              </a>
            </div>

            <form className="grid gap-4" onSubmit={handleContactSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Your name"
                    className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
                  />
                  {contactErrors.name ? (
                    <span className="text-xs text-rose-300">{contactErrors.name}</span>
                  ) : null}
                </label>

                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="your.email@example.com"
                    className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
                  />
                  {contactErrors.email ? (
                    <span className="text-xs text-rose-300">{contactErrors.email}</span>
                  ) : null}
                </label>
              </div>

              <label className="grid gap-2 text-sm text-slate-300">
                <span>Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  placeholder="How can I help?"
                  className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
                />
                {contactErrors.subject ? (
                  <span className="text-xs text-rose-300">{contactErrors.subject}</span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                <span>Message</span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Tell me about your project, opportunity, or idea."
                  rows="5"
                  className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
                />
                {contactErrors.message ? (
                  <span className="text-xs text-rose-300">{contactErrors.message}</span>
                ) : null}
              </label>

              {contactStatus.message ? (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    contactStatus.type === 'success'
                      ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                      : 'border border-rose-400/20 bg-rose-400/10 text-rose-100'
                  }`}
                >
                  {contactStatus.message}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmittingContact ? 'Sending...' : 'Send Message'}
                </button>
                <p className="text-sm text-slate-400">
                  I usually respond to relevant opportunities and project discussions promptly.
                </p>
              </div>
            </form>
          </div>
        </Card>
      </SectionShell>

      <Footer />
    </main>
  );
}

export default HomePage;

function Footer() {
  return (
    <footer className="rounded-[1.75rem] border border-white/10 bg-slate-950/75 px-6 py-6 text-sm text-slate-400 shadow-[0_20px_60px_rgba(2,6,23,0.3)] backdrop-blur-xl sm:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1.5">
          <p className="font-medium text-slate-200">Amit Kumar Yadav</p>
          <p>Built with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB in mind.</p>
        </div>

        <div className="flex flex-col gap-2 text-slate-400 sm:flex-row sm:items-center sm:gap-4">
          <a className="transition hover:text-sky-200" href="mailto:amityadav422v@gmail.com">
            amityadav422v@gmail.com
          </a>
          <span className="hidden text-slate-600 sm:inline">•</span>
          <p>Designed for a premium dark, developer-focused portfolio experience.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

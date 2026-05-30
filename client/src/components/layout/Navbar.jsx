const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  return (
    <header className="sticky top-3 z-30">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 px-5 py-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl xl:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <a href="#home" className="flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sm font-semibold text-sky-200 shadow-[0_0_30px_rgba(56,189,248,0.12)]">
              AK
            </span>
            <div>
              <p className="text-sm font-medium text-slate-200">Amit Kumar Yadav</p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Full Stack Developer
              </p>
            </div>
          </a>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <nav
              aria-label="Primary"
              className="flex flex-wrap gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-1 text-sm text-slate-300"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2 transition hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
            >
              Let’s Talk
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

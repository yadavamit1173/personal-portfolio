function Footer() {
  return (
    <footer className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 px-6 py-6 text-sm text-slate-400 shadow-[0_20px_60px_rgba(2,6,23,0.3)] backdrop-blur sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-slate-200">Amit Kumar Yadav</p>
          <p>Built with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB in mind.</p>
        </div>
        <p>Designed for a premium dark, developer-focused portfolio experience.</p>
      </div>
    </footer>
  );
}

export default Footer;

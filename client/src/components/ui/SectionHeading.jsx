function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-2xl space-y-4 ${alignment}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">{title}</h2>
      {description ? <p className="text-base text-slate-300 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;

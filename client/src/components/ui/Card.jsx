function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

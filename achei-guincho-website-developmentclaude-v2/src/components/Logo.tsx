export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Achei Guincho — início">
      <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-accent text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M9.5 10.2 11.3 12l3.4-3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[1.15rem] font-bold tracking-tight">
        achei<span className="font-display text-[1.35rem] font-normal italic"> guincho</span>
      </span>
    </a>
  );
}

type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const IconHook = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <circle cx="11" cy="4.6" r="1.9" />
    <path d="M11 6.8v5.4a4.6 4.6 0 1 0 9.2 0v-1.5" />
  </svg>
);

export const IconPhone = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M5 4h4l1.6 4-2.2 1.7a12 12 0 0 0 5.9 5.9L16 13.4l4 1.6v4a1.8 1.8 0 0 1-2 1.8A16.8 16.8 0 0 1 3.2 6 1.8 1.8 0 0 1 5 4Z" />
  </svg>
);

export const IconPin = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10Z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
);

export const IconFuel = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="3.5" width="9" height="17" rx="1.4" />
    <path d="M6.8 7h3.4M13 12h2.4a1.6 1.6 0 0 1 1.6 1.6v3.2a1.3 1.3 0 0 0 2.6 0V9.4L17.4 7" />
    <path d="M4 20.5h9" />
  </svg>
);

export const IconBattery = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="7.5" width="16.5" height="11" rx="1.6" />
    <path d="M6.5 7.5V5.4M15 7.5V5.4M13.2 10.4 10 13.4h3l-3.2 3" />
    <path d="M20.5 11v4.5" />
  </svg>
);

export const IconTire = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.2" />
    <circle cx="12" cy="12" r="3.1" />
    <path d="M12 8.9V5.2M14.9 13.6l3.4 1.5M9.1 13.6l-3.4 1.5" />
  </svg>
);

export const IconKey = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="7.5" cy="15.5" r="3.7" />
    <path d="M10.3 12.7 20 3.8M16 6.5l2.8 2.8M13.2 9.3l2.1 2.1" />
  </svg>
);

export const IconMoto = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="5.5" cy="16.5" r="3" />
    <circle cx="18.5" cy="16.5" r="3" />
    <path d="M5.5 16.5 9 10h4.5M9 10l-1.6-2.4H5M13.5 10l3 6.5M13.9 5.5h2.6l2 4.8" />
  </svg>
);

export const IconHeavy = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M2.5 16V7h11v9" />
    <path d="M13.5 10h4.2l3 3.4V16h-2" />
    <circle cx="6.5" cy="17.2" r="1.9" />
    <circle cx="16.7" cy="17.2" r="1.9" />
    <path d="M8.4 17.2h6.4M2.5 17.2h2.1" />
  </svg>
);

export const IconWrench = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L3.6 16.7a2 2 0 1 0 2.8 2.8l5.3-5.3a4 4 0 0 0 4.9-5.6l-2.6 2.6-2.3-.7-.7-2.3Z" />
  </svg>
);

export const IconShield = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3 5 5.8v5.4c0 4.4 3 7.6 7 9.3 4-1.7 7-4.9 7-9.3V5.8Z" />
    <path d="m9 11.6 2.2 2.2L15.4 9.4" />
  </svg>
);

export const IconClock = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconStar = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9Z" />
  </svg>
);

export const IconCheck = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2.4} className={className}>
    <path d="m4.5 12.6 5 5L19.5 7" />
  </svg>
);

export const IconArrow = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const IconPlus = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconClose = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconMenu = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IconWhats = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.8a8.2 8.2 0 0 0-7 12.4L4 20l3.9-1a8.2 8.2 0 1 0 4.1-15.2Z" />
    <path d="M9.3 8.9c-.3 2.6 3 6 5.7 6.1l1-1.6-2-1.2-.9.7a5.6 5.6 0 0 1-2-2l.7-.9-1.1-2Z" />
  </svg>
);

export const IconInstagram = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconYoutube = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="3.5" />
    <path d="m10 9.2 4.6 2.8L10 14.8Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconX = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M4.5 4.5 19.5 19.5M19.5 4.5 4.5 19.5" />
  </svg>
);

export const IconDownload = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M12 4v10.5M7.5 10.5 12 15l4.5-4.5M4.5 19h15" />
  </svg>
);

export const IconChevron = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const IconTruckSide = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M2.5 15.5V8h9.5v7.5" />
    <path d="M12 10.5h4l3.5 3v2h-1.8" />
    <circle cx="6" cy="16.8" r="1.8" />
    <circle cx="15.8" cy="16.8" r="1.8" />
    <path d="M7.8 16.8h6.2" />
  </svg>
);

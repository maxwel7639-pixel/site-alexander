// Icones em SVG, desenhados no mesmo grid de 24 e com a mesma espessura de
// traco. Sem emoji e sem biblioteca externa.

type Props = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function IconeWhatsApp({ className }: Props) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.05 8.05 0 0 1-1.23-4.3c0-4.46 3.63-8.09 8.1-8.09Zm-3.1 4.3c-.15 0-.4.06-.6.28-.21.22-.8.78-.8 1.9s.82 2.2.93 2.36c.12.15 1.6 2.44 3.88 3.42.54.24.96.38 1.29.48.54.17 1.04.15 1.43.09.44-.07 1.34-.55 1.53-1.08.19-.53.19-.98.13-1.08-.06-.09-.21-.15-.44-.26-.23-.12-1.34-.66-1.55-.74-.21-.07-.36-.11-.5.12-.16.22-.58.73-.71.88-.13.15-.26.17-.48.06-.23-.12-.96-.36-1.83-1.13a6.87 6.87 0 0 1-1.27-1.57c-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.4.11-.13.15-.23.23-.38.07-.15.03-.28-.02-.4-.06-.11-.5-1.22-.69-1.67-.18-.44-.36-.38-.5-.39h-.42Z" />
    </svg>
  );
}

export function IconeInstagram({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconeEmail({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconeLocal({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconeRelogio({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconeCheck({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconeEstrela({ className }: Props) {
  return (
    <svg
      className={className}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="m12 2.6 2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.42 6.19 20.5l1.1-6.47-4.7-4.58 6.5-.95L12 2.6Z" />
    </svg>
  );
}

export function SimboloPsi({ className }: Props) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M11.1 2h1.8v10.6c1.4-.2 2.3-1.2 2.3-2.9V4.4h1.8v5.3c0 2.8-1.7 4.5-4.1 4.7V22h-1.8v-7.6c-2.4-.2-4.1-1.9-4.1-4.7V4.4h1.8v5.3c0 1.7.9 2.7 2.3 2.9V2Z" />
    </svg>
  );
}

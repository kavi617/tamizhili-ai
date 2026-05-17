import type { SVGProps } from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden {...props}>
      <path {...stroke} d="M5 6h14v9H10l-4 3v-3H5V6z" />
    </svg>
  );
}

export function IconTimeline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden {...props}>
      <path {...stroke} d="M4 12h16" />
      <path {...stroke} d="M7 8v8M12 6v12M17 9v6" />
      <circle cx="7" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden {...props}>
      <path {...stroke} d="M9 4L5 6v14l4-2 6 2 4-2V4l-4 2-6-2z" />
      <path {...stroke} d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function IconLibrary(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden {...props}>
      <path {...stroke} d="M6 4h5v16H6zM13 7h5v13h-5z" />
      <path {...stroke} d="M8 8h1M8 11h1M15 10h1M15 13h1" strokeWidth={1.5} />
    </svg>
  );
}

export function IconSend(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden {...props}>
      <path {...stroke} strokeWidth={2.2} d="M5 12h11M13 7l6 5-6 5" />
    </svg>
  );
}

export function IconDocs(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden {...props}>
      <path
        {...stroke}
        d="M14 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-5-6z"
      />
      <path {...stroke} strokeWidth={1.5} d="M14 2v6h5M8 12h8M8 16h6" />
    </svg>
  );
}

/** Stone inscription / கல்வெட்டு upload affordance */
export function IconInscription(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...props}>
      <path
        {...stroke}
        d="M8 3h8l3 3v15a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"
      />
      <path {...stroke} strokeWidth={1.5} d="M10 9h6M10 12h6M10 15h4" />
      <path {...stroke} strokeWidth={1.5} d="M16 3v3h3" />
    </svg>
  );
}

export function IconBookDocs(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden {...props}>
      <path
        {...stroke}
        strokeWidth={1.8}
        d="M6 4h10v16H6a2 2 0 01-2-2V6a2 2 0 012-2z"
      />
      <path {...stroke} strokeWidth={1.5} d="M8 8h8M8 12h5" />
    </svg>
  );
}

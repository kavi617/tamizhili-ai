"use client";

import { useId } from "react";

/** Circular navy / gold seal with Tamil த — matches brand emblem */
export function HeritageLogo({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const gradR = `hl-rad-${uid}`;
  const gradG = `hl-au-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
    >
      <title>தமிழி Heritage mark</title>
      <defs>
        <radialGradient id={gradR} cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0e3468" />
          <stop offset="100%" stopColor="#020c1c" />
        </radialGradient>
        <linearGradient id={gradG} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcefb4" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#7a5c16" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${gradR})`} />
      <circle
        cx="32"
        cy="32"
        r="28.5"
        fill="none"
        stroke={`url(#${gradG})`}
        strokeWidth="1.8"
      />
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke={`url(#${gradG})`}
        strokeWidth="0.6"
        opacity={0.85}
      />
      <path
        d="M46 44 Q52 38 50 30 Q48 22 42 18"
        fill="none"
        stroke={`url(#${gradG})`}
        strokeWidth="0.5"
        strokeDasharray="1 3"
        opacity={0.45}
      />
      <path
        d="M18 20 Q12 26 14 34 Q16 42 22 46"
        fill="none"
        stroke={`url(#${gradG})`}
        strokeWidth="0.5"
        strokeDasharray="1 3"
        opacity={0.45}
      />
      <path
        fill={`url(#${gradG})`}
        opacity={0.95}
        d="M13 17l1.2 3h3l-2.5 2 1 3.2L13 23l-2.7 2.2 1-3.2-2.5-2h3zm38 30l1.2 3h3l-2.5 2 1 3.2L51 53l-2.7 2.2 1-3.2-2.5-2h3z"
      />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="26"
        fontWeight={700}
        fill={`url(#${gradG})`}
        style={{
          fontFamily:
            "var(--font-tamil), 'Noto Sans Tamil', 'Tamil Sangam MN', sans-serif",
        }}
      >
        த
      </text>
    </svg>
  );
}

"use client";

const LINKS = [
  { href: "#chat", label: "Chat" },
  { href: "http://localhost:8000/docs", label: "API", external: true },
  {
    href: "https://en.wikipedia.org/wiki/History_of_Tamil_Nadu",
    label: "About",
    external: true,
  },
];

export default function Navbar() {
  return (
    <nav className="border-b border-stone-300/80 bg-[#fbf6ec]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="/"
          className="flex items-baseline gap-2 text-stone-900"
        >
          <span className="font-tamil text-lg font-semibold tracking-wide sm:text-xl">
            தமிழி AI
          </span>
          <span className="hidden text-xs text-stone-600 sm:inline">
            Tamil History Tutor
          </span>
        </a>
        <ul className="flex items-center gap-3 text-sm sm:gap-5">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="text-stone-600 transition hover:text-amber-900"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

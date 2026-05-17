"use client";

import { Fragment } from "react";

const URL_SPLIT = /(https?:\/\/[^\s)]+)/;

function renderBold(segment: string, keyPrefix: string) {
  const bits = segment.split(/(\*\*[^*]+\*\*)/g).filter((b) => b !== "");
  return bits.map((b, j) => {
    const m = b.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <strong key={`${keyPrefix}-${j}`} className="font-semibold text-[#2c1810]">
          {m[1]}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-${j}`}>{b}</span>;
  });
}

/** URLs as links; **title** as bold. Preserves newlines. */
export default function Markdown({ text }: { text: string }) {
  const segments = text.split(URL_SPLIT);

  return (
    <div className="whitespace-pre-wrap break-words text-[15px] leading-7 text-[#3d2914]">
      {segments.map((seg, i) =>
        /^https?:\/\//.test(seg) ? (
          <a
            key={i}
            href={seg}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#7d5a32] underline decoration-[#c4a574]/60 underline-offset-2 hover:text-[#5c3d2e]"
          >
            {seg}
          </a>
        ) : (
          <Fragment key={i}>{renderBold(seg, String(i))}</Fragment>
        )
      )}
    </div>
  );
}

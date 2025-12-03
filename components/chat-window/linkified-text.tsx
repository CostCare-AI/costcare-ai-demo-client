import type { ReactNode } from "react";
import Link from "next/link";
import { normalizeUrl } from "../../lib/url";

interface LinkifiedTextProps {
  text: string;
}

export function LinkifiedText({ text }: LinkifiedTextProps) {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  text.replace(urlRegex, (match, _g1, _g2, offset) => {
    if (lastIndex < (offset ?? 0)) {
      parts.push(text.slice(lastIndex, offset));
    }
    const href = normalizeUrl(match);
    parts.push(
      <Link
        key={`${offset}-${match}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2563eb] underline break-words"
      >
        {match}
      </Link>
    );
    lastIndex = (offset ?? 0) + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}



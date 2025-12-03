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
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchedText = match[0];
    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }
    const href = normalizeUrl(matchedText);
    parts.push(
      <Link
        key={`${matchIndex}-${matchedText}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2563eb] underline break-words"
      >
        {matchedText}
      </Link>
    );
    lastIndex = matchIndex + matchedText.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}



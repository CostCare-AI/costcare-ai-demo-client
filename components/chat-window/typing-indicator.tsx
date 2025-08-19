import React from "react";

interface TypingIndicatorProps {
  name?: string;
}

export function TypingIndicator({ name }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#8E94A0]">
      <span>{name ? `${name} is typing` : "Typing"}</span>
      <span className="inline-flex items-end gap-1">
        <span className="mt-1 h-[3px] w-[3px] rounded-full bg-[#8E94A0] animate-bounce [animation-delay:0ms]" />
        <span className="mt-1 h-[3px] w-[3px] rounded-full bg-[#8E94A0] animate-bounce [animation-delay:150ms]" />
        <span className="mt-1 h-[3px] w-[3px] rounded-full bg-[#8E94A0] animate-bounce [animation-delay:300ms]" />
      </span>
    </div>
  );
}

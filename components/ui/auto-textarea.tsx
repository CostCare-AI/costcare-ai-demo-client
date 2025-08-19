"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface AutoTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
  name?: string;
}

export const AutoTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoTextareaProps
>(
  (
    { className, name, minRows = 1, maxRows = 5, onChange, style, ...props },
    ref
  ) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const composedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
      },
      [ref]
    );

    const [isOverflowing, setIsOverflowing] = React.useState(false);

    const adjustHeight = React.useCallback(() => {
      const textarea = innerRef.current;
      if (!textarea) return;

      textarea.style.height = "auto";

      const computed = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(computed.lineHeight) || 20;
      const paddingTop = parseFloat(computed.paddingTop) || 0;
      const paddingBottom = parseFloat(computed.paddingBottom) || 0;
      const borderTop = parseFloat(computed.borderTopWidth) || 0;
      const borderBottom = parseFloat(computed.borderBottomWidth) || 0;

      const maxHeight =
        lineHeight * maxRows +
        paddingTop +
        paddingBottom +
        borderTop +
        borderBottom;
      const newScrollHeight = textarea.scrollHeight;

      const nextHeight = Math.min(newScrollHeight, maxHeight);
      textarea.style.height = `${nextHeight}px`;
      setIsOverflowing(newScrollHeight > maxHeight + 0.5);
    }, [maxRows]);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight, props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(e);
      requestAnimationFrame(adjustHeight);
    };

    return (
      <textarea
        ref={composedRef}
        rows={minRows}
        name={name}
        onChange={handleChange}
        className={cn(
          "w-full rounded-[12px] border border-[#E6E8F0] bg-field px-4 py-3 text-[16px] lg:text-[14px] placeholder:text-[#9C9DB5] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none custom-scrollbar",
          isOverflowing ? "overflow-y-auto" : "overflow-hidden",
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

export default AutoTextarea;

import { useCallback, useEffect, useRef, useState } from "react";

import { useScrollOnMessageAdd } from "../../lib/scroll-utils";
import { Message, MessageType } from "../../lib/types";
import { MessageBubble } from "./message-bubble";
import { TaskBubble } from "./task-bubble";

interface MessagesProps {
  messages: Message[];
}

export function Messages({ messages }: MessagesProps) {
  const { messagesEndRef } = useScrollOnMessageAdd(messages);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  const updateGradients = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const hasScrollableContent = el.scrollHeight > el.clientHeight + 1;
    const hasHiddenTop = el.scrollTop > 1;
    const hasHiddenBottom =
      el.scrollTop + el.clientHeight < el.scrollHeight - 1;

    setShowTopGradient(hasScrollableContent && hasHiddenTop);
    setShowBottomGradient(hasScrollableContent && hasHiddenBottom);
  }, []);

  useEffect(() => {
    const rAF = requestAnimationFrame(updateGradients);
    return () => cancelAnimationFrame(rAF);
  }, [messages, updateGradients]);

  useEffect(() => {
    const onResize = () => updateGradients();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateGradients]);

  const renderMessage = (msg: Message, index: number) =>
    msg.type === MessageType.Task ? (
      <TaskBubble key={index} msg={msg} />
    ) : (
      <MessageBubble key={index} msg={msg} />
    );

  return (
    <div className="relative h-full">
      <div
        ref={scrollContainerRef}
        onScroll={updateGradients}
        className="h-full overflow-y-auto no-scrollbar pt-4"
      >
        <div className="flex min-h-full flex-col justify-end space-y-3">
          {messages.map((msg, index) => renderMessage(msg, index))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {showTopGradient && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-0 h-6 bg-gradient-to-b from-[#F7F7FB] to-transparent"
        />
      )}

      {showBottomGradient && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 -bottom-0 h-6 bg-gradient-to-t from-[#F7F7FB] to-transparent z-10"
        />
      )}
    </div>
  );
}

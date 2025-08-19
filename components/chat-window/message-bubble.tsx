import { Message } from "../../lib/types";

interface MessageBubbleProps {
  msg: Message;
}

export function MessageBubble({ msg }: MessageBubbleProps) {
  return (
    <div
      className={`flex items-end gap-2 ${
        msg.type !== "ai" ? "justify-end" : ""
      }`}
    >
      <div
        className={`relative max-w-full md:max-w-xs rounded-lg p-3 px-3 py-2.5 text-[14px] text-[#2E3039] lg:max-w-md break-words ${
          msg.type !== "ai" ? "bg-[#E6E8F0]" : "bg-white"
        }`}
      >
        {msg.content && <p>{msg.content}</p>}
      </div>
    </div>
  );
}

import { Message } from "../../lib/types";
import { LinkifiedText } from "./linkified-text";
import { UrlPreview } from "./url-preview";

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
        className={`relative max-w-full md:max-w-xs rounded-lg p-3 px-3 py-2.5 text-[14px] text-[#2E3039] whitespace-pre-wrap lg:max-w-md break-words ${
          msg.type !== "ai" ? "bg-[#E6E8F0]" : "bg-white"
        }`}
      >
        {msg.content && (
          <>
            <p><LinkifiedText text={msg.content} /></p>
            <UrlPreview text={msg.content} />
          </>
        )}
      </div>
    </div>
  );
}

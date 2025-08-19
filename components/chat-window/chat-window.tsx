"use client";

import { ChatResponse, Message } from "@/lib/types";
import { ChatInput } from "./chat-input";
import { Messages } from "./messages";
import { useState } from "react";
import { ChatHeader } from "./chat-header";
import { useSearchParams } from "next/navigation";
import { TypingIndicator } from "./typing-indicator";
import { createMessage } from "@/lib/utils";

interface ChatWindowProps {
  chatResponse?: ChatResponse;
  messages: Message[];
}

export function ChatWindow({
  chatResponse,
  messages: initialMessages,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const searchParams = useSearchParams();
  const chatId = chatResponse?.chat_id || searchParams.get("chat_id");
  const userId = searchParams.get("user_id");
  const [isLoading, setIsLoading] = useState(false);

  const onSendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      createMessage({ chatId, userId, content: message, type: "human" }),
    ]);

    try {
      const newMessage: Response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          message,
        }),
      });

      if (newMessage.ok) {
        const aiResponse = await newMessage.json();
        setMessages((prev) => [
          ...prev,
          createMessage({
            chatId,
            userId,
            content: aiResponse.response,
            type: "ai",
          }),
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-[100dvh] min-w-[100dvw] max-w-[100dvw] max-h-[100dvh] overflow-hidden flex-col bg-[#F7F7FB]">
      <div className="flex flex-col max-w-[800px] w-full h-[100dvh] mx-auto min-h-[100dvh] p-4 lg:p-[30px] pb-5">
        <ChatHeader title={chatResponse?.title || ""} />
        <div className="min-h-0 flex-1 relative">
          <Messages messages={messages} />
          {isLoading && (
            <div className="absolute bottom-[2px] lg:bottom-[5px] left-4 z-[20]">
              <TypingIndicator name={chatResponse?.title || ""} />
            </div>
          )}
        </div>
        <ChatInput
          recipient={chatResponse?.title || ""}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
}

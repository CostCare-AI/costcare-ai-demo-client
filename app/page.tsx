import { ChatWindow } from "@/components/chat-window/chat-window";
import { createChat, DEMO_USER_ID, getChat, getMessages } from "@/lib/api";
import { Message } from "@/lib/types";
import { createMessage } from "@/lib/utils";
import { redirect } from "next/navigation";
import { RefreshOnParamChange } from "@/components/refresh-on-param-change";

export const dynamic = "force-dynamic";

interface ChatsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ChatsPage({ searchParams }: ChatsPageProps) {
  const params = await searchParams;
  const providedUserId =
    typeof params.user_id === "string" ? params.user_id : undefined;
  const providedChatId =
    typeof params.chat_id === "string" ? params.chat_id : undefined;

  const userId = providedUserId ?? DEMO_USER_ID;

  if (!providedChatId) {
    const createdChat = await createChat(userId);
    const newChatId = createdChat.chat_id;
    const qs = new URLSearchParams({
      user_id: userId,
      chat_id: newChatId,
    }).toString();
    redirect(`/?${qs}`);
  }
  const chatResponse = await getChat(userId, providedChatId);

  const initialMessages: Message[] = Array.isArray(chatResponse?.messages)
    ? (chatResponse.messages as Message[])
    : [
        createMessage({
          chatId: providedChatId,
          userId,
          content:
            chatResponse?.initial_message || "Hello, how can I help you today?",
          type: "ai",
        }),
      ];

  return (
    <>
      <RefreshOnParamChange watchKeys={["chat_id", "user_id"]} />
      <ChatWindow
        key={providedChatId}
        chatResponse={chatResponse}
        messages={initialMessages}
      />
    </>
  );
}

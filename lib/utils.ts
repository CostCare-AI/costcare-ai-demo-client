import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { SocialEnum, Message } from "./types";
import { DEMO_USER_ID } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageBySocial = (social: SocialEnum) => {
  switch (social) {
    case SocialEnum.Instagram:
      return "/images/common/instagram.svg";
    case SocialEnum.Telegram:
      return "/images/common/telegram.svg";
    case SocialEnum.WhatsApp:
      return "/images/common/whatsapp.svg";
  }
};

export function createMessage(params: {
  chatId: string | null | undefined;
  userId: string | null | undefined;
  content: string;
  type: string;
  source?: string;
  isPreview?: boolean;
}): Message {
  const {
    chatId,
    userId = DEMO_USER_ID,
    content = "",
    type = "human",
    source = "demo",
    isPreview = false,
  } = params;
  return {
    chat_id: chatId ?? "",
    content,
    is_preview: isPreview,
    source,
    timestamp: new Date().toISOString(),
    type,
    user_id: userId ?? "",
  };
}

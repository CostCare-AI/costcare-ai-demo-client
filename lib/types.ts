export enum DialogType {
  All = "All Dialogs",
  Active = "Active",
  Archived = "Archived",
}

export enum MessageType {
  Text = "text",
  Image = "image",
  File = "file",
  Task = "task",
}

export interface Message {
  chat_id: string;
  content: string;
  is_preview: boolean;
  source: string;
  timestamp: string;
  type: string;
  user_id: string;
}

export enum SocialEnum {
  Instagram = "Instagram",
  Telegram = "Telegram",
  WhatsApp = "WhatsApp",
}

export interface ChatResponse {
  chat_id: string;
  title: string;
  initial_message?: string;
  messages: Message[];
}

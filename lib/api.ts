export type BackendMessage = any;

import { ChatResponse, Message } from "@/lib/types";

export const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || "xifea";
export const demoVersion = "text-demo";

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      `API ${path} failed: ${res.status} ${res.statusText} ${text}`
    );
  }
  return res.json() as Promise<T>;
}

async function postJsonNoStore<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      `API ${path} failed: ${res.status} ${res.statusText} ${text}`
    );
  }
  return res.json() as Promise<T>;
}

export async function createChat(userId: string): Promise<{ chat_id: string }> {
  return postJson(`${demoVersion}/new-chat`, { user_id: userId });
}

export async function getChat(
  userId: string,
  chatId: string
): Promise<ChatResponse> {
  return postJsonNoStore(`${demoVersion}/get-chat`, {
    user_id: userId,
    chat_id: chatId,
  });
}

export async function getMessages(
  chatId: string
): Promise<{ messages?: Message[] }> {
  return postJson(`${demoVersion}/get-messages`, { chat_id: chatId });
}

export async function proxyPostToDemo(
  endpoint: string,
  req: Request
): Promise<Response> {
  const body = await req.text();
  const upstream = await fetch(`${apiBase}${demoVersion}/${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") || "application/json",
      "access-control-allow-origin": "*",
    },
  });
}

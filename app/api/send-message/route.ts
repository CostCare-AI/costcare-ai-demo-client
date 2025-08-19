import { proxyPostToDemo } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return proxyPostToDemo("send-message", req);
}

"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { AvatarWithSocial } from "./avatar-with-social";
import { useRouter, useSearchParams } from "next/navigation";

interface ChatHeaderProps {
  title: string;
}

export function ChatHeader({ title }: ChatHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  
  const openNewChat = () => {
    router.push(`/?user_id=${userId}`);
  };
  return (
    <div className="flex items-center justify-between rounded-[16px] bg-white p-3 lg:p-4 flex-wrap">
      <div className="flex items-center gap-2 lg:gap-4">
        <AvatarWithSocial />
        <div>
          <p className="font-semibold text-[#2E3039] text-[16px]">{title}</p>
          <p className="text-[14px] text-[#8788A0]">AI agent chat</p>
        </div>
      </div>
      <Button variant="outline" onClick={openNewChat}>
        <Plus className="w-4 h-4" />
        New chat
      </Button>
    </div>
  );
}

import { CheckCircle } from "@/components/icons/check-circle";
import { InfoCircle } from "@/components/icons/info-circle";

import { Message } from "../../lib/types";

interface TaskBubbleProps {
  msg: Message;
}

export function TaskBubble({ msg }: TaskBubbleProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full justify-between rounded-[16px] bg-[#FFF2E3] px-4 py-2.5 text-sm text-[#D38405]">
        <div className="flex">
          <InfoCircle className="mr-2 h-5 w-5 text-[#D38405]" />
          <div>
            <p className="text-[14px] font-medium">{msg.content}</p>
          </div>
        </div>
        <CheckCircle className="h-6.5 w-6.5 text-[#9C9DB5]" />
      </div>
    </div>
  );
}

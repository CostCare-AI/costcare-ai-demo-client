"use client";

import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageBySocial } from "@/lib/utils";
import { SocialEnum } from "@/lib/types";

export function AvatarWithSocial() {
  return (
    <div className="relative h-10 w-10">
      <Avatar className="relative h-10 w-10">
        <AvatarImage src={"/images/common/avatar.svg"} alt={"avatar"} />
        <AvatarFallback>{""}</AvatarFallback>
      </Avatar>
      <Image
        src={
          getImageBySocial(SocialEnum.Telegram) ||
          "/images/common/placeholder.svg"
        }
        alt={"social"}
        className="absolute bottom-0 right-0 rounded-full border border-white bg-white"
        width={13}
        height={13}
      />
    </div>
  );
}

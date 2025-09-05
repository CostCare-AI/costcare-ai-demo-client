"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface RefreshOnParamChangeProps {
  watchKeys?: string[];
}

export function RefreshOnParamChange({
  watchKeys = ["chat_id"],
}: RefreshOnParamChangeProps) {
  const params = useSearchParams();
  const router = useRouter();
  const previousSignatureRef = useRef<string>("");

  const signature = watchKeys.map((key) => params.get(key) || "").join("|");

  useEffect(() => {
    if (
      previousSignatureRef.current &&
      previousSignatureRef.current !== signature
    ) {
      router.refresh();
    }
    previousSignatureRef.current = signature;
  }, [signature, router]);

  return null;
}

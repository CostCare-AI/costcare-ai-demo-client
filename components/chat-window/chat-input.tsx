"use client";

import { useEffect, useRef, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AutoTextarea } from "@/components/ui/auto-textarea";
import { Send } from "@/components/icons/send";

interface ChatInputProps {
  recipient: string;
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage, recipient }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setInputValue((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="relative flex flex-col justify-end">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 -top-4 h-4 bg-gradient-to-t from-[#F7F7FB] to-transparent z-10"
      />
      <AutoTextarea
        placeholder={`Type a message to ${recipient}...`}
        className="min-h-[73px] max-h-[160px] border-none pr-[100px] bg-white"
        value={inputValue}
        name="message"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            (e.target as HTMLTextAreaElement)?.blur();
            handleSendMessage();
          }
        }}
      />
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-12 right-0 z-10 cursor-pointer"
        >
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowEmojiPicker((v) => !v)}
        >
          <Smile className="h-5 w-5 text-[#8E94A0]" />
        </Button>
        <Button
          size="icon"
          className="h-[49px] w-[49px] rounded-[8px] bg-[#7C5CFC] ml-1 hover:bg-[#7056DC]"
          onClick={handleSendMessage}
        >
          <Send className="h-[25px] w-[25px] text-white" />
        </Button>
      </div>
    </div>
  );
}

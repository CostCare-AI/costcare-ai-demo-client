import { useCallback, useEffect, useRef } from "react"

export const useScrollOnMessageAdd = (messages: unknown[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior,
        block: "end",
        inline: "nearest",
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()

    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)

    return () => clearTimeout(timer)
  }, [messages, scrollToBottom])

  return {
    messagesEndRef,
    scrollToBottom,
  }
}

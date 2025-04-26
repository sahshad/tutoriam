import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils/classname"
import { useEffect, useRef } from "react"

interface Message {
  id: string
  sender: string
  content: string
  time: string
  isUser: boolean
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const showAvatar = !messages[index - 1]?.isUser === !message.isUser
          const showTime = message.time || index === messages.length - 1

          return (
            <div key={message.id}>
              {message.time && (
                <div className="my-2 flex justify-center">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{message.time}</span>
                </div>
              )}

              <div className={cn("flex items-end gap-2", message.isUser ? "justify-end" : "justify-start")}>
                {!message.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={message.sender} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-4 py-2 text-sm",
                    message.isUser ? "bg-black text-white" : "bg-muted",
                  )}
                >
                  {message.content}
                </div>

                {showTime && message.isUser && (
                  <span className="text-xs text-muted-foreground">{message.time || "Time"}</span>
                )}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

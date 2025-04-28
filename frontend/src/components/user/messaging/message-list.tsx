import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils/classname"
import { formatTimeWithoutSeconds, getDateLabel } from "@/lib/utils/dateUtils"
import { Message } from "@/redux/slices/messageSlice"
import { RootState } from "@/redux/store"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])


  const {user} = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages])

  let lastDateLabel: string | null = null

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 no-scrollbar">
      <div className="space-y-4">
        {messages.map((message, index) => {

          const isUser = message.senderId === user._id
          // const showAvatar = !messages[index - 1]?.isUser === !message.isUser
          const showAvatar = !isUser
          const showTime = new Date(message.createdAt).toLocaleTimeString() || index === messages.length - 1
          const currentDateLabel = getDateLabel(message.createdAt.toString())
          const showDateLabel = currentDateLabel !== lastDateLabel
          const messageMaxWidth = containerWidth * 0.5
          lastDateLabel = currentDateLabel

          return (
            <div key={message._id} >
              
              {showDateLabel  && (
                <div className="my-2 flex justify-center">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{currentDateLabel}</span>
                </div>
              )}
              <div className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
                {/* {!isUser && (
                  <Avatar className="h-4 w-4  ">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={message.senderId} />
                    <AvatarFallback>{message.senderId}</AvatarFallback>
                  </Avatar>
                )} */}
                <div className="flex flex-col justify-end gap-2">
                <div
                  className={cn(
                    " break-words rounded-lg px-4 py-2 text-sm text-center ",
                    isUser ? "text-secondary bg-primary" : "bg-muted",
                    
                  )}
                  style={{
                    maxWidth: `${messageMaxWidth}px`
                  }}
                >
                  {message.body}
                </div>

                {showTime && (
                  <span className={`text-[11px] text-muted-foreground ${isUser ? "text-end": "text-start"} ` }>{formatTimeWithoutSeconds(new Date(message.createdAt)) || "Time"}</span>
                )}
                </div>

                
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

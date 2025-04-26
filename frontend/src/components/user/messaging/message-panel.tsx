"use client"

import { MessageHeader } from "./message-header"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"
import { useState } from "react"

interface MessagePanelProps {
  activeChatId: string | null
  onBackClick?: () => void
}

// Sample data for the active chat
const chatData = {
  id: "1",
  name: "Jane Cooper",
  avatar: "/placeholder.svg?height=40&width=40",
  online: true,
  status: "Active Now",
  messages: [
    {
      id: "m1",
      sender: "Jane",
      content:
        "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊",
      time: "Today",
      isUser: false,
    },
    {
      id: "m2",
      sender: "User",
      content: "Hello, Good Evening.",
      time: "Time",
      isUser: true,
    },
    {
      id: "m3",
      sender: "User",
      content: "I'm Zafor",
      time: "",
      isUser: true,
    },
    {
      id: "m4",
      sender: "User",
      content: "I only have a small doubt about your lecture, can you give me some time for this?",
      time: "",
      isUser: true,
    },
    {
      id: "m5",
      sender: "Jane",
      content: "Yeah sure, tell me zafor",
      time: "",
      isUser: false,
    },
  ],
}

export function MessagePanel({ activeChatId, onBackClick }: MessagePanelProps) {
  const [messages, setMessages] = useState(chatData.messages)

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const newMessage = {
      id: `m${messages.length + 1}`,
      sender: "User",
      content,
      time: "",
      isUser: true,
    }

    setMessages([...messages, newMessage])
  }

  if (!activeChatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    )
  }

  return (
    <>
      <MessageHeader
        name={chatData.name}
        avatar={chatData.avatar}
        status={chatData.status}
        online={chatData.online}
        onBackClick={onBackClick}
      />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </>
  )
}

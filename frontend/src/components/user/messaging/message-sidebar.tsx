"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { MessagePreview } from "./message-preview"
import { useState } from "react"

interface MessageSidebarProps {
  onChatSelect: (id: string) => void
  activeChatId: string | null
}

// Sample data for message previews
const messageData = [
  {
    id: "1",
    name: "Jane Cooper",
    message: "Yeah sure, tell me zafor",
    time: "just now",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    unread: false,
  },
  {
    id: "2",
    name: "Jenny Wilson",
    message: "Thank you so much, sir",
    time: "2 d",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    unread: true,
  },
  {
    id: "3",
    name: "Marvin McKinney",
    message: "You're Welcome",
    time: "1 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    unread: true,
  },
  {
    id: "4",
    name: "Eleanor Pena",
    message: "Thank you so much, sir",
    time: "1 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    unread: false,
  },
  {
    id: "5",
    name: "Ronald Richards",
    message: "Sorry, I can't help you",
    time: "2 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    unread: false,
  },
  {
    id: "6",
    name: "Kathryn Murphy",
    message: "new message",
    time: "2 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    unread: false,
  },
  {
    id: "7",
    name: "Jacob Jones",
    message: "Thank you so much, sir",
    time: "6 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    unread: false,
  },
  {
    id: "8",
    name: "Cameron Williamson",
    message: "It's okay, no problem brother, i will fix everythin...",
    time: "6 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    unread: false,
  },
  {
    id: "9",
    name: "Arlene McCoy",
    message: "Thank you so much, sir",
    time: "9 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    unread: false,
  },
  {
    id: "10",
    name: "Dianne Russell",
    message: "You're Welcome",
    time: "9 m",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    unread: false,
  },
]

export function MessageSidebar({ onChatSelect, activeChatId }: MessageSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = messageData.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Message</h1>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Compose</span>
        </Button>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto no-scrollbar">
        {filteredMessages.map((message) => (
          <MessagePreview
            key={message.id}
            id={message.id}
            name={message.name}
            message={message.message}
            time={message.time}
            avatar={message.avatar}
            online={message.online}
            unread={message.unread}
            isActive={message.id === activeChatId}
            onClick={() => onChatSelect(message.id)}
          />
        ))}
      </div>
    </div>
  )
}

"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { MessagePreview } from "./message-preview"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user"
import { fetchChats } from "@/redux/thunks/chatThunk"
import { fetchMessages } from "@/redux/thunks/MessageThunk"
import { Message } from "@/redux/slices/messageSlice"
import { formatTimeWithoutSeconds } from "@/lib/utils/dateUtils"

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

  const dispatch = useAppDispatch()
   
  useEffect(() => {
    const getCartData = async () => {
      try {
        dispatch(fetchChats())
      } catch (error) {
        console.error(error)
      }
    }

    getCartData()
  }, [dispatch]);

     const {chats} = useAppSelector((state) => state.chat);
     const {user} = useAppSelector((state) => state.auth)


  const handleChangeChat = (chatId: string) => {
    onChatSelect(chatId)
    dispatch(fetchMessages(chatId))
  }
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
        {chats.map((chat) => {
        const participants = chat.participants as Partial<IUser>[]
        const targetUser = participants.filter(p => p._id !== user._id)[0]
        return (
          <MessagePreview
            key={chat._id}
            id={chat._id}
            name={targetUser.name as string}
            message={chat.lastMessage.body as string}
            time={formatTimeWithoutSeconds(new Date(chat.updatedAt))}
            avatar={targetUser.profileImageUrl as string}
            online={true}
            unread={true}
            isActive={true}
            onClick={() => handleChangeChat(chat._id)}
          />
        )

        })}
      </div>
    </div>
  )
}

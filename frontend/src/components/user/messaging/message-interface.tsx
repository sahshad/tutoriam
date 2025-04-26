"use client"

import { MessageSidebar } from "./message-sidebar"
import { MessagePanel } from "./message-panel"
import { useMediaQuery } from "@/hooks/useMobile"
import { useState } from "react"

export function MessagingInterface() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeChatId, setActiveChatId] = useState<string | null>("1") // Default to first chat

  const handleChatSelect = (id: string) => {
    setActiveChatId(id)
    if (isMobile) {
      setShowSidebar(false)
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      {(showSidebar || !isMobile) && (
        <div className={`${isMobile ? "w-full" : "w-1/3 border-r"} h-full`}>
          <MessageSidebar onChatSelect={handleChatSelect} activeChatId={activeChatId} />
        </div>
      )}

      {(!showSidebar || !isMobile) && (
        <div className={`${isMobile ? "w-full" : "w-2/3"} h-full flex flex-col`}>
          <MessagePanel activeChatId={activeChatId} onBackClick={isMobile ? toggleSidebar : undefined} />
        </div>
      )}
    </div>
  )
}

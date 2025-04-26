import { Button } from "@/components/ui/button"
import { Pencil, Send } from "lucide-react"
import { useState, type FormEvent } from "react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
          <Pencil className="h-5 w-5" />
          <span className="sr-only">Attach</span>
        </Button>

        <input
          type="text"
          placeholder="Type your message"
          className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button type="submit" size="icon" className="rounded-full bg-black hover:bg-black/90">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}

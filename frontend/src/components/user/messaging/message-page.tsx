import { useEffect } from "react";
import { MessagingInterface } from "./message-interface";
import { useAppDispatch } from "@/redux/store";
import { fetchChats } from "@/redux/thunks/chatThunk";

export default function MessagingPage() {

  return (
    <div className="h-screen w-full bg-background">
      <MessagingInterface />
    </div>
  )
}

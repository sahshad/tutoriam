import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/classname";
import { formatTimeWithoutSeconds, getDateLabel } from "@/lib/utils/dateUtils";
import { Message } from "@/redux/slices/messageSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { deleteMessage } from "@/redux/thunks/messageThunk";
import { MoreHorizontal, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface MessageListProps {
  messages: Message[];
  inputRef: React.RefObject<HTMLInputElement>;
  isEditing: string | null;
  setIsEditing: (val: string | null) => void;
  setInputMessage: (val: string) => void;
}

export function MessageList({ messages, inputRef, isEditing, setIsEditing, setInputMessage }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const dispatch = useAppDispatch();

  const handleEditClick = (message: string, messageId: string) => {
    setIsEditing(messageId);
    console.log(message);
    setInputMessage(message);
    setTimeout(() => {
      const inputEl = inputRef.current;
      if (inputEl) {
        inputEl.focus();
        const length = inputEl.value.length;
        inputEl.setSelectionRange(length, length);
      }
    }, 0);
  };

  const hanldeCancelEdit = () => {
    setIsEditing(null);
    setInputMessage("");
  };

  const handleDeleteClick = (messageId: string) => {
    dispatch(deleteMessage({ messageId }));
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  let lastDateLabel: string | null = null;

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 no-scrollbar">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const isUser = message.senderId === user._id;
          const showTime = new Date(message.createdAt).toLocaleTimeString() || index === messages.length - 1;
          const currentDateLabel = getDateLabel(message.createdAt.toString());
          const showDateLabel = currentDateLabel !== lastDateLabel;
          const messageMaxWidth = containerWidth * 0.5;
          lastDateLabel = currentDateLabel;

          return (
            <div key={message._id}>
              {showDateLabel && (
                <div className="my-2 flex justify-center">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {currentDateLabel}
                  </span>
                </div>
              )}
              <div className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
                <div className="flex flex-col justify-end gap-2">
                  <div
                    className={cn(
                      "flex gap-2 rounded-lg pl-4 pr-2 py-2 text-sm",
                      isUser ? "text-secondary bg-primary" : "bg-muted"
                    )}
                  >
                    <div
                      className="break-words "
                      style={{
                        maxWidth: `${messageMaxWidth}px`,
                      }}
                    >
                      {message.body}
                    </div>

                    {isUser && isEditing !== message._id && (
                      <div className="flex-1 no-scrollbar">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="rounded flex-col align-bottom justify-end ">
                              <MoreHorizontal className="w-3 h-3 p-0" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClick(message.body, message._id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteClick(message._id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}

                    {isUser && isEditing && isEditing === message._id && (
                      <div className="flex justify-center items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button onClick={hanldeCancelEdit}>
                                <XCircle className="w-4 h-4 text-red-400" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs gap-2">
                              Cancel
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>

                  {showTime && (
                    <span className={`text-[11px] text-muted-foreground ${isUser ? "text-end" : "text-start"} `}>
                      {formatTimeWithoutSeconds(new Date(message.createdAt)) || "Time"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

import type { Message } from "../store/types"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
    message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isAssistant = message.sender === "assistant"

    return (
        <div className={cn("flex w-full", isAssistant ? "justify-start" : "justify-end")}>
            <div
                className={cn(
                    "max-w-[75%] rounded-lg px-4 py-2 mb-2 break-words whitespace-pre-wrap",
                    isAssistant ? "bg-gray-100 text-black" : "bg-blue-500 text-white"
                )}
            >
                <p className="text-sm">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </p>

                {isAssistant && <span className="text-xs opacity-70 mt-1 block">
                    {new Date(message.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}
                </span>}
            </div>
        </div>
    )
}

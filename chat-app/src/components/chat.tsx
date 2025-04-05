"use client"
import { useDispatch, useSelector } from "react-redux"
import { Settings } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { QuickActions } from "./quick-actions"
import { sendMessage, addMessage, setTyping } from "../store/chatSlice"
import type { RootState } from "../store/store"
import type { Message } from "../store/types"
import { useAppDispatch } from "../store/store"; 
import { Button } from "@/components/ui/button"

export function Chat() {
    const dispatch = useAppDispatch();
    const { messages, isTyping } = useSelector((state: RootState) => state.chat)

    const handleSendMessage = async (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "user",
        };

        dispatch(addMessage(newMessage));
        dispatch(setTyping(true));

        try {
            await dispatch(sendMessage(content)).unwrap();
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            dispatch(setTyping(false)); 
        }
    };

    const quickActions = [
        { label: "Tell me about hooks", onClick: () => handleSendMessage("Tell me about hooks") },
        { label: "Performance tips", onClick: () => handleSendMessage("Performance tips") },
        { label: "State management", onClick: () => handleSendMessage("State management") },
    ]

    return (
        <div className="flex flex-col h-[95vh] w-full max-w-lg mx-auto border rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
                <div>
                    <h1 className="font-semibold">AI Chat Assistant</h1>
                    <p className="text-sm text-gray-500">Speech recognition enabled</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message : any) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
                {isTyping && <div className="text-sm text-gray-500">AI is typing...</div>}
            </div>

            <QuickActions actions={quickActions} />

            <ChatInput onSend={handleSendMessage} onStartRecording={() => console.log("Start recording")} />
        </div>
    )
}

